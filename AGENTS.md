# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 14 App Router project with TypeScript.
- `app/`: route entries, metadata routes (`sitemap.ts`, `robots.ts`), and content pages (`articles`, `notes`, `tags`, `docs`).
- `components/`: reusable UI and CSS Modules (for example `ArticleCard.tsx` + `ArticleCard.module.css`).
- `utils/`: content loaders, markdown renderers, and shared helpers.
- `articles/` and `notes/`: Markdown content sources with frontmatter.
- `__tests__/` and `__tests__/__snapshots__/`: Jest + Testing Library suites and snapshots.
- `scripts/`: content validation, tag linting, and Firestore sync utilities.
- `public/`: static assets and fonts.

## Build, Test, and Development Commands
Use Yarn 3 (`packageManager: yarn@3.6.3`).
- `yarn install`: install dependencies.
- `yarn dev`: run local development server at `http://localhost:3000`.
- `yarn build`: build production bundle.
- `yarn start`: run the production build locally.
- `yarn lint`: run Next.js ESLint checks.
- `yarn test`: run unit/integration tests.
- `yarn test:coverage`: run tests with coverage thresholds.
- `yarn validate:content` and `yarn lint:tags`: validate Markdown/frontmatter and tag hygiene.

## Coding Style & Naming Conventions
- TypeScript is strict (`tsconfig.json` has `strict: true`); keep types explicit at module boundaries.
- Prettier rules: tabs, single quotes, semicolons, trailing commas, max width 120.
- ESLint extends `next/core-web-vitals`; resolve warnings before opening a PR.
- Naming patterns: React components in PascalCase (`Header.tsx`), helpers in camelCase (`getAllArticles.ts`), tests as `*.test.ts`/`*.test.tsx`.

## Testing Guidelines
- Frameworks: Jest + React Testing Library (`jsdom` environment).
- Place tests in `__tests__/`; keep snapshots in `__tests__/__snapshots__/`.
- Coverage thresholds (global): branches 50%, functions 60%, lines/statements 65%.
- Run `yarn test:coverage` before large refactors.

## Commit & Pull Request Guidelines
- Follow existing history style: concise, imperative subject lines (for example, `Fix theme hydration regression on initial page load`).
- Keep commits focused and logically grouped.
- PRs should include: purpose summary, key changes, test evidence (`yarn test`, `yarn lint`), and screenshots for UI updates.
- Link related issues and call out content/schema changes (especially Markdown frontmatter or Firestore sync behavior).

## Security & Configuration Tips
- Never commit secrets. Keep credentials in `.env.local`.
- Firestore sync uses service account env vars (`FIREBASE_SERVICE_ACCOUNT_PATH`, `GOOGLE_APPLICATION_CREDENTIALS`, or `FIREBASE_SERVICE_ACCOUNT_JSON`).
