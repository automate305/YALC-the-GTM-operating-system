# Changelog

## 1.1.0 — 2026-05-20

Runtime correctness pass. Original 1.0.0 was committed without any live testing and contained MCP tool references that don't exist on the real lemlist server. This release fixes 17 bugs across the orchestrator, the README, the standalone install path, and adds QA scaffolding. Verified end-to-end against the real lemlist MCP on 2026-05-19.

### Critical runtime fixes (1-6)
- Replaced fictional `create_campaign` MCP tool with the real chain: `get_lemleads_filters` → `lemleads_search` → `create_campaign_with_sequence` → `add_sequence_step` × 2 → `add_lead_to_campaign` × N → `validate_campaign_readiness`.
- Removed the fictional "paused flag" claim. Campaigns are created in DRAFT state by default; orchestrator MUST NOT call `set_campaign_state` with action `start`.
- Added `get_lemleads_filters` as a mandatory pre-search step (stage 11a) — registry must be discovered at runtime, not hardcoded.
- Corrected stage 12 enrichment posture: `lemleads_search` does not import leads. Enrichment flags on `add_lead_to_campaign` are opt-in and cost credits; default OFF.
- Stage 25d spells out the per-lead sequential loop with retry on 429/5xx, partial-failure logging to `failed_leads[]`, and the 20%-failure stop condition.
- Stages 25a-25f thread `campaignId` (cam_xxx) and `sequenceId` (seq_xxx) through the chain explicitly.

### Structural fixes (7-11)
- Added a substrate→orchestrator handoff contract table covering stages 1-23, specifying which fields each substrate skill must yield and the fallback heuristic when extraction fails.
- Frontmatter description now declares the 24-skill substrate + `.mcp.json` dependency, so Claude fails fast if either is missing.
- Standalone install README rewritten: Node.js 18+ prereq, separate copy-vs-merge instructions for `.mcp.json` (no silent overwrite of an existing config), restart-Claude-Code note for the env var.
- Canonical install path is the env-var + npx mcp-remote setup; OAuth via `claude mcp add` demoted to "Alternative" with a CI/headless caveat.
- Added `tests/` scaffolding: JSON Schema for the dryrun output, sandbox prompt, expected MCP call list, regression checklist.

### Live-test findings (12-17)
Surfaced during the 2026-05-19 QA run against the real lemlist MCP.

- `get_lemleads_filters` response is ~93K chars (3,091 lines) — cannot fit in an LLM context in a single tool result. Stage 11a instructs grepping the saved-to-file response for needed filterIds + their `values` arrays.
- `lemleads_search` returns ~24K chars per lead (>1MB at 50 leads). Stage 11b mandates an `excludes` baseline (drop `experiences`/`interests`/`languages`/`inferred_skills`/`lead_logo_url`/`company_description`/`techno_used_array`) and expects per-lead parsing from a saved file.
- `create_campaign_with_sequence` response's `campaign.status` field is unreliable: returns `"running"` even though the actual stored state is `draft`. Stage 25a warns NOT to trust it. The `add_sequence_step` responses DO return an accurate `campaignStatus: "draft"` — trust those.
- `lemleads_search` returns snake_case (`full_name`, `potential_email`, `lead_linkedin_url`, `current_exp_company_name`) but `add_lead_to_campaign` expects camelCase. Stage 25d includes an explicit field-mapping table with transforms (split `full_name` on first space; `seniority` → `persona_tier` map; null `potential_email` flagged in `leads_without_email[]`).
- Email coverage in real searches is 70-85%. Dryrun now computes `email_coverage_percent` and `leads_without_email[]`. Three remediation paths documented: skip / Yalc `fullenrich-*` and `enrich-with-signals` skills (recommended; routes through the fullenrich MCP) / lemlist's `findEmail` flag (paid, opt-in only).
- `set_campaign_state` with action `archive` returns HTTP 500 intermittently. Safety contract names this as a known unstable endpoint; no silent retries.

### Standalone install prerequisites added
- "At least one email sender connected in lemlist Settings → Senders" — without one, `validate_campaign_readiness` fails at stage 25e and the campaign cannot launch even after manual review.

### Verified live
- Campaign `cam_33rB5CDzA2iu4xyca` created against the real lemlist MCP on 2026-05-19.
- Final state: DRAFT (verified via `add_sequence_step` responses).
- 5 leads added, 4 with email, 1 without.
- Zero enrichment credits spent.
- The orchestrator never called `set_campaign_state` with action `start`.
