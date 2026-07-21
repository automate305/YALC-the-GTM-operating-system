/**
 * Council of High Intelligence — member roster.
 *
 * The single backend source of truth for who sits on the council, the
 * analytical method each persona grounds in, and the blind spot the
 * deliberation prompt forces each one to disclose. The web SPA renders
 * the same roster (ids must stay in sync with web/src/pages/Council.tsx).
 *
 * Seated members deliberate; consulting members advise but do not vote.
 */

export interface CouncilMember {
  id: string
  name: string
  domain: string
  method: string
  blindSpot: string
  consulting?: boolean
}

export const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    id: 'suntzu',
    name: 'Sun Tzu',
    domain: 'Strategy · Terrain',
    method: 'Win before fighting; concentrate force on decisive ground.',
    blindSpot: 'Can over-plan; may delay action hunting for perfect terrain.',
  },
  {
    id: 'mach',
    name: 'Machiavelli',
    domain: 'Power · Persuasion',
    method: 'Read incentives; manufacture authority and urgency.',
    blindSpot: 'Optimizes the close over the relationship; can erode trust that compounds.',
  },
  {
    id: 'munger',
    name: 'Charlie Munger',
    domain: 'Inversion · Judgment',
    method: 'Invert, always invert. Avoid stupidity before seeking brilliance.',
    blindSpot: 'Caution can suppress aggression a resource-poor sprint needs.',
  },
  {
    id: 'taleb',
    name: 'Nassim Taleb',
    domain: 'Risk · Asymmetry',
    method: 'Seek convexity; survive first, never optimize the average.',
    blindSpot: 'Tail-risk focus can freeze action that is genuinely safe to take.',
  },
  {
    id: 'meadows',
    name: 'Donella Meadows',
    domain: 'Systems · Leverage',
    method: 'Find the leverage point; watch the feedback loop, not the parts.',
    blindSpot: 'Systems abstraction can postpone the concrete next act.',
  },
  {
    id: 'karpathy',
    name: 'Andrej Karpathy',
    domain: 'Execution · Instrumentation',
    method: 'Define the loss, find the bottleneck, iterate on that stage.',
    blindSpot: 'Can over-build tooling instead of doing the object-level work.',
  },
  {
    id: 'marcus',
    name: 'Marcus Aurelius',
    domain: 'Discipline · Temperament',
    method: 'Control what is yours; the rest is indifferent.',
    blindSpot: 'Stoic detachment can dull urgency a deadline demands.',
  },
  {
    id: 'rams',
    name: 'Dieter Rams',
    domain: 'Design · Less, but better',
    method: 'Good design is as little design as possible.',
    blindSpot: 'Reduction can strip a signal that mattered only occasionally.',
    consulting: true,
  },
]

/** Seated (voting) members only. */
export function seatedMembers(): CouncilMember[] {
  return COUNCIL_MEMBERS.filter((m) => !m.consulting)
}

/** Roster block rendered into the skill prompt. */
export function rosterPrompt(): string {
  return COUNCIL_MEMBERS.map((m) => {
    const role = m.consulting ? 'CONSULTING (advises, does not vote)' : 'SEATED (votes)'
    return [
      `- id: ${m.id}`,
      `  name: ${m.name} — ${m.domain} [${role}]`,
      `  method: ${m.method}`,
      `  blind spot: ${m.blindSpot}`,
    ].join('\n')
  }).join('\n')
}
