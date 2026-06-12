'use client'

import { useState } from 'react'

const TOOLTIPS: Record<string, string> = {
  lead: 'Web form, missed call, DM, or SMS triggers the flow',
  agent: 'Reads every inbound message and routes it instantly',
  email: 'Immediate email notification to the business owner',
  sms: 'Urgent SMS — some things need 30-second awareness',
  qualify: 'AI asks 2–3 questions to gauge fit and urgency',
  check: 'Pulls real-time availability from your calendar',
  book: 'Sends booking link or auto-confirms the slot',
  confirmed: 'Calendar invite lands — lead is now an appointment',
}

// Dot animation helpers: each dot travels its path segment in a 5s cycle.
// keyPoints/keyTimes control when within the 5s the dot is in motion.
// Opacity shows the dot only while it's actively moving.
type DotDef = {
  id: string
  path: string
  startPct: number // 0-1 fraction of 5s when dot starts moving
  endPct: number   // 0-1 fraction of 5s when dot finishes
  urgent?: boolean
}

const DOTS: DotDef[] = [
  { id: 'd1', path: 'M 140,147 L 185,147', startPct: 0, endPct: 0.10 },
  { id: 'd2', path: 'M 335,135 C 368,135 368,67 398,67', startPct: 0.10, endPct: 0.20 },
  { id: 'd3', path: 'M 335,160 C 368,160 368,242 398,242', startPct: 0.10, endPct: 0.20 },
  { id: 'd4', path: 'M 503,67 L 538,67', startPct: 0.20, endPct: 0.28 },
  { id: 'd5', path: 'M 503,242 L 538,242', startPct: 0.20, endPct: 0.28, urgent: true },
  { id: 'd6', path: 'M 653,67 C 683,67 683,140 710,140', startPct: 0.28, endPct: 0.38 },
  { id: 'd7', path: 'M 653,242 C 683,242 683,155 710,155', startPct: 0.28, endPct: 0.38 },
  { id: 'd8', path: 'M 830,147 L 865,147', startPct: 0.38, endPct: 0.48 },
]

// Node highlight timings: each node activates at a certain time
// Node is "active" from its activation time until 90% of the 5s cycle
type NodeTimings = { [key: string]: number } // node id → activation pct
const NODE_ACTIVATION: NodeTimings = {
  lead: 0,
  agent: 0.10,
  email: 0.20,
  sms: 0.28,
  qualify: 0.20,
  check: 0.28,
  book: 0.38,
  confirmed: 0.48,
}

function fmt(n: number) { return n.toFixed(4) }

function DotAnimation({ dot }: { dot: DotDef }) {
  const { id, path, startPct, endPct, urgent } = dot
  const dur = 5
  const fill = urgent ? '#FF6B35' : '#A5D6A7'

  // keyPoints: 0 before start, travels 0→1 between start and end, stays at 1 after
  const kp = startPct === 0
    ? `0;1;1`
    : `0;0;1;1`
  const kt = startPct === 0
    ? `0;${fmt(endPct)};1`
    : `0;${fmt(startPct)};${fmt(endPct)};1`

  // Opacity: visible only during [startPct, endPct]
  const eps = 0.002
  const opacityValues = startPct === 0
    ? `1;1;0;0`
    : `0;0;1;1;0;0`
  const opacityTimes = startPct === 0
    ? `0;${fmt(endPct)};${fmt(endPct + eps)};1`
    : `0;${fmt(startPct - eps)};${fmt(startPct)};${fmt(endPct)};${fmt(endPct + eps)};1`

  return (
    <circle r="5" fill={fill} opacity="0">
      <animateMotion
        path={path}
        dur={`${dur}s`}
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints={kp}
        keyTimes={kt}
      />
      <animate
        attributeName="opacity"
        dur={`${dur}s`}
        repeatCount="indefinite"
        calcMode="discrete"
        values={opacityValues}
        keyTimes={opacityTimes}
      />
    </circle>
  )
}

function NodeGlow({ id, x, y, w, h, isUrgent, isAgent }: {
  id: string; x: number; y: number; w: number; h: number; isUrgent?: boolean; isAgent?: boolean
}) {
  const activePct = NODE_ACTIVATION[id]
  const resetPct = 0.90
  const eps = 0.002
  const dur = '5s'

  const inactiveFill = '#0D1A0F'
  const activeFill = isUrgent ? '#2D1500' : '#1A3D1F'
  const inactiveStroke = '#1E3D22'
  const activeStroke = isUrgent ? '#FF6B35' : (isAgent ? '#A5D6A7' : '#2E7D32')

  // fill animation
  const fillValues = activePct === 0
    ? `${activeFill};${activeFill};${inactiveFill};${inactiveFill}`
    : `${inactiveFill};${inactiveFill};${activeFill};${activeFill};${inactiveFill};${inactiveFill}`
  const fillTimes = activePct === 0
    ? `0;${fmt(resetPct)};${fmt(resetPct + eps)};1`
    : `0;${fmt(activePct - eps)};${fmt(activePct)};${fmt(resetPct)};${fmt(resetPct + eps)};1`

  const strokeValues = activePct === 0
    ? `${activeStroke};${activeStroke};${inactiveStroke};${inactiveStroke}`
    : `${inactiveStroke};${inactiveStroke};${activeStroke};${activeStroke};${inactiveStroke};${inactiveStroke}`

  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={8} stroke={inactiveStroke} strokeWidth={isAgent ? 2 : 1.5}>
        <animate attributeName="fill" dur={dur} repeatCount="indefinite" calcMode="discrete"
          values={fillValues} keyTimes={fillTimes} />
        <animate attributeName="stroke" dur={dur} repeatCount="indefinite" calcMode="discrete"
          values={strokeValues} keyTimes={fillTimes} />
      </rect>
    </>
  )
}

