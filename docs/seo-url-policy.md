---
title: "SEO URL Policy"
date: 2026-02-10
description: "Canonical URL and metadata policy for routes, feeds, sitemap, and robots in The Tech Pulse."
canonical_url: https://blog.andreszenteno.com/docs/seo-url-policy
author: Andres Zenteno
tags:
  - seo
  - canonical
  - metadata
---
# SEO URL Policy

## Canonical URL rules
- Base domain: `https://blog.andreszenteno.com`
- Canonical URL always matches the rendered route:
  - Articles: `/articles/{slug}`
  - Notes: `/notes/{slug}`
  - Docs: `/docs/{slug}`
  - Firestore articles: `/fb-articles/{slug}`
  - Tags: `/tags/{tag}`

## Metadata expectations
- `alternates.canonical` must point to the same route the page is served from.
- `openGraph.url` must equal canonical.
- Social image URLs should be absolute.
- Optional dynamic OG pipeline: set `NEXT_PUBLIC_DYNAMIC_OG_ENABLED=true` to use `/og?title=...` fallback images when frontmatter image is missing.

## Sitemap and robots
- `app/sitemap.ts` is the source of truth for crawlable routes.
- `app/robots.ts` exposes sitemap and host directives.
- Feeds are indexed as static routes:
  - `/rss.xml`
  - `/atom.xml`
  - `/feed.json`

## Operational checks
- On route changes, update both page metadata and sitemap generation.
- Before merging SEO changes, verify:
  - canonical URL correctness
  - sitemap entries for new routes
  - robots references to sitemap
