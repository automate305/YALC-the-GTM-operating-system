'use client'

import { useState, useRef, useCallback } from 'react'

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

// Unique neon border colors per node
const NODE_COLORS: Record<string, string> = {
  lead:      '#4ADE80',
  agent:     '#A78BFA',
  email:     '#22D3EE',
  sms:       '#FB923C',
  qualify:   '#F472B6',
  check:     '#FACC15',
  book:      '#34D399',
  confirmed: '#38BDF8',
}

type DotDef = {
  id: string
  path: string
  startPct: number
  endPct: number
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

type NodeTimings = { [key: string]: number }
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
  const fill = urgent ? '#FB923C' : '#A5D6A7'

  const kp = startPct === 0 ? `0;1;1` : `0;0;1;1`
  const kt = startPct === 0
    ? `0;${fmt(endPct)};1`
    : `0;${fmt(startPct)};${fmt(endPct)};1`

  const eps = 0.002
  const opacityValues = startPct === 0 ? `1;1;0;0` : `0;0;1;1;0;0`
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

function NodeGlow({ id, x, y, w, h, isAgent }: {
  id: string; x: number; y: number; w: number; h: number; isAgent?: boolean
}) {
  const activePct = NODE_ACTIVATION[id]
  const resetPct = 0.90
  const eps = 0.002
  const dur = '5s'
  const neonColor = NODE_COLORS[id] ?? '#4ADE80'

  const inactiveFill = '#0F0F1A'
  const activeFill = '#1A1A2E'
  const inactiveStroke = '#2A2A3E'
  const activeStroke = neonColor

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
    <rect x={x} y={y} width={w} height={h} rx={8} stroke={inactiveStroke} strokeWidth={isAgent ? 2 : 1.5}>
      <animate attributeName="fill" dur={dur} repeatCount="indefinite" calcMode="discrete"
        values={fillValues} keyTimes={fillTimes} />
      <animate attributeName="stroke" dur={dur} repeatCount="indefinite" calcMode="discrete"
        values={strokeValues} keyTimes={fillTimes} />
    </rect>
  )
}

const INTEGRATION_LOGOS = [
  { name: 'Google Workspace', slug: 'google', color: '4285F4' },
  { name: 'OpenAI',           slug: 'openai',  color: '412991' },
  { name: 'Slack',            slug: 'slack',   color: '4A154B' },
  { name: 'Twilio',           slug: 'twilio',  color: 'F22F46' },
  { name: 'HubSpot',          slug: 'hubspot', color: 'FF7A59' },
  { name: 'Make',             slug: 'make',    color: '6D00CC' },
]

