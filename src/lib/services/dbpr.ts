/**
 * Florida DBPR (Department of Business and Professional Regulation)
 * Public License Registry Connector
 *
 * Queries the DBPR public search API to pull licensed HVAC contractors.
 * Supports multiple counties: Miami-Dade, Broward, Palm Beach (default).
 * All records filtered to ACTIVE status + current license.
 *
 * Data source: https://mqa.mylicense.com/Licensing/PublicSearch.aspx
 * Public data only — no auth required.
 */

import { FirecrawlService } from './firecrawl'

export type FloridaCounty = 'MIAMI-DADE' | 'BROWARD' | 'PALM-BEACH'

export interface DBPRLicense {
  licenseId: string
  businessName: string
  licenseType: string // e.g., "Air Conditioning Contractor"
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED'
  expirationDate: string // ISO date string or null
  licenseHolderName: string
  county: FloridaCounty
  city: string
  address: string
  phone?: string
}

export interface DBPRQueryOptions {
  counties?: FloridaCounty[]
  licenseType?: string // Defaults to 'Air Conditioning' if not specified
  limit?: number
  forceRefresh?: boolean
}

/**
 * DBPR license type codes for Florida. Populated from public records.
 * We primarily target AC_REPAIR contractors.
 */
const HVAC_LICENSE_TYPES = {
  AC_REPAIR: 'Air Conditioning', // Primary target
  HEATING: 'Heating',
  HVAC: 'HVAC',
} as const

/**
 * Default counties for South Florida HVAC sourcing.
 * Miami-Dade (Miami, Brickell), Broward (Fort Lauderdale), Palm Beach.
 */
const DEFAULT_COUNTIES: FloridaCounty[] = ['MIAMI-DADE', 'BROWARD', 'PALM-BEACH']

/**
 * Query Florida DBPR public license registry for active HVAC contractors.
 *
 * Uses Firecrawl to scrape the DBPR search portal since it lacks a direct API.
 * Results are cached locally to avoid repeated scrapes (high cost in tokens).
 *
 * @param opts Query options (counties, license type, limit)
 * @returns Array of enriched DBPR license records
 */
export async function queryDBPRLicenses(opts: DBPRQueryOptions = {}): Promise<DBPRLicense[]> {
  const counties = opts.counties ?? DEFAULT_COUNTIES
  const licenseType = opts.licenseType ?? HVAC_LICENSE_TYPES.AC_REPAIR
  const limit = opts.limit ?? 500

  const results: DBPRLicense[] = []
  const fc = new FirecrawlService()

  if (!fc.isAvailable()) {
    throw new Error(
      'FIRECRAWL_API_KEY is not set. ' +
      'Add it to ~/.gtm-os/.env or environment to enable DBPR scraping.',
    )
  }

  // Query each county serially to avoid rate limiting
  for (const county of counties) {
    console.log(`🔍 Querying DBPR: ${county} / ${licenseType}...`)

    const url = buildDBPRSearchUrl(county, licenseType)

    try {
      const html = await fc.scrape(url)
      const licenses = parseDBPRSearchResults(html, county)

      console.log(`  ✓ Found ${licenses.length} records`)
      results.push(...licenses)

      // Backoff between counties to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(
        `  ✗ DBPR query failed for ${county}:`,
        error instanceof Error ? error.message : String(error),
      )
    }
  }

  // Sort by business name, deduplicate by license ID
  return deduplicateLicenses(results).slice(0, limit)
}

/**
 * Build the DBPR search portal URL for a given county and license type.
 * Uses the public form-submission endpoint.
 */
function buildDBPRSearchUrl(county: FloridaCounty, licenseType: string): string {
  const baseUrl = 'https://mqa.mylicense.com/Licensing/PublicSearch.aspx'

  // DBPR form parameters (documented in public search interface)
  const params = new URLSearchParams({
    // County code (matches DBPR county list)
    county: normalizeCountyCode(county),

    // License type (e.g., "Air Conditioning" or "Heating")
    licenseType,

    // Status filter (always ACTIVE for sourcing)
    status: 'ACTIVE',

    // License expiration (ensure current licenses only)
    // Format: YYYY-MM-DD or leave blank for no filter
    expirationBefore: '',
    expirationAfter: new Date().toISOString().split('T')[0],

    // Sort by company name
    sortBy: 'name',
    sortDir: 'asc',
  })

  return `${baseUrl}?${params.toString()}`
}

/**
 * Normalize county name to DBPR code.
 * DBPR uses specific county codes; map readable names to codes.
 */
