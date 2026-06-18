# GTM Playbook: Fractional GTM Service for HVAC Owners (2-10 Trucks)

**Version 1.0 — June 2026**
**Service delivery model: Fractional GTM (done-for-you setup + monthly managed service)**

---

## SECTION 1: ICP SUMMARY

### Who This Is For

**Primary target:** HVAC owner-operators running 2-10 service trucks, primarily residential and light commercial, located in markets with defined peak/shoulder seasonality (most of the continental US qualifies).

**Firmographic profile:**
- Revenue: $400K-$3M annually
- Team: 2-12 employees including technicians, 0-2 office staff
- Owner is often the dispatcher, estimator, and field supervisor simultaneously
- Business age: 3-15 years (established enough to have a customer list, not yet large enough to have a real ops team)
- Tech stack: minimal — likely Google Voice or a basic phone system, spreadsheets or a basic FSM (ServiceTitan Starter, Jobber, or Housecall Pro), and little to no CRM discipline

**Psychographic profile:**
- Deeply skilled at the trade; frustrated by the business side
- Trusts outcomes over theory — needs to see a number or a peer example before buying
- Skeptical of agencies and "marketing people" who don't understand the trade
- Makes decisions fast when trust is established; stalls indefinitely when it isn't
- Primary fear: slow season cash crunch and not knowing where the next job is coming from
- Secondary fear: losing technicians to larger shops while the business feels unstable

**What they need (ranked by urgency):**
1. A system that catches and converts leads they are currently missing (missed calls, slow follow-up)
2. A way to fill the schedule during shoulder season without paying for ads
3. Maintenance agreement sales and renewal automation to build recurring revenue
4. Proposal follow-up that happens automatically without owner attention
5. A reporting layer so they can see what's working without logging into five tools

**What they do NOT need:**
- A rebrand, a new logo, or a website redesign
- A complicated CRM that requires 40 hours of training
- An agency retainer that produces a monthly PDF of impressions
- Software they have to manage themselves

**Why they buy from you (Fractional GTM) vs. a traditional agency:**
- You set it up and run it — they don't have to learn anything
- You speak their language: trucks, tickets, slow season, callbacks
- You charge for outcomes (booked jobs, recovered leads, revenue in slow months), not deliverables
- Your stack costs a fraction of hiring a full-time operations or marketing person

---

## SECTION 2: THE OFFER

### Service Name: HVAC Revenue Engine — Fractional GTM

**One-sentence pitch:**
"We set up and run the lead capture, follow-up, and re-engagement systems that fill your schedule year-round — without you touching any of it."

---

### What Is Included

**Tier 1 — Foundation Setup (one-time)**
- Full tech stack deployment (Apollo, SmartLead, HubSpot, Make, Cal.com, Gmail integration)
- 4 Make automation scenarios built and tested (see Section 6)
- 3 SmartLead cold email templates configured and loaded
- 5-step Apollo outreach sequence built for owner's own prospecting or referral partner outreach
- HubSpot pipeline configured: Lead, Estimate Sent, Job Booked, Job Completed, Maintenance Agreement
- Onboarding of existing customer list (past jobs imported, tagged, and ready for reactivation)
- First slow-season reactivation campaign launched to past client list
- Owner training: one 60-minute walkthrough + one written SOP per automation

**Tier 2 — Monthly Managed Service (recurring)**
- Weekly Slack/email report: leads in, leads contacted, estimates sent, jobs booked, maintenance agreements sold
- Monthly reactivation campaign to dormant customer segment
- Ongoing SmartLead sequence management (open rate monitoring, subject line tests)
- Apollo list refresh quarterly (new contacts in target zip codes or commercial accounts)
- HubSpot pipeline hygiene: deal stage updates, stuck lead review, contact deduplication
- Proposal follow-up sequence monitoring: flag any estimates open 5+ days without response
- Monthly 30-minute strategy call with owner

---

### Pricing Recommendation

| Package | What It Covers | Price |
|---|---|---|
| Foundation Setup | One-time buildout of full stack and first campaign | $2,500-$4,000 one-time |
| Managed Monthly — Starter | Reporting + 1 reactivation campaign/month + sequence monitoring | $750/month |
| Managed Monthly — Growth | Everything in Starter + new lead campaign + Apollo list refresh + strategy call | $1,400/month |
| Managed Monthly — Full Service | Everything in Growth + custom sequence variants + HubSpot admin + weekly owner briefing | $2,200/month |

**Positioning note:** The Foundation Setup should be priced to cover 8-12 hours of your time at your desired rate. The monthly retainer should be pitched against one recovered job per month — at a $700 average ticket, even a single closed lead that would have otherwise been missed pays for the Starter tier. At the Growth tier, you need 2 jobs per month recovered. Frame every pricing conversation this way.

**Discount structure:** Waive 20% of the Foundation Setup fee if the client signs a 6-month managed service commitment upfront. This reduces friction on the setup investment and locks in monthly recurring revenue.

**What to avoid:** Do not pitch on a percentage-of-revenue basis. HVAC owners will agree to this when revenue is low and resist the fee structure when it works. Flat monthly retainers are cleaner, easier to expand, and build a more stable service business.

