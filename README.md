# Prompt Atlas

Production-ready multilingual AI prompt library built with Next.js, TypeScript, Tailwind, Prisma, PostgreSQL, and Auth.js.

## Architecture Snapshot

- App router with locale-aware routes: `/az`, `/ru`, `/tr`, `/en`
- Public area: homepage, prompt library, prompt detail, blog pages
- Admin area: dashboard + prompt management scaffold
- Prisma domain model for prompts, translations, categories, tags, users, settings
- Server-side filtering and prompt copy analytics endpoint

## Folder Tree (important paths)

- `src/app/(site)/[locale]` - public localized routes
- `src/app/(admin)/[locale]/admin` - admin routes
- `src/app/api` - API routes (auth + prompt analytics)
- `src/lib` - auth, db, i18n utilities
- `prisma/schema.prisma` - relational schema
- `prisma/seed.ts` - seed data

## Route Structure

- `/{locale}` - homepage
- `/{locale}/prompts` - prompt library with search
- `/{locale}/prompts/{slug}` - prompt detail
- `/{locale}/blog` - blog list
- `/{locale}/blog/{slug}` - blog detail
- `/{locale}/admin` - admin dashboard
- `/{locale}/admin/prompts` - prompt management
- `/{locale}/auth/sign-in` - admin sign-in

## Installation

1) Install dependencies:

```bash
npm install
```

2) Configure env:

```bash
cp .env.example .env
```

3) Generate Prisma client and push schema:

```bash
npm run db:generate
npm run db:push
```

4) Seed:

```bash
npm run db:seed
```

5) Start:

```bash
npm run dev
```

Default admin:
- Email: `admin@promptlibrary.dev`
- Password: `Admin123!`
