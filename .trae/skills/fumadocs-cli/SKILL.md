---
name: Fumadocs CLI
description: Create and configure Fumadocs projects using CLI, selecting frameworks, content sources, and UI components
---

# Fumadocs CLI Usage Guide

Fumadocs CLI is a command-line tool for creating and managing Fumadocs projects.

## Project Creation

### Automatic Installation
Supports npm, pnpm, yarn, bun:

```bash
npm create fumadocs-app
```

### Manual Installation

Add dependencies based on your chosen framework:

#### Next.js
```bash
npm install fumadocs-ui fumadocs-mdx fumadocs-core
npm install fumadocs-nextjs-ui
```

#### React Router
```bash
npm install fumadocs-ui fumadocs-mdx fumadocs-core
npm install fumadocs-react-router-ui
```

#### Tanstack Start
```bash
npm install fumadocs-ui fumadocs-mdx fumadocs-core
npm install fumadocs-tanstack-start-ui
```

#### Waku
```bash
npm install fumadocs-ui fumadocs-mdx fumadocs-core
npm install fumadocs-waku-ui
```

## Content Source Configuration

### Fumadocs MDX

Create `fumadocs-mdx.config.ts` or `source.config.ts`:

```typescript
import { defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      index: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      title: z.string(),
      description: z.string(),
    }),
  },
});
```

### Custom Content Sources

View documentation: https://www.fumadocs.dev/docs/integrations/content

## UI Component Installation

### Via CLI
```bash
npx @fumadocs/cli@latest customise
```

### Manual Installation

Install based on your needs:

```bash
npm install fumadocs-ui @fumadocs/base-ui
```

### Choosing UI Library

**Radix UI** (default): Full accessibility support

**Base UI**: Lightweight alternative

Configure in `cli.json`:

```json
{
  "uiLibrary": "base-ui"
}
```

## Layout Customization

### Layout Options

- **Docs Layout**: Standard documentation layout (sidebar + header + TOC)
- **Flux Layout**: Minimalist layout, suitable for tech blogs
- **Home Layout**: Homepage layout, ideal as a website entry point
- **Notebook Layout**: Notebook-style layout, compact for technical documentation

### Custom Layouts

In `layout.tsx`:

```typescript
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout tree={source.getPageTree()}>
      {children}
    </DocsLayout>
  );
}
```

### Configuring Sidebar

```typescript
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

<DocsLayout
  tree={source.getPageTree()}
  sidebar={{
    enabled: true,
    tabs: true,
  }}
>
  {children}
</DocslocLayout>
```

## Common Questions

### How to change base route
Modify the docs route configuration in `next.config.js` or `vite.config.ts`.

### How to implement multi-docs
Configure multiple content directories or use nested structure.

### Static Export
Enable to support static website deployment.

**Reference Documentation**:
- [CLI Documentation](https://www.fumadocs.dev/docs/cli)
- [Manual Installation Guide](https://www.fumadocs.dev/docs/manual-installation)
- [Layout Customization](https://www.fumadocs.dev/docs/ui/layouts)