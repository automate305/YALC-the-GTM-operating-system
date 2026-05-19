---
name: claap-weekly-recap
description: "Turns a week of Claap-recorded sales calls into action items and focus blocks on a Notion Kanban, delivered with a Slack summary. Use when the user says 'weekly call recap', 'turn my calls into action items', 'Sunday recap from Claap', 'what should I focus on next week based on my calls', 'pull this week's deal next steps from Claap', or schedules a recurring digest of recorded conversations. Side-effecting — reads Claap via MCP, writes Notion cards, sends a Slack DM."
version: 1.0.0
---

# Claap Weekly Recap

Reads every Claap recording from the last N days, extracts per-deal action items with verbatim quotes and Claap timestamp links, synthesizes weekly focus blocks, writes them to a Notion Kanban DB, and delivers a Slack summary. Designed to run unattended on a Sunday morning schedule.

**You produce action items and focus blocks. You do NOT modify the underlying call recordings, edit existing Notion cards, or write to any database other than the GTM Action Items DB passed as input.**

## When This Skill Applies

- "give me the week in calls"
- "what did prospects ask for this week"
- "draft action items from my Claap calls this week"
- "Sunday recap from sales calls"
- "set up a weekly recap from Claap into Notion + Slack"

**NOT this skill:**
- "summarize this one call" — use Claap's own per-call summary in the app
- "ask my call history a question right now" — use Claap MCP directly without invoking this agent

## Prerequisites (one-time setup)

Read `references/setup.md` first. Three things need to exist before this skill runs cleanly:

1. **Claap MCP registered** in your Claude Code workspace (`.mcp.json` or settings). `CLAAP_API_KEY` exported in env.
2. **Notion GTM Action Items DB** created with the 10-property schema in `references/notion-db-schema.md` and a Kanban view grouped by Status.
3. **Slack MCP** available (claude.ai Slack connector, or a Slack webhook URL if you prefer the no-MCP path).

If any are missing, stop and surface what's missing rather than guessing.

## Inputs You Receive

| Input | Required | Description |
|---|---|---|
| `gtm_action_items_data_source_id` | Yes | Notion DS ID of the GTM Action Items DB (`collection://...` or bare UUID) |
| `slack_recipient` | Yes | Slack user ID (e.g. `U0ABCDE1234`) or `@handle`. Use `slack_search_users` to resolve. |
| `week_label` | No | ISO week label, e.g. `2026-W20`. Default: current ISO week. |
| `lookback_days` | No | Days of call history to scan. Default: 7. |
| `prior_recap_history_path` | No | Path to a markdown file where last week's focus block titles were logged. Used for carry-over detection. |

## Tools Used

### Claap MCP (read)

Claap's HTTP MCP server exposes 7 tools as `mcp__claap__*`. The four relevant ones for this skill:

| Tool | Required params | Use |
|---|---|---|
| `list_workspaces` | — | Call first. Returns `workspaces[]` each with `workspaceId`. Cache the primary one. |
| `get_recordings` | `workspaceId` | Returns recording metadata. Filter with `filters.createdAt.gte/lte` (ISO date). Paginate via `nextCursor`. |
| `get_recording_transcript` | `recordingId`, `workspaceId` | Full transcript for one recording. |
| `search_recording_transcripts` | `search.query`, `search.type`, `workspaceId` | Cross-recording keyword / semantic search. Useful for carry-over follow-up checks. |

Other Claap tools (`search_companies`, `search_contacts`, `search_deals`) are available if you need to resolve participants → deals when the recording doesn't carry a `dealId`.

### Notion (write)

