# EXT!MATE — DJ Extimate

A complete, production-ready website for DJ Extimate: public site (home, music,
journal, events, about, booking) plus a working admin CMS backed by Prisma + SQLite.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS and Prisma.

## 1. Install

```bash
npm install
cp .env.example .env
```

Open `.env` and set:

- `DATABASE_URL` — leave as `file:./dev.db` for SQLite (works instantly, zero setup).
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your admin login for `/admin`.
- `AUTH_SECRET` — a long random string. Generate one with `openssl rand -base64 32`.

## 2. Set up the database

```bash
npm run db:push
npm run db:seed
```

This creates `prisma/dev.db` and seeds it with a starter track, three journal
articles and two upcoming events so the site isn't empty on first run.

## 3. Run it

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin`
for the CMS (log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set above).

## 4. Build for production

```bash
npm run build
npm start
```

`npm run build` runs `prisma generate` automatically before `next build`, so this
works out of the box with no extra steps.

## Deploying

**SQLite (simplest):** works as-is on any Node host with a persistent disk
(Railway, Render, a VPS, etc). Vercel's filesystem is read-only in production,
so SQLite will not persist there.

**Vercel / serverless (recommended for production):** swap SQLite for Postgres —
Vercel Postgres, Neon and Supabase all work well.

1. In `prisma/schema.prisma`, change the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL` in your host's environment variables to the Postgres
   connection string.
3. Run `npm run db:push && npm run db:seed` once against that database (locally,
   pointed at the remote `DATABASE_URL`, or via your host's shell).
4. Push to your Git provider and import the repo into Vercel — the `build`
   script handles the rest.

## What's inside

- `/` — hero, sticky player, latest release, journal teaser, upcoming event,
  about teaser, Instagram strip, booking CTA
- `/music` — full discography with streaming links
- `/journal`, `/journal/[slug]` — articles
- `/events` — upcoming + past events
- `/about` — bio, stats, timeline
- `/booking` — booking request form → saved to the database, visible in admin
- `/admin` — dashboard, and CRUD for journal posts, tracks, events, and a
  bookings inbox with status tracking. Protected by a signed session cookie.

## Notes on content

- The hero and section backgrounds use generated SVG/gradient graphics (a
  sunburst mark, geometric shard accents and a vinyl silhouette) rather than a
  stock photo, so there's nothing to license. Swap in real photography by
  dropping images into `/public` and referencing them from `HeroGraphic.tsx`,
  the journal cards, or the Instagram grid in `app/page.tsx`.
- Seed content (track names, event, journal topics) is drafted from public
  information about DJ Extimate and is meant as a realistic starting point —
  edit or replace everything from `/admin` once you're live.
- The audio player UI is fully wired to an `<audio>` element — add a real
  `audioUrl` to a track in `/admin/tracks` and playback will work end to end.
