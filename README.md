# Orbit

Read free RSS news from around the world and save stories to a personal dashboard.

**Stack:** Next.js 16 (App Router, Cache Components) · Better Auth · Drizzle ORM (SQLite now, Postgres-ready) · Tailwind v4 · React Three Fiber · liquid-glass-react · ShaderGradient · Paper Shaders (liquid-metal logo) · SWR · Zod

## Getting started

```bash
cp .env.example .env.local          # then set BETTER_AUTH_SECRET (openssl rand -base64 32)
npm install
npm run db:migrate                  # creates data/app.db
npm run dev
```

| Script                            | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `npm run dev` / `build` / `start` | Next.js                                |
| `npm run lint` / `typecheck`      | Quality gates                          |
| `npm run db:generate`             | Create a migration from schema changes |
| `npm run db:migrate`              | Apply migrations                       |
| `npm run db:studio`               | Browse the database                    |

## Project layout

```
src/
  app/                    routes only: thin pages and API handlers
    (account)/            sign-in, sign-up, dashboard (shader-gradient backdrop)
    feeds/[sourceId]/     statically prerendered feeds, cached for minutes
    api/auth/[...all]/    Better Auth
    api/v1/               versioned REST API
  components/
    ui/                   design-system primitives (Button, Field, LiquidGlassFrame…)
    three/                R3F scenes (SpaceCanvas → OrbitScene)
    articles/             ArticleCard, ArticleGrid, SaveArticleButton, SourceNav
    landing/ dashboard/ auth/ layout/ brand/ backdrops/
  config/                 feed sources and route constants
  hooks/                  use-saved-articles (SWR + optimistic updates)
  lib/
    db/                   the ONLY dialect-specific code (client + schema)
    auth/                 Better Auth server instance and client
    http/                 route wrappers, response envelope, errors
    validation/           Zod schemas shared by API and types
  server/
    repositories/         persistence interface + Drizzle implementation
    services/             business logic (feeds, saved articles)
    rss/                  feed item normalization
  proxy.ts                optimistic auth redirects
```

Request flow: **route handler → service → repository interface → Drizzle**. Services never import Drizzle, so the storage engine can change underneath them.

## Performance notes

- **Liquid logo** is pre-processed at build time (`scripts/process-liquid-logo.mjs`). Paper's `<LiquidMetal image>` otherwise re-processes the SVG at 4096px on every mount (~700ms main-thread block, 1.5MB blob).
- **WebGL** scenes are lazy-loaded, fade in when ready, and pause when off-screen. The feeds starfield uses `frameloop="demand"` and only redraws while scrolling.
- **Glass:** `glass` (backdrop-filter) is for single panels only. Repeated items use `surface`, because a backdrop blur over an animating canvas is recomputed every frame.
- **Scrolling:** Lenis (the engine behind Locomotive Scroll v5) with `<Parallax speed>` and `<Reveal>` in `src/components/scroll/`. Above-the-fold reveals use `eager` so they never wait for JavaScript. All of it is disabled under `prefers-reduced-motion`.

## API

All responses use one envelope: `{ data, meta? }` on success, `{ error: { code, message, details? } }` on failure.

| Method | Path                             | Auth | Notes                                 |
| ------ | -------------------------------- | ---- | ------------------------------------- |
| GET    | `/api/v1/feeds`                  | –    | Available sources                     |
| GET    | `/api/v1/feeds/:sourceId`        | –    | Normalized articles (cached ~minutes) |
| GET    | `/api/v1/saved?limit=30&cursor=` | ✓    | Keyset-paginated; `meta.nextCursor`   |
| POST   | `/api/v1/saved`                  | ✓    | Idempotent per (user, url); `201`     |
| DELETE | `/api/v1/saved/:id`              | ✓    | `204`, or `404` if not yours          |

## Moving to Postgres

The schema and queries were written to port directly: text UUID keys, timestamps in one shared helper, `onConflictDoUpdate … returning`, and keyset pagination with no SQLite-only SQL.

1. `npm i pg && npm i -D @types/pg && npm rm better-sqlite3 @types/better-sqlite3`
2. `src/lib/db/client.ts`: use `drizzle-orm/node-postgres` with `DATABASE_URL`, and set `DB_PROVIDER = "pg"`.
3. `src/lib/db/schema/*`: change the imports from `drizzle-orm/sqlite-core` to `drizzle-orm/pg-core` (`sqliteTable` → `pgTable`). In `columns.ts`, make `timestamp` use pg `timestamp(name, { withTimezone: true })`, and make `email_verified` a `boolean`.
4. `drizzle.config.ts`: set `dialect: "postgresql"`, delete `drizzle/`, then run `npm run db:generate && npm run db:migrate`.

Repositories, services, routes and UI stay the same.

## Adding a feed

Add an entry to `src/config/feeds.ts`. It then shows up automatically as a planet, a nav chip, a static page and an allowed `sourceId` in validation.
