/**
 * DBPR Lead Enrichment Pipeline (Phase 2)
 *
 * Enriches raw DBPR license records with:
 * - Google Maps ratings, review counts, and review samples
 * - Extracted operator/technician names from reviews
 * - Lead priority scoring (hot/warm/cold)
 * - AI-generated outbound angles based on review patterns
 *
 * Integrates with Crustdata for phone/contact lookup.
 */

import { DBPRLicense } from './dbpr'
import { FirecrawlService } from './firecrawl'
import { cachedFetch, withCache } from '../cache/cached-fetch'

const CACHE_SCOPE = 'dbpr_enrichment'

export type LeadPriority = 'hot' | 'warm' | 'cold'

/**
 * Review sample extracted from Google Maps or similar sources.
 * Used to identify operator names and automation pain points.
 */
export interface ReviewSample {
  author?: string
  rating?: number
  text: string
  date?: string
}

/**
 * Fully enriched DBPR lead — ready for CRM import and outbound sequencing.
 */
export interface EnrichedDBPRLead {
  // Original DBPR data
  dbprId: string
  businessName: string
  licenseStatus: string
  address: string
  city: string
  county: string
  phone: string

  // Google Maps enrichment
  googleMapsRating?: number
  reviewCount?: number
  reviewsJson?: ReviewSample[]

  // Extracted signals
  operatorNames?: string[]
  teamSize?: 'solo' | 'micro' | 'small' | 'medium' | 'large'

  // Lead scoring
  priority: LeadPriority
  angle?: string

  // Metadata
  importedAt: Date
  sourceUrl?: string
}

/**
 * Lead scoring rules based on review patterns.
 * Matches the scoring logic from your HTML prospect table.
 */
interface ScoringCriteria {
  rating: number
  reviewCount: number
  hasOperatorMention: boolean
  hasFollowUpComplaints: boolean
  hasMultipleTeamMembers: boolean
}

/**
 * Enriches a single DBPR license record with Google Maps data and scoring.
 *
 * @param license Raw DBPR license record
 * @param opts Optional enrichment options (cache ttl, etc.)
 * @returns Fully enriched lead record
 */
export async function enrichDBPRLead(
  license: DBPRLicense,
  opts: { forceRefresh?: boolean; cacheMinutes?: number } = {},
): Promise<EnrichedDBPRLead> {
  const cacheMinutes = opts.cacheMinutes ?? 1440 // Default: 24 hours
  const cacheTtlMs = cacheMinutes * 60 * 1000

  // Step 1: Fetch phone number (if missing from DBPR)
  let phone = license.phone
  if (!phone) {
    try {
      phone = await lookupPhoneNumber(license.businessName, license.city)
    } catch {
      phone = 'N/A' // Graceful fallback
    }
  }

  // Step 2: Fetch Google Maps data (with cache)
  let mapsData: GoogleMapsResult | null = null
  try {
    mapsData = await fetchGoogleMapsData(
      license.businessName,
      license.city,
      {
        cacheTtlMs,
        forceRefresh: opts.forceRefresh,
      },
    )
  } catch (err) {
    console.warn(`  ⚠ Google Maps lookup failed for ${license.businessName}: ${err}`)
  }

  // Step 3: Extract operator names and team signals from reviews
  const operatorNames = extractOperatorNames(mapsData?.reviews)
  const teamSize = estimateTeamSize(mapsData?.reviews || [])

  // Step 4: Score the lead
  const priority = scoreLead({
    rating: mapsData?.rating ?? 0,
    reviewCount: mapsData?.reviewCount ?? 0,
    hasOperatorMention: operatorNames.length > 0,
    hasFollowUpComplaints: hasFollowUpComplaints(mapsData?.reviews || []),
    hasMultipleTeamMembers: teamSize !== 'solo',
  })

  // Step 5: Generate outbound angle
  const angle = generateOutboundAngle({
    businessName: license.businessName,
    priority,
    teamSize,
    operatorNames,
    reviews: mapsData?.reviews || [],
    hasFollowUpComplaints: hasFollowUpComplaints(mapsData?.reviews || []),
  })

  return {
    dbprId: license.licenseId,
    businessName: license.businessName,
    licenseStatus: license.status,
    address: license.address,
    city: license.city,
    county: license.county,
    phone,
    googleMapsRating: mapsData?.rating,
    reviewCount: mapsData?.reviewCount,
    reviewsJson: mapsData?.reviews?.slice(0, 5), // Top 5 for import
    operatorNames,
    teamSize,
    priority,
    angle,
    importedAt: new Date(),
    sourceUrl: mapsData?.url,
  }
}

/**
 * Google Maps data structure returned from search.
 */
interface GoogleMapsResult {
  rating: number
  reviewCount: number
  reviews: ReviewSample[]
  url?: string
}

/**
 * Fetch Google Maps ratings, reviews, and business info for an HVAC company.
 * Uses Firecrawl to scrape the Google Business profile.
 *
 * Cache key: `${businessName}:${city}` — reuse results within ttl.
 */