---

## SECTION 3: STACK REQUIRED

### Tool Stack + Monthly Cost Estimate

| Tool | Purpose in the Stack | Pricing Tier to Use | Est. Monthly Cost |
|---|---|---|---|
| Apollo.io | Contact prospecting, email verification, list enrichment | Basic ($49/mo) or Professional ($99/mo) | $49-$99 |
| SmartLead | Cold email sending, sequence management, deliverability | Basic ($39/mo) | $39 |
| HubSpot | CRM, deal pipeline, contact records, activity logging | Starter CRM ($20/mo) or free tier | $0-$20 |
| Make.com | Automation backbone connecting all tools | Core ($10.59/mo for 10K ops) | $11-$25 |
| Cal.com | Booking links in all outreach sequences | Free tier or Teams ($15/mo) | $0-$15 |
| Gmail (Google Workspace) | Personal-touch sending account for owner | Business Starter ($6/user/mo) | $6 |
| Slack | Internal notifications and weekly digests | Free tier sufficient for 1-5 users | $0 |
| CallRail (optional) | Missed call webhook trigger for Scenario 2 | Starter ($45/mo) | $45 |
| Google Sheets | Data staging, campaign tracking, results log | Free (Google Workspace) | $0 |

**Total estimated monthly stack cost (without CallRail):** $105-$165/month
**Total estimated monthly stack cost (with CallRail):** $150-$210/month

**Who pays for the stack:** Charge the client for the stack cost as a pass-through or build it into your monthly fee. The cleanest model is to include the stack cost inside your monthly retainer so the client pays one number and you manage the accounts. This also prevents the client from "going direct" and cutting you out.

**Account ownership note:** Always create the HubSpot, Make, and SmartLead accounts under a subdomain or agency account you control (e.g., [clientname].youragency.com for HubSpot, your Make team workspace). Connect the client's existing Gmail and phone system as integrations. This protects your work and makes offboarding your decision, not theirs.

**Integration dependencies:**
- SmartLead requires a verified sending domain — plan 3-5 days for DNS propagation during setup
- Make requires OAuth connections to Google, HubSpot, and SmartLead — have client credentials ready on setup call
- CallRail webhook setup requires access to client's phone system admin panel
- Apollo enrichment credits are consumed per contact enriched — budget 500-1,000 enrichments per month for an active client

---

## SECTION 4: APOLLO OUTREACH SEQUENCE

**Sequence name:** HVAC Owner — More Jobs, Faster Follow-Ups, Repeat Clients
**Target persona:** Owner-operator, 2-10 trucks, residential/light commercial
**Tone:** Local business advisor. Direct. No jargon. No hype.
**Sequence length:** 16 days, 5 touchpoints
**Exit condition:** Any reply pulls the contact out of the sequence immediately and routes to a manual "book call" task.

---

### Step 1 — Day 1 | Email

**Subject line A (test):** Quick question about [Company Name]'s slow season
**Subject line B (test):** [First Name] — what happens when you miss a call?

**Body:**

Hey [First Name],

Noticed [Company Name] has solid reviews in [City] — that tells me you do good work.

Quick question: when October hits and the phones slow down, do you have a system to keep the schedule full, or does it get quiet?

I work with a handful of HVAC shops your size on exactly that. Not selling anything today — just curious if it's on your radar.

Worth a 10-minute call this week?

[Your Name]

**Goal:** Open the conversation with a specific, low-threat question tied to their biggest seasonal anxiety. No pitch. No product mention. One yes/no ask.

---

### Step 2 — Day 3 | Email

**Subject line:** How a 3-truck shop in [State] added $11K in February

**Body:**

Hey [First Name],

Wanted to share something quick.

A shop similar to yours — 4 trucks, mostly residential — started doing one thing differently last fall: they texted every customer from the past 18 months before slow season hit. Simple message, maintenance offer, no hard sell.

14 booked jobs in the first week. $11,200 in revenue they would have left on the table.

I can show you the exact 3-message sequence they used. No cost, no obligation.

Is Thursday or Friday better for a quick call?

[Your Name]

**Goal:** Introduce social proof from a peer at the same scale. Concrete outcome. Small ask.

---

### Step 3 — Day 6 | Phone Call

**Voicemail script:**

"Hey [First Name], this is [Your Name] — I sent you a couple of emails about helping [Company Name] fill out the schedule during slow season. I'll keep it short: I work with HVAC owners in [Region] who are tired of the feast-and-famine cycle, and I have a pretty simple approach that's worked well for shops your size. Give me a call back at [number] when you get a minute — no pitch, just a quick conversation. Hope the trucks are running smooth."

**Apollo setup note:** Set this call task to trigger only if Steps 1 or 2 had an email open but no reply. This targets the warmest contacts for call effort and preserves your time for high-probability conversations.

---

### Step 4 — Day 10 | Email

**Subject line A (test):** The $81K problem most HVAC owners don't track
**Subject line B (test):** [First Name], 27% of your calls went nowhere last July

**Body:**

Hey [First Name],

