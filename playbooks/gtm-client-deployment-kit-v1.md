# GTM Client Deployment Kit v1.0

**Audience:** Fractional GTM Operator, VA, or junior operator with basic SaaS tool experience
**Scope:** Full 5-day client stack deployment — from intake through handoff
**Stack:** Apollo · SmartLead · HubSpot · Cal.com · Make · Connect & Sell · Vercel (INTI Dashboard) · Google Workspace

---

## How to Use This Kit

Work through each section in order. Each section has an explicit output — do not move to the next section until that output exists.

| Section | Output |
|---|---|
| 1. Client Intake Form | Completed responses from client before Day 1 |
| 2. Variable Map | Credential vault populated, all 50 variables assigned |
| 3. .env Template | `.env.gtm-client` file created for this client |
| 4. Day-by-Day Deployment Schedule | Go / no-go decision for each day |
| 5. Make Scenario Blueprints | 4 scenarios active and tested |
| 6. Deployment SOP | Step-by-step execution log |
| 7. Client Handoff Checklist | Signed-off handoff package delivered |
| 8. Monthly Reporting Template | Live dashboard and Google Sheet running |

---

## Section 1: Client Intake Form

Send this form to the client at least 48 hours before Day 1. Nothing starts until all required questions are answered.

---

### SECTION 1 — Company and Offer

**Q1. What does your company do, in one or two sentences?**
- Why it is needed: Grounds every tool configuration — ICP filters, email copy, pipeline stage names, and dashboard labels all depend on this.
- Example: "We sell revenue forecasting software to mid-market SaaS CFOs."
- Required

**Q2. What is your primary product or service being sold through this GTM motion?**
- Why it is needed: SmartLead sequences and HubSpot pipeline stages are built around one offer at a time. Mixed offers create noise.
- Example: "Annual SaaS subscription, starting at $18k/year."
- Required

**Q3. What is the average deal size and typical sales cycle length?**
- Why it is needed: Determines HubSpot pipeline stage timing, follow-up cadence frequency, and which Make automation triggers matter most.
- Example: "$22k ACV, 45-day sales cycle."
- Required

---

### SECTION 2 — Ideal Customer Profile (ICP)

**Q4. What industries or verticals are you targeting?**
- Why it is needed: Apollo ICP filter — industry codes are mapped directly to search parameters.
- Example: "SaaS, fintech, HR tech."
- Required

**Q5. What company size range do you target (headcount and/or revenue)?**
- Why it is needed: Apollo company size filters. Prevents burning credits on leads that will never convert.
- Example: "50–500 employees, $5M–$100M ARR."
- Required

**Q6. What geographies are you targeting?**
- Why it is needed: Apollo location filters. Also determines SmartLead sending timezone windows and compliance requirements (GDPR, CAN-SPAM).
- Example: "United States, Canada, UK."
- Required

**Q7. What job titles or functions do you sell to? Who is the economic buyer vs. the champion?**
- Why it is needed: Apollo persona filters need exact title keywords. HubSpot contact roles are set from this.
- Example: "Champion: VP of Sales or Revenue Operations Manager. Economic buyer: CFO or CEO at companies under 200 employees."
- Required

**Q8. Are there industries, company types, or titles you want to explicitly exclude?**
- Why it is needed: Apollo negative filters prevent wasted enrichment credits and keeps lists clean.
- Example: "Exclude non-profits, government, staffing agencies, and consumer-only companies."
- Optional

**Q9. Do you have a list of existing customers or dream accounts to use as lookalike seeds?**
- Why it is needed: Apollo's lookalike search works best with seed accounts. This is the fastest path to a qualified list.
- Example: "Yes, attaching a CSV of 40 current customers."
- Optional

---

### SECTION 3 — Messaging and Email Sequences

**Q10. What is the core problem you solve, in your prospect's language (not yours)?**
- Why it is needed: Subject lines, openers, and CTAs must mirror how prospects describe their pain, not how you describe your solution.
- Example: "Sales reps spend 6 hours a week updating forecasts manually and still get it wrong at board meetings."
- Required

**Q11. What is your strongest proof point — a case study, stat, or customer result?**
- Why it is needed: The most effective cold email sequences anchor on one concrete proof point in the first or second touch.
- Example: "We helped Acme Corp reduce forecast errors by 43% in 90 days."
- Required

**Q12. What is the desired call-to-action — a call, a demo, a trial, or something else?**
- Why it is needed: The CTA drives the SmartLead sequence structure and the first HubSpot pipeline stage.
- Example: "15-minute discovery call booked via Calendly."
- Required

**Q13. Do you have any messaging or offers that have worked before?**
- Why it is needed: Reduces time to first reply. Existing copy that has generated responses is a better starting point than writing from scratch.
- Example: "A one-liner about their forecasting process in the first email gets replies. Demo offers get ignored cold."
- Optional

---

### SECTION 4 — Sales Process and HubSpot Pipeline

**Q14. Walk us through your current sales process from first contact to closed-won. What are the stages?**
- Why it is needed: HubSpot pipeline stage names, probabilities, and required fields are built directly from this.
- Example: "New Lead > Discovery Call Booked > Discovery Call Held > Demo Sent > Proposal Out > Negotiation > Closed Won / Closed Lost."
- Required

**Q15. What information do you need from a prospect before or after a discovery call to qualify them?**
- Why it is needed: Defines mandatory HubSpot deal and contact fields, which Make automations populate.
- Example: "Budget confirmed, decision-maker identified, current tool stack, timeline to decide."
- Required

**Q16. Who on your team handles which stage? Are there handoffs between SDRs and AEs?**
- Why it is needed: HubSpot owner assignment rules and Make automation routing depend on knowing who owns what.
- Example: "SDR owns through booked call. AE takes over after discovery call held."
- Optional

---

### SECTION 5 — Automation and Operations

**Q17. What happens when a prospect replies positively to an outbound email — what is the current manual process?**
- Why it is needed: This is the first Make automation to build. Mapping the current manual steps reveals exactly what to automate.
- Example: "I manually copy their info into HubSpot, create a deal, send them a Calendly link, and Slack my AE."
- Required

**Q18. What other repetitive tasks does your team do today that feel like they should be automatic?**
- Why it is needed: Surfaces the backlog of Make scenarios. Prioritized at setup to avoid scope creep.
- Example: "Moving deals to next stage after a meeting is logged. Sending follow-up if a deal sits idle for 7 days."
- Optional

**Q19. What tools are you currently using that need to connect into this stack?**
- Why it is needed: Make's integration map. Any tool not in the standard stack needs a custom HTTP module or workaround flagged before setup begins.
- Example: "Calendly for booking, Slack for internal alerts, Notion for meeting notes, Loom for async demos."
- Required

---

### SECTION 6 — Reporting and INTI Dashboard

**Q20. What are the 3–5 numbers your leadership team looks at every week to know if GTM is working?**
- Why it is needed: INTI dashboard widgets are built around these. If leadership does not see their numbers on the home screen, they will not use the dashboard.
- Example: "Emails sent, reply rate, calls booked, calls held, pipeline value added this week."
- Required

**Q21. Do you have any revenue targets, quota numbers, or benchmarks to display as goal lines?**
- Why it is needed: INTI's goal-tracking tiles require a target number. Without it, the dashboard shows activity but not progress toward anything.
- Example: "Goal is 20 discovery calls per month and $150k new pipeline per month."
- Optional

---

### SECTION 7 — Access and Launch Readiness

**Q22. Which tools do you already have active accounts for, and which do you need provisioned?**
- Why it is needed: Determines setup timeline and whether the first session is configuration or procurement. Missing tools block everything downstream.
- Example: "Have HubSpot (Sales Pro) and Apollo (Basic). Need SmartLead and Make provisioned."
- Required

**Q23. Who is the internal point of contact who will have admin access and answer setup questions during onboarding?**
- Why it is needed: Every Make scenario and HubSpot workflow needs an owner. Without a named contact, approvals and credential sharing stall the build.
- Example: "Maria Chen, RevOps Manager, maria@company.com, available M–Th 9am–5pm ET."
- Required

**Q24. Are there any legal, compliance, or brand constraints we need to know before writing emails or configuring tools?**
- Why it is needed: GDPR suppression lists, brand voice guidelines, and legal-approved disclaimers must be baked in before first send.
- Example: "We are GDPR-compliant, must suppress EU contacts unless opted in. Legal requires no ROI guarantees in writing."
- Optional

---

### Intake Form Summary

| Section | Questions | Required | Optional |
|---|---|---|---|
| Company and Offer | 1–3 | 3 | 0 |
| ICP | 4–9 | 5 | 2 |
| Messaging and Sequences | 10–13 | 3 | 1 |
| Sales Process and HubSpot | 14–16 | 2 | 1 |
| Automation and Ops | 17–19 | 2 | 1 |
| Reporting and INTI | 20–21 | 1 | 1 |
| Access and Launch | 22–24 | 2 | 1 |
| **Total** | **24** | **18** | **6** |

