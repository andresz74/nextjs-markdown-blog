# Codebase Debt Analysis and Execution Backlog

## Scope and method
- Reviewed architecture and implementation across `app/`, `components/`, `utils/`, `types/`, and `__tests__/`.
- Ran quality checks:
  - `yarn lint` (passes with warnings)
  - `yarn test --runInBand` (fails)
  - `yarn build` (passes with warnings)
- Focused on production risk, maintainability debt, correctness, test reliability, accessibility, and security.

## Technical debt (prioritized)

### Critical
1. Broken test suite and unreliable quality gate.
- Evidence: `__tests__/getAllArticles.test.ts:50`, `__tests__/GoogleAnalytics.test.tsx:5`, `__tests__/ArticleContent.snapshot.test.tsx:9`.
- Impact: CI trust is low; regressions can ship undetected.
- Notes: `jest.config.js:53` requires 80% global coverage, but current run reports ~63.7%.

2. Firestore article pipeline is effectively inactive in static build.
- Evidence: `utils/getAllArticles.ts:32` (`fetchAndCacheArticles`) is never called from pages; `app/fb-articles/[slug]/page.tsx:13` falls back to `placeholder`.
- Impact: `/fb-articles` can render empty or stale content; static build generated only `/fb-articles/placeholder`.

3. Incorrect canonical/OpenGraph URLs for article routes.
- Evidence: `app/articles/[slug]/page.tsx:61`, `app/articles/[slug]/page.tsx:87`, `app/fb-articles/[slug]/page.tsx:45`, `app/fb-articles/[slug]/page.tsx:66`.
- Impact: SEO/canonical conflicts and wrong social preview URLs.

### High
4. Repeated slug-page logic across 4 routes (notes/docs/articles/fb-articles).
- Evidence: near-duplicate metadata + JSON-LD blocks in `app/articles/[slug]/page.tsx`, `app/notes/[slug]/page.tsx`, `app/docs/[slug]/page.tsx`.
- Impact: high change cost and copy/paste bugs.

5. App Router anti-pattern: `next/head` in route files.
- Evidence: `app/articles/[slug]/page.tsx:1`, `app/notes/[slug]/page.tsx:1`, `app/docs/[slug]/page.tsx:1`.
- Impact: metadata/script behavior is harder to reason about in App Router.

6. Weak type safety and broad `any` usage.
- Evidence: `app/articles/[slug]/page.tsx:99`, `app/about/page.tsx:12`, `components/ArticleCard.tsx:10`, `components/Markdown.tsx:30`.
- Impact: lower refactor safety and hidden runtime errors.

7. Theme initialization logic is split and inconsistent.
- Evidence: lint warnings in `components/ThemeInit.tsx:7` and `components/ThemeSelect.tsx:27`; duplicated theme writes in `utils/useTheme.tsx:28` and `components/ThemeSelect.tsx:29`.
- Impact: hydration risk and maintenance overhead.

### Medium
8. External links in markdown renderer open new tabs without `rel`.
- Evidence: `utils/markdownRenderers/LinkNode.tsx:11`.
- Impact: security/accessibility issue (`window.opener` risk).

9. Pagination disabled state is visual only.
- Evidence: `components/Pagination.tsx:33`, `components/Pagination.tsx:43`.
- Impact: accessibility and UX inconsistency.

10. Production/server logs in route code.
- Evidence: `app/fb-articles/page.tsx:8`, multiple `console.error` and `console.warn` in routes/utils.
- Impact: noisy logs and weaker observability structure.

11. Naming/typing drift.
- Evidence: typo `ArticlestInterface` in `types/ArticleInterface.ts:1`; unused props in `components/Icon.tsx:10`.
- Impact: readability and API clarity degradation.

12. Global CSS performance overhead.
- Evidence: many remote font `@import` calls and large inlined SVG tokens in `app/globals.css:1` and `app/globals.css:95`.
- Impact: heavier CSS payload and slower first render.