One more thing I keep seeing with shops your size:

The average 5-truck HVAC company misses 27% of incoming calls during peak season. At a $700 ticket, that's over $80K a year — in calls that rang, went unanswered, and moved on to a competitor.

Most owners never know because there's no record of a call that didn't get picked up.

I can walk you through a follow-up system that catches those jobs before they walk. Takes about 20 minutes to set up.

Still worth a quick call?

[Your Name]

P.S. If the timing is off, just say so. I won't keep pinging you.

**Goal:** Shift the angle from slow season revenue to real-time lead loss. The P.S. lowers pressure and signals respect for their time.

---

### Step 5 — Day 16 | Email

**Subject line:** Closing the loop on [Company Name]

**Body:**

Hey [First Name],

I've reached out a few times and haven't heard back — totally understand, this time of year is no joke for a shop your size.

I'll leave you with one thing: most of the HVAC owners I talk to say the same thing after we work together: "I wish I'd done this before slow season, not after."

If you ever want to talk through what that looks like for [Company Name], I'm easy to reach at [phone] or just reply here.

Wishing you a full schedule and no-show-free weeks.

[Your Name]

**Goal:** Clean, respectful close. No guilt, no urgency theater. Leaves the door permanently open. The "wish I'd done this before slow season" line activates when their slow season actually hits — this step consistently generates delayed replies weeks or months later.

---

### Sequence Summary

| Step | Day | Channel | Core Hook | Ask |
|---|---|---|---|---|
| 1 | Day 1 | Email | Slow season question | 10-min call |
| 2 | Day 3 | Email | Peer case study ($11K) | Call this week |
| 3 | Day 6 | Phone | Voice + company name | Call back |
| 4 | Day 10 | Email | $81K missed call data | One more call |
| 5 | Day 16 | Email | Respectful close | Open door |

**Best send windows:** Tuesday through Thursday, 7:00-9:00am local time (before the first service call of the day) or 6:00-8:00pm (after the last job, when owners catch up on messages).

**Apollo configuration notes:**
- A/B test subject lines on Steps 1 and 4 — highest-open-rate positions in the sequence
- Add "replied — book call" exit condition on every step
- Tag sequence "HVAC 2-10 trucks"
- Create a separate variant for 8-10 truck operators swapping the peer case study figures up to $18K-$22K range
- Pause sequence on US federal holidays and the week of July 4 (owners are in peak operational chaos)

---

## SECTION 5: SMARTLEAD EMAIL TEMPLATES

**Sequence order for deployment:**
- Day 1: Template 2 (Slow Season) — timing-sensitive, opens with a felt pain
- Day 4: Template 1 (Missed Follow-Up) — operational, quantified loss
- Day 8: Template 3 (Repeat Clients) — strategic, lower urgency, effective closer

**Format note:** All three templates are written in plain text intentionally. No HTML, no logo headers, no button CTAs. Plain text emails from a real person consistently outperform designed templates in cold outreach to trade business owners. Configure in SmartLead as plain text with no tracking pixel on the first touch.

---

### Template 1: Missed Follow-Up Angle

**Subject:** {{first_name}}, who's answering your phones in July?
**Preview text:** 27% of HVAC calls go unanswered at peak. Here's what that costs.

**Body:**

Hey {{first_name}},

Quick question for you — when your team is slammed in the middle of a heat wave, what happens to the calls you can't answer?

Most HVAC owners with {{truck_count}} trucks lose somewhere between $80K and $120K a year to missed calls alone. Not because their work is bad. Because 85% of callers who hit voicemail never call back — they just dial the next number on Google. By the time your phone frees up, that job is already booked with a competitor.

The fix isn't hiring another office person. It's making sure every lead that comes in during peak season gets a response in under 5 minutes, even when you're elbow-deep in a condenser unit. We help {{company_name}}-sized shops set that up without adding headcount.

If you want to see what that looks like in practice — 15 minutes on a call is all it takes. You can grab a time here: [Cal.com link]

{{sender_first_name}}

**Personalization variables:**
- `{{first_name}}` — owner first name
- `{{company_name}}` — business name
- `{{truck_count}}` — number of trucks (pull from LinkedIn/website; round to nearest whole number)
- `{{city}}` — optional; insert for a regional line like "during a {{city}} heat wave"

---

### Template 2: Slow Season Angle

**Subject:** How {{company_name}} can close October's revenue gap
**Preview text:** Summer's gone. Payroll isn't. Here's the math.

**Body:**

Hi {{first_name}},

A lot of HVAC owners I talk to around this time of year describe the same thing: July was the best month they'd ever had, and by October they're staring at a bank account that looks nothing like it did 90 days ago. Payroll, truck payments, insurance — none of that slows down when the installs do.

The shoulder season gap for a {{truck_count}}-truck shop typically runs $30K-$135K below peak. The operators who close most of that gap aren't running discounts or burning ad spend — they're pulling it out of their existing customer list through maintenance agreement pushes, proactive outreach on systems over 8 years old, and timed follow-ups on estimates that went quiet.

None of that requires hiring. It just requires a system that does it consistently when you're too busy to think about it.