async function fetchGoogleMapsData(
  businessName: string,
  city: string,
  opts: { cacheTtlMs?: number; forceRefresh?: boolean } = {},
): Promise<GoogleMapsResult | null> {
  const cacheKey = `google_maps:${businessName}:${city}`.toLowerCase()
  const cacheTtlMs = opts.cacheTtlMs ?? 86_400_000 // 24 hours default

  return withCache(
    { scope: CACHE_SCOPE, key: cacheKey, ttlMs: cacheTtlMs },
    async () => {
      const searchUrl = buildGoogleMapsSearchUrl(businessName, city)

      try {
        const fc = new FirecrawlService()
        if (!fc.isAvailable()) {
          throw new Error('FIRECRAWL_API_KEY not set')
        }

        const markdown = await fc.scrape(searchUrl)
        return parseGoogleMapsMarkdown(markdown, searchUrl)
      } catch (err) {
        console.warn(
          `  ⚠ Google Maps scrape failed for ${businessName}:`,
          err instanceof Error ? err.message : String(err),
        )
        return null
      }
    },
  )
}

/**
 * Build a Google Maps search URL for an HVAC business.
 */
function buildGoogleMapsSearchUrl(businessName: string, city: string): string {
  const query = encodeURIComponent(`${businessName} ${city} Florida`)
  return `https://www.google.com/maps/search/${query}`
}

/**
 * Parse Firecrawl's markdown output from a Google Maps search.
 * Extracts rating, review count, and review text samples.
 */
function parseGoogleMapsMarkdown(markdown: string, url: string): GoogleMapsResult {
  // Extract rating (format: "4.8 stars" or "⭐ 4.8")
  const ratingMatch = markdown.match(/(?:⭐\s*)?(\d+\.?\d*)\s*(?:stars?)?/i)
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0

  // Extract review count (format: "123 reviews" or "123 Reviews")
  const reviewCountMatch = markdown.match(/(\d+)\s*(?:reviews?)/i)
  const reviewCount = reviewCountMatch ? parseInt(reviewCountMatch[1], 10) : 0

  // Extract individual reviews (basic heuristic: lines with natural language text)
  // In the markdown, reviews typically appear as quotes or indented blocks
  const reviewLines = markdown
    .split('\n')
    .filter(line => {
      const trimmed = line.trim()
      // Skip headers, empty lines, and metadata
      return (
        trimmed.length > 20 &&
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('*') &&
        !trimmed.startsWith('-') &&
        !trimmed.match(/^\d+\s*$/)
      )
    })
    .slice(0, 10) // Limit to first 10 review-like lines

  const reviews: ReviewSample[] = reviewLines.map((text, idx) => ({
    text: text.trim(),
    rating: idx === 0 ? rating : undefined, // Assume first line is top review
  }))

  return {
    rating,
    reviewCount,
    reviews,
    url,
  }
}

/**
 * Extract operator/technician names from review text.
 * Looks for patterns like "Owner John", "Tech Maria", "Manager Fred", etc.
 */
function extractOperatorNames(reviews: ReviewSample[] | undefined): string[] {
  if (!reviews || reviews.length === 0) return []

  const namePatterns = [
    /(?:Owner|Owner-operator|founder|founder)\s+([A-Z][a-z]+)/gi,
    /(?:Tech|Technician|specialist)\s+([A-Z][a-z]+)/gi,
    /(?:Manager|CSR|office)\s+([A-Z][a-z]+)/gi,
    /(?:crew|team)\s+(?:led|managed|by)\s+([A-Z][a-z]+)/gi,
  ]

  const names = new Set<string>()

  for (const review of reviews) {
    for (const pattern of namePatterns) {
      let match
      while ((match = pattern.exec(review.text)) !== null) {
        names.add(match[1])
      }
    }
  }

  return Array.from(names)
}

/**
 * Estimate team size from review signals.
 * - Solo: "owner does all work", "one-man operation", owner mentioned repeatedly
 * - Micro: 2-3 people mentioned, "small team"
 * - Small: 4-10 people mentioned, multiple crews
 * - Medium: 10-20 people, "large team", "multiple crews"
 * - Large: 20+ people or mention of "branch", "franchise"
 */
function estimateTeamSize(reviews: ReviewSample[]): 'solo' | 'micro' | 'small' | 'medium' | 'large' {
  if (reviews.length === 0) return 'micro' // Safe default

  const joinedText = reviews.map(r => r.text.toLowerCase()).join(' ')

  // Count unique people names mentioned
  const namePattern = /(?:owner|tech|manager|crew)\s+([a-z]+)/gi
  const names = new Set<string>()
  let match
  const regex = /(?:owner|tech|manager|crew)\s+([a-z]+)/gi
  while ((match = regex.exec(joinedText)) !== null) {
    names.add(match[1])
  }

  const uniquePeople = names.size

  // Heuristics
  if (joinedText.includes('one-man') || joinedText.includes('solo') || uniquePeople <= 1) {
    return 'solo'
  }
  if (joinedText.includes('large team') || joinedText.includes('multiple crews') || uniquePeople > 10) {
    return 'large'
  }
  if (uniquePeople > 5) {
    return 'medium'
  }
  if (uniquePeople > 2) {
    return 'small'
  }
  return 'micro'
}