Use the Notion MCP (Claude Code's built-in connector or `mcp.notion.com`):

- `notion-fetch` on the target DS to confirm the schema (property names are case-sensitive)
- `notion-create-pages` with `data_source_id` parent to add cards
- `notion-update-data-source` (DDL) if select options need to be seeded on first run

### Slack (notify)

**Primary path** — Slack MCP:
- `slack_send_message` with `channel_id = slack_recipient`. One plain-text message per run.

**Fallback path** — incoming webhook (use when Slack MCP isn't loaded in headless mode):
- Detect: if `SLACK_WEBHOOK_URL` is set in env, prefer the webhook over MCP.
- Execute via the `Bash` tool with a heredoc-safe curl. Example:

  ```bash
  curl -X POST -H 'Content-Type: application/json' \
    "$SLACK_WEBHOOK_URL" \
    --data @<(jq -n --arg text "$RECAP_TEXT" '{text: $text}')
  ```

  Or, simpler — write the message to a temp file and `curl --data-binary @file`:

  ```bash
  printf '{"text": %s}' "$(jq -Rs . <<< "$RECAP_TEXT")" > /tmp/recap.json
  curl -X POST -H 'Content-Type: application/json' \
    --data-binary @/tmp/recap.json "$SLACK_WEBHOOK_URL"
  ```

If both MCP and webhook are absent, stop with a hard error — do not silently skip the notification.

## Process — 8 Steps

### Step 1 — Pull the week's calls

1. `mcp__claap__list_workspaces` → cache `workspaceId`.
2. Compute date range: `today - lookback_days` → `today` as ISO `YYYY-MM-DD`.
3. `mcp__claap__get_recordings` with `{ workspaceId, filters: { createdAt: { gte, lte } } }`. Paginate.
4. For each: `mcp__claap__get_recording_transcript`. Skip calls under 3 minutes (no-shows / test recordings).
5. From each transcript, extract moments by scanning the text for: **objection**, **competitor_mention**, **feature_request**, **action_item**, **next_step_promised**.

For each call retain: `recordingId`, `recordingTitle`, `createdAt`, recording URL, participants, `dealId` / `companyId` if available, and the extracted moments.

### Step 2 — Cluster per deal

Group recordings by `dealId` (preferred) or `companyId` (fallback). When neither is available, group by company name extracted from the external participants list.

### Step 3 — Extract action items

For each deal, propose 1–3 concrete action items. Each must:

- Be a clear next step (specific enough to act on without re-reading the transcript)
- Cite a **verbatim quote** from the transcript (10–25 words)
- Include a `claap_timestamp_url` pointing to the exact moment
- Default `Status = Backlog`
- Carry the `Week` label

Skip generic items ("follow up"). Every card must answer "what specifically, with whom, by when if known."

### Step 4 — Synthesize focus blocks

Across all calls of the week, identify 2–4 themes worth a deep-work block next week. A focus block is a *pattern*, not a single deal:

- "Tighten pricing objection rebuttal" — surfaced 6× across 4 deals
- "Compliance questions — no canonical answer yet" — surfaced 3× this week

Each must:
- 4–8 word title
- Cite underlying calls (count + which deals)
- `Type = Focus Block`, `Status = Focus This Week`
- Empty `Deal / Lead` (spans deals)

### Step 5 — Carry-over check

If `prior_recap_history_path` is provided and exists, read last week's focus block titles. For each:
- Theme surfaced again → mark continuity ("still surfacing — 4 deals → 6, widening" or "narrowing")
- Theme absent → "resolved or no longer surfacing"

### Step 6 — Write to Notion

`notion-fetch` the DS to confirm the schema first. Then batch `notion-create-pages` with `data_source_id = gtm_action_items_data_source_id`.

**Action Item card properties:**

```
Title           — action sentence
Type            — "Action Item"
Status          — "Backlog"
Deal / Lead     — text identifier
Verbatim Quote  — prospect's exact wording (10-25 words)
Claap Link      — timestamped URL
Source Call Date — date:<column>:start ISO date
Surfaced By     — "Weekly Recap Agent"
Week            — week_label
Due             — date if explicitly promised on call, else omit
```

**Focus Block card properties:**

```
Title           — pattern name (4-8 words)
Type            — "Focus Block"
Status          — "Focus This Week"
Deal / Lead     — leave blank
Verbatim Quote  — "Surfaced in N deals (Acme, Sofie GmbH, ...)"
Claap Link      — first representative call timestamp
Source Call Date — most recent of the cluster
Surfaced By     — "Weekly Recap Agent"
Week            — week_label
```

Batch ≤40 pages per `create-pages` call (Notion batch limit).

If a select value isn't allowed, use `notion-update-data-source` with DDL to seed (see `references/notion-db-schema.md`).

### Step 7 — Compose + send Slack summary

Plain text, no markdown beyond `*bold*`. Pattern:

```
🪑 Sunday recap — Week of <Mon DD>

<N> action items across <M> deals → <Notion Kanban URL>
<K> focus blocks for next week:
  · <title 1> (<count> deals)
  · <title 2> (<count> deals)
  · <title 3> (<count> deals)

Carry-over from last week:
  · <theme>: <status>
```

`slack_send_message channel_id=<slack_recipient> message=<text>`. One message per run.

### Step 8 — Append to memory

Append this week's focus block titles to `prior_recap_history_path` so next week's agent can detect carry-over. Single line per entry:

```
2026-W20: Pricing objection rebuttal | Compliance questions | Champion ID
```

If the file doesn't exist, create with header `# Claap Weekly Recap — Focus Block History`.

## Output Quality Bar

- **Specificity** — every action item names a person/deal and a concrete next step
- **Evidence** — every card carries a verbatim quote + Claap timestamp link
- **Honesty** — if the week had 2 calls, don't invent 8 action items
- **Brevity** — action item titles ≤ 12 words; focus block titles ≤ 8 words
- **Continuity** — carry-over check is mandatory when a history file is provided

If the week had **zero calls**, send a single Slack message: "No calls recorded this week. Skipping recap." Do not create Notion cards.

## Failure Modes — Hard Stops

Stop and report (no mocks, no partial output) if:

- Claap MCP returns auth error → check `CLAAP_API_KEY` in env at MCP-launch time, restart Claude Code session
- `notion-fetch` returns no DS at `gtm_action_items_data_source_id` → wrong DS ID, or workspace permissions
- DNS / network failure

For a transient single-call fetch failure: skip that call, log it, continue with the rest.

## Sample Outputs

See `references/sample-output.md` for a real run's action items, focus blocks, and Slack DM.

## Running on a Schedule

Two options, depending on your stack:

### Option A — Yalc agent system (cross-platform)

```yaml
# configs/agents/claap-weekly-recap.yaml
id: claap-weekly-recap
schedule:
  type: weekly
  weekday: sunday
  hour: 8
  minute: 0
steps:
  - skillId: claap-weekly-recap
    input:
      gtm_action_items_data_source_id: collection://YOUR-DS-ID
      slack_recipient: UYOURUSERID
      lookback_days: 7
      prior_recap_history_path: ~/.gtm-os/state/claap-recap-history.md
```

Install: `npx tsx src/cli/index.ts agent:install --agent claap-weekly-recap`

### Option B — macOS launchd (native)

See `scripts/run.sh.template` and `scripts/launchd.plist.template`. Copy, fill in placeholders, install via `launchctl load`. Full step-by-step in `references/setup.md`.

### Option C — Linux cron / systemd

Cron line example in `scripts/cron-example.txt`. systemd timer template at `scripts/systemd.timer.template`.
