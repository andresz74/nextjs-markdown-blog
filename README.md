# My Blog

A statically generated blog built with Next.js 14 and TypeScript. Articles are written in Markdown and rendered with React components, including syntax highlighting for code samples.

## Project structure
- `app/` – Next.js App Router pages for the blog, docs, notes, and article detail views.
- `articles/` – Markdown posts that power the main blog listing on `/` (original writing).
- `notes/` – Markdown summaries of interesting YouTube videos.
- `components/` – Shared UI such as `ArticleCard` used to render post previews.
- `utils/` – Helpers like `getArticleMetadata` that read and cache Markdown frontmatter.
- `__tests__/` – Jest and Testing Library test suites.

## Prerequisites
- Node.js 18+
- Yarn (project uses Yarn 3; a `.yarnrc` is not checked in, so `yarn install` will create one locally.)

## Getting started
1. Install dependencies:
   ```bash
   yarn install
   ```
2. Run the development server:
   ```bash
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the site.

To add a new post, drop a Markdown file with frontmatter (`title`, `date`, `description`, optional `image`) into the `articles/` directory for original writing or the `notes/` directory for YouTube summaries. The homepage will automatically pick it up and sort posts by date.

## Testing and linting
- Run the test suite: `yarn test`
- Run ESLint checks: `yarn lint`

## Sync Markdown to Firestore
This repo includes a sync script to upsert markdown content into Firestore collections:
- `articles/*.md` -> `articles`
- `notes/*.md` -> `notes`

Commands:
- Dry run (default-safe): `yarn sync:firestore:dry`
- Apply changes: `yarn sync:firestore`

Credentials (one of the following):
- `FIREBASE_SERVICE_ACCOUNT_PATH=/absolute/path/to/serviceAccountKey.json`
- `GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccountKey.json`
- `FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'`

The script file is `scripts/sync-markdown-to-firestore.mjs`.

## Deployment
Build the production bundle with `yarn build`. Start the optimized server locally with `yarn start` after building, or deploy the build output to Cloudflare (the project is configured and optimized for Cloudflare deployment).