If you want to walk through what that setup looks like for {{company_name}}, grab 15 minutes here: [Cal.com link]

{{sender_first_name}}

**Personalization variables:**
- `{{first_name}}` — owner first name
- `{{company_name}}` — business name
- `{{truck_count}}` — number of trucks
- `{{current_month}}` — optional; swap "October" for the actual slow month in their climate zone (e.g., "February" for Southern markets, "November" for Midwest)

---

### Template 3: Repeat Clients Angle

**Subject:** {{first_name}}, your best leads already paid you once
**Preview text:** Most HVAC revenue is sitting in past customers. Here's how to reach it.

**Body:**

Hey {{first_name}},

Getting a new HVAC customer costs somewhere between $250 and $350 in ads, leads, and time. Getting an existing customer to book again costs almost nothing — but only if you reach out before they forget you exist.

For most {{truck_count}}-truck shops, the single largest untapped revenue source isn't a new ad campaign. It's the list of customers who had work done 18-36 months ago, never got a maintenance agreement, and haven't heard from {{company_name}} since the invoice was paid. Those customers will call whoever reaches them first when something breaks or a system ages out — and right now, that's probably going to be whoever shows up on Google.

A simple reactivation sequence — a few well-timed messages referencing their last service, the age of their system, and what a tune-up runs — consistently generates 20-30% of a slow month's revenue for shops that run it. No new leads required.

Worth 15 minutes to see if it makes sense for your setup? Grab a time here: [Cal.com link]

{{sender_first_name}}

**Personalization variables:**
- `{{first_name}}` — owner first name
- `{{company_name}}` — business name
- `{{truck_count}}` — number of trucks
- `{{last_service_season}}` — optional; if sourceable, add "customers who haven't heard from you since last {{last_service_season}}"

**SmartLead compliance note:** Add a plain-text one-click unsubscribe line at the bottom of each email per CAN-SPAM. Keep it minimal: "Not relevant? Unsubscribe here." This prevents the email from reading as a bulk blast.

---

## SECTION 6: MAKE SCENARIO BLUEPRINTS

### How to Use This Section

Each scenario below is described as a module-by-module blueprint. In Make.com, each numbered step corresponds to one module in your scenario. Build each scenario in the order listed, test with a single live record before activating, and use Make's "Error handling" route on all HubSpot and SmartLead modules to catch API failures without breaking the scenario.

---

### Scenario 1: New Lead — Instant Follow-Up Sequence

**Scenario name in Make:** HVAC — New Lead Instant Nurture
**Trigger type:** Webhook (preferred) or Google Sheets — Watch Rows
**Trigger event:** New lead form submission from website, Google LSA, or Facebook Lead Ad

**Module sequence:**

| Module # | App | Module Type | Configuration Notes |
|---|---|---|---|
| 1 | Webhooks / Google Sheets | Trigger | Receive lead data: name, phone, email, service type, zip code. Map all fields to variables for use downstream. |
| 2 | Apollo | Enrich Person | Look up contact by email or phone. Append: company name (if commercial lead), LinkedIn URL, job title. Skip and continue on no match. |
| 3 | HubSpot | Create or Update Contact | Map: first name, last name, email, phone, source = form type, lifecycle stage = Lead. Log service type as custom property. |
| 4 | HubSpot | Create Deal | Link to contact created in Module 3. Deal name = "Lead — [First Name] — [Service Type]." Stage = Lead. Amount = leave blank until estimate confirmed. |
| 5 | SmartLead | Add Lead to Campaign | Enroll contact in "HVAC New Lead Nurture" campaign (3-step sequence: immediate booking confirmation, Day 2 seasonal tip, Day 5 follow-up offer). |
| 6 | Gmail | Send Email | Send within 5 minutes of lead arrival. Plain text. From owner's Gmail account. Subject: "Got your request — here's how to book." Body includes Cal.com booking link pre-filtered by service type. |
| 7 | Slack | Post Message | Channel: #new-leads. Message format: "New lead: [Name] | [Phone] | [Service] | [Zip] | HubSpot: [link]" |

**Business outcome:** No lead waits more than 5 minutes for a response, including nights and weekends.
**Estimated time saved per week:** 4-6 hours

---

### Scenario 2: Missed Call — Follow-Up + CRM Log

**Scenario name in Make:** HVAC — Missed Call Recovery
**Trigger type:** Webhook from phone system (CallRail, Grasshopper, RingCentral, or similar)
**Trigger event:** Missed call detected — payload includes caller phone number, time, and line called

**Module sequence:**

