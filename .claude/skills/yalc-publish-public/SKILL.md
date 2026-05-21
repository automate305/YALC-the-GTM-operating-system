---
name: yalc-publish-public
description: "Publishes merged changes from the internal YALC repo to the public repo. Handles the full cross-repo flow: detects or asks for the two remote names, validates the current branch is merged to internal main, computes what's new, creates a timestamped publish branch, pushes to the public remote, opens a GitHub PR, and generates a plain-English summary of what changed. Use when someone says 'publish to public', 'release to public', 'push to public repo', 'sync the public repo', 'ship to public', or 'how do I get my changes to users'."
version: 1.0.0
---

# Publish to Public

Once a skill or feature is merged into the internal repo's `main` branch, this skill handles the second hop: push those changes to the public repo and open a PR for a developer to review and merge.

The user never needs to touch git or GitHub directly. The skill handles remote detection, branch creation, push, PR creation, and a plain-English summary of what changed.

## When This Skill Applies

- "publish to public"
- "release to public"
- "push to public repo"
- "sync the public repo"
- "ship to public"
- "push my changes to the public repo"
- "how do I get my changes to users?"
- "my skill is merged — how do I release it?"

**NOT this skill:**
- User's branch is not merged yet → redirect to `yalc-gtm publish` first, then come back.
- User wants to open a PR in the internal repo → that's `yalc-gtm publish`.

---

## Configuration

The skill needs two values:
- **Internal remote name** — the git remote pointing to the internal repo (e.g. `origin`)
- **Public remote name** — the git remote pointing to the public-facing repo (e.g. `public`)

These are stored in `~/.gtm-os/publish-public.json` after the first run so the user is never asked again.

---

## Procedure

### Step 0 — Load or collect configuration

Check if config exists:
```bash
cat ~/.gtm-os/publish-public.json 2>/dev/null
```

**If the file exists** and has both `internalRemote` and `publicRemote`, use those values and skip to Step 1.

**If missing or incomplete**, first show the user their configured remotes:
```bash
git remote -v
```

Then ask in a single message:

> To set this up I need two things — you can see your remotes above:
>
> 1. **What is the name of your internal repo remote?** (the one pointing to the private/internal GitHub repo)
> 2. **What is the name of your public repo remote?** (the one pointing to the repo customers can see)

Once the user confirms both names, save them:
```bash
mkdir -p ~/.gtm-os
cat > ~/.gtm-os/publish-public.json << 'EOF'
{
  "internalRemote": "<confirmed-internal-name>",
  "publicRemote": "<confirmed-public-name>"
}
EOF
```

Confirm: "Config saved — I'll remember these for next time."

From here, refer to the two remotes as `$INTERNAL` and `$PUBLIC`.

---

### Step 1 — Check current branch is merged

Record the current branch so you can return to it at the end:
```bash
ORIGINAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)
```

If the result is `HEAD`, stop: "You're in a detached HEAD state — please checkout a named branch first."

If the branch is `main` or `master`, skip the merge check and continue to Step 2.

If it's any other branch, check whether it has been merged into internal main:
```bash
git fetch $INTERNAL main
git branch --merged $INTERNAL/main | grep -w "$ORIGINAL_BRANCH"
```

If it is **not** in the merged list, stop and warn:

> ⚠️ Your branch `<branch>` hasn't been merged into the internal repo's `main` yet.
>
> Before publishing to the public repo you need to:
> 1. Run `yalc-gtm publish` to push your branch and open a PR in the internal repo.
> 2. Ask a developer to review and merge it.
> 3. Come back here once it's merged.
>
> Want me to run `yalc-gtm publish` for you now?

If yes, run:
```bash
npx tsx src/cli/index.ts publish
```
Then stop — do not continue with the public publish flow until the user confirms their PR has been merged.

---

### Step 2 — Fetch both remotes and check for new commits

```bash
git fetch $INTERNAL main
git fetch $PUBLIC main
```

Count what's new in internal that public doesn't have:
```bash
git log $PUBLIC/main..$INTERNAL/main --oneline
```

If the output is **empty**, tell the user:

> The public repo is already up to date with the internal repo — nothing new to publish.

And stop.

Also check whether `$PUBLIC/main` has commits that `$INTERNAL/main` doesn't — this means someone pushed directly to the public repo:
```bash
git log $INTERNAL/main..$PUBLIC/main --oneline
```

Store the result as `$DIRECT_COMMITS`. If non-empty, note the count — this affects how Step 4 branches (merge strategy instead of simple checkout).

---

### Step 3 — Preview what will be published

Build a summary of the incoming changes:
```bash
git log $PUBLIC/main..$INTERNAL/main --oneline
git diff $PUBLIC/main..$INTERNAL/main --name-only
```

From the file list identify:
- New or changed skills (`**/.claude/skills/**`)
- New or changed CLI commands (`**/src/cli/commands/**`)
- New or changed documentation (`**/docs/**`)
- Any other notable changes

Present a preview to the user before touching anything:

> **Ready to publish the following to the public repo:**
>
> - [bullet per notable change — e.g. "New skill: `campaign-strategy`", "Updated: `qualify-leads`"]
>
> This will create a branch and open a PR in the public repo for a developer to review. Continue?