/**
 * Check for follow-up or service complaints in reviews.
 * These are automation pain points (scheduling, communication).
 */
function hasFollowUpComplaints(reviews: ReviewSample[]): boolean {
  const painPatterns = [
    /(?:slow|delayed|no|never|wait|took)\s+(?:response|callback|follow|call)/i,
    /hard to reach/i,
    /communication/i,
    /follow.?up/i,
    /scheduling/i,
  ]

  return reviews.some(review =>
    painPatterns.some(pattern => pattern.test(review.text)),
  )
}

/**
 * Score a lead as hot/warm/cold based on review patterns and team signals.
 * Matches your HTML table scoring logic.
 */
function scoreLead(criteria: ScoringCriteria): LeadPriority {
  const { rating, reviewCount, hasOperatorMention, hasFollowUpComplaints } = criteria

  // HOT: 4.8+ rating AND 50+ reviews AND owner mentioned
  if (rating >= 4.8 && reviewCount >= 50 && hasOperatorMention) {
    return 'hot'
  }

  // HOT: 4.5+ AND no follow-up issues (responsive)
  if (rating >= 4.5 && !hasFollowUpComplaints && reviewCount >= 20) {
    return 'hot'
  }

  // WARM: 4.5-4.8 rating OR strong signals without volume
  if ((rating >= 4.5 && rating < 4.8) || (rating >= 4.8 && reviewCount < 50)) {
    return 'warm'
  }

  // WARM: Has follow-up complaints but high quality (easy pitch for automation)
  if (rating >= 4.3 && hasFollowUpComplaints) {
    return 'warm'
  }

  // COLD: 3.5-4.5 or low review count (still qualifies)
  if (rating >= 3.5) {
    return 'cold'
  }

  // COLD: Default for low data
  return 'cold'
}

/**
 * Generate a human-friendly outbound angle for a lead.
 * Used in email sequences and sales cadences.
 */
function generateOutboundAngle(context: {
  businessName: string
  priority: LeadPriority
  teamSize: 'solo' | 'micro' | 'small' | 'medium' | 'large'
  operatorNames: string[]
  reviews: ReviewSample[]
  hasFollowUpComplaints: boolean
}): string {
  const { businessName, priority, teamSize, operatorNames, hasFollowUpComplaints } = context

  const ownerName = operatorNames.length > 0 ? operatorNames[0] : 'their team'

  if (priority === 'hot') {
    if (hasFollowUpComplaints) {
      return `${businessName}'s reviews praise their quality, but customers mention scheduling delays. We help HVAC shops like ${businessName} automate follow-ups and booking.`
    }
    return `${businessName} has an exceptional reputation (reviews mention ${ownerName} by name). Let's help them scale while keeping that personal touch.`
  }

  if (priority === 'warm') {
    if (teamSize === 'solo' || teamSize === 'micro') {
      return `${businessName} is growing. ${ownerName} manages most customer touchpoints — automation frees them up to focus on installs.`
    }
    return `${businessName} has solid reviews and a growing team. Let's talk about streamlining their scheduling and customer comms.`
  }

  // Cold
  if (teamSize === 'solo') {
    return `${businessName} is just getting started. Early automation setup now = better habits later.`
  }
  return `${businessName} qualifies as an active HVAC operator. Let's explore how we can help reduce admin overhead.`
}

/**
 * Lookup phone number for a business (fallback if DBPR doesn't have it).
 * Uses Firecrawl to scrape Google Business profile or similar.
 */
async function lookupPhoneNumber(businessName: string, city: string): Promise<string> {
  const searchUrl = buildGoogleMapsSearchUrl(businessName, city)

  const fc = new FirecrawlService()
  if (!fc.isAvailable()) {
    throw new Error('FIRECRAWL_API_KEY not set')
  }

  const markdown = await fc.scrape(searchUrl)

  // Extract phone number (format: +1-XXX-XXX-XXXX or (XXX) XXX-XXXX or XXX-XXX-XXXX)
  const phoneMatch = markdown.match(/(?:\+1\s*)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}/i)
  if (phoneMatch) {
    return phoneMatch[0]
  }

  throw new Error(`No phone found for ${businessName}`)
}

/**
 * Service singleton for lead enrichment.
 */
export class DBPREnrichmentService {
  async enrichLead(license: DBPRLicense, opts?: { forceRefresh?: boolean }): Promise<EnrichedDBPRLead> {
    return enrichDBPRLead(license, opts)
  }

  async enrichLeads(licenses: DBPRLicense[], opts?: { forceRefresh?: boolean }): Promise<EnrichedDBPRLead[]> {
    const enriched: EnrichedDBPRLead[] = []
    for (let i = 0; i < licenses.length; i++) {
      try {
        const lead = await enrichDBPRLead(licenses[i], opts)
        enriched.push(lead)
      } catch (err) {
        console.error(`Failed to enrich ${licenses[i].businessName}:`, err)
      }

      // Rate limit: 1 second between enrichments to avoid hammering APIs
      if (i < licenses.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    return enriched
  }
}

export const dbprEnrichmentService = new DBPREnrichmentService()
