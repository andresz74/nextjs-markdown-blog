# My Blog

A Next.js 14 + TypeScript blog with Markdown content, feed routes, tags, and static export output.

## Project structure
- `app/`: App Router pages and route handlers (`rss.xml`, `atom.xml`, `feed.json`, `sitemap.xml`, `robots.txt`).
- `articles/`, `notes/`: Markdown content sources.
- `components/`: Shared UI (cards, header, markdown renderer, filters, pagination).
- `utils/`: Metadata/content loaders, SEO helpers, tag normalization, feed assembly.
- `scripts/`: Content/tag/SEO validators and Firestore sync tooling.
- `__tests__/`: Jest + Testing Library suites and snapshots.

## Prerequisites
- Node.js 18+
- Corepack enabled (repo uses `packageManager: yarn@3.6.3`)

## Getting started
1. Enable Corepack and install deps:
   ```bash
   corepack enable
   corepack yarn install
   ```
2. Start local dev server:
   ```bash
   corepack yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Common commands
- `corepack yarn lint`: ESLint checks.
- `corepack yarn test --runInBand`: run test suite.
- `corepack yarn test:coverage`: coverage run.
- `corepack yarn lint:tags`: validate tag formatting/normalization rules.
- `corepack yarn validate:content`: frontmatter/content checks.
- `corepack yarn validate:seo`: SEO frontmatter checks.
- `corepack yarn build`: production build + static export.

## Firestore sync
Sync markdown content to Firestore:
- Dry run: `corepack yarn sync:firestore:dry`
- Apply: `corepack yarn sync:firestore`

Set one credential source:
- `FIREBASE_SERVICE_ACCOUNT_PATH`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `FIREBASE_SERVICE_ACCOUNT_JSON`

## CI and releases
- `.github/workflows/ci.yml`: lint, tests, content validation, SEO validation on PRs and `main`.
- `.github/workflows/release.yml`: creates a GitHub Release automatically when a tag is pushed.

## Deployment notes
- `next.config.mjs` uses `output: 'export'` and `images.unoptimized: true`.
- Build artifacts are static and can be deployed to static hosting/CDN platforms.
