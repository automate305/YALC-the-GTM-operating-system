/**
 * /council — the Council of High Intelligence.
 *
 * A self-contained "decide layer" for INTI: seven analytical personas
 * deliberate a single consequential GTM decision across a fixed five-round
 * protocol, and return a verdict that preserves dissent, kill criteria, and
 * the next concrete action.
 *
 * This surface is intentionally static — it reads no CRM data and calls no
 * API. It renders one worked deliberation (the Automate305 outbound sprint).
 * Wiring it to live input (pose a new question, persist verdicts, pull
 * RevOps context) is a deliberate phase-2 follow-up on top of this shell.
 *
 * Styled inline to match Landing.tsx — the app's dark showcase surface
 * (#0A0A0A + #FF6B35, Outfit / Inter / JetBrains Mono) — rather than the
 * light Tailwind brand theme used by the data pages.
 */

import { useState } from 'react'

const ChakanaLogo = () => (
  <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      fill="#FF6B35"
      d="M6 0h6v4h4v6h-4v2h2v2h-2v4H6v-4H4v-2H2v-2H0V4h6V0zM6 4H4v2H2v2h2v2h2v2h2v2h2v-2h2v-2h2V8h-2V6h-2V4H6z"
    />
    <circle cx="9" cy="9" r="2.2" fill="#0A0A0A" />
  </svg>
)

interface Member {
  id: string
  glyph: string
  name: string
  domain: string
  method: string
  first: string
  stance: string
  blind: string
  consulting?: boolean
}

const MEMBERS: Member[] = [
  {
    id: 'suntzu',
    glyph: '孫',
    name: 'Sun Tzu',
    domain: 'Strategy · Terrain',
    method: 'Win before fighting; concentrate force on decisive ground.',
    first:
      "Don't spray the list. Pick one vertical + one pain where AI automation is obviously, painfully repeatable. A niche call converts 3–5× a generic one.",
    stance: 'Achievable — but only from a chosen beachhead, never the whole list.',
    blind: 'Can over-plan; may delay the first dial hunting for perfect terrain.',
  },
  {
    id: 'mach',
    glyph: 'M',
    name: 'Machiavelli',
    domain: 'Power · Persuasion',
    method: 'Read incentives; manufacture authority and urgency.',
    first:
      'No warm intros exist, so engineer them. Volume — of the RIGHT opener. Lead with a pattern-interrupt and ask for a small commitment, never a demo.',
    stance: 'Achievable in 14 days IF deals are small enough for a fast yes.',
    blind: 'Optimizes the close over the relationship; can erode trust that compounds.',
  },
  {
    id: 'munger',
    glyph: 'C',
    name: 'Charlie Munger',
    domain: 'Inversion · Judgment',
    method: 'Invert, always invert. Avoid stupidity before seeking brilliance.',
    first:
      "Ask how to GUARANTEE zero: dial inconsistently, wrong title, pitch don't diagnose, forget to log, chase tire-kickers, burn out. Then make each impossible.",
    stance: "Realistic outcome is 2–4 closed + pipeline; don't confuse effort with a signed check.",
    blind: 'Caution can suppress the aggression a $0-budget sprint actually needs.',
  },
  {
    id: 'taleb',
    glyph: 'N',
    name: 'Nassim Taleb',
    domain: 'Risk · Asymmetry',
    method: 'Seek convexity; survive first, optimize the average never.',
    first:
      "Each call: bounded 2-minute downside, unbounded upside. That's convex — maximize at-bats. But burnout is ruin. Cap intensity to what repeats 10 days straight.",
    stance: "'5-in-14' is a fragile point estimate; protect against the day you'd quit.",
    blind: "Tail-risk focus can freeze action that's genuinely safe to take.",
  },
  {
    id: 'meadows',
    glyph: 'D',
    name: 'Donella Meadows',
    domain: 'Systems · Leverage',
    method: 'Find the leverage point; watch the feedback loop, not the parts.',
    first:
      "Leverage isn't more dials — it's the loop between conversation quality and your script. Track one leading metric, review daily, change the talk track when data says.",
    stance: "The sprint compounds only if the feedback loop is instrumented — otherwise it's noise.",
    blind: 'Systems abstraction can postpone the concrete act of dialing.',
  },
  {
    id: 'karpathy',
    glyph: 'A',
    name: 'Andrej Karpathy',
    domain: 'Execution · Instrumentation',
    method: 'Define the loss, find the bottleneck, iterate on that stage.',
    first:
      'Treat it like training: loss = booked revenue. Each day find the choke stage — connect? convo→meeting? proposal→close? — and pour effort there. Automate the boring parts.',
    stance: 'Achievable if you fix the bottleneck stage daily instead of just adding volume.',
    blind: 'Can over-build tooling instead of picking up the phone.',
  },
  {
    id: 'marcus',
    glyph: '✦',
    name: 'Marcus Aurelius',
    domain: 'Discipline · Temperament',
    method: 'Control what is yours; the rest is indifferent.',
    first:
      'You own the dials, not the yeses. Set an input target, hit it regardless of mood, let closings be a lagging consequence. Two protected blocks. Rest is in the plan.',
    stance: 'Judge the sprint on inputs held with discipline, not the 5th check by an arbitrary date.',
    blind: 'Stoic detachment can dull the urgency the deadline demands.',
  },
]