If `$DIRECT_COMMITS` is non-empty, add this block to the preview:

> ⚠️ **The public repo has X commit(s) that were pushed directly** (not through the internal repo). These will be preserved — the publish branch will merge both histories together. The PR diff will only show what's new from internal.

**Wait for an affirmative** ("yes", "go", "ship it", "do it", or equivalent) before proceeding. If the user wants to cancel, stop cleanly.

---

### Step 4 — Create branch and push

Generate a timestamp branch name:
```bash
TIMESTAMP=$(date +%Y-%m-%dT%H-%M-%S)
BRANCH="publish/public-${TIMESTAMP}"
```

**If `$DIRECT_COMMITS` is empty** (normal case — public is a clean ancestor of internal):
```bash
git checkout -b $BRANCH $INTERNAL/main
```

**If `$DIRECT_COMMITS` is non-empty** (public has direct commits — diverged histories):

Branch from `$PUBLIC/main` so those direct commits are the base, then merge `$INTERNAL/main` on top. This preserves both lines of history without rewriting any commit hashes:
```bash
git checkout -b $BRANCH $PUBLIC/main
git merge $INTERNAL/main --no-edit
```

If `git merge` reports conflicts, **stop immediately**:

> ⚠️ There's a merge conflict between the direct public commits and the internal changes. This needs a developer to resolve manually.
>
> Branch `<branch>` was created but not pushed. Pass this to a developer:
> ```
> git checkout <branch>
> git merge $INTERNAL/main
> # resolve conflicts, then:
> git push $PUBLIC <branch>
> gh pr create --repo <public-slug> --base main --head <branch>
> ```

Then clean up the local branch and return to the original branch. Do not push.

If merge succeeds, push to the public remote:
```bash
git push $PUBLIC $BRANCH
```

If push fails, surface the exact error and stop. Common causes:
- No write access → tell the user to check their GitHub permissions on the public repo.
- Remote not found → tell the user to check the remote name in `~/.gtm-os/publish-public.json`.

---

### Step 5 — Create the GitHub PR

Resolve the public repo's GitHub slug from its remote URL:
```bash
git remote get-url $PUBLIC
```

Parse owner/repo from the URL (handles both `https://github.com/owner/repo.git` and `git@github.com:owner/repo.git`).

Craft a PR title from the summary (e.g. `Release 2026-05-21: campaign-strategy skill + qualify-leads update`).

Craft a plain-English PR body (see format below), then create the PR:
```bash
gh pr create \
  --repo <public-slug> \
  --base main \
  --head $BRANCH \
  --title "<release-title>" \
  --body "<generated-body>"
```

**PR body format:**
```
## What's in this release

<bullet list of changes in plain English — no code, no jargon>

## Details

<one paragraph explaining what users will notice or benefit from>

---
_Published via yalc-publish-public — review and merge when ready._
```

If a PR already exists for this branch, retrieve its URL and continue without creating a duplicate.

---

### Step 6 — Write CHANGES.md and report

Write a `CHANGES.md` in the current directory (under 200 words, plain English, no jargon):
- What this release adds or changes
- What users will notice or benefit from
- Which skills or features are included

Then report to the user:

> ✅ **Done — changes are staged for the public repo.**
>
> - Branch pushed: `publish/public-<timestamp>`
> - PR opened: <pr-url>
> - CHANGES.md written to current directory
>
> A developer will review and merge the PR. Ping them with the PR link above.

---

### Step 7 — Return to original branch

```bash
git checkout $ORIGINAL_BRANCH
```

Confirm: "Back on `<original-branch>`."

---

## Hard Rules

1. **Never push directly to `$PUBLIC/main`.** Always branch + PR. A developer must merge.
2. **Always check the unmerged-branch warning before proceeding** (Step 1). Never skip it.
3. **Always show the Step 3 preview and wait for confirmation** before creating the branch or pushing anything.
4. **Save config after first run** — never ask for remote names more than once unless the user says they've changed.
5. **Surface git errors verbatim** — never swallow or paraphrase push/fetch failures.
6. **Never rebase, amend, or force-push.** When histories diverge, use `git merge` to combine them — it preserves commit hashes on both sides. Rebase rewrites hashes and creates divergence between the two repos.
7. **Always return the user to their original branch** at the end (Step 7).
8. **Always write CHANGES.md** — non-developer teammates read this to understand what shipped.

---

## Failure Modes

| Situation | Response |
|---|---|
| `gh` not installed | Tell the user; suggest running `yalc-gtm publish` first which auto-installs it |
| Not authenticated to `gh` | Run `gh auth login --web` and resume |
| Push rejected (no write access) | Tell the user to check GitHub permissions on the public repo |
| Both remotes resolve to the same URL | Warn: "Both remotes point to the same repo — check the names in `~/.gtm-os/publish-public.json`" |
| `~/.gtm-os/publish-public.json` has wrong remote names | Delete the file and restart Step 0 |
| User cancels at Step 3 preview | Stop cleanly, no branch created, no push |
| Merge conflict (diverged histories) | Stop, show the developer instructions block from Step 4, clean up local branch, return to original branch |
