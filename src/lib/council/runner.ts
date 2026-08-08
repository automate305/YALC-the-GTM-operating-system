/**
 * Council runner — orchestrates the council skill call + persistence.
 *
 * Flow (mirrors lib/visualize/runner.ts):
 *   1. Derive a filesystem-safe session_id from the question.
 *   2. Auto-inject the roster prompt from lib/council/members.ts.
 *   3. Best-effort inject operating context from the Brain's live sections
 *      (company_context / icp / positioning) — never required, never fatal.
 *   4. Resolve the bundled council skill, run it via the reasoning capability.
 *   5. Parse + validate the structured JSON deliberation, persist via
 *      writeCouncilSession.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { PKG_ROOT } from '../paths.js'
import { rosterPrompt, seatedMembers } from './members.js'
import {
  writeCouncilSession,
  type CouncilDeliberation,
  type CouncilSession,
} from './storage.js'
import { liveRoot } from '../onboarding/preview.js'

export interface CouncilRunInput {
  question: string
  /** Extra context supplied by the caller; appended after Brain context. */
  context?: string
  /** Override the derived session id (must be filename-safe). */
  session_id?: string
}

export interface CouncilRunResult {
  session: CouncilSession
  session_path: string
}

/** Derive a stable, filename-safe session id from the question text. */
export function deriveSessionId(question: string, now: Date = new Date()): string {
  const slug = question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/g, '')
  const stamp = now.getTime().toString(36)
  const base = slug.length > 0 ? `${slug}-${stamp}` : `council-${stamp}`
  return base.slice(0, 64)
}

/** Brain sections worth surfacing to the council, in priority order. */
const CONTEXT_SECTIONS = ['company_context.yaml', 'icp', 'positioning']
const CONTEXT_CHAR_BUDGET = 6000

/**
 * Best-effort operating context from the Brain's live tenant tree.
 * Missing sections are skipped; any error yields an empty string —
 * the council must run fine on a fresh install with no Brain.
 */
export function loadBrainContext(): string {
  try {
    const root = liveRoot()
    const chunks: string[] = []
    let used = 0
    for (const section of CONTEXT_SECTIONS) {
      const abs = join(root, section)
      if (!existsSync(abs)) continue
      const files: string[] = []
      const st = statSync(abs)
      if (st.isFile()) files.push(abs)
      else if (st.isDirectory()) {
        for (const entry of readdirSync(abs).sort()) {
          const p = join(abs, entry)
          try {
            if (statSync(p).isFile()) files.push(p)
          } catch {
            /* skip */
          }
        }
      }
      for (const file of files) {
        if (used >= CONTEXT_CHAR_BUDGET) break
        try {
          const text = readFileSync(file, 'utf-8').trim()
          if (!text) continue
          const remaining = CONTEXT_CHAR_BUDGET - used
          const clipped = text.length > remaining ? `${text.slice(0, remaining)}…` : text
          chunks.push(`## ${section}\n${clipped}`)
          used += clipped.length
        } catch {
          /* skip unreadable file */
        }
      }
    }
    return chunks.join('\n\n')
  } catch {
    return ''
  }
}

export async function runCouncil(input: CouncilRunInput): Promise<CouncilRunResult> {
  const question = (input.question ?? '').trim()
  if (question.length < 8) {
    throw new Error('question is required (give the council something to deliberate)')
  }

  const sessionId = input.session_id ?? deriveSessionId(question)

  const brainContext = loadBrainContext()
  const context = [brainContext, input.context?.trim() ?? '']
    .filter((s) => s.length > 0)
    .join('\n\n')

  const skillInputs: Record<string, unknown> = {
    question,
    context,
    roster: rosterPrompt(),
  }

  const skill = await resolveCouncilSkill()
  const { getRegistryReady } = await import('../providers/registry.js')
  const providers = await getRegistryReady()
  const ctx = {
    framework: null as never,
    intelligence: [],
    providers,
    userId: 'council',
  }

  const collected: unknown[] = []
  for await (const event of skill.execute(skillInputs, ctx as never)) {
    if (event.type === 'result') collected.push(event.data)
    else if (event.type === 'error') {
      throw new Error(`council skill failed: ${event.message}`)
    }
  }

  const deliberation = parseCouncilResult(collected)

  const session: CouncilSession = {
    session_id: sessionId,
    question,
    context_used: context.length > 0,
    created_at: new Date().toISOString(),
    deliberation,
  }
  const sessionPath = writeCouncilSession(session)
  return { session, session_path: sessionPath }
}

