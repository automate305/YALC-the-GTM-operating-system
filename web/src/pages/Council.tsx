/**
 * /council — the Council of High Intelligence.
 *
 * The OS's decide layer: seven analytical personas deliberate a single
 * consequential decision across a fixed five-round protocol (restate →
 * independent → cross-examine → final stance → synthesis) and return a
 * verdict that preserves dissent, kill criteria, and the next concrete
 * action.
 *
 * Phase 2 (live): the page can convene the council on a NEW question via
 * POST /api/council/run (reasoning capability, 30–90s) and browse saved
 * deliberations from GET /api/council/list. The bundled Automate305
 * worked example renders through the same path as live sessions, so the
 * page stays fully useful offline / before a provider is configured.
 *
 * Styled inline to match Landing.tsx — the app's dark showcase surface
 * (#0A0A0A / #FF6B35, Outfit / Inter / JetBrains Mono).
 */

import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api'

const ChakanaLogo = () => (
  <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      fill="#FF6B35"
      d="M6 0h6v4h4v6h-4v2h2v2h-2v4H6v-4H4v-2H2v-2H0V4h6V0zM6 4H4v2H2v2h2v2h2v2h2v2h2v-2h2v-2h2V8h-2V6h-2V4H6z"
    />
    <circle cx="9" cy="9" r="2.2" fill="#0A0A0A" />
  </svg>
)

// ─── Static roster (identity is fixed; deliberations reference member ids) ──

interface Member {
  id: string
  glyph: string
  name: string
  domain: string
  method: string
  blind: string
  consulting?: boolean
}

const MEMBERS: Member[] = [
  { id: 'suntzu', glyph: '孫', name: 'Sun Tzu', domain: 'Strategy · Terrain', method: 'Win before fighting; concentrate force on decisive ground.', blind: 'Can over-plan; may delay action hunting for perfect terrain.' },
  { id: 'mach', glyph: 'M', name: 'Machiavelli', domain: 'Power · Persuasion', method: 'Read incentives; manufacture authority and urgency.', blind: 'Optimizes the close over the relationship; can erode trust that compounds.' },
  { id: 'munger', glyph: 'C', name: 'Charlie Munger', domain: 'Inversion · Judgment', method: 'Invert, always invert. Avoid stupidity before seeking brilliance.', blind: 'Caution can suppress aggression a resource-poor sprint needs.' },
  { id: 'taleb', glyph: 'N', name: 'Nassim Taleb', domain: 'Risk · Asymmetry', method: 'Seek convexity; survive first, never optimize the average.', blind: 'Tail-risk focus can freeze action that is genuinely safe to take.' },
  { id: 'meadows', glyph: 'D', name: 'Donella Meadows', domain: 'Systems · Leverage', method: 'Find the leverage point; watch the feedback loop, not the parts.', blind: 'Systems abstraction can postpone the concrete next act.' },
  { id: 'karpathy', glyph: 'A', name: 'Andrej Karpathy', domain: 'Execution · Instrumentation', method: 'Define the loss, find the bottleneck, iterate on that stage.', blind: 'Can over-build tooling instead of doing the object-level work.' },
  { id: 'marcus', glyph: '✦', name: 'Marcus Aurelius', domain: 'Discipline · Temperament', method: 'Control what is yours; the rest is indifferent.', blind: 'Stoic detachment can dull urgency a deadline demands.' },
]

const CONSULTING: Member[] = [
  { id: 'rams', glyph: 'R', name: 'Dieter Rams', domain: 'Design · Less, but better', method: 'Good design is as little design as possible.', blind: 'Reduction can strip a signal that mattered only occasionally.', consulting: true },
]

const ALL_MEMBERS = [...MEMBERS, ...CONSULTING]
const memberById = (id: string) => ALL_MEMBERS.find((m) => m.id === id)
const memberName = (id: string) => memberById(id)?.name ?? id

const BENCH = ['Aristotle', 'Socrates', 'Ada Lovelace', 'Lao Tzu', 'Richard Feynman', 'Linus Torvalds', 'Miyamoto Musashi', 'Alan Watts', 'Ilya Sutskever', 'Daniel Kahneman']

// ─── Session shape (mirrors src/lib/council/storage.ts) ─────────────────────

interface Tension { title: string; a_who: string; a_text: string; b_who: string; b_text: string; resolution: string }
interface Position { member: string; analysis: string }
interface Stance { member: string; stance: string; camp: 'a' | 'b' }
interface Deliberation {
  restatement: string
  leading_question: string
  positions: Position[]
  tensions: Tension[]
  stances: Stance[]
  split: { a_label: string; b_label: string }
  verdict: { recommendation: string; kill_criteria: Array<{ when: string; condition: string }>; next_action: string }
  summary: string
}
interface CouncilSession {
  session_id: string
  question: string
  context_used: boolean
  created_at: string
  deliberation: Deliberation
}
interface SessionSummary {
  session_id: string
  question: string
  created_at: string
  summary: string
  split: { a: number; b: number }
}

// ─── The bundled worked example, expressed in the live session shape ────────