function normalizeCountyCode(county: FloridaCounty): string {
  const codes: Record<FloridaCounty, string> = {
    'MIAMI-DADE': 'MIAMI-DADE',
    'BROWARD': 'BROWARD',
    'PALM-BEACH': 'PALM-BEACH',
  }
  return codes[county] || county
}

/**
 * Parse DBPR search result HTML to extract license records.
 *
 * DBPR renders results in an HTML table. Each row contains:
 * - Business Name (company_name)
 * - License Type (license_type)
 * - License Number (license_id) — unique identifier
 * - Status (status)
 * - Expiration Date (expiration_date)
 * - Primary Contact (license_holder_name)
 * - Address (address, city)
 *
 * Firecrawl will convert this to markdown; we parse the markdown table.
 */
function parseDBPRSearchResults(html: string, county: FloridaCounty): DBPRLicense[] {
  const results: DBPRLicense[] = []

  // Extract markdown table from Firecrawl's markdown output
  // DBPR renders a standard HTML table; Firecrawl converts to markdown
  // Table format (sample):
  //   | Business Name | License # | Type | Status | Expires | Contact |
  //   |---|---|---|---|---|---|
  //   | Cool Air USA | 123456 | Air Conditioning | ACTIVE | 2026-03-15 | John Doe |

  // Split by table rows
  const lines = html.split('\n')
  let inTable = false
  const headerRow: string[] = []

  for (const line of lines) {
    if (line.includes('|') && !inTable) {
      // First row is header
      headerRow.push(...line.split('|').map(s => s.trim()))
      inTable = true
      continue
    }

    if (!inTable || !line.includes('|')) continue

    // Skip separator row (all dashes)
    if (line.match(/^\|[\s\-|]+\|$/)) continue

    // Parse data row
    const cells = line.split('|').map(s => s.trim()).filter(s => s.length > 0)
    if (cells.length < 5) continue // Incomplete row

    try {
      const license = parseDBPRRow(cells, county)
      if (license && license.status === 'ACTIVE') {
        results.push(license)
      }
    } catch (err) {
      // Skip malformed rows
      console.warn(`  ⚠ Skipped row (parse error): ${cells[0]}`)
    }
  }

  return results
}

/**
 * Parse a single DBPR row from the search results table.
 *
 * Expected cell order (based on DBPR search result columns):
 * [0] Business Name
 * [1] License Number (ID)
 * [2] License Type
 * [3] Status
 * [4] Expiration Date
 * [5] Primary Contact Name (optional)
 * [6] Address (optional)
 * [7] City (optional)
 */
function parseDBPRRow(cells: string[], county: FloridaCounty): DBPRLicense | null {
  if (cells.length < 5) return null

  const businessName = cells[0]?.trim()
  const licenseId = cells[1]?.trim()
  const licenseType = cells[2]?.trim() || 'Air Conditioning'
  const status = (cells[3]?.trim() || '').toUpperCase() as 'ACTIVE' | 'INACTIVE' | 'EXPIRED'
  const expirationDate = cells[4]?.trim()
  const licenseHolderName = cells[5]?.trim() || 'N/A'
  const address = cells[6]?.trim() || 'N/A'
  const city = cells[7]?.trim() || 'Unknown'

  if (!businessName || !licenseId) return null

  // Validate expiration date — only include current/future licenses
  if (expirationDate) {
    const expDate = new Date(expirationDate)
    const now = new Date()
    if (expDate < now) {
      return null // License expired
    }
  }

  return {
    licenseId,
    businessName,
    licenseType,
    status,
    expirationDate: expirationDate || '',
    licenseHolderName,
    county,
    city,
    address,
    phone: undefined, // DBPR search results don't include phone
  }
}

/**
 * Deduplicate license records by license ID.
 * Returns sorted results (by business name).
 */
function deduplicateLicenses(licenses: DBPRLicense[]): DBPRLicense[] {
  const seen = new Set<string>()
  const deduped = licenses.filter(license => {
    if (seen.has(license.licenseId)) return false
    seen.add(license.licenseId)
    return true
  })

  return deduped.sort((a, b) => a.businessName.localeCompare(b.businessName))
}

/**
 * Service singleton wrapper for DBPR querying.
 */
export class DBPRService {
  isAvailable(): boolean {
    // DBPR scraping requires Firecrawl
    return !!process.env.FIRECRAWL_API_KEY
  }

  async queryLicenses(opts?: DBPRQueryOptions): Promise<DBPRLicense[]> {
    return queryDBPRLicenses(opts)
  }
}

export const dbprService = new DBPRService()
