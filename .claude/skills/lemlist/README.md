# Lemlist Claude Code skills (bundled)

The 14 skills inside this directory are unmodified copies from [lemlist's open-source Claude Code skill library](https://github.com/l3mpire/claude-skills). They are bundled into YALC so the full outbound loop — source, enrich, reason, write, send, loop — can run from a single Claude Code prompt against a real lemlist account via the lemlist MCP server (declared in `.mcp.json` at the repo root).

## Selection

Curation focuses on the layers lemlist covers natively and that pair cleanly with YALC's stateful orchestration:

| Layer | Skill |
|-------|-------|
| Source | `people-finder`, `list-builder`, `company-finder` |
| Reason | `icp-definer`, `persona-definer`, `linkedin-outbound-angle` |
| Write | `copywriting-first-touch`, `copywriting-follow-up`, `copywriting-vp-sequence`, `copywriting-manager-sequence`, `copywriting-ic-sequence`, `cta-designer`, `outbound-campaign-architect` |
| Loop | `reply-handler` |

Twenty-four other lemlist skills exist but are out of scope for YALC's GTM-OS surface (n8n tooling, slide decks, cold-call scripts, generic scrapers, CRM dedupe, etc.). Install any of them directly from the upstream repo if needed:

```sh
npx github:l3mpire/claude-skills <skill-name>
```

## Updating

To pull the latest version of any skill:

```sh
npx github:l3mpire/claude-skills --force --project <skill-name>
```

The `--project` flag writes to `./.claude/skills/`, matching this bundled layout.

## Attribution

All skill files in this directory are © lemlist and distributed under the MIT license as declared in the upstream repo's README. YALC reproduces them unmodified.

Upstream: https://github.com/l3mpire/claude-skills
Marketing page: https://www.lemlist.com/claude-skills