## Improvements / nice-to-have features
1. Add sitemap/robots integration and explicit canonical strategy per content type.
2. Add reading-time, related-posts-by-tag, and “next/previous post” navigation.
3. Add content linting for frontmatter schema (`title`, `date`, `description`, `image`, `tags`).
4. Add route-level tests for tag pages, feed routes, and metadata generation.
5. Add structured logging wrapper (`logger.ts`) with environment-aware verbosity.
6. Add content indexing for faster client search (or server-side search endpoint).
7. Add per-route OpenGraph image generation (optional, Next ImageResponse).

## Execution backlog (ticket-by-ticket)

| Ticket | Item | Effort | Depends on | Definition of done |
|---|---|---:|---|---|
| BLG-001 | Fix test suite breakages (`getAllArticles`, `GoogleAnalytics`, snapshot props) | M (1-2d) | None | `yarn test` passes without snapshot drift surprises |
| BLG-002 | Align cache schema and loading contract for fb articles | M (1-2d) | BLG-001 | `getCachedArticles` handles current+legacy schema safely |
| BLG-003 | Implement deterministic cache-refresh path for static builds (prebuild or build hook) | M (1-2d) | BLG-002 | `/fb-articles/[slug]` builds real slugs, no placeholder fallback |
| BLG-004 | Fix canonical/OpenGraph URL bugs for `/articles` and `/fb-articles` | S (0.5d) | None | Metadata URLs match actual route paths |
| BLG-005 | Extract shared metadata/JSON-LD helpers for slug pages | L (3-4d) | BLG-004 | Route files use shared utility and remove duplication |
| BLG-006 | Replace `next/head` usage with App Router-safe pattern | M (1d) | BLG-005 | JSON-LD is injected without `next/head`; SSR output validated |
| BLG-007 | Remove broad `any` usage; type route props and markdown renderers | M (1-2d) | BLG-005 | No `any` in critical route/components paths |
| BLG-008 | Consolidate theme initialization into single source of truth | M (1-2d) | None | Lint warnings removed; theme behavior stable on first paint |
| BLG-009 | Harden external link renderer (`rel`, internal-link policy) | S (0.5d) | None | Security best practices applied; tests added |
| BLG-010 | Improve pagination accessibility and disabled behavior | S (0.5d) | None | Prev/Next states are non-interactive when disabled |
| BLG-011 | Replace ad-hoc console calls with logger utility | S (0.5-1d) | None | Logs are structured and environment-aware |
| BLG-012 | Clean type naming/API drift (`ArticlestInterface`, Icon props) | S (0.5d) | BLG-007 | Naming fixed, no dead props |
| BLG-013 | Optimize global CSS/font loading strategy | M (1-2d) | None | Font loading moved to optimized approach, payload reduced |
| BLG-014 | Add route/feed/tag test coverage to meet realistic thresholds | L (3-4d) | BLG-001, BLG-005 | Coverage threshold policy passes and is meaningful |
| BLG-015 | Add content frontmatter validation script + CI check | M (1d) | None | Invalid markdown metadata fails CI with clear errors |
| BLG-016 | Add SEO enhancements (sitemap, robots, canonical policy doc) | M (1-2d) | BLG-004 | Generated sitemap/robots and documented URL conventions |
| BLG-017 | Add related posts + reading time UX improvements | M (1-2d) | BLG-005 | UI shipped with tests and no perf regression |
| BLG-018 | Optional: dynamic OG image generation pipeline | L (3d) | BLG-016 | Social previews generated per route with fallback |

## Suggested implementation order
1. Stabilize quality gates first: BLG-001 to BLG-004.
2. Remove structural duplication and App Router debt: BLG-005 to BLG-008.
3. Security/a11y/logging cleanup: BLG-009 to BLG-013.
4. Coverage and content governance: BLG-014 to BLG-016.
5. Feature enhancements: BLG-017 to BLG-018.