const CONSULTING: Member[] = [
  {
    id: 'rams',
    glyph: 'R',
    name: 'Dieter Rams',
    domain: 'Design · Less, but better',
    method: 'Good design is as little design as possible.',
    first:
      "Consulted on the RevOps dashboard: six today-tiles, four goal-bars, three ratios, one chart, one streak. If a widget doesn't change what you do next, remove it.",
    stance: 'Advisory — the dashboard, not the go/no-go.',
    blind: 'Reduction can strip a signal that mattered only occasionally.',
    consulting: true,
  },
]

const ALL = [...MEMBERS, ...CONSULTING]

const BENCH = [
  'Aristotle',
  'Socrates',
  'Ada Lovelace',
  'Lao Tzu',
  'Richard Feynman',
  'Linus Torvalds',
  'Miyamoto Musashi',
  'Alan Watts',
  'Ilya Sutskever',
  'Daniel Kahneman',
]

interface Tension {
  title: string
  a: { who: string; text: string }
  b: { who: string; text: string }
  resolve: string
}

const TENSIONS: Tension[] = [
  {
    title: 'Volume vs. Targeting',
    a: { who: 'Machiavelli', text: '“Niche-picking is procrastination. Dial 60 today.”' },
    b: { who: 'Sun Tzu / Karpathy', text: '“Dialing the wrong 60 teaches nothing and demoralizes you.”' },
    resolve:
      'Big list, no proven niche — so days 3–4 are a live A/B. Dial two segments hard; let the data pick the beachhead.',
  },
  {
    title: 'Speed vs. Burnout',
    a: { who: 'The “5 ASAP” pressure', text: '“Go maximal — a 6-hour marathon on day 1.”' },
    b: { who: 'Taleb / Marcus', text: '“That guarantees you quit by day 6. Quitting is ruin.”' },
    resolve:
      'Cap at ~3 hrs live talk-time/day in two blocks — repeatable 10 days beats two heroic days then collapse.',
  },
  {
    title: 'Track everything vs. almost nothing',
    a: { who: 'Karpathy', text: '“Instrument every stage richly.”' },
    b: { who: 'Rams / Meadows', text: '“A board of 20 numbers has no leverage. Subtract.”' },
    resolve:
      "Capture wide, show narrow. Auto-log dispositions; display only the handful that change today's decision.",
  },
]

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
  const member = ALL.find((m) => m.id === memberId) ?? MEMBERS[0]
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="cncl-root">
      <nav className="cncl-nav">
        <a className="cncl-brand" href="/" aria-label="A305 OS home">
          <span className="cncl-mark">
            <ChakanaLogo />
          </span>
          <span className="cncl-brandtxt">A305 os</span>
        </a>
        <div className="cncl-navright">
          <span className="cncl-date">{today}</span>
          <span className="cncl-chip orange">⚖️ Council</span>
          <span className="cncl-chip green">
            <span className="cncl-d" />
            Live
          </span>
        </div>
      </nav>

      <div className="cncl-tabs" role="navigation" aria-label="OS views">
        {OS_TABS.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className={'cncl-tab' + (t.href === '/council' ? ' active' : '')}
            aria-current={t.href === '/council' ? 'page' : undefined}
          >
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
            The decide layer. Seven minds analyze blind, argue to each other's faces, and return a verdict —
            dissent kept, not averaged away.
          </p>
          <div className="cncl-herochips">
            <span className="cncl-chip green">
              <span className="cncl-d" />7 seated
            </span>
            <span className="cncl-chip amber">
              <span className="cncl-d" />
              verdict: split 3–4
            </span>
            <span className="cncl-chip orange">
              <span className="cncl-d" />
              kill criteria armed
            </span>
          </div>
        </header>

        <section className="cncl-sec">
          <p className="cncl-seclabel">⚖️ Question under deliberation</p>
          <div className="cncl-qcard">
            <div className="cncl-q">
              <div className="cncl-qt">🔥 5 paying clients — 14 days</div>
              <div className="cncl-qs">
                Solo founder · pure outbound · Connect &amp; Sell + HubSpot · $0 ad spend · INTI OS
              </div>
            </div>
            <div className="cncl-qstats">
              <div className="cncl-stat">
                <b>$0</b>
                <span>Ad spend</span>
              </div>
              <div className="cncl-stat">
                <b>7/18</b>
                <span>Seated</span>
              </div>
              <div className="cncl-stat">
                <b>3–4</b>
                <span>Split</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cncl-sec">
          <div className="cncl-tiles">
            <div className="cncl-tile">
              <div className="cncl-n">7</div>
              <div className="cncl-k">Seated</div>
              <div className="cncl-tsub purple">of 18 members</div>
            </div>
            <div className="cncl-tile">
              <div className="cncl-n">5</div>
              <div className="cncl-k">Rounds</div>
              <div className="cncl-tsub green">full deliberation</div>
            </div>
            <div className="cncl-tile">
              <div className="cncl-n">3</div>
              <div className="cncl-k">Tensions</div>
              <div className="cncl-tsub amber">all resolved</div>
            </div>
            <div className="cncl-tile">
              <div className="cncl-n">3–4</div>
              <div className="cncl-k">Verdict split</div>
              <div className="cncl-tsub green">dissent kept</div>
            </div>
          </div>
        </section>

        <section className="cncl-sec">
          <p className="cncl-seclabel">🗳️ Deliberation protocol</p>
          <div className="cncl-stepper" role="tablist" aria-label="Protocol rounds">
            {ROUND_META.map((r, i) => (
              <button
                key={r.n}
                type="button"
                role="tab"
                aria-selected={i === round}
                className={'cncl-step' + (i === round ? ' active' : '')}
                onClick={() => setRound(i)}
              >
                <span className="cncl-sn">{r.n}</span>
                <span className="cncl-st">{r.t}</span>
              </button>
            ))}
          </div>
          <div className="cncl-stage" role="tabpanel">
            {round === 0 && <RoundRestate />}
            {round === 1 && <RoundIndependent onPick={setMemberId} />}
            {round === 2 && <RoundCross />}
            {round === 3 && <RoundFinal />}
            {round === 4 && <RoundSynthesis />}
          </div>
        </section>

        <section className="cncl-sec">
          <p className="cncl-seclabel">🧠 The seated · tap to open dossier</p>
          <div className="cncl-members" role="tablist" aria-label="Council members">
            {MEMBERS.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={m.id === memberId}
                className={'cncl-mnode' + (m.id === memberId ? ' active' : '')}
                onClick={() => setMemberId(m.id)}
              >
                <span className="cncl-mg">{m.glyph}</span>
                {m.name}
              </button>
            ))}
          </div>
          <div className="cncl-consult">
            <span className="cncl-clabel">Consulting</span>
            {CONSULTING.map((m) => (
              <button
                key={m.id}
                type="button"
                className={'cncl-mnode small' + (m.id === memberId ? ' active' : '')}
                onClick={() => setMemberId(m.id)}
              >
                <span className="cncl-mg">{m.glyph}</span>
                {m.name}
              </button>
            ))}
          </div>

          <div className="cncl-dossier" key={member.id}>
            <div className="cncl-dh">
              <span className="cncl-dmg">{member.glyph}</span>
              <div>
                <div className="cncl-dname">{member.name}</div>
                <div className="cncl-ddom">{member.domain}</div>
              </div>
            </div>
            <Field label="Method">{member.method}</Field>
            <Field label="First position — blind">{member.first}</Field>
            <div className="cncl-field">
              <div className="cncl-fl">Final stance</div>
              <div className="cncl-fb">
                <span className="cncl-stance">{member.stance}</span>
              </div>
            </div>
            <Field label="Known blind spot" italic>
              {member.blind}
            </Field>
            <div className="cncl-legend">
              {['FACT', 'INFERENCE', 'ASSUMPTION', 'UNKNOWN'].map((t) => (
                <span key={t} className="cncl-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="cncl-bench">
            <span className="cncl-clabel">On the bench</span>
            <div className="cncl-benchchips">
              {BENCH.map((b) => (
                <span key={b} className="cncl-benchchip">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        <p className="cncl-footnote">
          <b>Council</b> is the decide layer · <b>Today · Brain · Skills</b> are the execute layers.
          <br />
          Static surface — no CRM data is read here. Live input is a phase-2 follow-up.
        </p>
      </main>

      <style>{CSS}</style>
    </div>
  )
}

function Field({ label, italic, children }: { label: string; italic?: boolean; children: React.ReactNode }) {
  return (
    <div className={'cncl-field' + (italic ? ' italic' : '')}>
      <div className="cncl-fl">{label}</div>
      <div className="cncl-fb">{children}</div>
    </div>
  )
}

function RoundRestate() {
  return (
    <div className="cncl-panel">
      <h2 className="cncl-h2">R1 · Problem restatement</h2>
      <p className="cncl-lead">Before anyone argues, the room agrees on what's actually being decided.</p>
      <div className="cncl-quote">
        Solo founder, $0 ad spend, one phone, Connect &amp; Sell, HubSpot, a big cold list, INTI OS. Land{' '}
        <b>5 paying AI-automation clients ASAP</b> via outbound — tracked daily, without burning out.
        <cite>— agreed framing · all seven members</cite>
      </div>
      <div className="cncl-callout">
        <span className="cncl-ck">The question the room leads with</span>
        <p>
          Is “5 clients in 14 days, pure cold, solo” a <em>target</em> — or a <em>fantasy</em>? It stays open
          until synthesis.
        </p>
      </div>
    </div>
  )
}

function RoundIndependent({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="cncl-panel">
      <h2 className="cncl-h2">R2 · Independent analysis</h2>
      <p className="cncl-lead">
        Each member analyzes <b>blind</b> — no one sees another's work first. Tap a card for the full dossier.
      </p>
      <div className="cncl-posgrid">
        {MEMBERS.map((m) => (
          <button
            key={m.id}
            type="button"
            className="cncl-poscard"
            onClick={() => {
              onPick(m.id)
              document.querySelector('.cncl-dossier')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            <div className="cncl-pnm">
              {m.name}
              <em>{m.domain.split(' · ')[0]}</em>
            </div>
            <p>{m.first}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function RoundCross() {
  return (
    <div className="cncl-panel">
      <h2 className="cncl-h2">R3 · Cross-examination</h2>
      <p className="cncl-lead">
        Now they face each other. Real disagreement, forced up — and where the room lands.
      </p>
      {TENSIONS.map((x) => (
        <div key={x.title} className="cncl-tension">
          <div className="cncl-th">{x.title}</div>
          <div className="cncl-versus">
            <div className="cncl-side a">
              <span className="cncl-slbl">{x.a.who}</span>
              {x.a.text}
            </div>
            <div className="cncl-vs">vs</div>
            <div className="cncl-side b">
              <span className="cncl-slbl">{x.b.who}</span>
              {x.b.text}
            </div>
          </div>
          <div className="cncl-resolve">
            <b>Resolved</b>
            {x.resolve}
          </div>
        </div>
      ))}
    </div>
  )
}

function RoundFinal() {
  return (
    <div className="cncl-panel">
      <h2 className="cncl-h2">R4 · Final stances</h2>
      <p className="cncl-lead">
        No forced consensus. The room splits — and the tally is kept, not averaged away.
      </p>
      <div className="cncl-tally">
        <div className="cncl-tcol up">
          <div className="cncl-tcap">
            <span className="cncl-tv">Achievable inside 14 days</span>
            <span className="cncl-tc">3</span>
          </div>
          <ul>
            <li>Machiavelli — if deals are small enough for a fast yes</li>
            <li>Karpathy — if the bottleneck stage is fixed daily</li>
            <li>Sun Tzu — if fired from a single beachhead</li>
          </ul>
        </div>
        <div className="cncl-tcol re">
          <div className="cncl-tcap">
            <span className="cncl-tv">2–4 closed + full pipeline</span>
            <span className="cncl-tc">4</span>
          </div>
          <ul>
            <li>Munger — effort isn't a signed check</li>
            <li>Taleb — the point estimate is fragile</li>
            <li>Meadows — only if the loop is instrumented</li>
            <li>Marcus — judge on inputs, not the deadline</li>
          </ul>
        </div>
      </div>
      <p className="cncl-lead" style={{ margin: 0 }}>
        <b>Honest number:</b> plan &amp; act for 5; forecast 2–4 closed by day 14 with pipeline behind them, 5th
        landing ~day 21–30. <span className="cncl-faint">[INFERENCE]</span>
      </p>
    </div>
  )
}

function RoundSynthesis() {
  return (
    <div className="cncl-panel">
      <h2 className="cncl-h2">R5 · Synthesis &amp; verdict</h2>
      <div className="cncl-callout">
        <span className="cncl-ck">Recommendation — dissent preserved</span>
        <p>
          Plan and <em>act</em> for 5. <em>Forecast</em> 2–4 closed by day 14 with pipeline behind them. Judge
          the sprint on <b className="cncl-orange">leading inputs you control</b> — dial-time and quality
          conversations — not the 5th check by an arbitrary date.
        </p>
      </div>
      <div className="cncl-killgrid">
        <div className="cncl-kill">
          <span className="cncl-kw">Day 5 · kill</span>
          <p>
            Quality-convo rate &lt;8% in <b>both</b> niches → the list or offer is wrong, not your effort. Stop
            &amp; fix.
          </p>
        </div>
        <div className="cncl-kill">
          <span className="cncl-kw">Day 8 · kill</span>
          <p>
            0 proposals out → choke is convo→meeting. Rework the <b>ask</b>, don't add volume.
          </p>
        </div>
        <div className="cncl-kill">
          <span className="cncl-kw">Any day · kill</span>
          <p>Skipped a block from dread 2× → cut to one block. Protect the streak over the peak.</p>
        </div>
      </div>
      <div className="cncl-next">
        <span className="cncl-nbadge">Next · 9:00am</span>
        <p>
          Build the <b>6-stage HubSpot pipeline + call dispositions</b>, segment the list into{' '}
          <b>two Active Lists</b>. Everything stacks on that one move.
        </p>
      </div>
    </div>
  )
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

.cncl-glass{background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%)}
.cncl-qcard{border:1px solid rgba(255,107,53,0.28);border-radius:16px;background:linear-gradient(150deg,rgba(255,107,53,0.10),rgba(255,107,53,0.02) 70%,transparent);padding:18px;display:grid;grid-template-columns:1.3fr auto;gap:18px;align-items:center}
.cncl-qt{font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;line-height:1.15}
.cncl-qs{color:rgba(245,245,245,0.55);font-size:12.5px;margin-top:6px;line-height:1.4}
.cncl-qstats{display:flex;gap:20px}
.cncl-stat b{display:block;font-family:'Outfit',sans-serif;font-size:24px;font-weight:700;color:#FF6B35;line-height:1;font-variant-numeric:tabular-nums}
.cncl-stat span{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(245,245,245,0.35)}
@media(max-width:620px){.cncl-qcard{grid-template-columns:1fr}.cncl-qstats{justify-content:space-between}}

.cncl-tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media(max-width:620px){.cncl-tiles{grid-template-columns:repeat(2,1fr)}}
.cncl-tile{background:rgba(245,245,245,0.06);border:1px solid rgba(245,245,245,0.10);border-radius:14px;padding:14px 15px;backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%)}
.cncl-n{font-family:'Outfit',sans-serif;font-size:30px;font-weight:700;letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
.cncl-k{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(245,245,245,0.35);margin-top:7px}
.cncl-tsub{font-size:11.5px;margin-top:8px}
.cncl-tsub.green{color:#5DD296}.cncl-tsub.amber{color:#E8A55A}.cncl-tsub.purple{color:#B79BFF}

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
.cncl-faint{color:rgba(245,245,245,0.35);font-family:'JetBrains Mono',monospace;font-size:11px}
.cncl-orange{color:#FF6B35}

.cncl-quote{border-left:3px solid #FF6B35;background:rgba(245,245,245,0.05);border-radius:0 12px 12px 0;padding:13px 15px;margin:0 0 13px;font-size:15px;line-height:1.5}
.cncl-quote cite{display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(245,245,245,0.35);font-style:normal;letter-spacing:.05em;margin-top:9px}
.cncl-callout{border:1px solid rgba(255,107,53,0.28);border-radius:14px;padding:14px 16px;background:rgba(255,107,53,0.08);margin-bottom:12px}
.cncl-ck{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#FF6B35}
.cncl-callout p{margin:7px 0 0;font-size:15px;line-height:1.45}

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
.cncl-field.italic .cncl-fb{color:rgba(245,245,245,0.55);font-style:italic}
.cncl-stance{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11.5px;padding:6px 10px;border-radius:8px;border:1px solid rgba(255,107,53,0.4);color:#FF6B35;background:rgba(255,107,53,0.10);line-height:1.35}
.cncl-legend{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(245,245,245,0.10)}
.cncl-tag{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.05em;padding:3px 7px;border-radius:6px;border:1px solid rgba(245,245,245,0.12);color:rgba(245,245,245,0.35)}

.cncl-bench{margin-top:16px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.cncl-benchchips{display:flex;flex-wrap:wrap;gap:6px}
.cncl-benchchip{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(245,245,245,0.4);border:1px solid rgba(245,245,245,0.10);border-radius:20px;padding:3px 9px}

.cncl-footnote{text-align:center;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(245,245,245,0.3);line-height:1.7;margin-top:26px;letter-spacing:.03em}
.cncl-footnote b{color:rgba(245,245,245,0.5)}
`