| Module # | App | Module Type | Configuration Notes |
|---|---|---|---|
| 1 | Webhooks | Trigger | Receive missed call event. Extract: caller phone number, timestamp, line called. |
| 2 | HubSpot | Search Contacts | Query by phone number. Router: if match found, go to Module 3a. If no match, go to Module 3b. |
| 3a | HubSpot | Get Contact | Retrieve full contact record and deal history for matched contact. |
| 3b | HubSpot | Create Contact | New record: phone = caller number, source = "Inbound Missed Call," lifecycle = Lead. |
| 4 | HubSpot | Log Activity | On the contact (matched or created): log "Missed Call" activity with timestamp and caller number. |
| 5 | Gmail | Send Email | Within 2 minutes of missed call. Short plain-text message: "Hi, this is [Owner Name] with [Business]. Sorry I missed your call — I'd love to help. Reply here or grab a time: [Cal.com link]." |
| 6 | SmartLead | Add Lead to Campaign | If contact is new (unknown caller), enroll in 2-step missed call nurture sequence (runs over 48 hours). Skip if existing contact. |
| 7 | HubSpot | Create Task | Assigned to owner or office manager. Title: "Call back [Name / phone] — missed call at [time]." Due date: same business day or next morning 8am. |
| 8 | Slack | Post Message | Channel: #calls. Message: "Missed call from [name if matched / phone if not] at [time]. HubSpot task created. Follow-up email sent." |

**Business outcome:** Every missed call enters the CRM and receives an immediate response. 30-40% of missed callers will not call back if they do not hear from you within 10 minutes.
**Estimated time saved per week:** 3-4 hours

---

### Scenario 3: Job Completed — 30/60/90-Day Re-Engagement

**Scenario name in Make:** HVAC — Post-Job Nurture and Maintenance Upsell
**Trigger type:** HubSpot — Watch Deal Stage Changes
**Trigger event:** Deal stage changes to "Job Completed"

**Module sequence:**

| Module # | App | Module Type | Configuration Notes |
|---|---|---|---|
| 1 | HubSpot | Trigger — Deal Stage Change | Filter: new stage = "Job Completed." |
| 2 | HubSpot | Get Associated Contact | Pull full contact record linked to the deal. |
| 3 | Google Sheets | Append Row | Write to "Completed Jobs" tab: customer name, email, phone, service type, equipment notes, technician, job date. |
| 4 | Gmail | Send Email (Day 0) | Same-day thank-you from owner's Gmail. Include: direct Google review link, filter/warranty reminder, owner's direct phone number. |
| 5 | HubSpot | Update Contact | Set "Last Service Date" property = today. Tag service type performed. Move lifecycle stage to "Customer." |
| 6 | SmartLead | Add to 30-Day Campaign | Enroll in timed sequence: Day 30 = "How's your system running?" check-in with booking link for filter change or tune-up. |
| 7 | SmartLead | Add to 60-Day Campaign | Day 60 = seasonal prompt (spring: "Get your AC ready before summer peak") with pre-season discount and Cal.com booking link. |
| 8 | SmartLead | Add to 90-Day Campaign | Day 90 = maintenance plan offer ("Join our Comfort Club") with pricing and booking link. |
| 9 | HubSpot | Log Activity | At each SmartLead send, log the email as an activity on the contact record so the team has full communication history. |
| 10 | Slack | Weekly Digest (Scheduled) | Every Monday morning: list customers in their 30/60/90-day windows that week. Prompts team to add a personal call for high-value jobs. |

**Business outcome:** One-time customers become repeat clients and maintenance plan members. HVAC businesses with maintenance agreements report 3-5x higher lifetime customer value. The sequence runs without any manual effort after the deal is marked complete.
**Estimated time saved per week:** 5-7 hours

---

### Scenario 4: Slow Season — Reactivation Campaign to Past Clients

**Scenario name in Make:** HVAC — Slow Season Win-Back Campaign
**Trigger type:** Scheduled (fires November 1 and March 1 automatically) OR manual trigger when owner clicks Run in Make
**Optional secondary trigger:** HubSpot deal pipeline drops below a threshold value you define

**Module sequence:**

| Module # | App | Module Type | Configuration Notes |
|---|---|---|---|
| 1 | Make | Scheduled Trigger / Manual | Fires November 1 and March 1 at 7:00am. |
| 2 | HubSpot | Search Contacts (Bulk) | Filter: lifecycle = Customer, last service date more than 6 months ago, last contacted more than 90 days ago. Export list. |
| 3 | Google Sheets | Write to "Reactivation Campaign" Tab | Columns: Name, Email, Phone, Last Service Date, Service Type, Assigned Tech. Owner reviews this list before emails go out — add a 24-hour delay after this step if you want manual approval before launch. |
| 4 | Apollo | Bulk Verify Emails | Run list through Apollo email verification. Remove bounces and invalid addresses before sending. |
| 5 | SmartLead | Create Campaign + Add Contacts | Load validated list into a 3-step campaign over 10 days: Day 1 = slow-season discount offer from owner, Day 4 = social proof email with 2-3 review snippets + booking link, Day 10 = "last chance" offer with urgency (limited open slots before holidays). |
| 6 | Cal.com | Booking Link Configuration | All booking links in the campaign use a special "Slow Season Special" event type with a coupon code pre-applied. Enables conversion tracking by campaign. |
| 7 | HubSpot | Watch for Booking (Trigger) | When a contact books via the Cal.com campaign link, Make fires: create new Deal, log campaign as source, remove contact from further SmartLead follow-up steps in this campaign. |
| 8 | Gmail | Send Booking Confirmation | Personalized confirmation from owner's Gmail (not a system email) when a booking is made. Reinforces the personal relationship. |
| 9 | Slack | Daily Campaign Digest | Each morning during the campaign: total emails sent, open rate, replies received, bookings made that day. Owner stays informed without logging into SmartLead. |
| 10 | Google Sheets | Write Campaign Results | At campaign end: contacts reached, opened, replied, booked, estimated revenue. Builds a historical record to compare performance season over season. |