const EXAMPLE: CouncilSession = {
  session_id: 'example-automate305-sprint',
  question: '5 paying clients — 14 days. Solo founder · pure outbound · Connect & Sell + HubSpot · $0 ad spend · INTI OS',
  context_used: false,
  created_at: '2026-07-18T14:00:00.000Z',
  deliberation: {
    restatement: 'Solo founder, $0 ad spend, one phone, Connect & Sell, HubSpot, a big cold list, INTI OS. Land 5 paying AI-automation clients ASAP via outbound — tracked daily, without burning out.',
    leading_question: 'Is “5 clients in 14 days, pure cold, solo” a target — or a fantasy? It stays open until synthesis.',
    positions: [
      { member: 'suntzu', analysis: "Don't spray the list. Pick one vertical + one pain where AI automation is obviously, painfully repeatable. A niche call converts 3–5× a generic one." },
      { member: 'mach', analysis: 'No warm intros exist, so engineer them. Volume — of the RIGHT opener. Lead with a pattern-interrupt and ask for a small commitment, never a demo.' },
      { member: 'munger', analysis: 'Ask how to GUARANTEE zero: dial inconsistently, wrong title, pitch instead of diagnose, forget to log, chase tire-kickers, burn out. Then make each impossible.' },
      { member: 'taleb', analysis: "Each call: bounded 2-minute downside, unbounded upside. That's convex — maximize at-bats. But burnout is ruin. Cap intensity to what repeats 10 days straight." },
      { member: 'meadows', analysis: "Leverage isn't more dials — it's the loop between conversation quality and your script. Track one leading metric, review daily, change the talk track when data says." },
      { member: 'karpathy', analysis: 'Treat it like training: loss = booked revenue. Each day find the choke stage — connect? convo→meeting? proposal→close? — and pour effort there. Automate the boring parts.' },
      { member: 'marcus', analysis: 'You own the dials, not the yeses. Set an input target, hit it regardless of mood, let closings be a lagging consequence. Two protected blocks. Rest is in the plan.' },
    ],
    tensions: [
      { title: 'Volume vs. Targeting', a_who: 'Machiavelli', a_text: '“Niche-picking is procrastination. Dial 60 today.”', b_who: 'Sun Tzu / Karpathy', b_text: '“Dialing the wrong 60 teaches nothing and demoralizes you.”', resolution: 'Big list, no proven niche — so days 3–4 are a live A/B. Dial two segments hard; let the data pick the beachhead.' },
      { title: 'Speed vs. Burnout', a_who: 'The “5 ASAP” pressure', a_text: '“Go maximal — a 6-hour marathon on day 1.”', b_who: 'Taleb / Marcus', b_text: '“That guarantees you quit by day 6. Quitting is ruin.”', resolution: 'Cap at ~3 hrs live talk-time/day in two blocks — repeatable 10 days beats two heroic days then collapse.' },
      { title: 'Track everything vs. almost nothing', a_who: 'Karpathy', a_text: '“Instrument every stage richly.”', b_who: 'Rams / Meadows', b_text: '“A board of 20 numbers has no leverage. Subtract.”', resolution: "Capture wide, show narrow. Auto-log dispositions; display only the handful that change today's decision." },
    ],
    stances: [
      { member: 'mach', stance: 'Achievable in 14 days IF deals are small enough for a fast yes.', camp: 'a' },
      { member: 'karpathy', stance: 'Achievable if you fix the bottleneck stage daily instead of just adding volume.', camp: 'a' },
      { member: 'suntzu', stance: 'Achievable — but only from a chosen beachhead, never the whole list.', camp: 'a' },
      { member: 'munger', stance: "Realistic outcome is 2–4 closed + pipeline; don't confuse effort with a signed check.", camp: 'b' },
      { member: 'taleb', stance: "'5-in-14' is a fragile point estimate; protect against the day you'd quit.", camp: 'b' },
      { member: 'meadows', stance: 'The sprint compounds only if the feedback loop is instrumented — otherwise it is noise.', camp: 'b' },
      { member: 'marcus', stance: 'Judge the sprint on inputs held with discipline, not the 5th check by an arbitrary date.', camp: 'b' },
    ],
    split: { a_label: 'Achievable inside 14 days', b_label: '2–4 closed + full pipeline' },
    verdict: {
      recommendation: 'Plan and act for 5. Forecast 2–4 closed by day 14 with pipeline behind them (5th landing ~day 21–30) [INFERENCE]. Judge the sprint on leading inputs you control — dial-time and quality conversations — not the 5th check by an arbitrary date.',
      kill_criteria: [
        { when: 'Day 5', condition: 'Quality-convo rate <8% in both niches → the list or offer is wrong, not your effort. Stop & fix.' },
        { when: 'Day 8', condition: '0 proposals out → choke is convo→meeting. Rework the ask, do not add volume.' },
        { when: 'Any day', condition: 'Skipped a block from dread 2× → cut to one block. Protect the streak over the peak.' },
      ],
      next_action: 'Build the 6-stage HubSpot pipeline + call dispositions, segment the list into two Active Lists. Everything stacks on that one move.',
    },
    summary: 'Act for 5, forecast 2–4 by day 14 — judged on inputs, with kill criteria armed.',
  },
}

