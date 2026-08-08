/**
 * Tests for the council skill + runner + storage.
 *
 * The reasoning capability is mocked at the registry level so each test
 * controls the exact deliberation JSON the LLM "returns" — we never call
 * a real provider. The mock captures the resolved prompt so we can assert
 * the runner injected the roster, the question, and Brain context.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { runCouncil, deriveSessionId, parseCouncilResult, loadBrainContext } from '../lib/council/runner'
import { listCouncilSessions, readCouncilSession, councilDir } from '../lib/council/storage'
import { seatedMembers, COUNCIL_MEMBERS } from '../lib/council/members'
import { resetCapabilityRegistry } from '../lib/providers/capabilities'

let TMP: string
let capturedPrompts: string[] = []

function sampleDeliberation() {
  return {
    restatement: 'The room agrees the decision is whether to launch now.',
    leading_question: 'Is speed worth the churn risk?',
    positions: seatedMembers().map((m) => ({
      member: m.id,
      analysis: `${m.name} analyzes from ${m.domain}.`,
    })),
    tensions: [
      {
        title: 'Speed vs. Quality',
        a_who: 'Machiavelli',
        a_text: 'Ship today.',
        b_who: 'Munger',
        b_text: 'Shipping junk compounds against you.',
        resolution: 'Ship behind a flag; expand on retention signal.',
      },
    ],
    stances: seatedMembers().map((m, i) => ({
      member: m.id,
      stance: `${m.name} final stance.`,
      camp: i < 3 ? 'a' : 'b',
    })),
    split: { a_label: 'Launch now', b_label: 'Launch gated' },
    verdict: {
      recommendation: 'Launch gated, expand on signal — dissent from the launch-now camp preserved.',
      kill_criteria: [{ when: 'Week 1', condition: 'Churn >10% → pause rollout.' }],
      next_action: 'Create the feature flag and pick the gate metric.',
    },
    summary: 'Launch gated with a churn kill-switch.',
  }
}

function makeFakeReasoningAdapter(payload: unknown, asText = true) {
  return {
    capabilityId: 'reasoning' as const,
    providerId: 'anthropic',
    isAvailable: () => true,
    async execute(input: Record<string, unknown>) {
      capturedPrompts.push(String(input.prompt ?? ''))
      if (asText) return { text: '```json\n' + JSON.stringify(payload) + '\n```' }
      return payload as Record<string, unknown>
    },
  }
}

async function installFakeAdapter(payload: unknown, asText = true) {
  const { getCapabilityRegistryReady } = await import('../lib/providers/capabilities')
  const registry = await getCapabilityRegistryReady()
  registry.register(makeFakeReasoningAdapter(payload, asText))
}

beforeEach(() => {
  TMP = mkdtempSync(join(tmpdir(), 'yalc-council-'))
  vi.stubEnv('HOME', TMP)
  vi.stubEnv('ANTHROPIC_API_KEY', 'test-key')
  capturedPrompts = []
  resetCapabilityRegistry()
})

afterEach(() => {
  vi.unstubAllEnvs()
  rmSync(TMP, { recursive: true, force: true })
  resetCapabilityRegistry()
})

describe('council runner — happy path', () => {
  it('runs a deliberation and persists the session', async () => {
    await installFakeAdapter(sampleDeliberation())
    const { session, session_path } = await runCouncil({
      question: 'Should we launch the new onboarding this week?',
    })
    expect(existsSync(session_path)).toBe(true)
    expect(session.question).toContain('launch the new onboarding')
    expect(session.deliberation.positions.length).toBe(seatedMembers().length)
    expect(session.deliberation.stances.filter((s) => s.camp === 'a').length).toBe(3)
    expect(session.deliberation.verdict.next_action).toContain('feature flag')

    // Round-trips through storage.
    const read = readCouncilSession(session.session_id)
    expect(read?.deliberation.summary).toBe('Launch gated with a churn kill-switch.')
    const list = listCouncilSessions()
    expect(list.length).toBe(1)
    expect(list[0].split).toEqual({ a: 3, b: seatedMembers().length - 3 })
  })

  it('injects the roster and the question into the prompt', async () => {
    await installFakeAdapter(sampleDeliberation())
    await runCouncil({ question: 'Should we raise prices by 20% next quarter?' })
    expect(capturedPrompts.length).toBeGreaterThan(0)
    const prompt = capturedPrompts[0]
    expect(prompt).toContain('raise prices by 20%')
    for (const m of COUNCIL_MEMBERS) {
      expect(prompt).toContain(`id: ${m.id}`)
    }
    // Consulting members are labeled as non-voting.
    expect(prompt).toContain('CONSULTING (advises, does not vote)')
  })

  it('accepts an adapter that returns a parsed object instead of text', async () => {
    await installFakeAdapter(sampleDeliberation(), false)
    const { session } = await runCouncil({ question: 'Object-shaped adapter output works?' })
    expect(session.deliberation.restatement).toContain('launch now')
  })

  it('includes Brain context when live sections exist and flags context_used', async () => {
    const root = join(TMP, '.gtm-os')
    mkdirSync(root, { recursive: true })
    writeFileSync(join(root, 'company_context.yaml'), 'company: Automate305\nfocus: AI automation for SMBs\n')
    await installFakeAdapter(sampleDeliberation())
    const { session } = await runCouncil({ question: 'Which niche should we dial first?' })
    expect(session.context_used).toBe(true)
    expect(capturedPrompts[0]).toContain('Automate305')
  })

  it('runs fine with no Brain at all (context_used false)', async () => {
    await installFakeAdapter(sampleDeliberation())
    const { session } = await runCouncil({ question: 'No brain configured — still deliberates?' })
    expect(session.context_used).toBe(false)
    expect(loadBrainContext()).toBe('')
  })

  it('appends caller-supplied context after Brain context', async () => {
    await installFakeAdapter(sampleDeliberation())
    const { session } = await runCouncil({
      question: 'Should we hire an SDR now?',
      context: 'Pipeline: $6.75k, 3 active deals, 1 overdue.',
    })
    expect(session.context_used).toBe(true)
    expect(capturedPrompts[0]).toContain('Pipeline: $6.75k')
  })
})

describe('council runner — guards + parsing', () => {
  it('rejects an empty or too-short question', async () => {
    await installFakeAdapter(sampleDeliberation())
    await expect(runCouncil({ question: '' })).rejects.toThrow(/question is required/)
    await expect(runCouncil({ question: 'why?' })).rejects.toThrow(/question is required/)
  })

  it('throws a parse error when the adapter returns junk', async () => {
    await installFakeAdapter({ text: 'the council mumbles incoherently' })
    await expect(
      runCouncil({ question: 'What happens on malformed output?' }),
    ).rejects.toThrow(/no parsable deliberation/)
  })

  it('parseCouncilResult tolerates fenced JSON and prose padding', () => {
    const text = 'Here is the verdict:\n```json\n' + JSON.stringify(sampleDeliberation()) + '\n```\nDone.'
    const parsed = parseCouncilResult([{ text }])
    expect(parsed.split.a_label).toBe('Launch now')
    expect(parsed.verdict.kill_criteria[0].when).toBe('Week 1')
  })

  it('parseCouncilResult rejects deliberations with no seated positions', () => {
    const bad = { ...sampleDeliberation(), positions: [{ member: 'nobody', analysis: 'x' }] }
    expect(() => parseCouncilResult([{ text: JSON.stringify(bad) }])).toThrow(/no parsable/)
  })

  it('deriveSessionId slugs the question and stays filename-safe', () => {
    const id = deriveSessionId('Should we raise prices by 20%?! (next quarter)', new Date(1700000000000))
    expect(id).toMatch(/^[a-z0-9][a-z0-9-]{0,63}$/)
    expect(id).toContain('should-we-raise-prices')
    const weird = deriveSessionId('!!!???', new Date(1700000000000))
    expect(weird).toMatch(/^council-/)
  })

  it('storage rejects unsafe session ids', () => {
    expect(() => readCouncilSession('../escape')).toThrow(/session_id/)
  })

  it('list skips unreadable files instead of failing', async () => {
    await installFakeAdapter(sampleDeliberation())
    await runCouncil({ question: 'One good session, one corrupt file.' })
    writeFileSync(join(councilDir(), 'corrupt.json'), '{not json')
    const list = listCouncilSessions()
    expect(list.length).toBe(1)
  })
})