**Business outcome:** Converts dormant customer list into booked jobs during slow months. A list of 200 past customers with a 5% re-booking rate is 10 jobs that would not otherwise exist. At a $350-$600 average ticket, that is $3,500-$6,000 in recovered slow-season revenue per campaign run.
**Estimated time saved per week (during active campaign):** 8-10 hours

---

### Scenario Summary

| Scenario | Trigger | Tools Used | Time Saved/Week |
|---|---|---|---|
| New Lead — Instant Follow-Up | Webhook / Google Sheets | Sheets, Apollo, HubSpot, SmartLead, Cal.com, Gmail, Slack | 4-6 hrs |
| Missed Call — Follow-Up + Log | Phone system webhook | HubSpot, Gmail, SmartLead, Slack | 3-4 hrs |
| Job Completed — 30/60/90 Day | HubSpot deal stage change | HubSpot, Sheets, Gmail, SmartLead, Slack | 5-7 hrs |
| Slow Season — Reactivation | Scheduled or manual | HubSpot, Sheets, Apollo, SmartLead, Cal.com, Gmail, Slack | 8-10 hrs |

**Total estimated time saved across all 4 scenarios: 20-27 hours per week.**

---

## SECTION 7: ONBOARDING CHECKLIST

### Purpose

This checklist is designed to take a new HVAC client from signed contract to fully operational stack in 5-7 business days. It can be handed to a VA with the tool accounts already created and completed with minimal senior oversight.

**Who completes this:** Fractional GTM operator or trained VA
**Time to complete:** Approximately 10-14 hours of active setup work spread across one week
**What the client must provide:** Existing customer list (CSV or export from current FSM), access to Gmail account, access to phone system admin panel (for missed call webhook), and a 30-minute kickoff call

---

### Day 1 — Account Creation and Access

- [ ] Create HubSpot account (Starter or free tier). Set up subdomain under your agency workspace.
- [ ] Create Make.com account under your team workspace. Name it [ClientFirstName]-HVAC.
- [ ] Create SmartLead account. Note: allow 3-5 days for sending domain DNS to propagate — start this on Day 1 regardless of other tasks.
- [ ] Verify Apollo.io has the client's target market loaded (pull 50-100 contacts in target zip codes as a test pull).
- [ ] Set up Cal.com account. Create the following event types: (a) "Free 15-Min Estimate Call," (b) "Maintenance Tune-Up Booking," (c) "Slow Season Special" (for campaign use).
- [ ] Connect client's Gmail to HubSpot (two-way sync: HubSpot emails log to Gmail, Gmail replies log to HubSpot).
- [ ] Request access to client's phone system admin panel for webhook setup.
- [ ] Send client a kickoff questionnaire: truck count, primary service zip codes, peak season months, current FSM used, average ticket size (repair vs. replacement), and approximate size of existing customer list.

---

### Day 2 — Data Import and HubSpot Configuration

- [ ] Import client's existing customer list into HubSpot. Clean the CSV first: remove duplicates, standardize phone format, verify emails are present.
- [ ] Create HubSpot deal pipeline stages: Lead > Estimate Sent > Estimate Followed Up > Job Booked > Job Completed > Maintenance Agreement Sold.
- [ ] Create custom contact properties: Truck Count (owner-level), Last Service Date, Service Type (last job), Maintenance Agreement Status (yes/no), Equipment Age (years, if known).
- [ ] Tag all imported customers with lifecycle = Customer and populate Last Service Date from the import where available.
- [ ] Create three contact lists in HubSpot: (a) All Customers, (b) Reactivation Candidates (last service 6+ months ago, no contact in 90+ days), (c) Maintenance Agreement Holders.
- [ ] Install HubSpot tracking code on client's website if applicable (allows website visitors to be associated with HubSpot contacts).

---

### Day 3 — SmartLead Configuration and Template Setup

- [ ] Confirm DNS records are propagating (check MX, SPF, DKIM, DMARC). If not yet propagating, troubleshoot — do not proceed with sending until all four are green.
- [ ] Configure SmartLead sending account: connect client's Gmail as the sending inbox, set daily send limit to 30-40 emails/day to start (warm up the domain).
- [ ] Load Template 1 (Missed Follow-Up) into SmartLead as Campaign 1.
- [ ] Load Template 2 (Slow Season) into SmartLead as Campaign 2.
- [ ] Load Template 3 (Repeat Clients) into SmartLead as Campaign 3.
- [ ] Build the 3-step post-job nurture sequence in SmartLead (30/60/90-day messages from Scenario 3). Set delays to 30, 60, and 90 days respectively.
- [ ] Build the 3-step slow season reactivation sequence in SmartLead (Day 1, Day 4, Day 10 from Scenario 4).
- [ ] Build the 2-step missed call nurture sequence (immediate response + 24-hour follow-up from Scenario 2).
- [ ] Add CAN-SPAM unsubscribe footer to every sequence.
- [ ] Send a test email from each sequence to your own email address. Verify plain text formatting, link functionality, and unsubscribe link.