export default function OrchestrationFlow() {
  const [hovered, setHovered] = useState<string | null>(null)

  // Desktop layout: viewBox 960x310
  // Node: [id, x, y, w, h, icon, label, isAgent?, isUrgent?]
  type NodeDef = [string, number, number, number, number, string, string, boolean?, boolean?]
  const nodes: NodeDef[] = [
    ['lead',      15,  115, 140, 65, '⬇',  'NEW LEAD'],
    ['agent',    200,  105, 150, 90, '⚡', 'A305 AI AGENT', true],
    ['email',    398,   38, 125, 58, '✉',  'EMAIL ALERT'],
    ['sms',      543,   38, 115, 58, '💬', 'SMS ALERT', false, true],
    ['qualify',  398,  213, 125, 58, '🔍', 'QUALIFY LEAD'],
    ['check',    543,  213, 130, 58, '📅', 'CHECK CALENDAR'],
    ['book',     710,  112, 135, 68, '📋', 'BOOK APPT'],
    ['confirmed',865,  115, 95,  65, '✓',  'CONFIRMED'],
  ]

  // Path definitions for the connecting lines
  const linePaths = [
    { d: 'M 155,147 L 185,147', active: false },      // lead → agent
    { d: 'M 350,135 C 378,135 378,67 398,67', active: false }, // agent → email
    { d: 'M 350,160 C 378,160 378,242 398,242', active: false }, // agent → qualify
    { d: 'M 523,67 L 543,67', active: false },        // email → sms
    { d: 'M 523,242 L 543,242', active: false },      // qualify → check
    { d: 'M 658,67 C 688,67 688,140 710,140', active: false }, // sms → book
    { d: 'M 673,242 C 698,242 698,158 710,158', active: false }, // check → book
    { d: 'M 845,147 L 865,147', active: false },      // book → confirmed
  ]

  return (
    <div className="w-full">
      {/* Desktop SVG */}
      <div className="hidden md:block w-full overflow-x-auto">
        <svg
          viewBox="0 0 1010 310"
          width="100%"
          className="max-w-full"
          style={{ fontFamily: '"JetBrains Mono", "Courier New", monospace' }}
        >
          <defs>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-bright" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Background connecting lines (always visible, dim) */}
          {linePaths.map((lp, i) => (
            <path key={i} d={lp.d} fill="none" stroke="#1E3D22" strokeWidth="1.5"
              strokeDasharray="4 4" />
          ))}

          {/* Active line overlays — animated with same keyTimes as dots */}
          {/* These use SVG animate to draw the line as the dot travels */}
          {linePaths.map((lp, i) => {
            const dot = DOTS[i]
            if (!dot) return null
            const eps = 0.002
            const dur = '5s'
            const sp = dot.startPct
            const ep = dot.endPct
            const urgentStroke = dot.urgent ? '#FF6B35' : '#2E7D32'
            const inactiveStroke = '#1E3D22'
            const strokeValues = sp === 0
              ? `${urgentStroke};${urgentStroke};${inactiveStroke};${inactiveStroke}`
              : `${inactiveStroke};${inactiveStroke};${urgentStroke};${urgentStroke};${inactiveStroke};${inactiveStroke}`
            const strokeTimes = sp === 0
              ? `0;${fmt(ep + 0.05)};${fmt(ep + 0.05 + eps)};1`
              : `0;${fmt(sp - eps)};${fmt(sp)};${fmt(ep + 0.05)};${fmt(ep + 0.05 + eps)};1`
            return (
              <path key={`active-${i}`} d={lp.d} fill="none" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke" dur={dur} repeatCount="indefinite"
                  calcMode="discrete" values={strokeValues} keyTimes={strokeTimes} />
              </path>
            )
          })}

          {/* Stage labels */}
          <text x="85" y="195" textAnchor="middle" fontSize="8" fill="#2E5E32" letterSpacing="1">INBOUND</text>
          <text x="275" y="205" textAnchor="middle" fontSize="8" fill="#2E5E32" letterSpacing="1">AI BRAIN</text>
          <text x="588" y="14" textAnchor="middle" fontSize="8" fill="#2E5E32" letterSpacing="1">NOTIFY</text>
          <text x="588" y="283" textAnchor="middle" fontSize="8" fill="#2E5E32" letterSpacing="1">ENGAGE</text>
          <text x="777" y="194" textAnchor="middle" fontSize="8" fill="#2E5E32" letterSpacing="1">BOOK</text>

          {/* Nodes */}
          {nodes.map(([id, x, y, w, h, icon, label, isAgent, isUrgent]) => {
            const cx = x + w / 2
            const cy = y + h / 2
            const isHov = hovered === id
            const tip = TOOLTIPS[id as string]

            return (
              <g key={id as string}
                onMouseEnter={() => setHovered(id as string)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}
              >
                {/* Outer glow ring (pulsing for agent) */}
                {isAgent && (
                  <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={12}
                    fill="none" stroke="#A5D6A7" strokeWidth="1" strokeOpacity="0.3">
                    <animate attributeName="strokeOpacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="strokeWidth" values="1;2;1" dur="2s" repeatCount="indefinite"/>
                  </rect>
                )}

                {/* Hover highlight */}
                {isHov && (
                  <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx={10}
                    fill="none" stroke={isUrgent ? '#FF6B35' : '#A5D6A7'} strokeWidth="1.5" strokeOpacity="0.6"/>
                )}

                {/* Node rect with animated fill/stroke */}
                <NodeGlow id={id as string} x={x} y={y} w={w} h={h} isUrgent={isUrgent} isAgent={isAgent} />

                {/* Icon */}
                <text x={cx} y={cy - 9} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 16 : 14} fill="#A5D6A7">
                  {icon as string}
                </text>

                {/* Label */}
                <text x={cx} y={cy + 9} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 8.5 : 7.5} fill="#6ABD76" letterSpacing="0.8">
                  {label as string}
                </text>

                {/* Tooltip */}
                {isHov && tip && (
                  <g>
                    <rect
                      x={cx - 90} y={y + h + 5}
                      width={180} height={22} rx={4}
                      fill="#0a140b" stroke="#2E7D32" strokeWidth="0.75"
                    />
                    <text x={cx} y={y + h + 16} textAnchor="middle" dominantBaseline="central"
                      fontSize={7.5} fill="#8BC38A" letterSpacing="0.3">
                      {tip}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Animated dots */}
          {DOTS.map(dot => (
            <DotAnimation key={dot.id} dot={dot} />
          ))}
        </svg>
      </div>

      {/* Mobile SVG — vertical, sequential */}
      <div className="md:hidden w-full">
        <svg
          viewBox="0 0 280 760"
          width="100%"
          className="max-w-xs mx-auto"
          style={{ fontFamily: '"JetBrains Mono", "Courier New", monospace' }}
        >
          {/* Mobile nodes — stacked vertically, center x=140 */}
          {[
            { id: 'lead',      y: 10,  icon: '⬇',  label: 'NEW LEAD' },
            { id: 'agent',     y: 105, icon: '⚡', label: 'A305 AI AGENT', isAgent: true },
            { id: 'email',     y: 220, icon: '✉',  label: 'EMAIL ALERT' },
            { id: 'sms',       y: 305, icon: '💬', label: 'SMS ALERT', isUrgent: true },
            { id: 'qualify',   y: 400, icon: '🔍', label: 'QUALIFY LEAD' },
            { id: 'check',     y: 485, icon: '📅', label: 'CHECK CALENDAR' },
            { id: 'book',      y: 580, icon: '📋', label: 'BOOK APPT' },
            { id: 'confirmed', y: 670, icon: '✓',  label: 'CONFIRMED', isConfirmed: true },
          ].map(({ id, y, icon, label, isAgent, isUrgent, isConfirmed }) => {
            const w = isAgent ? 200 : 170
            const h = isAgent ? 75 : 60
            const x = 140 - w / 2
            const cx = 140
            const cy = y + h / 2
            return (
              <g key={id}>
                {/* Connector line down */}
                {y > 10 && (
                  <line x1="140" y1={y - 15} x2="140" y2={y}
                    stroke="#1E3D22" strokeWidth="1.5" strokeDasharray="4 3"/>
                )}
                <NodeGlow id={id} x={x} y={y} w={w} h={h} isUrgent={isUrgent} isAgent={isAgent} />
                {isAgent && (
                  <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={11}
                    fill="none" stroke="#A5D6A7" strokeWidth="1" strokeOpacity="0.25">
                    <animate attributeName="strokeOpacity" values="0.1;0.35;0.1" dur="2s" repeatCount="indefinite"/>
                  </rect>
                )}
                <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 15 : 13} fill="#A5D6A7">{icon}</text>
                <text x={cx} y={cy + 9} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 8 : 7} fill="#6ABD76" letterSpacing="0.7">{label}</text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