const ROUND_META = [
  { n: 'R1', t: 'Restate' },
  { n: 'R2', t: 'Independent' },
  { n: 'R3', t: 'Cross-examine' },
  { n: 'R4', t: 'Final stance' },
  { n: 'R5', t: 'Synthesis' },
]

const OS_TABS = [
  { href: '/today', emoji: '☀️', label: 'Today' },
  { href: '/brain', emoji: '🧠', label: 'Brain' },
  { href: '/skills', emoji: '🛠️', label: 'Skills' },
  { href: '/council', emoji: '⚖️', label: 'Council' },
]

export function Council() {
  const [round, setRound] = useState(0)
  const [memberId, setMemberId] = useState('suntzu')
  const [session, setSession] = useState<CouncilSession>(EXAMPLE)
  const [saved, setSaved] = useState<SessionSummary[]>([])
  const [question, setQuestion] = useState('')
  const [running, setRunning] = useState(false)
  const [runError, setRunError] = useState<string | null>(null)

  const member = memberById(memberId) ?? MEMBERS[0]
  const d = session.deliberation
  const aCount = d.stances.filter((s) => s.camp === 'a').length
  const bCount = d.stances.filter((s) => s.camp === 'b').length
  const isExample = session.session_id === EXAMPLE.session_id
  const livePosition = d.positions.find((p) => p.member === memberId)
  const liveStance = d.stances.find((s) => s.member === memberId)

  const refreshSaved = useCallback(async () => {
    try {
      const res = await api.get<{ items: SessionSummary[] }>('/api/council/list')
      setSaved(res.items)
    } catch {
      // Offline / no API — the worked example still renders.
      setSaved([])
    }
  }, [])

  useEffect(() => {
    refreshSaved()
  }, [refreshSaved])

  const openSession = useCallback(async (id: string) => {
    if (id === EXAMPLE.session_id) {
      setSession(EXAMPLE)
      setRound(0)
      return
    }
    try {
      const full = await api.get<CouncilSession>(`/api/council/${encodeURIComponent(id)}`)
      setSession(full)
      setRound(4) // saved sessions open on the verdict
    } catch {
      setRunError(`Could not load session ${id}`)
    }
  }, [])

  const convene = useCallback(async () => {
    const q = question.trim()
    if (q.length < 8 || running) return
    setRunning(true)
    setRunError(null)
    try {
      const result = await api.post<CouncilSession>('/api/council/run', { question: q })
      setSession(result)
      setRound(4)
      setQuestion('')
      refreshSaved()
    } catch (err) {
      const anyErr = err as { status?: number; body?: { message?: string } }
      if (anyErr.status === 503) {
        setRunError('No reasoning provider configured — add an API key in Keys, then convene again.')
      } else {
        setRunError(anyErr.body?.message ?? 'The council failed to convene. Try again.')
      }
    } finally {
      setRunning(false)
    }
  }, [question, running, refreshSaved])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="cncl-root">
      <nav className="cncl-nav">
        <a className="cncl-brand" href="/" aria-label="A305 OS home">
          <span className="cncl-mark"><ChakanaLogo /></span>
          <span className="cncl-brandtxt">A305 os</span>
        </a>
        <div className="cncl-navright">
          <span className="cncl-date">{today}</span>
          <span className="cncl-chip orange">⚖️ Council</span>
          <span className="cncl-chip green"><span className="cncl-d" />Live</span>
        </div>
      </nav>

      <div className="cncl-tabs" role="navigation" aria-label="OS views">
        {OS_TABS.map((t) => (
          <a key={t.href} href={t.href} className={'cncl-tab' + (t.href === '/council' ? ' active' : '')} aria-current={t.href === '/council' ? 'page' : undefined}>
            <span className="cncl-tabic">{t.emoji}</span>
            {t.label}
          </a>
        ))}
      </div>

      <main className="cncl-main">
        <header className="cncl-hero">
          <p className="cncl-eyebrow">Council of high intelligence</p>
          <h1 className="cncl-wordmark">COUNCIL</h1>
          <p className="cncl-sub">
            The decide layer. Seven minds analyze blind, argue to each other's faces, and return a verdict — dissent kept, not averaged away.
          </p>
          <div className="cncl-herochips">
            <span className="cncl-chip green"><span className="cncl-d" />7 seated</span>
            <span className="cncl-chip amber"><span className="cncl-d" />verdict: split {aCount}–{bCount}</span>
            <span className="cncl-chip orange"><span className="cncl-d" />kill criteria armed</span>
          </div>
        </header>

        {/* Convene — phase-2 live surface */}
        <section className="cncl-sec">
          <p className="cncl-seclabel">🔮 Convene the council</p>
          <div className="cncl-convene">
            <textarea
              className="cncl-qinput"
              rows={3}
              value={question}
              disabled={running}
              placeholder="Pose a decision — goal, constraints, resources, deadline. The sharper the framing, the sharper the verdict."
              onChange={(e) => setQuestion(e.target.value)}
              aria-label="Question for the council"
            />
            <div className="cncl-convenerow">
              <span className="cncl-convenehint">
                {running
                  ? 'The room is deliberating — five rounds, typically 30–90s. Stay on the page.'
                  : 'Runs the full five-round protocol via your reasoning provider and saves the verdict.'}
              </span>
              <button
                type="button"
                className="cncl-convenebtn"
                disabled={running || question.trim().length < 8}
                onClick={convene}
              >
                {running ? <span className="cncl-spin" aria-hidden="true" /> : '⚖️'} {running ? 'Convening…' : 'Convene'}
              </button>
            </div>
            {runError && <div className="cncl-runerror" role="alert">{runError}</div>}
          </div>

          <div className="cncl-sessions" role="tablist" aria-label="Deliberations">
            <button
              type="button"
              role="tab"
              aria-selected={isExample}
              className={'cncl-sessionchip' + (isExample ? ' active' : '')}
              onClick={() => openSession(EXAMPLE.session_id)}
            >
              📎 Worked example
            </button>
            {saved.map((s) => (
              <button
                key={s.session_id}
                type="button"
                role="tab"
                aria-selected={session.session_id === s.session_id}
                className={'cncl-sessionchip' + (session.session_id === s.session_id ? ' active' : '')}
                onClick={() => openSession(s.session_id)}
                title={s.summary || s.question}
              >
                {truncate(s.question, 44)} <em>{s.split.a}–{s.split.b}</em>
              </button>
            ))}
          </div>
        </section>

        {/* Question under deliberation */}
        <section className="cncl-sec">
          <p className="cncl-seclabel">⚖️ Question under deliberation</p>
          <div className="cncl-qcard">
            <div className="cncl-q">
              <div className="cncl-qt">🔥 {truncate(session.question, 90)}</div>
              <div className="cncl-qs">
                {isExample
                  ? 'Bundled worked example — the Automate305 outbound sprint.'
                  : `Convened ${new Date(session.created_at).toLocaleString()}${session.context_used ? ' · Brain context included' : ''}`}
              </div>
            </div>
            <div className="cncl-qstats">
              <div className="cncl-stat"><b>{d.positions.length}</b><span>Positions</span></div>
              <div className="cncl-stat"><b>{d.tensions.length}</b><span>Tensions</span></div>
              <div className="cncl-stat"><b>{aCount}–{bCount}</b><span>Split</span></div>
            </div>
          </div>
        </section>

        {/* Protocol */}
        <section className="cncl-sec">
          <p className="cncl-seclabel">🗳️ Deliberation protocol</p>
          <div className="cncl-stepper" role="tablist" aria-label="Protocol rounds">
            {ROUND_META.map((r, i) => (
              <button key={r.n} type="button" role="tab" aria-selected={i === round} className={'cncl-step' + (i === round ? ' active' : '')} onClick={() => setRound(i)}>
                <span className="cncl-sn">{r.n}</span>
                <span className="cncl-st">{r.t}</span>
              </button>
            ))}
          </div>
          <div className="cncl-stage" role="tabpanel" key={session.session_id + round}>
            {round === 0 && (
              <div className="cncl-panel">
                <h2 className="cncl-h2">R1 · Problem restatement</h2>
                <p className="cncl-lead">Before anyone argues, the room agrees on what's actually being decided.</p>
                <div className="cncl-quote">
                  {d.restatement}
                  <cite>— agreed framing · all seven members</cite>
                </div>
                {d.leading_question && (
                  <div className="cncl-callout">
                    <span className="cncl-ck">The question the room leads with</span>
                    <p>{d.leading_question}</p>
                  </div>
                )}
              </div>
            )}
            {round === 1 && (
              <div className="cncl-panel">
                <h2 className="cncl-h2">R2 · Independent analysis</h2>
                <p className="cncl-lead">Each member analyzes <b>blind</b> — no one sees another's work first. Tap a card for the full dossier.</p>
                <div className="cncl-posgrid">
                  {d.positions.map((p) => (
                    <button
                      key={p.member}
                      type="button"
                      className="cncl-poscard"
                      onClick={() => {
                        setMemberId(p.member)
                        document.querySelector('.cncl-dossier')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }}
                    >
                      <div className="cncl-pnm">
                        {memberName(p.member)}
                        <em>{memberById(p.member)?.domain.split(' · ')[0] ?? 'seat'}</em>
                      </div>
                      <p>{p.analysis}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {round === 2 && (
              <div className="cncl-panel">
                <h2 className="cncl-h2">R3 · Cross-examination</h2>
                <p className="cncl-lead">Now they face each other. Real disagreement, forced up — and where the room lands.</p>
                {d.tensions.map((x) => (
                  <div key={x.title} className="cncl-tension">
                    <div className="cncl-th">{x.title}</div>
                    <div className="cncl-versus">
                      <div className="cncl-side a"><span className="cncl-slbl">{x.a_who}</span>{x.a_text}</div>
                      <div className="cncl-vs">vs</div>
                      <div className="cncl-side b"><span className="cncl-slbl">{x.b_who}</span>{x.b_text}</div>
                    </div>
                    <div className="cncl-resolve"><b>Resolved</b>{x.resolution}</div>
                  </div>
                ))}
              </div>
            )}
            {round === 3 && (
              <div className="cncl-panel">
                <h2 className="cncl-h2">R4 · Final stances</h2>
                <p className="cncl-lead">No forced consensus. The room splits — and the tally is kept, not averaged away.</p>
                <div className="cncl-tally">
                  <div className="cncl-tcol up">
                    <div className="cncl-tcap"><span className="cncl-tv">{d.split.a_label || 'Camp A'}</span><span className="cncl-tc">{aCount}</span></div>
                    <ul>
                      {d.stances.filter((s) => s.camp === 'a').map((s) => (
                        <li key={s.member}>{memberName(s.member)} — {s.stance}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cncl-tcol re">
                    <div className="cncl-tcap"><span className="cncl-tv">{d.split.b_label || 'Camp B'}</span><span className="cncl-tc">{bCount}</span></div>
                    <ul>
                      {d.stances.filter((s) => s.camp === 'b').map((s) => (
                        <li key={s.member}>{memberName(s.member)} — {s.stance}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {round === 4 && (
              <div className="cncl-panel">
                <h2 className="cncl-h2">R5 · Synthesis &amp; verdict</h2>
                <div className="cncl-callout">
                  <span className="cncl-ck">Recommendation — dissent preserved</span>
                  <p>{d.verdict.recommendation}</p>
                </div>
                {d.verdict.kill_criteria.length > 0 && (
                  <div className="cncl-killgrid">
                    {d.verdict.kill_criteria.map((k, i) => (
                      <div key={i} className="cncl-kill">
                        <span className="cncl-kw">{k.when || 'Kill'} · kill</span>
                        <p>{k.condition}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cncl-next">
                  <span className="cncl-nbadge">Next action</span>
                  <p>{d.verdict.next_action}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Members */}
        <section className="cncl-sec">
          <p className="cncl-seclabel">🧠 The seated · tap to open dossier</p>
          <div className="cncl-members" role="tablist" aria-label="Council members">
            {MEMBERS.map((m) => (
              <button key={m.id} type="button" role="tab" aria-selected={m.id === memberId} className={'cncl-mnode' + (m.id === memberId ? ' active' : '')} onClick={() => setMemberId(m.id)}>
                <span className="cncl-mg">{m.glyph}</span>
                <b>{m.name}</b>
              </button>
            ))}
          </div>
          <div className="cncl-consult">
            <span className="cncl-clabel">Consulting</span>
            {CONSULTING.map((m) => (
              <button key={m.id} type="button" className={'cncl-mnode small' + (m.id === memberId ? ' active' : '')} onClick={() => setMemberId(m.id)}>
                <span className="cncl-mg">{m.glyph}</span>
                <b>{m.name}</b>
              </button>
            ))}
          </div>

          <div className="cncl-dossier" key={session.session_id + member.id}>
            <div className="cncl-dh">
              <span className="cncl-dmg">{member.glyph}</span>
              <div>
                <div className="cncl-dname">{member.name}</div>
                <div className="cncl-ddom">{member.domain}</div>
              </div>
            </div>
            <div className="cncl-field"><div className="cncl-fl">Method</div><div className="cncl-fb">{member.method}</div></div>
            {livePosition && (
              <div className="cncl-field"><div className="cncl-fl">First position — blind</div><div className="cncl-fb">{livePosition.analysis}</div></div>
            )}
            {liveStance && (
              <div className="cncl-field">
                <div className="cncl-fl">Final stance · camp {liveStance.camp.toUpperCase()}</div>
                <div className="cncl-fb"><span className="cncl-stance">{liveStance.stance}</span></div>
              </div>
            )}
            {!livePosition && !liveStance && member.consulting && (
              <div className="cncl-field"><div className="cncl-fl">Role in this session</div><div className="cncl-fb">Advises the room; does not vote.</div></div>
            )}
            <div className="cncl-field blind"><div className="cncl-fl">Known blind spot</div><div className="cncl-fb">{member.blind}</div></div>
            <div className="cncl-legend">
              {['FACT', 'INFERENCE', 'ASSUMPTION', 'UNKNOWN'].map((t) => (
                <span key={t} className="cncl-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="cncl-bench">
            <span className="cncl-clabel">On the bench</span>
            <div className="cncl-benchchips">
              {BENCH.map((b) => (
                <span key={b} className="cncl-benchchip">{b}</span>
              ))}
            </div>
          </div>
        </section>

        <p className="cncl-footnote">
          <b>Council</b> is the decide layer · <b>Today · Brain · Skills</b> are the execute layers.
          <br />
          Live deliberations run through your reasoning provider and persist to ~/.gtm-os/council.
        </p>
      </main>

      <style>{CSS}</style>
    </div>
  )
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s
}

const CSS = `
.cncl-root{min-height:100vh;background:#0A0A0A;color:#F5F5F5;font-family:'Inter',sans-serif;overflow-x:hidden;position:relative}
.cncl-root::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(700px 480px at 82% -8%,rgba(255,107,53,0.10),transparent 68%)}
.cncl-root *{box-sizing:border-box}
.cncl-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:9999px;font-size:10px;font-weight:600;font-family:'JetBrains Mono',monospace;white-space:nowrap;border:1px solid rgba(245,245,245,0.14);color:rgba(245,245,245,0.55)}
.cncl-chip.orange{color:#FF6B35;background:rgba(255,107,53,0.10);border-color:rgba(255,107,53,0.25)}
.cncl-chip.green{color:#5DD296;background:rgba(93,210,150,0.10);border-color:rgba(93,210,150,0.25)}
.cncl-chip.amber{color:#E8A55A;background:rgba(232,165,90,0.10);border-color:rgba(232,165,90,0.25)}
.cncl-d{width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block}

.cncl-nav{position:sticky;top:0;z-index:100;background:rgba(10,10,10,0.80);backdrop-filter:blur(32px) saturate(180%);-webkit-backdrop-filter:blur(32px) saturate(180%);border-bottom:1px solid rgba(245,245,245,0.08);padding:0 clamp(16px,4vw,48px);height:52px;display:flex;align-items:center;justify-content:space-between}
.cncl-brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.cncl-mark{width:32px;height:32px;border-radius:9px;background:#FF6B35;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 14px rgba(255,107,53,0.4)}
.cncl-brandtxt{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:13px;color:#FF6B35;letter-spacing:.04em}
.cncl-navright{display:flex;align-items:center;gap:8px}
.cncl-date{font-size:11px;color:rgba(245,245,245,0.35);font-family:'JetBrains Mono',monospace}
@media(max-width:560px){.cncl-date{display:none}}

.cncl-tabs{position:relative;z-index:1;display:flex;gap:clamp(14px,4vw,26px);padding:12px clamp(16px,4vw,48px) 0;border-bottom:1px solid rgba(245,245,245,0.08);overflow-x:auto;scrollbar-width:none}
.cncl-tabs::-webkit-scrollbar{display:none}
.cncl-tab{display:flex;align-items:center;gap:7px;padding-bottom:12px;color:rgba(245,245,245,0.4);font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap;position:relative;font-family:'Outfit',sans-serif}
.cncl-tab:hover{color:rgba(245,245,245,0.7)}
.cncl-tabic{font-size:17px}
.cncl-tab.active{color:#FF6B35}
.cncl-tab.active::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#FF6B35;border-radius:2px}

.cncl-main{position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:0 clamp(16px,4vw,48px) 80px}
.cncl-hero{padding:44px 0 8px}
.cncl-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(245,245,245,0.35)}
.cncl-wordmark{font-family:'Outfit',sans-serif;font-weight:700;font-size:clamp(48px,13vw,92px);line-height:.92;color:#FF6B35;letter-spacing:-.02em;margin:8px 0 0}
.cncl-sub{font-size:14px;color:rgba(245,245,245,0.55);line-height:1.7;margin:16px 0 18px;max-width:56ch}
.cncl-herochips{display:flex;flex-wrap:wrap;gap:8px}

.cncl-sec{padding:26px 0 0}
.cncl-seclabel{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(245,245,245,0.35);margin:0 0 12px;display:flex;align-items:center;gap:9px}
.cncl-seclabel::after{content:"";flex:1;height:1px;background:rgba(245,245,245,0.08)}

.cncl-convene{border:1px solid rgba(255,107,53,0.28);border-radius:16px;background:rgba(245,245,245,0.04);padding:14px;backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%)}
.cncl-qinput{width:100%;resize:vertical;min-height:64px;background:rgba(10,10,10,0.6);border:1px solid rgba(245,245,245,0.12);border-radius:12px;color:#F5F5F5;font-family:'Inter',sans-serif;font-size:14px;line-height:1.5;padding:12px 14px}
.cncl-qinput:focus{outline:2px solid #FF6B35;outline-offset:1px;border-color:transparent}
.cncl-qinput::placeholder{color:rgba(245,245,245,0.30)}
.cncl-qinput:disabled{opacity:.6}
.cncl-convenerow{display:flex;align-items:center;gap:12px;margin-top:10px;flex-wrap:wrap}
.cncl-convenehint{flex:1;min-width:220px;font-size:12px;color:rgba(245,245,245,0.45);line-height:1.45}
.cncl-convenebtn{display:inline-flex;align-items:center;gap:8px;background:#FF6B35;color:#140A04;border:none;border-radius:10px;padding:10px 18px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:transform .12s,box-shadow .15s;box-shadow:0 2px 14px rgba(255,107,53,0.35)}
.cncl-convenebtn:hover:not(:disabled){transform:translateY(-1px)}
.cncl-convenebtn:disabled{opacity:.5;cursor:not-allowed}
.cncl-convenebtn:focus-visible{outline:2px solid #5DD296;outline-offset:2px}
.cncl-spin{width:13px;height:13px;border-radius:50%;border:2px solid rgba(20,10,4,0.35);border-top-color:#140A04;animation:cnclSpin .8s linear infinite}
@keyframes cnclSpin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.cncl-spin{animation:none}}
.cncl-runerror{margin-top:10px;border-left:3px solid #E86A5A;background:rgba(232,106,90,0.10);border-radius:0 10px 10px 0;padding:9px 12px;font-size:12.5px;color:#F5F5F5;line-height:1.45}

.cncl-sessions{display:flex;gap:8px;overflow-x:auto;padding:12px 0 4px;scrollbar-width:none}
.cncl-sessions::-webkit-scrollbar{display:none}
.cncl-sessionchip{flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);border-radius:9999px;padding:7px 13px;cursor:pointer;color:rgba(245,245,245,0.55);font-family:'Inter',sans-serif;font-size:12.5px;font-weight:600;transition:border-color .15s,color .15s,background .15s}
.cncl-sessionchip em{font-style:normal;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#E8A55A}
.cncl-sessionchip:hover{color:#F5F5F5;border-color:rgba(255,107,53,0.4)}
.cncl-sessionchip.active{border-color:#FF6B35;background:rgba(255,107,53,0.12);color:#F5F5F5}
.cncl-sessionchip:focus-visible{outline:2px solid #5DD296;outline-offset:2px}

.cncl-qcard{border:1px solid rgba(255,107,53,0.28);border-radius:16px;background:linear-gradient(150deg,rgba(255,107,53,0.10),rgba(255,107,53,0.02) 70%,transparent);padding:18px;display:grid;grid-template-columns:1.3fr auto;gap:18px;align-items:center}
.cncl-qt{font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;line-height:1.25}
.cncl-qs{color:rgba(245,245,245,0.55);font-size:12.5px;margin-top:6px;line-height:1.4}
.cncl-qstats{display:flex;gap:20px}
.cncl-stat b{display:block;font-family:'Outfit',sans-serif;font-size:24px;font-weight:700;color:#FF6B35;line-height:1;font-variant-numeric:tabular-nums}
.cncl-stat span{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(245,245,245,0.35)}
@media(max-width:620px){.cncl-qcard{grid-template-columns:1fr}.cncl-qstats{justify-content:space-between}}

.cncl-stepper{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.cncl-stepper::-webkit-scrollbar{display:none}
.cncl-step{flex:0 0 auto;min-width:104px;background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);border-radius:12px;padding:10px 12px;text-align:left;cursor:pointer;color:rgba(245,245,245,0.55);font-family:'Inter',sans-serif;transition:border-color .15s,background .15s,color .15s}
.cncl-step:hover{border-color:rgba(255,107,53,0.4);color:#F5F5F5}
.cncl-step.active{background:rgba(255,107,53,0.12);border-color:#FF6B35;color:#F5F5F5}
.cncl-sn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;color:#FF6B35}
.cncl-st{display:block;font-size:12.5px;font-weight:700;margin-top:3px;font-family:'Outfit',sans-serif}
.cncl-step:focus-visible{outline:2px solid #5DD296;outline-offset:2px}

.cncl-stage{margin-top:14px}
.cncl-panel{animation:cnclFade .26s ease}
@keyframes cnclFade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.cncl-panel,.cncl-dossier{animation:none}}
.cncl-h2{font-family:'Outfit',sans-serif;font-size:21px;font-weight:700;margin:0 0 5px;letter-spacing:-.01em}
.cncl-lead{color:rgba(245,245,245,0.55);font-size:13.5px;line-height:1.6;margin:0 0 15px}
.cncl-lead b{color:#F5F5F5}

.cncl-quote{border-left:3px solid #FF6B35;background:rgba(245,245,245,0.05);border-radius:0 12px 12px 0;padding:13px 15px;margin:0 0 13px;font-size:15px;line-height:1.5}
.cncl-quote cite{display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(245,245,245,0.35);font-style:normal;letter-spacing:.05em;margin-top:9px}
.cncl-callout{border:1px solid rgba(255,107,53,0.28);border-radius:14px;padding:14px 16px;background:rgba(255,107,53,0.08);margin-bottom:12px}
.cncl-ck{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#FF6B35}
.cncl-callout p{margin:7px 0 0;font-size:15px;line-height:1.5}

.cncl-posgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:620px){.cncl-posgrid{grid-template-columns:1fr}}
.cncl-poscard{text-align:left;background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);border-radius:13px;padding:13px;cursor:pointer;color:#F5F5F5;font-family:'Inter',sans-serif;transition:border-color .15s,transform .12s}
.cncl-poscard:hover{border-color:rgba(255,107,53,0.4);transform:translateY(-1px)}
.cncl-pnm{font-family:'Outfit',sans-serif;font-size:14.5px;font-weight:700;display:flex;align-items:center;gap:8px}
.cncl-pnm em{font-family:'JetBrains Mono',monospace;font-style:normal;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#FF6B35;margin-left:auto}
.cncl-poscard p{margin:8px 0 0;font-size:12.5px;color:rgba(245,245,245,0.55);line-height:1.45}

.cncl-tension{border:1px solid rgba(245,245,245,0.10);border-radius:14px;background:rgba(245,245,245,0.05);padding:14px 15px;margin-bottom:11px}
.cncl-th{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:11px}
.cncl-versus{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:stretch}
@media(max-width:560px){.cncl-versus{grid-template-columns:1fr}.cncl-vs{display:none}}
.cncl-side{border-radius:10px;padding:10px 12px;font-size:12.5px;line-height:1.4;border:1px solid rgba(245,245,245,0.10)}
.cncl-side.a{background:rgba(93,210,150,0.08);border-color:rgba(93,210,150,0.22)}
.cncl-side.b{background:rgba(183,155,255,0.10);border-color:rgba(183,155,255,0.28)}
.cncl-slbl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:rgba(245,245,245,0.35);display:block;margin-bottom:5px}
.cncl-vs{display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(245,245,245,0.35)}
.cncl-resolve{margin-top:11px;font-size:12.5px;line-height:1.45;color:#F5F5F5}
.cncl-resolve b{color:#FF6B35;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;margin-right:7px}

.cncl-tally{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:14px}
@media(max-width:560px){.cncl-tally{grid-template-columns:1fr}}
.cncl-tcol{border:1px solid rgba(245,245,245,0.10);border-radius:14px;padding:14px;background:rgba(245,245,245,0.05)}
.cncl-tcap{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;gap:10px}
.cncl-tv{font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;line-height:1.15}
.cncl-tc{font-family:'Outfit',sans-serif;font-size:26px;font-weight:700}
.cncl-tcol.up .cncl-tc{color:#5DD296}.cncl-tcol.re .cncl-tc{color:#E8A55A}
.cncl-tcol ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.cncl-tcol li{font-size:12px;color:rgba(245,245,245,0.55);display:flex;gap:7px}
.cncl-tcol li::before{content:"▹";color:rgba(245,245,245,0.35)}

.cncl-killgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:13px}
@media(max-width:620px){.cncl-killgrid{grid-template-columns:1fr}}
.cncl-kill{border:1px solid rgba(245,245,245,0.10);border-left:3px solid #E86A5A;border-radius:12px;padding:11px 13px;background:rgba(245,245,245,0.05)}
.cncl-kw{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.06em;color:#E86A5A;text-transform:uppercase}
.cncl-kill p{margin:6px 0 0;font-size:12px;color:rgba(245,245,245,0.55);line-height:1.42}
.cncl-kill p b{color:#F5F5F5}
.cncl-next{display:flex;gap:12px;align-items:flex-start;border:1px solid rgba(93,210,150,0.3);border-radius:13px;padding:14px 15px;background:rgba(93,210,150,0.08)}
.cncl-nbadge{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#5DD296;border:1px solid rgba(93,210,150,0.35);border-radius:7px;padding:5px 8px;flex:none}
.cncl-next p{margin:0;font-size:14px;line-height:1.45}
.cncl-next p b{color:#5DD296}

.cncl-members{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}
.cncl-members::-webkit-scrollbar{display:none}
.cncl-mnode{flex:0 0 auto;display:flex;align-items:center;gap:9px;background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);border-radius:12px;padding:8px 12px 8px 8px;cursor:pointer;color:rgba(245,245,245,0.55);font-family:'Outfit',sans-serif;font-size:13.5px;font-weight:600;transition:border-color .15s,color .15s,background .15s}
.cncl-mnode:hover{color:#F5F5F5;border-color:rgba(255,107,53,0.4)}
.cncl-mnode.active{border-color:#FF6B35;background:rgba(255,107,53,0.12);color:#F5F5F5}
.cncl-mnode.small{font-size:12.5px}
.cncl-mg{width:30px;height:30px;border-radius:9px;flex:none;display:grid;place-items:center;font-weight:800;font-size:14px;background:rgba(245,245,245,0.08);color:#FF6B35;border:1px solid rgba(245,245,245,0.10)}
.cncl-mnode.active .cncl-mg{background:#FF6B35;color:#1a0e06;border-color:#FF6B35}
.cncl-mnode:focus-visible{outline:2px solid #5DD296;outline-offset:2px}
.cncl-consult{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.cncl-clabel{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(245,245,245,0.35)}

.cncl-dossier{margin-top:14px;background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);border-radius:16px;padding:18px;backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%);animation:cnclFade .24s ease}
.cncl-dh{display:flex;align-items:center;gap:12px;margin-bottom:4px}
.cncl-dmg{width:42px;height:42px;border-radius:12px;flex:none;display:grid;place-items:center;font-weight:800;font-size:19px;background:linear-gradient(150deg,#FF6B35,#d9481a);color:#1a0e06}
.cncl-dname{font-family:'Outfit',sans-serif;font-size:21px;font-weight:700;letter-spacing:-.01em}
.cncl-ddom{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:#FF6B35}
.cncl-field{margin-top:14px}
.cncl-fl{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,245,245,0.35);margin-bottom:5px}
.cncl-fb{font-size:13.5px;line-height:1.5;color:#F5F5F5}
.cncl-field.blind .cncl-fb{color:rgba(245,245,245,0.55);font-style:italic}
.cncl-stance{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11.5px;padding:6px 10px;border-radius:8px;border:1px solid rgba(255,107,53,0.4);color:#FF6B35;background:rgba(255,107,53,0.10);line-height:1.35}
.cncl-legend{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(245,245,245,0.10)}
.cncl-tag{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.05em;padding:3px 7px;border-radius:6px;border:1px solid rgba(245,245,245,0.12);color:rgba(245,245,245,0.35)}

.cncl-bench{margin-top:16px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.cncl-benchchips{display:flex;flex-wrap:wrap;gap:6px}
.cncl-benchchip{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(245,245,245,0.4);border:1px solid rgba(245,245,245,0.10);border-radius:20px;padding:3px 9px}

.cncl-footnote{text-align:center;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(245,245,245,0.3);line-height:1.7;margin-top:26px;letter-spacing:.03em}
.cncl-footnote b{color:rgba(245,245,245,0.5)}
`
