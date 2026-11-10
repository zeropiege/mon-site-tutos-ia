# Design — Mon site tutos & configurations IA

**Date:** 2026-11-09
**Status:** Approved by user ("fait le code du projet maintenant")
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + Supabase + Markdown, hosted on Vercel (free tier)

---

## 1. Intent & Why

The user wants a real platform (not just GitHub repos) to publish AI tutorials, model
configurations, and a few interactive applications. They already have small GitHub repos
to migrate later. 21st.dev was mentioned as inspiration but is a prompt library, not a
tutorials platform — it is not the product model.

Success looks like: a clean, fast site at their own domain where visitors can browse and
read tutorials, find model configs, try interactive demos, and where the owner can log in
and create/edit content from a dashboard.

## 2. Decisions Made by the User

| Decision | Choice | Source |
|---|---|---|
| Auth | YES, user accounts | user |
| Content format | Markdown | user |
| Backend | Supabase (DB + Auth) | my call, stated |
| Hosting | Vercel free | user |
| GitHub repos import | deferred ("plus tard") | user |
| 21st.dev | not the product model | user correction |

## 3. Architecture

```
mon-site-tutos/
├── app/                         # Next.js App Router
│   ├── layout.tsx, globals.css  # root shell + theme
│   ├── page.tsx                 # Home
│   ├── tuto/[slug]/page.tsx     # Tutorial detail
│   ├── config/[slug]/page.tsx   # Config detail
│   ├── apps/page.tsx            # Interactive demos grid
│   ├── dashboard/               # Owner-only (auth required)
│   │   ├── page.tsx             # List + edit own content
│   │   └── new/page.tsx         # Create new tutorial/config
│   └── login/page.tsx           # Supabase auth
├── components/                  # Header, nav, card, markdown renderer, mdx editor
├── content/                     # Source-of-truth markdown
│   ├── tuto/*.md
│   └── config/*.md
├── lib/
│   ├── supabase.ts              # client + server client
│   ├── mdx.ts                   # markdown -> JSX renderer
│   ├── auth.ts                  # session helpers, requireAuth
│   └── content.ts               # load markdown + sync to DB
└── public/                      # images, favicons
```

**Data model (Supabase):**

| Table | Columns |
|---|---|
| `profiles` | id (uuid, PK), username, avatar_url, role (admin\|user), created_at |
| `tutorials` | id, title, slug, content_md, category, tags[], published (bool), author_id (FK profiles), created_at, updated_at |
| `configs` | id, title, slug, content_md, model, tags[], published (bool), author_id (FK profiles), created_at, updated_at |

**Auth flow:** Supabase magic link + Google OAuth. Session checked server-side via
`cookies()`. Dashboard routes guarded by `requireAuth()`.

**Content flow:** Markdown files live in `content/` as source of truth. On build, they are
loaded and synced to Supabase so the dashboard can edit them. For MVP, the dashboard edits
write back to markdown files via the API, and the site re-renders.

## 4. Pages

1. **Home** — hero, featured tutorials, featured configs, apps CTA.
2. **Tutorials list** — grid of cards, filter by category.
3. **Tutorial detail** — rendered markdown, author, date, edit link (if owner).
4. **Configs list** — grid of cards, filter by model.
5. **Config detail** — rendered markdown.
6. **Apps** — grid of interactive demos (placeholders for now; structure ready).
7. **Dashboard** (auth) — list own tutorials/configs, create new, edit, toggle publish.
8. **Login** — Supabase magic link / Google.
9. **About / Contact** — simple footer pages.

## 5. Design Direction

- Dark theme, "AI-tech" aesthetic, restrained. Single accent color.
- Responsive, accessible (WCAG-ish), fast LCP.
- No animation libraries — keep it lean and free.

## 6. Non-Goals

- No user comments / community features yet.
- No GitHub import (deferred).
- No payment / monetization.
- No multi-language.

## 7. Anti-Goals

- A slow, heavy CMS. A bloated framework. A site that can't be hosted for free.

## 8. Left to the Builder (my calls)

- Exact component library: hand-rolled Tailwind components (no shadcn dependency overhead).
- Markdown renderer: `react-markdown` + `remark-gfm`.
- Slug generation: simple slugify on title.
- Seed content: 2-3 placeholder tutorials + configs so the site isn't empty on launch.
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` (dashboard writes).

## 9. Verification

- `npm run build` passes (no type errors, no broken imports).
- Home, tutorial detail, config detail, apps, dashboard (auth), login all render.
- Auth flow: login page renders, dashboard is unreachable without session.