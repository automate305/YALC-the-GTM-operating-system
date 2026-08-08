/**
 * Council storage — read/write deliberation sessions.
 *
 * Layout (per session_id), mirroring lib/visualize/storage.ts:
 *   ~/.gtm-os/council/<session_id>.json — full session (question + deliberation)
 *
 * Idempotency: writeCouncilSession() unconditionally overwrites, so
 * re-running a session_id refreshes the saved deliberation.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

export interface CouncilTension {
  title: string
  a_who: string
  a_text: string
  b_who: string
  b_text: string
  resolution: string
}

export interface CouncilPosition {
  member: string
  analysis: string
}

export interface CouncilStance {
  member: string
  stance: string
  camp: 'a' | 'b'
}

export interface CouncilKillCriterion {
  when: string
  condition: string
}

export interface CouncilDeliberation {
  restatement: string
  leading_question: string
  positions: CouncilPosition[]
  tensions: CouncilTension[]
  stances: CouncilStance[]
  split: { a_label: string; b_label: string }
  verdict: {
    recommendation: string
    kill_criteria: CouncilKillCriterion[]
    next_action: string
  }
  summary: string
}

export interface CouncilSession {
  session_id: string
  question: string
  context_used: boolean
  created_at: string
  deliberation: CouncilDeliberation
}

/** Summary row for list views — everything except the deliberation body. */
export interface CouncilSessionSummary {
  session_id: string
  question: string
  created_at: string
  summary: string
  split: { a: number; b: number }
}

/** Resolved at call time so HOME pivots in tests are honoured. */
export function councilDir(): string {
  return join(homedir(), '.gtm-os', 'council')
}

function ensureDir(): string {
  const dir = councilDir()
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

/** Validate that a session_id is safe to use as a filename. */
export function assertSessionId(sessionId: string): void {
  if (typeof sessionId !== 'string' || sessionId.length === 0) {
    throw new Error('session_id is required')
  }
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/i.test(sessionId)) {
    throw new Error(`session_id "${sessionId}" must be alphanumeric + hyphens (1-64 chars)`)
  }
}

export function writeCouncilSession(session: CouncilSession): string {
  assertSessionId(session.session_id)
  const dir = ensureDir()
  const path = join(dir, `${session.session_id}.json`)
  writeFileSync(path, JSON.stringify(session, null, 2), 'utf-8')
  return path
}

export function readCouncilSession(sessionId: string): CouncilSession | null {
  assertSessionId(sessionId)
  const path = join(councilDir(), `${sessionId}.json`)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf-8')) as CouncilSession
}

/** All saved sessions, newest first. */
export function listCouncilSessions(): CouncilSessionSummary[] {
  const dir = councilDir()
  if (!existsSync(dir)) return []
  const out: CouncilSessionSummary[] = []
  for (const entry of readdirSync(dir)) {
    if (!entry.endsWith('.json')) continue
    try {
      const session = JSON.parse(readFileSync(join(dir, entry), 'utf-8')) as CouncilSession
      const stances = Array.isArray(session.deliberation?.stances) ? session.deliberation.stances : []
      out.push({
        session_id: session.session_id,
        question: session.question,
        created_at: session.created_at,
        summary: session.deliberation?.summary ?? '',
        split: {
          a: stances.filter((s) => s.camp === 'a').length,
          b: stances.filter((s) => s.camp === 'b').length,
        },
      })
    } catch {
      // Skip unreadable files — a partial write must not break the list.
    }
  }
  return out.sort((x, y) => (x.created_at < y.created_at ? 1 : -1))
}
