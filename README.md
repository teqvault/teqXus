# TeqXus — AI Health Intelligence Platform
### by Teq Vault LLC

> Your life, optimized by AI.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in all values

# 3. Run schema in Supabase SQL Editor
# → paste contents of supabase/schema.sql

# 4. Start dev server
npm run dev
```

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 + TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Anthropic Claude claude-sonnet-4-6 |
| Wearables | Terra API |
| Payments | Stripe |
| Email | Resend |
| Charts | Recharts |
| Hosting | Vercel |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                         ← Landing page
│   ├── (auth)/login & signup            ← Auth pages
│   ├── dashboard/                       ← Main app
│   ├── onboarding/                      ← 5-step setup
│   ├── settings/                        ← All settings
│   └── api/
│       ├── chat/                        ← Claude AI streaming
│       ├── terra/connect/               ← Wearable connect
│       ├── stripe/checkout/             ← Payments
│       ├── user/profile/                ← Profile CRUD
│       ├── cron/morning-briefing/       ← Daily email
│       └── webhooks/terra & stripe/     ← Incoming data
├── components/
│   ├── auth/AuthComponents.tsx
│   ├── chat/ChatPanel.tsx
│   ├── dashboard/DashboardClient.tsx
│   ├── onboarding/OnboardingFlow.tsx
│   └── settings/SettingsClient.tsx
└── lib/
    ├── ai/system-prompt.ts              ← Claude prompt builder
    ├── db/supabase.ts                   ← DB query helpers
    ├── email/morning-briefing.ts        ← Email template
    └── scoring/nexus-score.ts           ← TeqXus Score™ algorithm
```

## Accounts Needed

- [Supabase](https://supabase.com) — database + auth
- [Anthropic](https://console.anthropic.com) — Claude API
- [Terra API](https://tryterra.co) — wearables
- [Stripe](https://stripe.com) — payments
- [Resend](https://resend.com) — email
- [Vercel](https://vercel.com) — hosting

## Deployment

```bash
git push origin main  # auto-deploys to Vercel
```

Set all `.env.example` variables in Vercel dashboard.

## Webhook URLs (set after deploy)

- Terra: `https://teqxus.app/api/webhooks/terra`
- Stripe: `https://teqxus.app/api/webhooks/stripe`

---

**TeqXus** · Built by Teq Vault LLC · teqxus.app