**Operator notes:**
- Send Q1–Q9 first as a pre-call worksheet. Most clients fill it out in 20 minutes and it makes the intake call 3x faster.
- Q14 (sales stages) and Q17 (reply process) are the two questions most clients underestimate. Map these on a whiteboard or shared doc during the intake call — do not expect a written answer.
- If a client cannot answer Q10 (pain in the prospect's language), do not proceed to sequence writing. That answer is the foundation of every email.
- Q9 and Q13 are optional but dramatically accelerate setup when provided. Worth a verbal nudge.

---

## Section 2: Variable Map (Per-Client Swap Sheet)

Populate every variable below before activating any SmartLead campaign or Make scenario. Store all values in the Make Data Store (keyed by `CLIENT_SLUG`) and mirror them to the credential vault. Variables marked "client provides" must come from the intake form before operator setup begins.

---

### Category 1: Client Identity

| Variable Name | Used In | How to Get It | Example Value |
|---|---|---|---|
| `CLIENT_COMPANY_NAME` | Apollo, SmartLead, HubSpot, Make, Dashboard | Client provides | `Acme Corp` |
| `CLIENT_DOMAIN` | Apollo (org enrich), HubSpot, Make (dedup key), Dashboard | Client provides | `acmecorp.com` |
| `CLIENT_PRIMARY_CONTACT_NAME` | SmartLead (sender name), HubSpot (owner), Make | Client provides | `Sarah Johnson` |
| `CLIENT_PRIMARY_CONTACT_EMAIL` | SmartLead (sending mailbox), HubSpot, Make | Client provides | `sarah@acmecorp.com` |
| `CLIENT_PRIMARY_CONTACT_TITLE` | SmartLead (signature), HubSpot | Client provides | `VP of Sales` |
| `CLIENT_INDUSTRY` | Apollo (search filter), SmartLead (template var), HubSpot | Client provides | `B2B SaaS` |
| `CLIENT_COMPANY_SIZE` | HubSpot (property), Dashboard (context) | Client provides | `50` |
| `CLIENT_COMPANY_LINKEDIN_URL` | Apollo (org enrichment), HubSpot | Client provides | `linkedin.com/company/acme-corp` |
| `CLIENT_TIMEZONE` | SmartLead (send windows), Make (scheduling), Dashboard | Client provides | `America/New_York` |
| `CLIENT_SLUG` | Make (workflow IDs), Dashboard (routing), all table names | Operator sets (kebab-case of company name) | `acme-corp` |

---

### Category 2: API Keys and Tokens

| Variable Name | Used In | How to Get It | Example Value |
|---|---|---|---|
| `APOLLO_API_KEY` | Apollo (people/org search, enrichment, sequences) | Apollo Settings > API Keys | `ak_live_abc123...` |
| `SMARTLEAD_API_KEY` | SmartLead (campaign create, mailbox sync, lead push) | SmartLead Settings > API | `sl_live_xyz789...` |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot (contact/company create, deal sync, owner lookup) | Operator installs private app in HubSpot; client approves scopes | `pat-na1-abc...` |
| `HUBSPOT_PORTAL_ID` | HubSpot (all API calls), Make (HubSpot module config) | Extracted from HubSpot account URL or API response | `12345678` |
| `MAKE_API_KEY` | Make (scenario management, webhook creation) | Make Profile > API | `make_abc123...` |
| `MAKE_TEAM_ID` | Make (scenario scoping) | Make org settings or API | `98765` |
| `OXYGEN_API_KEY` | Oxygen (all enrichment, table ops, workflow runs) | Operator provisions per-client tenant or shared key | `oxy_sk_...` |
| `SMARTLEAD_SENDING_ACCOUNT_ID` | SmartLead (campaign assignment) | SmartLead Settings > Email Accounts after mailbox setup | `sl_acct_42` |
| `HUBSPOT_OWNER_ID` | HubSpot (contact/deal assignment) | HubSpot Owners API after connecting | `85412369` |

---

### Category 3: ICP Definition

| Variable Name | Used In | How to Get It | Example Value |
|---|---|---|---|
| `ICP_TARGET_TITLES` | Apollo (people search), SmartLead (list filter), Dashboard | Client provides or operator drafts and client approves | `VP of Sales, Head of Revenue, CRO` |
| `ICP_TARGET_TITLES_EXCLUDED` | Apollo (exclusion filter), Oxygen (formula column) | Client provides | `Intern, Assistant, Coordinator` |
| `ICP_TARGET_COMPANY_SIZE_MIN` | Apollo (filter), HubSpot (segmentation), Dashboard | Client provides | `50` |
| `ICP_TARGET_COMPANY_SIZE_MAX` | Apollo (filter), HubSpot (segmentation), Dashboard | Client provides | `500` |
| `ICP_TARGET_INDUSTRIES` | Apollo (filter), SmartLead (tag), Oxygen (scoring prompt) | Client provides | `SaaS, Fintech, HR Tech` |
| `ICP_TARGET_INDUSTRIES_EXCLUDED` | Apollo (exclusion), Oxygen (disqualifier column) | Client provides | `Government, Non-profit, Education` |
| `ICP_TARGET_GEOGRAPHIES` | Apollo (location filter), SmartLead (segment), Dashboard | Client provides | `United States, Canada` |
| `ICP_TARGET_TECHNOLOGIES` | Apollo (tech filter), Oxygen (signal column) | Client provides | `Salesforce, HubSpot, Outreach` |
| `ICP_DISQUALIFIER_KEYWORDS` | Oxygen (AI disqualifier column), HubSpot (workflow filter) | Client provides | `no budget, not a fit, using competitor` |
| `ICP_BUYING_SIGNALS` | Oxygen (AI scoring column), Apollo (intent filter) | Client provides or operator drafts | `hiring SDRs, Series B funded, new VP of Sales` |
| `ICP_MIN_SCORE_TO_CONTACT` | Oxygen (routing formula), Make (conditional step) | Operator sets after pilot review | `70` |

---

### Category 4: Messaging Variables

| Variable Name | Used In | How to Get It | Example Value |
|---|---|---|---|
| `MSG_SENDER_FIRST_NAME` | SmartLead (email from), all templates `{{first_name}}` | Client provides | `Sarah` |
| `MSG_COMPANY_ONE_LINER` | SmartLead (sequence step 1), HubSpot (email template) | Client provides | `We help SaaS teams cut churn by 30% in 90 days` |
| `MSG_PRIMARY_PAIN_POINT` | SmartLead (all steps), Oxygen (personalization prompt) | Client provides | `reps spending 3+ hours/day on manual prospecting` |
| `MSG_PRIMARY_OFFER` | SmartLead (CTA), HubSpot (deal type), Dashboard | Client provides | `Free 30-min pipeline audit` |
| `MSG_SOCIAL_PROOF` | SmartLead (step 2–3), Oxygen (AI copy column) | Client provides | `Used by 200+ SaaS teams including Deel and Rippling` |
| `MSG_TONE` | Oxygen (AI prompt modifier), SmartLead (template guidance) | Operator sets after reviewing brand guidelines | `Direct and confident, no fluff` |
| `MSG_CTA_TEXT` | SmartLead (all steps), HubSpot (email CTA) | Client provides | `Worth a 15-min call this week?` |
| `MSG_CALENDAR_LINK` | SmartLead (all steps), HubSpot (email template) | Cal.com event URL | `cal.com/sarah-acme/15min` |
| `MSG_DIFFERENTIATOR` | Oxygen (AI column), SmartLead (step 2) | Client provides | `No long-term contract, results in 30 days or free` |
| `MSG_COMPETITOR_DISPLACEMENT_ANGLE` | Oxygen (AI column), SmartLead (step 3) | Client provides or operator drafts | `Unlike [Competitor], we don't lock you into annual deals` |

---

### Category 5: Automation Settings

| Variable Name | Used In | Safe Default | Example Value |
|---|---|---|---|
| `SEQ_STEP_1_DELAY_DAYS` | SmartLead (sequence config), Make (wait step) | `0` | `0` |
| `SEQ_STEP_2_DELAY_DAYS` | SmartLead (sequence config), Make (wait step) | `3` | `3` |
| `SEQ_STEP_3_DELAY_DAYS` | SmartLead (sequence config), Make (wait step) | `5` | `5` |
| `SEQ_STEP_4_DELAY_DAYS` | SmartLead (sequence config), Make (wait step) | `7` | `7` |
| `SEQ_TOTAL_STEPS` | SmartLead, Make (loop count), Dashboard | `4` | `4` |
| `SEQ_SEND_WINDOW_START` | SmartLead (send settings) | `08:00` | `08:00` |
| `SEQ_SEND_WINDOW_END` | SmartLead (send settings) | `17:00` | `17:00` |
| `SEQ_SEND_DAYS` | SmartLead (send settings) | `Mon–Fri` | `Monday,Tuesday,Wednesday,Thursday,Friday` |
| `SEQ_MAX_NEW_LEADS_PER_DAY` | SmartLead (campaign limit), Make (batch throttle) | `40` | `40` |
| `SEQ_DAILY_EMAIL_CAP` | SmartLead (account-level), Make (rate limiter) | `80` | `80` |
| `ENRICHMENT_BATCH_CAP` | Oxygen (columns run --limit), Make (batch size) | `100` | `100` |
| `ENRICHMENT_CREDIT_CAP` | Oxygen (--credit-cap flag), Dashboard | `500` | `500` |
| `HUBSPOT_PIPELINE_STAGE_CONTACTED` | HubSpot (deal create), Make (deal sync step) | — | `appointmentscheduled` |
| `HUBSPOT_PIPELINE_STAGE_REPLIED` | HubSpot (deal update), Make (reply webhook handler) | — | `qualifiedtobuy` |
| `HUBSPOT_PIPELINE_ID` | HubSpot (all deal writes), Make | `default` | `default` |
| `MAKE_SCENARIO_WEBHOOK_URL` | Make (inbound webhook), SmartLead, Oxygen | Auto-generated by Make | `https://hook.us1.make.com/abc123` |
| `REPLY_STOP_KEYWORDS` | SmartLead (auto-pause), Oxygen (reply classifier) | `unsubscribe, not interested, remove me, opt out` | — |
| `AUTO_QUALIFY_POSITIVE_REPLY_KEYWORDS` | Make (conditional), Oxygen (reply classifier) | — | `yes, interested, tell me more, let's chat, send calendar` |

---

### Variable Map Usage Notes

**Storage:** Store all variables in a single client config record in the Make Data Store keyed by `CLIENT_SLUG`. Reference them via `{{variables.VAR_NAME}}` in every scenario. Mirror read-only copies into an Oxygen workspace context profile so AI columns and scoring prompts can reference them without hardcoding.

**Rotation policy:** All `*_API_KEY` and `*_ACCESS_TOKEN` variables should be rotated at client offboarding or on a 90-day cycle. All other variables are stable for the duration of the engagement unless the client requests a change.

**Deployment gate:** All 50 variables must be populated before activating any SmartLead campaign or Make scenario for a new client.

---

## Section 3: .env Template

Save this file as `.env.gtm-client` in the project root. Copy the template, rename it for the client (e.g. `.env.acme-corp`), and fill in every value before running any Make scenario or Oxygen enrichment job.

```env
# ============================================================
# GTM Client Deployment Kit — Environment Variables
# One file per client. Never commit this file to version control.
# ============================================================

# --- CLIENT METADATA ---
GTM_OS_TENANT=                      # CLIENT_SLUG value (kebab-case, e.g. acme-corp)

# --- ANTHROPIC ---
ANTHROPIC_API_KEY=                  # Required for all AI enrichment columns and Oxygen prompts

# --- APOLLO ---
APOLLO_API_KEY=                     # Required — Apollo Settings > Integrations > API Keys
APOLLO_ORG_ID=                      # Optional — found in Apollo account URL

# --- SMARTLEAD ---
SMARTLEAD_API_KEY=                  # Required — SmartLead Settings > API Key
SMARTLEAD_DEFAULT_CAMPAIGN_ID=      # Optional — populated after Day 4 campaign creation
SMARTLEAD_WEBHOOK_SECRET=           # Optional — set when configuring SmartLead reply webhook

# --- HUBSPOT ---
HUBSPOT_ACCESS_TOKEN=               # Required — Private App token (pat-na1-...). NOT a legacy API key.
                                    # Create at: HubSpot > Settings > Integrations > Private Apps > Create
HUBSPOT_PORTAL_ID=                  # Optional — found in HubSpot account URL (/contacts/XXXXXXXX/)

# --- NOTION ---
NOTION_API_KEY=                     # Required if using Notion integration
NOTION_LEADS_DB_ID=                 # Required if using Notion leads database
NOTION_CAMPAIGNS_DB_ID=             # Required if using Notion campaigns database
NOTION_COMPANIES_DB_ID=             # Optional
NOTION_ICP_PAGE_ID=                 # Optional — page ID of the ICP definition doc

# --- CAL.COM ---
CAL_API_KEY=                        # Optional — Cal.com Settings > Developer > API Keys
CAL_USERNAME=                       # Optional — your Cal.com username (for booking URL construction)
CAL_DEFAULT_EVENT_TYPE=             # Optional — slug of default event type (e.g. 15min)

# --- GOOGLE OAUTH ---
# This section is OAuth 2.0 — not a simple API key.
# Steps: (1) Create a project in Google Cloud Console
#        (2) Enable Gmail API and Google Sheets API
#        (3) Create OAuth 2.0 credentials (Web application)
#        (4) Set authorized redirect URI to: [YALC_BASE_URL]/api/auth/callback/google
AUTH_GOOGLE_ID=                     # Optional — OAuth Client ID from Google Cloud Console
AUTH_GOOGLE_SECRET=                 # Optional — OAuth Client Secret from Google Cloud Console
AUTH_SECRET=                        # Optional — random string (run: openssl rand -base64 32)
ALLOWED_EMAILS=                     # Optional — comma-separated list of emails allowed to sign in

# --- MAKE WEBHOOKS ---
# One URL per automation event. Copy webhook URL from Make after creating each scenario.
MAKE_WEBHOOK_LEAD_QUALIFIED=        # Optional — GTM-001 New Lead Intake webhook URL
MAKE_WEBHOOK_CAMPAIGN_LAUNCHED=     # Optional — campaign launch trigger webhook URL
MAKE_WEBHOOK_REPLY_RECEIVED=        # Optional — GTM-003 SmartLead reply handler webhook URL
MAKE_WEBHOOK_MEETING_BOOKED=        # Optional — GTM-002 Cal.com booking webhook URL
MAKE_WEBHOOK_DEAL_STAGE_CHANGED=    # Optional — HubSpot deal stage change webhook URL
MAKE_WEBHOOK_CUSTOM=                # Optional — spare webhook for client-specific automations

# --- CONNECT & SELL ---
# Note: Connect & Sell does not have a self-serve API portal.
# Webhook URL and API key must be provisioned by a Connect & Sell account rep.
# Contact C&S support before Day 1 to request these credentials.
CONNECTANDSELL_INBOUND_WEBHOOK_URL= # Optional — URL Make posts call data to
CONNECTANDSELL_API_KEY=             # Optional — provided by C&S account team
CONNECTANDSELL_WEBHOOK_SECRET=      # Optional — provided by C&S account team
CONNECTANDSELL_DEFAULT_LIST_ID=     # Optional — populated after Day 4 list upload

# --- INFRASTRUCTURE ---
# The following variables are auto-generated by the YALC setup wizard.
# Do not edit manually unless you know what you are doing.
DATABASE_URL=                       # Auto-generated by: yalc-gtm start
ENCRYPTION_KEY=                     # Auto-generated — 32-byte hex string
TURSO_AUTH_TOKEN=                   # Auto-generated by Turso provisioning
GTM_OS_API_TOKEN=                   # Auto-generated — operator-facing API token
MCP_SERVER_TOKEN=                   # Auto-generated — MCP authentication token
YALC_BASE_URL=                      # Set to your Vercel deployment URL (e.g. https://acme-corp.vercel.app)
YALC_SLACK_WEBHOOK_URL=             # Optional — Slack incoming webhook for system alerts
```

---

## Section 4: Day-by-Day Deployment Schedule

**Total operator time:** ~29 hours over 5 business days
**Total client time required:** ~6 hours across all 5 days

The most important thing to protect: DNS on Day 1 and intake materials before Day 1. Everything downstream depends on those two.

---

### What the Client Must Provide Before Day 1

Send this as a pre-onboarding intake form. Nothing starts until these are in hand.

**Access / Credentials**

| Item | Tool | Notes |
|---|---|---|
| Google Workspace admin access | Gmail, Calendar, Sheets | Operator needs to create aliases, connect OAuth |
| HubSpot portal ID + admin seat | HubSpot | Free trial acceptable; Sales Hub Starter minimum recommended |
| Apollo.io admin access | Apollo | Owner seat, not just member |
| SmartLead account credentials | SmartLead | Or operator creates under agency account |
| Cal.com account (or invite) | Cal.com | Team plan if routing to multiple reps |
| Make.com account | Make | Operator can create under agency; client pays plan |
| Connect & Sell account | Connect & Sell | License must be provisioned by C&S rep — flag immediately if not done |
| Vercel project access or deploy token | INTI Dashboard | Read/write on the repo or deploy hook URL |
| Domain DNS access | Google Workspace / SmartLead | For email warm-up subdomains and SPF/DKIM/DMARC |

**Information**

| Item | Why It Is Needed |
|---|---|
| ICP definition (industry, company size, titles, geos) | Apollo filters, HubSpot pipeline stages, lead scoring |
| Offer / positioning doc (1 pager or deck) | Sequence copy, call scripts, Cal.com booking page language |
| Existing contact list (CSV if available) | Seed HubSpot, skip re-sourcing already-known accounts |
| Sales rep name(s) + email(s) | Cal.com routing, HubSpot deal owner, Connect & Sell seat assignment |
| Desired reply-to and sending domain | SmartLead warm-up setup, SPF/DKIM records |
| Monthly outbound volume target | Determines sequence throttle settings and SmartLead mailbox count |
| CRM stage naming preferences | HubSpot pipeline configuration |
| Booking availability preferences | Cal.com event types and buffer times |

---

### DAY 1 — Foundation: Access, Accounts, and DNS

**Operator Goal:** No paid work before this is solid. Everything else depends on DNS and auth.

**Time budget:** 6 hrs operator / 1 hr client

#### Morning (Hours 1–3): Access Audit
- Confirm all credentials from intake are received and test login for each tool
- Identify any missing access and escalate to client same day — do not let this slip to Day 2
- Flag Connect & Sell license status — if not provisioned, contact C&S rep immediately; this has the longest third-party lead time
- Create a shared internal credential doc (encrypted; 1Password or Bitwarden recommended) with all logins, API keys, and account IDs

#### Afternoon (Hours 4–6): DNS and Email Infrastructure
- **Google Workspace:** Verify domain is connected, MX records are live, admin console is accessible
- **SmartLead warm-up subdomain:** Create a sending subdomain (e.g. `outreach.clientdomain.com`) separate from the main domain
- Publish SPF, DKIM, and DMARC records for the sending subdomain
- Add sending mailboxes in SmartLead (minimum 3 for a new domain; 1 per 30–40 emails/day target)
- Start warm-up ON for all mailboxes — warm-up takes 2+ weeks but must start Day 1
- **Apollo:** Log in, confirm API key is accessible under Settings > API
- **HubSpot:** Verify portal access, confirm admin role, note portal ID

#### Day 1 Checkpoint
- [ ] All tools accessible
- [ ] DNS records published (verify with MXToolbox or mail-tester.com)
- [ ] SmartLead mailboxes created and warm-up started
- [ ] Connect & Sell provisioning confirmed or escalated
- [ ] Credential doc shared securely with client

---

### DAY 2 — CRM, Booking, and Lead Foundation

**Operator Goal:** HubSpot is configured, Cal.com is live, first contacts are imported.

**Time budget:** 6 hrs operator / 30 min client (ICP review)

#### Morning (Hours 1–3): HubSpot Pipeline Setup
- Create or configure the deal pipeline with agreed stage names
- Create custom contact properties: `ICP Tier`, `Outbound Source`, `Last Sequence`, `Connect & Sell Status`
- Create custom deal properties: `Close Month`, `ARR`, `Deal Source`
- Import any existing contact CSV from client — map fields carefully, deduplicate on email
- Set up lead owner(s) and team structure
- Connect Google Calendar to HubSpot (for activity logging)
- Install HubSpot Gmail extension on rep(s)' browsers

#### Afternoon (Hours 4–6): Cal.com and HubSpot Integration
- Create event types in Cal.com: `15-Min Intro Call`, `30-Min Discovery`, `60-Min Demo`
- Set availability, buffers, and confirmation email copy
- Add Cal.com booking link to HubSpot contact/deal records via a custom URL property
- Configure Cal.com webhook to Make (this Make scenario built on Day 3): when booking confirmed, create/update HubSpot contact and deal, notify rep via Gmail

#### Apollo: ICP Filter Setup
- Log into Apollo, build and save a search using client's ICP (industry, headcount, title, geo)
- Do NOT start sequences yet — sequences go live on Day 4
- Export a sample of 50–100 contacts to verify quality with client before full pull
- Verify Apollo API key is working (needed for Make automations)

#### Day 2 Checkpoint
- [ ] HubSpot pipeline and custom properties live
- [ ] Existing contacts imported to HubSpot
- [ ] Cal.com event types published and tested (do a test booking yourself)
- [ ] Apollo ICP search saved and sample reviewed
- [ ] Gmail and Calendar connected to HubSpot for reps

---

### DAY 3 — Make Automations and INTI Dashboard

**Operator Goal:** The plumbing runs. Data flows between tools without manual intervention.

**Time budget:** 7 hrs operator

#### Morning (Hours 1–4): Make Scenario Build

Build these scenarios in order of priority:

**Scenario 1 — Cal.com Booking to HubSpot (Critical)**
- Trigger: Cal.com webhook (booking created)
- Actions: Search HubSpot for existing contact by email. If exists: update stage to "Discovery Booked" + log activity. If new: create contact + deal, assign to rep, send rep notification via Gmail.

**Scenario 2 — Apollo to HubSpot Contact Sync**
- Trigger: Webhook from Apollo (new contact added to sequence)
- Actions: Create/update HubSpot contact with `Outbound Source: Apollo`, tag with sequence name, set lifecycle stage to `Lead`

**Scenario 3 — SmartLead Reply Handler**
- Trigger: SmartLead webhook (reply received)
- Actions: Find HubSpot contact by email, move to `Contacted` stage, log email activity, notify rep via Gmail, optionally pause contact in SmartLead sequence

**Scenario 4 — Connect & Sell to HubSpot Call Log**
- Trigger: Connect & Sell webhook (call completed)
- Actions: Find HubSpot contact, log call activity with outcome and duration. If meeting booked flag is present: move to `Discovery Booked` stage.

**Scenario 5 — Daily Reporting to Google Sheets**
- Trigger: Scheduled (daily at 7am)
- Actions: Pull HubSpot pipeline summary (deals by stage, new contacts) + SmartLead stats (sends, opens, replies), write to Google Sheet, update INTI Dashboard data source.

#### Afternoon (Hours 5–6): INTI Dashboard
- Pull the Vercel-hosted dashboard repo or connect to deploy hook
- Confirm the data source format the dashboard expects (usually a JSON endpoint or Google Sheets API)
- Wire the Google Sheet from Scenario 5 as the INTI Dashboard data source
- Deploy and verify the dashboard loads with real (or test) data
- Share the dashboard URL with the client for preview

#### Day 3 Checkpoint
- [ ] All 5 Make scenarios active and tested end-to-end with test data
- [ ] At least one test booking flowing Cal.com to HubSpot automatically
- [ ] INTI Dashboard live at Vercel URL and showing data
- [ ] Google Sheet report populating daily

---

### DAY 4 — Sequences, Dialer, and First Sends

**Operator Goal:** Outbound is live. First real contacts are in motion.

**Time budget:** 6 hrs operator / 2 hrs rep

#### Morning (Hours 1–3): Apollo Sequence Setup
- Build the first outbound email sequence in Apollo (recommended: 5-step, 14-day cadence)
  - Step 1 Day 0: Intro email (personalized first line, clear value prop, soft CTA)
  - Step 2 Day 3: Follow-up (different angle, add social proof)
  - Step 3 Day 7: Value-add (case study, resource, or insight)
  - Step 4 Day 10: Breakup attempt ("Last reach out...")
  - Step 5 Day 14: Final + different channel nudge
- Pull the validated ICP list from Day 2 (start with 200–300 contacts max)
- Enroll contacts — do NOT exceed SmartLead warm-up-safe volume (under 50/day per mailbox for weeks 1–2)
- Set reply handling: auto-pause on reply, auto-remove on unsubscribe

#### Morning Parallel: SmartLead Campaign Setup
- Create a campaign in SmartLead linked to the same sending mailboxes
- Load the Apollo sequence copy into SmartLead
- Set sending limits: start at 30–40 emails/day per mailbox
- Enable open tracking and click tracking

#### Afternoon (Hours 4–6): Connect & Sell
- Confirm dialer is provisioned (if still pending, use this time to pressure the C&S rep)
- Upload call list from HubSpot contacts in `New Lead` or `Contacted` stage
- Set up call script in Connect & Sell (import from client's offer doc)
- Assign list to rep(s)
- Do a live test call with the rep to confirm audio quality and HubSpot logging
- Set dial goals: recommend 80–100 dials/day per rep for a cold list

#### Day 4 Checkpoint
- [ ] Apollo sequence live with first batch enrolled
- [ ] SmartLead campaign active (within safe send limits)
- [ ] Connect & Sell dialer tested and call list loaded
- [ ] First sends confirmed in Apollo/SmartLead dashboards
- [ ] Make Scenarios 2 and 4 firing on real data

---

### DAY 5 — QA, Training, and Handoff

**Operator Goal:** Client can operate without the operator present. Everything is documented and tested.

**Time budget:** 4 hrs operator / 2 hrs client

#### Morning (Hours 1–3): End-to-End QA Pass
- [ ] Book a test meeting via Cal.com — verify HubSpot contact created/updated, rep notified
- [ ] Send a test email from SmartLead — verify Make reply handler fires on reply
- [ ] Log a test call in Connect & Sell — verify HubSpot activity appears
- [ ] Check INTI Dashboard — verify yesterday's data is correct
- [ ] Open Google Sheets report — confirm daily automation ran
- [ ] Pull Apollo sequence stats — confirm sends are within throttle limits
- [ ] Review HubSpot pipeline — all contacts from sequences present and in correct stage

Fix any broken connections before the client walkthrough.

#### Afternoon (Hours 4–6): Client Training and Handoff Session

Walkthrough order (1.5–2 hours via Loom or live call):
1. INTI Dashboard — how to read it, what each metric means
2. HubSpot pipeline — how to move deals, log activities, use the Gmail extension
3. Cal.com — how to adjust availability, create new event types
4. Apollo — how to add contacts to sequences, pause/resume, read sequence stats
5. SmartLead — how to check deliverability health, pause a campaign if reply spike
6. Connect & Sell — rep walkthrough of daily dial flow
7. Make — do NOT train client to edit scenarios; train them to identify when something broke (show error logs)
8. Escalation path — review who to contact for each tool if something breaks

---

## Section 5: Make Scenario Blueprints

Four reusable scenarios. Swap the `{{CLIENT_*}}` variables per client — the wiring stays identical.

**Recommended deployment order:** Blueprint 1 → 2 → 3 → 4.
Blueprint 3 depends on the same Cal.com webhook secret as Blueprint 2. Blueprint 4 depends on HubSpot stage IDs confirmed during Blueprints 1 and 2.

**Total setup time for all 4 blueprints per new client:** 2–2.5 hours

---

### Blueprint 1: New Lead Intake

**Scenario name:** `GTM-001 | New Lead Intake`
**Description:** Captures inbound leads from any source, enriches them, creates a HubSpot contact/deal, and enrolls the contact in an Apollo outbound sequence.
**Trigger:** Webhook (instant) — a single generic endpoint receives payloads from any form, chatbot, ad platform, or manual CSV import.

| # | App | Module | Action |
|---|---|---|---|
| 1 | Webhooks | Custom Webhook | Receive lead payload (name, email, company, source) |
| 2 | Tools by Make | Set Variables | Normalize field names to internal schema |
| 3 | Apollo.io | Match Person | Enrich lead — returns title, company size, industry, LinkedIn |
| 4 | HubSpot | Search Contacts | Check if contact already exists (dedupe by email) |
| 5 | Router | Route | Branch: Existing contact → update only. New contact → create |
| 6A | HubSpot | Create Contact | New contact with enriched fields |
| 6B | HubSpot | Update Contact | Append source, update lifecycle stage |
| 7 | HubSpot | Create Deal | New deal in intake pipeline, stage = "New Lead" |
| 8 | Apollo.io | Add Contact to Sequence | Enroll in outbound email sequence |
| 9 | Tools by Make | Set Variables | Build Slack notification payload |
| 10 | Slack | Create a Message | Post to `#new-leads` channel with name, company, source |

**Variables to swap per client:**

| Variable | Description |
|---|---|
| `{{CLIENT_WEBHOOK_SECRET}}` | Webhook authentication token |
| `{{CLIENT_HUBSPOT_PIPELINE_ID}}` | HubSpot pipeline to create deals in |
| `{{CLIENT_HUBSPOT_STAGE_ID_NEW}}` | Deal stage ID for "New Lead" |
| `{{CLIENT_HUBSPOT_OWNER_ID}}` | Default deal owner (sales rep) |
| `{{CLIENT_APOLLO_SEQUENCE_ID}}` | Apollo sequence to enroll new leads |
| `{{CLIENT_APOLLO_EMAIL_ACCOUNT_ID}}` | Sending mailbox in Apollo |
| `{{CLIENT_SLACK_CHANNEL_ID}}` | Slack channel for lead alerts |
| `{{CLIENT_LEAD_SOURCE_TAG}}` | Default source label if not passed in payload |

**Estimated setup time per client:** 25–35 minutes

---

### Blueprint 2: Meeting Booked

**Scenario name:** `GTM-002 | Meeting Booked`
**Description:** Fires when a Cal.com booking is confirmed — updates HubSpot deal stage, notifies the owner in Slack, and logs the meeting to a Google Sheets tracker.
**Trigger:** Webhook (instant) — Cal.com sends a booking confirmation webhook on every new event.

| # | App | Module | Action |
|---|---|---|---|
| 1 | Webhooks | Custom Webhook | Receive Cal.com booking payload |
| 2 | Tools by Make | Set Variables | Extract: attendee email, meeting time, event type, invitee name |
| 3 | HubSpot | Search Contacts | Find contact by attendee email |
| 4 | HubSpot | Search Deals | Find open deal associated with contact |
| 5 | HubSpot | Update Deal | Move deal to `{{CLIENT_HUBSPOT_STAGE_ID_MEETING_BOOKED}}` |
| 6 | HubSpot | Create Engagement (Meeting) | Log meeting on contact timeline with Cal.com link |
| 7 | Slack | Create a Message | Notify deal owner with attendee name, time, and meeting link |
| 8 | Google Sheets | Add a Row | Append meeting record to tracker sheet |

**Variables to swap per client:**

| Variable | Description |
|---|---|
| `{{CLIENT_CALCOM_WEBHOOK_SECRET}}` | Cal.com webhook secret for verification |
| `{{CLIENT_HUBSPOT_STAGE_ID_MEETING_BOOKED}}` | Deal stage ID for "Meeting Booked" |
| `{{CLIENT_HUBSPOT_PIPELINE_ID}}` | Pipeline to search deals within |
| `{{CLIENT_SLACK_OWNER_USER_ID}}` | Slack user ID of the sales rep to DM |
| `{{CLIENT_SLACK_CHANNEL_ID}}` | Optional team channel for visibility |
| `{{CLIENT_GSHEETS_SPREADSHEET_ID}}` | Google Sheets file ID for the meetings log |
| `{{CLIENT_GSHEETS_SHEET_NAME}}` | Tab name within the spreadsheet |
| `{{CLIENT_MEETING_TYPE_LABEL}}` | Label for this event type (e.g. "Discovery", "Demo") |

**Estimated setup time per client:** 20–30 minutes

---

### Blueprint 3: No-Show Recovery

**Scenario name:** `GTM-003 | No-Show Recovery`
**Description:** Detects missed meetings via a Cal.com no-show webhook or a scheduled poll, updates HubSpot, removes the contact from the active sequence, and sends a recovery re-book email via Apollo.
**Trigger:** Webhook (instant) — Cal.com fires a `booking.noShowUpdated` event. Fallback: Scheduled (every 30 min) polling HubSpot for deals stuck in "Meeting Booked" stage past the scheduled time with no meeting logged.

| # | App | Module | Action |
|---|---|---|---|
| 1 | Webhooks | Custom Webhook | Receive Cal.com no-show event (or scheduled trigger) |
| 2 | Tools by Make | Set Variables | Extract attendee email, original booking time, booking ID |
| 3 | HubSpot | Search Contacts | Find contact by email |
| 4 | HubSpot | Search Deals | Find associated open deal |
| 5 | HubSpot | Update Deal | Move stage to `{{CLIENT_HUBSPOT_STAGE_ID_NO_SHOW}}` |
| 6 | HubSpot | Add Note | Log no-show with timestamp and original booking time |
| 7 | Apollo.io | Remove Contact from Sequence | Remove from active sequence to avoid duplicate outreach |
| 8 | Apollo.io | Add Contact to Sequence | Enroll in dedicated no-show recovery sequence |
| 9 | Slack | Create a Message | Alert deal owner with contact name and re-book link |
| 10 | Tools by Make | Set Variables | Build 24h delay trigger data for optional follow-up task |
| 11 | HubSpot | Create Task | Create a manual follow-up task due in 24 hours |

**Variables to swap per client:**

| Variable | Description |
|---|---|
| `{{CLIENT_CALCOM_WEBHOOK_SECRET}}` | Same webhook secret as Blueprint 2 |
| `{{CLIENT_HUBSPOT_STAGE_ID_NO_SHOW}}` | Deal stage ID for "No-Show" |
| `{{CLIENT_HUBSPOT_PIPELINE_ID}}` | Pipeline to search deals within |
| `{{CLIENT_HUBSPOT_OWNER_ID}}` | Task assignee in HubSpot |
| `{{CLIENT_APOLLO_ACTIVE_SEQUENCE_ID}}` | Sequence to remove contact from |
| `{{CLIENT_APOLLO_NOSHOW_SEQUENCE_ID}}` | Dedicated no-show recovery sequence |
| `{{CLIENT_APOLLO_EMAIL_ACCOUNT_ID}}` | Sending mailbox for recovery emails |
| `{{CLIENT_SLACK_CHANNEL_ID}}` | Slack channel for no-show alerts |
| `{{CLIENT_REBOOK_LINK}}` | Cal.com scheduling link to include in recovery email |
| `{{CLIENT_FOLLOWUP_TASK_DUE_HOURS}}` | Hours until manual task is due (default: 24) |

**Estimated setup time per client:** 30–40 minutes

---

### Blueprint 4: Monthly Reporting

**Scenario name:** `GTM-004 | Monthly KPI Dashboard Refresh`
**Description:** Runs on the 1st of every month, pulls KPIs from HubSpot, Apollo, and Google Sheets, and writes a summary row to a dashboard sheet.
**Trigger:** Scheduled — 1st of every month at 07:00 AM (client timezone). Can also be fired manually via webhook for ad-hoc refreshes.

| # | App | Module | Action |
|---|---|---|---|
| 1 | Make | Scheduled Trigger | Fires monthly (or Webhook for manual run) |
| 2 | Tools by Make | Set Variables | Set reporting period: first/last day of prior month |
| 3 | HubSpot | Search Deals | Get all deals created in period (by pipeline) |
| 4 | HubSpot | Search Deals | Get all deals moved to "Closed Won" in period |
| 5 | HubSpot | Search Deals | Get all deals moved to "Closed Lost" in period |
| 6 | HubSpot | Search Contacts | Count new contacts created in period |
| 7 | Apollo.io | Get Sequence Stats | Pull open rate, reply rate, meetings booked for active sequences |
| 8 | Google Sheets | Get Range | Read prior month row to calculate MoM delta |
| 9 | Tools by Make | Aggregator | Sum deal values, count records, calculate conversion rates |
| 10 | Google Sheets | Add a Row | Write new monthly KPI row to dashboard tab |
| 11 | Google Sheets | Update a Row | Update "Last Refreshed" cell in summary header |
| 12 | Slack | Create a Message | Post monthly summary card to `#reporting` channel |

**KPI columns written per row:**
`Month | New Leads | Meetings Booked | No-Shows | Closed Won (count) | Closed Won ($) | Closed Lost | Win Rate % | Avg Deal Size | Email Open Rate | Email Reply Rate | MoM Lead Change | MoM Revenue Change`

**Variables to swap per client:**

| Variable | Description |
|---|---|
| `{{CLIENT_HUBSPOT_PIPELINE_ID}}` | Pipeline to pull deal metrics from |
| `{{CLIENT_HUBSPOT_STAGE_ID_CLOSED_WON}}` | Closed Won stage ID |
| `{{CLIENT_HUBSPOT_STAGE_ID_CLOSED_LOST}}` | Closed Lost stage ID |
| `{{CLIENT_APOLLO_SEQUENCE_IDS}}` | Comma-separated sequence IDs to aggregate stats from |
| `{{CLIENT_GSHEETS_SPREADSHEET_ID}}` | Google Sheets dashboard file ID |
| `{{CLIENT_GSHEETS_DASHBOARD_TAB}}` | Tab name for the monthly KPI rows |
| `{{CLIENT_GSHEETS_SUMMARY_TAB}}` | Tab name for the header/summary view |
| `{{CLIENT_GSHEETS_SUMMARY_CELL}}` | Cell reference for "Last Refreshed" label |
| `{{CLIENT_SLACK_REPORTING_CHANNEL_ID}}` | Slack channel for the monthly report post |
| `{{CLIENT_REPORT_TIMEZONE}}` | Timezone for scheduled trigger (e.g. `America/New_York`) |
| `{{CLIENT_CURRENCY_SYMBOL}}` | Currency for deal value formatting (e.g. `$`) |

**Estimated setup time per client:** 40–50 minutes

---

### Blueprint Shared Variables

Configure once per client in a Make Data Store or Connection group. All four blueprints read from these:

- `{{CLIENT_HUBSPOT_API_KEY}}` / OAuth connection
- `{{CLIENT_APOLLO_API_KEY}}`
- `{{CLIENT_SLACK_BOT_TOKEN}}`
- `{{CLIENT_GOOGLE_SERVICE_ACCOUNT}}`

---

## Section 6: Deployment SOP

Step-by-step execution checklist for a VA or junior operator. Each step has an explicit action and a verification test.

---

### PRE-WORK: Before Day 1

#### Confirm Intake Is Complete
- [ ] Google Workspace admin credentials received and login tested
- [ ] HubSpot portal ID and admin seat confirmed
- [ ] Apollo.io owner-level credentials received
- [ ] SmartLead credentials confirmed
- [ ] Cal.com access confirmed
- [ ] Make.com access confirmed
- [ ] Connect & Sell license status confirmed (active or in-progress)
- [ ] Vercel project access or deploy hook URL received
- [ ] Domain DNS access confirmed
- [ ] ICP definition doc received
- [ ] Offer / positioning one-pager or deck received
- [ ] Existing contact list CSV received (if available)
- [ ] Sales rep name(s) and email(s) received
- [ ] Desired sending domain confirmed
- [ ] Monthly outbound volume target confirmed
- [ ] CRM stage naming preferences confirmed
- [ ] Booking availability preferences confirmed

If any item is missing: send the client a single consolidated request with a 24-hour deadline. A 2-day intake delay pushes go-live to Day 7 — communicate this clearly.

#### Set Up the Credential Vault
- [ ] Create a new encrypted vault entry in 1Password or Bitwarden: `[CLIENT_COMPANY_NAME] — GTM Stack`
- [ ] Pre-populate the blank record with all variable fields from Section 2 (leave values empty until collected)
- [ ] Share the vault entry securely with the client contact using 1Password's share link or Bitwarden's send feature — not over email or Slack in plaintext

---

### DAY 1 Steps

**Step 1.1 — Google Workspace**
- [ ] Log in at admin.google.com
- [ ] Confirm domain appears under Account > Domains as "Active"
- [ ] Verify MX records at https://mxtoolbox.com (enter `CLIENT_DOMAIN`, click MX Lookup)
- [ ] If MX records are missing: escalate to client immediately. Do not proceed until resolved.

**Step 1.2 — HubSpot**
- [ ] Log in at app.hubspot.com
- [ ] Confirm user role shows "Super Admin": Settings > Users & Teams
- [ ] Find Portal ID in the URL: `app.hubspot.com/contacts/XXXXXXXX/`
- [ ] Save `HUBSPOT_PORTAL_ID` in credential vault

**Step 1.3 — Apollo.io**
- [ ] Log in at app.apollo.io
- [ ] Confirm role is "Owner": avatar > Settings > Users
- [ ] Get API key: Settings > Integrations > API > copy
- [ ] Save `APOLLO_API_KEY` in credential vault
- [ ] Test the key: `https://api.apollo.io/v1/auth/health?api_key=YOUR_KEY` — should return `{"is_logged_in": true}`

**Step 1.4 — SmartLead**
- [ ] Log in at app.smartlead.ai
- [ ] Get API key: Settings > API Key > copy
- [ ] Save `SMARTLEAD_API_KEY` in credential vault

**Step 1.5 — Cal.com**
- [ ] Log in and confirm admin/owner role on client's team workspace

**Step 1.6 — Make.com**
- [ ] Log in at make.com
- [ ] Get API key: avatar > Profile > API > Generate new token
- [ ] Get Team ID from URL: `make.com/team/XXXXX/...`
- [ ] Save `MAKE_API_KEY` and `MAKE_TEAM_ID` in credential vault

**Step 1.7 — Connect & Sell**
- [ ] Email the C&S account rep to confirm license provisioning status
- [ ] CC the client on the email
- [ ] Note: C&S provisioning is the longest third-party lead time in this stack

**Step 1.8 — DNS Setup**
- [ ] Create sending subdomain: standard pattern is `outreach.CLIENT_DOMAIN`
- [ ] Add SPF record (TXT): `Host: outreach.CLIENT_DOMAIN | Value: v=spf1 include:_spf.google.com ~all | TTL: 3600`
- [ ] Add DMARC record (TXT): `Host: _dmarc.outreach.CLIENT_DOMAIN | Value: v=DMARC1; p=none; rua=mailto:dmarc-reports@CLIENT_DOMAIN | TTL: 3600`
- [ ] Add MX record: `Host: outreach.CLIENT_DOMAIN | Priority: 10 | Value: aspmx.l.google.com | TTL: 3600`
- [ ] In Google Workspace admin: Apps > Gmail > Authenticate email > generate DKIM record > add to DNS > click "Start Authentication"
- [ ] Add 3 sending mailboxes to Google Workspace on the subdomain (naming pattern: first name variants)
- [ ] Add all 3 mailboxes to SmartLead: Email Accounts > Add Account > Google OAuth
- [ ] Toggle warm-up ON for each mailbox: set daily limit to 5 emails/day, reply rate to 40%
- [ ] Verify DNS: https://mxtoolbox.com — test SPF and DMARC (DKIM may not pass yet if recently published)

**Day 1 Checkpoint:**
- [ ] All tools accessible
- [ ] DNS records published
- [ ] SmartLead mailboxes created and warm-up ON
- [ ] Connect & Sell provisioning confirmed or escalation sent
- [ ] Credential vault updated and shared securely

---

### DAY 2 Steps

**Step 2.1 — HubSpot Pipeline**
- [ ] Settings > Pipelines > Deals > rename or configure pipeline with client's stage names
- [ ] Note all stage IDs (found in URL when clicking each stage): save `HUBSPOT_PIPELINE_ID`, `HUBSPOT_PIPELINE_STAGE_CONTACTED`, `HUBSPOT_PIPELINE_STAGE_REPLIED`

**Step 2.2 — Custom Contact Properties**
- [ ] Settings > Properties > Contact properties > Create: `ICP Tier` (dropdown), `Outbound Source` (text), `Last Sequence` (text), `Connect & Sell Status` (dropdown)

**Step 2.3 — Custom Deal Properties**
- [ ] Settings > Properties > Deal properties > Create: `Close Month` (date), `ARR` (number), `Deal Source` (dropdown)

**Step 2.4 — Import Existing Contacts**
- [ ] Contacts > Import > upload client CSV
- [ ] Map columns, set deduplication key to Email, enable "Update existing contacts"

**Step 2.5 — Lead Owner**
- [ ] Confirm each rep email is a HubSpot user
- [ ] Get Owner IDs: Settings > Properties > Contact properties > HubSpot Owner > Options
- [ ] Save primary rep's ID as `HUBSPOT_OWNER_ID`

**Step 2.6 — Google Calendar and Gmail Extension**
- [ ] Settings > Integrations > Google Calendar > connect rep's Gmail
- [ ] Install HubSpot Sales Chrome extension on rep's browser — confirm sidebar appears in Gmail

**Step 2.7 — Cal.com Event Types**
- [ ] Create: `15-Min Intro Call` (15 min, 5-min buffer), `30-Min Discovery Call` (30 min, 10-min buffer), `60-Min Demo` (60 min, 15-min buffer)
- [ ] Set availability to match rep's working hours and `CLIENT_TIMEZONE`
- [ ] Test: book a test appointment using your own email — confirm confirmation email arrives and event appears on rep's calendar
- [ ] Cancel the test appointment after confirming
- [ ] Save booking URLs as `MSG_CALENDAR_LINK`

**Step 2.8 — Apollo ICP Search**
- [ ] Search > People > apply all ICP filters: titles, headcount, industry, geo, technologies
- [ ] Save search as `[CLIENT_SLUG] — ICP v1`
- [ ] Export first 25 contacts > send CSV to client for approval
- [ ] Do NOT enroll contacts until client approves the sample

**Day 2 Checkpoint:**
- [ ] HubSpot pipeline and custom properties live
- [ ] Existing contacts imported
- [ ] Cal.com event types published and test booking confirmed
- [ ] Apollo ICP search saved and sample sent to client
- [ ] Gmail and Calendar connected to HubSpot for each rep

---

### DAY 3 Steps

**Step 3.1 — Make Data Store Setup**
- [ ] Data Stores > Create new: `[CLIENT_SLUG]-config`
- [ ] Add a record with key `config` containing all variable values as JSON

**Step 3.2 — Make Connections**
- [ ] Connect HubSpot (OAuth), Google Sheets (OAuth), Gmail (OAuth), SmartLead (API key), Apollo (API key)
- [ ] Test each connection — confirm green checkmark for all

**Step 3.3 — Build All 5 Make Scenarios**
(See full scenario build instructions in Section 5 above for each scenario's module chain.)
- [ ] Scenario 1: Cal.com Booking to HubSpot — build, test with a real test booking, turn ON
- [ ] Scenario 2: Apollo to HubSpot Sync — build, leave ON (real test happens Day 4)
- [ ] Scenario 3: SmartLead Reply Handler — build, test by replying to a test send, turn ON
- [ ] Scenario 4: Connect & Sell Call Log — build (leave OFF until C&S is provisioned)
- [ ] Scenario 5: Daily Reporting — build, run once manually to confirm Sheet populates, turn ON

**Step 3.4 — Google Sheet**
- [ ] Create `[CLIENT_SLUG] — GTM Daily Report` in Google Drive
- [ ] Create two tabs: `Pipeline Summary` and `Outbound Stats` with column headers
- [ ] Save Sheet ID in credential vault as `GOOGLE_SHEET_REPORT_URL`

**Step 3.5 — INTI Dashboard**
- [ ] Connect to Vercel project (project access or deploy hook)
- [ ] Set environment variables: `GOOGLE_SHEET_ID`, `GOOGLE_API_KEY`, `CLIENT_SLUG`
- [ ] Make Google Sheet publicly readable (Share > Anyone with link > Viewer) or configure service account
- [ ] Deploy: `vercel --prod` or `curl -X POST [DEPLOY_HOOK_URL]`
- [ ] Verify dashboard loads with data — share URL with client

**Day 3 Checkpoint:**
- [ ] All 5 Make scenarios active and tested
- [ ] Test booking flowing Cal.com to HubSpot automatically
- [ ] INTI Dashboard live at Vercel URL
- [ ] Google Sheet daily report populating

---

### DAY 4 Steps

**Step 4.1 — Apollo Sequence**
- [ ] Sequences > New Sequence > name `[CLIENT_SLUG] — Outbound v1`
- [ ] Add 5 steps per schedule in Section 4. Populate copy from `MSG_*` variables. Set send window, send days, auto-pause on reply, auto-remove on unsubscribe.
- [ ] Settings > Integrations > Webhooks > Add Webhook > paste Make Scenario 2 URL > event: "Contact Added to Sequence"
- [ ] Test: add one contact manually, confirm Scenario 2 fires in Make

**Step 4.2 — Enroll First Batch**
- [ ] Open saved ICP search > select first 200–300 contacts
- [ ] Add to Sequence > `[CLIENT_SLUG] — Outbound v1`
- [ ] Confirm contacts appear with "Active" status
- [ ] Verify daily send count does not exceed 40–50 per mailbox

**Step 4.3 — SmartLead Campaign**
- [ ] Campaigns > New Campaign > name `[CLIENT_SLUG] — Outbound v1`
- [ ] Assign 3 sending mailboxes
- [ ] Set daily limit per mailbox to 30–40, match send window, set timezone, enable open and click tracking
- [ ] Add a test lead > trigger test send > confirm email arrives in inbox (not spam)
- [ ] Reply to test email > confirm Make Scenario 3 fires

**Step 4.4 — Connect & Sell (if provisioned)**
- [ ] Export HubSpot contacts in "New Lead" stage to CSV
- [ ] Connect & Sell: Lists > Upload > map columns
- [ ] Scripts > New Script > add call script from offer doc
- [ ] Settings > Integrations > Webhooks > paste Make Scenario 4 URL
- [ ] Test dial with rep > confirm HubSpot activity logs via Make
- [ ] Set daily dial goal: 80–100 dials/day per rep

**Day 4 Checkpoint:**
- [ ] Apollo sequence live with first batch enrolled
- [ ] SmartLead campaign active within safe send limits
- [ ] Connect & Sell tested (or rescheduled to Day 5 morning if rep unavailable)
- [ ] First sends confirmed in dashboards
- [ ] Make Scenarios 2 and 4 firing on real data

---

### DAY 5 Steps

**Step 5.1 — End-to-End QA**
- [ ] Booking test: Cal.com booking → HubSpot contact created/updated, deal in "Discovery Booked", rep notified
- [ ] Reply test: SmartLead reply → HubSpot stage updated, activity logged, rep notified, contact paused
- [ ] Call test: Connect & Sell call → HubSpot activity logged with outcome and duration
- [ ] Dashboard check: INTI Dashboard shows correct yesterday's data
- [ ] Sheets check: Google Sheet daily row populated
- [ ] Apollo stats: daily send count within limits
- [ ] Pipeline review: all enrolled contacts in HubSpot with correct stage and `Outbound Source: Apollo`

**Step 5.2 — Handoff Package (assemble in shared Google Drive folder)**
- [ ] Stack Map PDF (one-page tool flow diagram)
- [ ] Credential Vault share link
- [ ] Sequence Copy Doc (all email templates in Google Docs)
- [ ] ICP Definition Doc (exact Apollo filter values)
- [ ] SOP for each tool (HubSpot, Apollo, SmartLead, Cal.com, Make)

**Step 5.3 — Make Error Notifications**
- [ ] Each scenario > Settings > Error Notifications > add operator email + client email > "Every time the scenario fails"

**Step 5.4 — Transfer Billing**
- [ ] Make, SmartLead, Apollo, Cal.com, Vercel: update to client's payment method
- [ ] Remove any operator credit cards from client tools
- [ ] Remove operator from admin seats no longer needed

**Step 5.5 — Walkthrough Session**
- [ ] Record via Loom or run live
- [ ] Cover all 8 items in the walkthrough order from Section 4, Day 5

**Step 5.6 — Operational Handoff**
- [ ] Note SmartLead full warm-up date: Day 1 start date + 14 days. Add to shared Google Calendar as `[CLIENT_SLUG] — Mailboxes at Full Warm-Up`
- [ ] Schedule 30-day check-in via Cal.com or Google Calendar
- [ ] Confirm all Make error notifications are active

**Day 5 Checkpoint:**
- [ ] All QA tests passed
- [ ] Handoff package delivered
- [ ] All billing transferred to client
- [ ] Walkthrough recorded and sent
- [ ] 30-day check-in scheduled
- [ ] Warm-up calendar noted and shared
- [ ] Error notifications active

---

## Section 7: Client Handoff Checklist

Everything the client receives at the end of Day 5.

### Documents
- [ ] **Stack Map PDF** — one-page diagram showing all tools and how data flows between them
- [ ] **Credential Vault** — encrypted doc or 1Password share with all logins, API keys, and account IDs
- [ ] **SOPs for each tool** — short "how to do X" guides for the 3–5 most common tasks per tool
- [ ] **Sequence Copy Doc** — all email templates versioned in Google Docs for easy editing
- [ ] **ICP Definition Doc** — the exact filters used in Apollo, saved for future campaigns

### Live Assets
- [ ] INTI Dashboard URL (Vercel)
- [ ] Google Sheets daily report (view access)
- [ ] HubSpot pipeline with live contacts and deals
- [ ] Apollo sequences enrolled and running
- [ ] SmartLead campaign active and within warm-up limits
- [ ] Cal.com booking links (embed-ready and standalone)
- [ ] Connect & Sell dial list loaded and tested

### Operational
- [ ] Make scenario error notification set up (email alert to operator AND client on scenario failure)
- [ ] All tool billing/subscription under client's payment method (not operator's card)
- [ ] Operator removed from admin seats no longer needed (security hygiene)
- [ ] 30-day check-in scheduled on Cal.com
- [ ] SmartLead warm-up calendar: note the date mailboxes hit full-send capacity (typically Day 14–21 from Day 1)
- [ ] Escalation path documented and shared: who to contact for each tool if something breaks

**Escalation Path Reference:**

| Tool | First Contact | Second Contact |
|---|---|---|
| HubSpot | HubSpot in-app chat / support.hubspot.com | Operator |
| Apollo | apollo.io/contact-us | Operator |
| SmartLead | SmartLead live chat | Operator |
| Cal.com | cal.com/support | Operator |
| Make | make.com/help | Operator |
| Connect & Sell | Client's C&S account rep | Operator |
| Vercel | vercel.com/support | Operator |
| Google Workspace | Google Workspace Admin support | Operator |

---

## Section 8: Monthly Reporting Template

### Google Sheet Structure

Create two tabs per client:

**Tab 1: Pipeline Summary**

| Column | Source |
|---|---|
| Date | Make (auto-populated) |
| New Contacts | HubSpot search (Make Scenario 5) |
| Contacted | HubSpot pipeline stage count |
| Discovery Booked | HubSpot pipeline stage count |
| Proposal Sent | HubSpot pipeline stage count |
| Closed Won | HubSpot pipeline stage count |

**Tab 2: Outbound Stats**

| Column | Source |
|---|---|
| Date | Make (auto-populated) |
| Emails Sent | SmartLead campaign stats |
| Emails Opened | SmartLead campaign stats |
| Open Rate | Calculated: Opened / Sent |
| Replies | SmartLead campaign stats |
| Reply Rate | Calculated: Replies / Sent |

**Tab 3: Monthly KPI (populated by Blueprint 4)**

`Month | New Leads | Meetings Booked | No-Shows | Closed Won (count) | Closed Won ($) | Closed Lost | Win Rate % | Avg Deal Size | Email Open Rate | Email Reply Rate | MoM Lead Change | MoM Revenue Change`

---

### Monthly Reporting Schedule

| Task | When | Owner | Tool |
|---|---|---|---|
| Daily stats row appended | Every day at 7am | Make Scenario 5 (auto) | Google Sheets |
| Monthly KPI row written | 1st of each month at 7am | Blueprint 4 (auto) | Google Sheets |
| INTI Dashboard refreshed | On new Sheet row write | Vercel auto-deploy or scheduled | Vercel |
| Monthly summary posted to Slack | 1st of each month at 7am | Blueprint 4 (auto) | Slack |
| Operator reviews with client | Monthly check-in call | Operator | Cal.com |

---

### Common Blockers and Resolutions

| Blocker | Symptom | Resolution |
|---|---|---|
| Connect & Sell license not provisioned | License assumed active; it is not | Email C&S rep on Day 1, CC client. Build HubSpot structure anyway. Use HubSpot click-to-call as placeholder. |
| DNS propagation delays | SPF/DKIM not resolving; SmartLead shows "authentication failed" | Publish records as early as possible. Verify with MXToolbox. Does not block Day 2–3 work but can delay Day 4 by 24 hours. |
| Client cannot find HubSpot admin access | Original admin left; portal under a different email | HubSpot support can transfer ownership with domain verification (1–2 business days). Start immediately on Day 1. |
| Apollo API rate limits or suspension | Apollo flags account for excessive exports | Confirm plan supports API access (Basic does not). Space out exports. If suspended, contact Apollo support (24–48 hours to resolve). |
| Make webhooks not firing | Cal.com bookings or SmartLead replies not triggering scenarios | Test each webhook URL in isolation in Make. Verify URL is saved in the source tool. Check Make error logs. Most common cause: mismatched payload format. |
| SmartLead deliverability issues | Open rates below 20%; spam reports appearing | Stop sending immediately. Check DMARC alignment, sending volume, subject line spam triggers via mail-tester.com. Do not resume until score is above 8/10. |
| Client delays providing intake materials | Day 1 arrives without credentials or ICP | Send same-day reminder with 24-hour deadline. Communicate that a 2-day delay pushes go-live to Day 7. Start DNS work immediately upon receiving domain access. |
| Vercel / INTI Dashboard deploy fails | Dashboard not building or data source not connecting | Check Vercel build log. Most common causes: missing env vars, CORS on Google Sheets, stale deploy token. Do not let this block Day 4 outbound work. |
| Rep not available for Connect & Sell testing | Day 4 arrives and rep has not made time | Do technical setup without the rep. Schedule 30-minute rep-specific session on Day 5 morning. |
| Google Workspace OAuth blocked by admin policy | Make cannot connect to Gmail or Sheets | Google Workspace admin must whitelist Make.com's OAuth client ID in Security > API Controls > App Access Control. Escalate on Day 1 if any OAuth restriction warnings appear. |

---

### Master Variable Deployment Gate

Before activating any SmartLead campaign or Make scenario, confirm all required variables are set in the Make Data Store and credential vault.

| Variable | Required? | Safe Default |
|---|---|---|
| `CLIENT_COMPANY_NAME` | Required | — |
| `CLIENT_DOMAIN` | Required | — |
| `CLIENT_SLUG` | Required | — |
| `CLIENT_TIMEZONE` | Required | `America/New_York` |
| `APOLLO_API_KEY` | Required | — |
| `SMARTLEAD_API_KEY` | Required | — |
| `HUBSPOT_ACCESS_TOKEN` | Required | — |
| `HUBSPOT_PORTAL_ID` | Required | — |
| `HUBSPOT_OWNER_ID` | Required | — |
| `HUBSPOT_PIPELINE_ID` | Required | `default` |
| `HUBSPOT_PIPELINE_STAGE_CONTACTED` | Required | — |
| `MAKE_API_KEY` | Required | — |
| `OXYGEN_API_KEY` | Required if using enrichment | — |
| `ICP_TARGET_TITLES` | Required | — |
| `ICP_TARGET_COMPANY_SIZE_MIN` | Required | — |
| `ICP_TARGET_COMPANY_SIZE_MAX` | Required | — |
| `ICP_TARGET_INDUSTRIES` | Required | — |
| `ICP_TARGET_GEOGRAPHIES` | Required | — |
| `MSG_SENDER_FIRST_NAME` | Required | — |
| `MSG_COMPANY_ONE_LINER` | Required | — |
| `MSG_CTA_TEXT` | Required | — |
| `MSG_CALENDAR_LINK` | Required | — |
| `SEQ_SEND_WINDOW_START` | Required | `08:00` |
| `SEQ_SEND_WINDOW_END` | Required | `17:00` |
| `SEQ_MAX_NEW_LEADS_PER_DAY` | Required | `40` |
| `SEQ_DAILY_EMAIL_CAP` | Required | `80` |
| `REPLY_STOP_KEYWORDS` | Optional | `unsubscribe, not interested, remove me` |
| `GOOGLE_SHEET_REPORT_URL` | Required | — |
| `VERCEL_DEPLOY_HOOK_URL` | Required if no direct access | — |

---

*GTM Client Deployment Kit v1.0 — assembled for Fractional GTM Operators*
*Total operator time: ~29 hours over 5 business days. Total client time required: ~6 hours.*