---

### Day 4 — Make Automation Build

Complete all four scenarios in order. Test each one individually before moving to the next.

- [ ] Build Scenario 1 (New Lead — Instant Follow-Up). Test with a dummy form submission.
- [ ] Build Scenario 2 (Missed Call — CRM Log + Follow-Up). Test requires phone system webhook access. If client's phone system does not support webhooks, note this as a limitation and substitute a manual Zap trigger or daily call log review.
- [ ] Build Scenario 3 (Job Completed — 30/60/90 Day). Test by manually changing a HubSpot deal stage to "Job Completed" on a test contact.
- [ ] Build Scenario 4 (Slow Season Reactivation). Test the manual trigger with 5 contacts from the Reactivation Candidates list. Confirm Google Sheets writes correctly, Apollo verification runs, and SmartLead enrollment fires.
- [ ] Set Scenario 4 scheduled triggers for November 1 and March 1 (or the client's actual slow season start dates based on their region).
- [ ] Enable error notification emails from Make to your address so you are alerted if any scenario fails.

---

### Day 5 — Apollo Sequence and Quality Check

- [ ] Load the 5-step Apollo outreach sequence (from Section 4) into Apollo. Tag it "HVAC 2-10 Trucks."
- [ ] Set A/B subject line tests on Steps 1 and 4.
- [ ] Add sequence exit condition: "replied — book call" routes to manual task.
- [ ] Pull the first batch of prospect contacts for the client's target zip codes (50-100 contacts). Filter: "HVAC," "Plumbing and Heating," or "Mechanical Contractor" industry; company size 2-15 employees; contact title "Owner" or "President."
- [ ] Verify the first 10 contacts manually before enrolling: confirm they are real owner-operators, not employees or franchisees.
- [ ] Enroll first 10 contacts as a pilot send. Monitor for the first 48 hours before scaling to the full batch.
- [ ] QA pass on all four Make scenarios: run each one end-to-end with live test data. Confirm HubSpot records created correctly, SmartLead enrollments fired, Gmail messages sent, Slack notifications appeared.
- [ ] QA pass on all three SmartLead templates: send from a secondary test address. Confirm formatting, links, and unsubscribe all work.

---

### Day 6 — Client Walkthrough and Handoff

- [ ] Conduct 60-minute walkthrough call with client. Cover: how to mark a deal as "Job Completed" in HubSpot (triggers Scenario 3), how to view the Slack notifications, how to check their SmartLead open rates, and what to do when they get a response from the sequence (pull them to a manual task, book the call).
- [ ] Deliver written SOPs: one page per scenario explaining in plain language what triggers it, what happens, and what the client needs to do (if anything).
- [ ] Share live dashboard view in HubSpot showing: leads in pipeline, deals by stage, last 30 days of emails sent (via Gmail integration), and contacts added.
- [ ] Confirm all four Make scenarios are set to "Active."
- [ ] Set up client's Slack workspace (or add them to a shared channel in your workspace). Verify they can see notifications from all four scenarios.
- [ ] Schedule first monthly strategy call for 30 days out.

---

### Day 7 — First Reactivation Campaign Launch (if customer list size is 50+ contacts)

- [ ] Pull Reactivation Candidates list from HubSpot. Export to Google Sheets for review.
- [ ] Run the list through Apollo email verification. Remove any addresses that bounce or are flagged as risky.
- [ ] Review with client before launch: confirm they are comfortable with the message tone and the discount or offer in the Day 1 email.
- [ ] Manually trigger Scenario 4 in Make to launch the campaign to the verified list.
- [ ] Monitor Day 1 open rates in SmartLead the following morning. Flag to client if open rate is below 20% (may indicate deliverability issue requiring troubleshooting).
- [ ] Log first campaign launch date and list size in the Google Sheets Results Tracker for future comparison.

---

## SECTION 8: KPIs TO TRACK AND REPORT MONTHLY

### Reporting Philosophy

The monthly report to an HVAC owner should take no more than 5 minutes to read, contain no marketing jargon, and answer exactly one question: "Is this making me money?" Every metric on the report should be tied to a dollar outcome or a concrete operational change. Remove any metric that requires explanation before the owner understands why it matters.

**Delivery format:** One-page summary in Google Docs or Notion. Send via email the first Monday of each month. Follow up with a 30-minute call to walk through findings and adjust for the coming month.

---

### Core KPIs — Track Every Month

| KPI | What It Measures | Target / Benchmark | Where to Pull It |
|---|---|---|---|
| Leads captured (total) | All new contacts that entered HubSpot this month | Baseline in month 1; grow 10-15% month over month | HubSpot — Contacts created this month |
| Leads responded to within 5 minutes | % of new leads that received an automated response within 5 min of entering the system | 100% (this is what the stack is designed to deliver) | Make run logs + HubSpot activity timestamps |
| Missed calls logged and followed up | Total missed calls captured by Scenario 2; total that received a follow-up message | 100% capture rate; 100% follow-up rate | HubSpot — "Missed Call" activity count |
| Estimates sent | Total proposals or estimates created and sent this month | Varies by business size; track trend | HubSpot — Deals moved to "Estimate Sent" stage |
| Estimate follow-up rate | % of sent estimates that received at least one follow-up within 48 hours (automated) | 100% via automation | SmartLead campaign send logs |
| Deals closed (jobs booked) | Total deals moved to "Job Booked" or "Job Completed" stage | Track trend; goal is growth vs. prior 90 days | HubSpot — Deal stage movement |
| Close rate (estimates to jobs) | Closed deals divided by estimates sent | Industry average: 22-30%; target with follow-up: 35-45% | HubSpot — Deals math |
| Revenue (estimated, from deals) | Sum of deal amounts for closed jobs this month | Baseline in month 1; grow 10% month over month | HubSpot — Deal pipeline revenue |
| Maintenance agreements sold | New maintenance agreement deals closed this month | 5-10% of all completed jobs should convert to agreements | HubSpot — "Maintenance Agreement Sold" stage |
| Reactivation campaign bookings | Jobs booked directly from slow-season reactivation campaign (tracked via Cal.com coupon code) | 3-7% of list contacted should book | Google Sheets — Campaign Results Tracker |
| 30/60/90-day email open rate | Open rate on post-job nurture sequence | Above 35% open rate indicates strong relationship and deliverability | SmartLead — Campaign analytics |
| Customer review requests sent | Total post-job thank-you emails sent (Scenario 3, Day 0) | Should equal total jobs completed | HubSpot — Activity log count |

---

### Secondary KPIs — Review Quarterly

| KPI | What It Measures | Why It Matters |
|---|---|---|
| Average ticket size (repair) | Average deal amount for repair/service jobs | Trend down may indicate upsell conversation missing |
| Average ticket size (replacement) | Average deal amount for system replacements | Trend down may indicate proposal quality or follow-up problem |
| Customer reactivation rate | % of past customers who have booked a second or subsequent job | Core measure of lifetime value and retention health |
| Maintenance agreement renewal rate | % of agreements up for renewal that renewed | Below 70% indicates a renewal automation or communication gap |
| Cost per booked job | Monthly stack + service cost divided by total jobs booked | Should trend down over time as the system matures and list grows |
| SmartLead deliverability score | Email health score in SmartLead dashboard | Below 80 requires domain warming review |
| Make scenario error rate | Failed runs divided by total runs across all scenarios | Any persistent errors require immediate investigation |
| Speed-to-estimate (days) | Average days between job inquiry and estimate sent | Target: under 24 hours; under 4 hours for emergency work |

---

### Monthly Report Template (Copy-Paste Ready)

```
HVAC REVENUE ENGINE — MONTHLY REPORT
[Client Name] | [Month, Year]

LEADS AND PIPELINE
- New leads this month: [#]
- Leads followed up within 5 min: [#] ([%])
- Missed calls captured + followed up: [#]
- Estimates sent: [#]
- Jobs booked: [#]
- Close rate: [%] (prior month: [%])

REVENUE
- Estimated revenue from closed deals: $[amount]
- Prior month: $[amount] | Prior year same month: $[amount]
- Maintenance agreements sold: [#]

CAMPAIGNS
- Reactivation campaign contacts reached: [#]
- Bookings from campaign: [#]
- Estimated campaign revenue: $[amount]

NURTURE SEQUENCES
- Post-job nurture emails sent: [#]
- 30/60/90-day sequence open rate: [%]
- Review requests sent: [#]

ONE THING WORKING WELL THIS MONTH:
[1-2 sentences on what's performing above expectation]

ONE THING TO FIX NEXT MONTH:
[1-2 sentences on the single most impactful change to make]

NEXT MONTH PLAN:
[Brief list of any campaign adjustments, list refreshes, or new sequences]
```

---

### When to Escalate vs. When to Optimize

**Escalate immediately if:**
- Make scenarios are failing more than 5% of runs (indicates an API or authentication issue)
- SmartLead deliverability score drops below 75 (indicates domain or sending reputation problem)
- Close rate drops more than 10 percentage points month-over-month (indicates a lead quality or follow-up timing problem)
- Missed call capture stops logging (indicates the phone system webhook broke)

**Optimize on the monthly call if:**
- Email open rates are below 25% (test new subject lines)
- Reactivation campaign booking rate is below 3% (adjust offer or timing)
- Maintenance agreement conversion is flat (add a personal call touchpoint between Day 60 and Day 90 emails)
- Close rate is improving but average ticket is declining (indicates new customers are lower-value — tighten targeting criteria)

---

*End of GTM Playbook — HVAC Owners (2-10 Trucks) — Version 1.0*

*This document is designed to be handed to a VA for client onboarding, used as the operating guide for a Fractional GTM engagement, and updated quarterly as the stack evolves or client results shift benchmarks.*