export default function OrchestrationFlow() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEnter = useCallback((id: string, e: React.MouseEvent<SVGGElement>) => {
    setHovered(id)
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }, [])

  const handleMove = useCallback((e: React.MouseEvent<SVGGElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }, [])

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

  const linePaths = [
    { d: 'M 155,147 L 185,147' },
    { d: 'M 350,135 C 378,135 378,67 398,67' },
    { d: 'M 350,160 C 378,160 378,242 398,242' },
    { d: 'M 523,67 L 543,67' },
    { d: 'M 523,242 L 543,242' },
    { d: 'M 658,67 C 688,67 688,140 710,140' },
    { d: 'M 673,242 C 698,242 698,158 710,158' },
    { d: 'M 845,147 L 865,147' },
  ]

  return (
    <div className="w-full">
      {/* Desktop SVG */}
      <div ref={containerRef} className="hidden md:block w-full overflow-x-auto relative">
        <svg
          viewBox="0 0 1010 310"
          width="100%"
          className="max-w-full"
          style={{ fontFamily: '"JetBrains Mono", "Courier New", monospace' }}
        >
          <defs>
            <filter id="glow-neon" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Background connecting lines */}
          {linePaths.map((lp, i) => (
            <path key={i} d={lp.d} fill="none" stroke="#2A2A3E" strokeWidth="1.5" strokeDasharray="4 4" />
          ))}

          {/* Animated active line overlays */}
          {linePaths.map((lp, i) => {
            const dot = DOTS[i]
            if (!dot) return null
            const eps = 0.002
            const dur = '5s'
            const sp = dot.startPct
            const ep = dot.endPct
            const neonColor = dot.urgent ? '#FB923C' : '#4ADE80'
            const inactiveStroke = '#2A2A3E'
            const strokeValues = sp === 0
              ? `${neonColor};${neonColor};${inactiveStroke};${inactiveStroke}`
              : `${inactiveStroke};${inactiveStroke};${neonColor};${neonColor};${inactiveStroke};${inactiveStroke}`
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
          <text x="85" y="195" textAnchor="middle" fontSize="8" fill="#E5E5E5" letterSpacing="1" opacity="0.7">INBOUND</text>
          <text x="275" y="205" textAnchor="middle" fontSize="8" fill="#E5E5E5" letterSpacing="1" opacity="0.7">AI BRAIN</text>
          <text x="588" y="14" textAnchor="middle" fontSize="8" fill="#E5E5E5" letterSpacing="1" opacity="0.7">NOTIFY</text>
          <text x="588" y="283" textAnchor="middle" fontSize="8" fill="#E5E5E5" letterSpacing="1" opacity="0.7">ENGAGE</text>
          <text x="777" y="194" textAnchor="middle" fontSize="8" fill="#E5E5E5" letterSpacing="1" opacity="0.7">BOOK</text>

          {/* Nodes */}
          {nodes.map(([id, x, y, w, h, icon, label, isAgent]) => {
            const cx = (x as number) + (w as number) / 2
            const cy = (y as number) + (h as number) / 2
            const neonColor = NODE_COLORS[id as string] ?? '#4ADE80'

            return (
              <g key={id as string}
                onMouseEnter={(e) => handleEnter(id as string, e)}
                onMouseLeave={() => setHovered(null)}
                onMouseMove={handleMove}
                style={{ cursor: 'default' }}
              >
                {isAgent && (
                  <rect x={(x as number) - 4} y={(y as number) - 4} width={(w as number) + 8} height={(h as number) + 8} rx={12}
                    fill="none" stroke={neonColor} strokeWidth="1" strokeOpacity="0.25">
                    <animate attributeName="strokeOpacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="strokeWidth" values="1;2;1" dur="2s" repeatCount="indefinite"/>
                  </rect>
                )}

                <NodeGlow id={id as string} x={x as number} y={y as number} w={w as number} h={h as number} isAgent={isAgent} />

                <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 18 : 16} fill={neonColor}>
                  {icon as string}
                </text>

                <text x={cx} y={cy + 12} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 11 : 10} fill="#D4D4D8" letterSpacing="0.6" fontWeight="600">
                  {label as string}
                </text>
              </g>
            )
          })}

          {/* Animated dots */}
          {DOTS.map(dot => (
            <DotAnimation key={dot.id} dot={dot} />
          ))}
        </svg>

        {/* HTML Tooltip overlay */}
        {hovered && TOOLTIPS[hovered] && (
          <div
            style={{
              position: 'absolute',
              left: tooltipPos.x,
              top: tooltipPos.y - 70,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 50,
            }}
          >
            <div style={{
              background: '#6366F1',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '14px',
              padding: '14px 18px',
              borderRadius: '10px',
              minWidth: '200px',
              maxWidth: '280px',
              whiteSpace: 'normal',
              lineHeight: 1.4,
              boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
              textAlign: 'center',
            }}>
              {TOOLTIPS[hovered]}
            </div>
          </div>
        )}
      </div>

      {/* Integrations strip */}
      <div className="hidden md:flex items-center justify-center gap-6 mt-8 flex-wrap">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mr-2">Connects with</span>
        {INTEGRATION_LOGOS.map(({ name, slug, color }) => (
          <div key={slug} className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity">
            <img
              src={`https://cdn.simpleicons.org/${slug}/${color}`}
              alt={name}
              width={18}
              height={18}
              className="w-4 h-4 object-contain"
            />
            <span className="text-xs text-gray-400 font-medium">{name}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity">
          <span className="text-gray-400 text-xs">🔧</span>
          <span className="text-xs text-gray-400 font-medium">ServiceTitan</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity">
          <img
            src="https://cdn.simpleicons.org/twilio/F22F46"
            alt="Twilio"
            width={18}
            height={18}
            className="w-4 h-4 object-contain"
          />
          <span className="text-xs text-gray-400 font-medium">Twilio</span>
        </div>
      </div>

      {/* Mobile SVG — vertical, sequential */}
      <div className="md:hidden w-full">
        <svg
          viewBox="0 0 280 760"
          width="100%"
          className="max-w-xs mx-auto"
          style={{ fontFamily: '"JetBrains Mono", "Courier New", monospace' }}
        >
          {[
            { id: 'lead',      y: 10,  icon: '⬇',  label: 'NEW LEAD' },
            { id: 'agent',     y: 105, icon: '⚡', label: 'A305 AI AGENT', isAgent: true },
            { id: 'email',     y: 220, icon: '✉',  label: 'EMAIL ALERT' },
            { id: 'sms',       y: 305, icon: '💬', label: 'SMS ALERT', isUrgent: true },
            { id: 'qualify',   y: 400, icon: '🔍', label: 'QUALIFY LEAD' },
            { id: 'check',     y: 485, icon: '📅', label: 'CHECK CALENDAR' },
            { id: 'book',      y: 580, icon: '📋', label: 'BOOK APPT' },
            { id: 'confirmed', y: 670, icon: '✓',  label: 'CONFIRMED' },
          ].map(({ id, y, icon, label, isAgent }) => {
            const w = isAgent ? 200 : 170
            const h = isAgent ? 75 : 60
            const x = 140 - w / 2
            const cx = 140
            const cy = y + h / 2
            const neonColor = NODE_COLORS[id] ?? '#4ADE80'
            return (
              <g key={id}>
                {y > 10 && (
                  <line x1="140" y1={y - 15} x2="140" y2={y}
                    stroke="#2A2A3E" strokeWidth="1.5" strokeDasharray="4 3"/>
                )}
                <NodeGlow id={id} x={x} y={y} w={w} h={h} isAgent={isAgent} />
                {isAgent && (
                  <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={11}
                    fill="none" stroke={neonColor} strokeWidth="1" strokeOpacity="0.25">
                    <animate attributeName="strokeOpacity" values="0.1;0.35;0.1" dur="2s" repeatCount="indefinite"/>
                  </rect>
                )}
                <text x={cx} y={cy - 9} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 16 : 14} fill={neonColor}>{icon}</text>
                <text x={cx} y={cy + 11} textAnchor="middle" dominantBaseline="central"
                  fontSize={isAgent ? 10 : 9} fill="#D4D4D8" letterSpacing="0.6" fontWeight="600">{label}</text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