// ─── Parsing ────────────────────────────────────────────────────────────────

export function parseCouncilResult(events: unknown[]): CouncilDeliberation {
  // The reasoning adapter may hand us a parsed object or { text: "<json>" }.
  for (const ev of events) {
    if (!ev || typeof ev !== 'object') continue
    const o = ev as Record<string, unknown>
    const direct = coerceDeliberation(o)
    if (direct) return direct
    if (typeof o.text === 'string') {
      const fromText = parseJsonFromText(o.text)
      if (fromText) return fromText
    }
  }
  throw new Error('council skill returned no parsable deliberation')
}

function parseJsonFromText(text: string): CouncilDeliberation | null {
  const cleaned = text.replace(/```json\s*|```/g, '').trim()
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    return coerceDeliberation(JSON.parse(cleaned.slice(start, end + 1)) as Record<string, unknown>)
  } catch {
    return null
  }
}

/** Structural validation — returns null when the shape is not a deliberation. */
function coerceDeliberation(o: Record<string, unknown>): CouncilDeliberation | null {
  if (
    typeof o.restatement !== 'string' ||
    typeof o.summary !== 'string' ||
    !Array.isArray(o.positions) ||
    !Array.isArray(o.tensions) ||
    !Array.isArray(o.stances) ||
    !o.verdict ||
    typeof o.verdict !== 'object'
  ) {
    return null
  }
  const verdict = o.verdict as Record<string, unknown>
  if (typeof verdict.recommendation !== 'string' || typeof verdict.next_action !== 'string') {
    return null
  }
  const seatedIds = new Set(seatedMembers().map((m) => m.id))
  const positions = (o.positions as Array<Record<string, unknown>>)
    .filter((p) => typeof p?.member === 'string' && typeof p?.analysis === 'string')
    .map((p) => ({ member: p.member as string, analysis: p.analysis as string }))
  if (positions.length === 0 || !positions.some((p) => seatedIds.has(p.member))) {
    return null
  }
  const split =
    o.split && typeof o.split === 'object'
      ? (o.split as Record<string, unknown>)
      : {}
  return {
    restatement: o.restatement,
    leading_question: typeof o.leading_question === 'string' ? o.leading_question : '',
    positions,
    tensions: (o.tensions as Array<Record<string, unknown>>)
      .filter((t) => typeof t?.title === 'string' && typeof t?.resolution === 'string')
      .map((t) => ({
        title: t.title as string,
        a_who: str(t.a_who),
        a_text: str(t.a_text),
        b_who: str(t.b_who),
        b_text: str(t.b_text),
        resolution: t.resolution as string,
      })),
    stances: (o.stances as Array<Record<string, unknown>>)
      .filter((s) => typeof s?.member === 'string' && typeof s?.stance === 'string')
      .map((s) => ({
        member: s.member as string,
        stance: s.stance as string,
        camp: s.camp === 'b' ? 'b' : 'a',
      })),
    split: { a_label: str(split.a_label), b_label: str(split.b_label) },
    verdict: {
      recommendation: verdict.recommendation,
      kill_criteria: Array.isArray(verdict.kill_criteria)
        ? (verdict.kill_criteria as Array<Record<string, unknown>>)
            .filter((k) => typeof k?.condition === 'string')
            .map((k) => ({ when: str(k.when), condition: k.condition as string }))
        : [],
      next_action: verdict.next_action,
    },
    summary: o.summary,
  }
}

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

async function resolveCouncilSkill() {
  const { loadMarkdownSkill } = await import('../skills/markdown-loader.js')
  const path = join(PKG_ROOT, 'configs', 'skills', 'council.md')
  const result = await loadMarkdownSkill(path)
  if (!result.skill) {
    throw new Error(`Failed to load council skill: ${result.errors.join('; ')}`)
  }
  return result.skill
}
