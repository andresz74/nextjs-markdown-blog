This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Next.js Markdown Blog

This project is a personal blog built with Next.js that uses Markdown files for content management. The application is designed to allow publishing of blog articles with structured metadata, organized content, and a minimalistic layout. Styled Components and various utilities are included to enhance the blogging experience and styling.

![My Blog](https://objects-us-east-1.dream.io/az-assets/nextjs-markdown-blog.png)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Markdown Structure](#markdown-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- **Next.js**: A React framework that enables static and server-rendered pages.
- **Markdown Support**: Easily write articles in Markdown with metadata.
- **Dynamic Routing**: Each article is served with a unique route generated from the file name.
- **Styled Components**: Uses Styled Components for styling the blog layout.
- **Syntax Highlighting**: Highlight code blocks using `react-syntax-highlighter`.
- **SEO-friendly Metadata**: Generate page metadata from each article's title.

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- **Node.js** (v18.x or later)
- **npm** (v8.x or later)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/andresz74/nextjs-markdown-blog.git
   cd nextjs-markdown-blog
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Create a folder named `articles` in the root of the project. Add Markdown files in this folder to publish articles.

### Running the Project

To start the development server:

```bash
yarn dev
```

To build the project for production:

```bash
yarn build
```

To serve the production build locally:

```bash
yarn start
```

To test the project:

```bash
yarn test
```
With coverage
```bash
yarn test --coverage
```

## Project Structure

Here's a breakdown of the core components and utilities used in this blog:

- **`components/ArticleContent.tsx`**: Renders the main content of each article with Markdown formatting.
- **`components/ArticleCard.tsx`**: Displays a brief preview of each article in the blog home.
- **`utils/getArticleMetadata.ts`**: Utility to extract metadata from each Markdown file.
- **`utils/getArticleContent.ts`**: Utility to retrieve and parse the content of each Markdown file.

## Markdown Structure

Each Markdown file should contain front matter for metadata. Example structure:

```markdown
---
title: "The Arctic Predator"
date: "2024-05-13"
description: "Polar bears, majestic predators of the Arctic, are facing unprecedented challenges due to climate change..."
---

### The Arctic Predator

Content goes here...
```

Place all your Markdown files in the `articles` folder. The filename will be used as the `slug` for routing.

### Example of Generated Metadata

Each page's metadata is generated dynamically to reflect the article title:

- Page title: `My Blog - [Article Title]`
- Description: Based on `description` in the article's front matter

### Sharing Articles

Blog posts now include a share section with buttons for:

- Twitter (X)
- Facebook
- LinkedIn
- Reddit
- Copy to clipboard

These buttons appear at the bottom of each article and are dynamically generated based on the article's title and URL.
To ensure correct sharing links, make sure to set the `NEXT_PUBLIC_BASE_URL` environment variable in your `.env.local` file:
```
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
````

This is used to construct full URLs for sharing from the `ShareButtons` component:
```
<ShareButtons title={articleTitle} url={`${process.env.NEXT_PUBLIC_BASE_URL}/${folder}/${slug}`} />
```

## Scripts

- **`yarn dev`**: Starts the development server.
- **`yarn build`**: Builds the application for production.
- **`yarn start`**: Runs the built application in production mode.
- **`yarn lint`**: Lints the project for code consistency.
- **`yarn test`**: Test the project.

## Dependencies

- **`next`**: Framework for React-based applications with static and server-rendered pages.
- **`react`** and **`react-dom`**: Core libraries for building and rendering React components.
- **`gray-matter`**: Parses front matter in Markdown files to extract metadata.
- **`react-markdown`**: Renders Markdown content as React components.
- **`remark-gfm`**: Adds GitHub-flavored Markdown support to `react-markdown`.
- **`react-syntax-highlighter`**: Enables syntax highlighting for code blocks.
- **`styled-components`**: CSS-in-JS library for styling components.

### Dev Dependencies

- **`@types/node`**: TypeScript type definitions for Node.js.
- **`@types/react`** and **`@types/react-dom`**: TypeScript definitions for React.
- **`eslint`** and **`eslint-config-next`**: Linter and Next.js-specific linting rules.
- **`typescript`**: Static typing for JavaScript.

## License

This project is licensed under the MIT License.
