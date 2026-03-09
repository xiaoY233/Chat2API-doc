---
name: Fumadocs Headless
description: Build documentation sites using Headless components library, including navigation, TOC, search API, and content collections
---

# Fumadocs Headless Usage Guide

The Headless component library provides the core functionality needed to build documentation sites.

## Navigation Components

### Breadcrumb Navigation

```typescript
'use client';
import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function Breadcrumb({ tree }: { tree: any }) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);

  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-1 text-sm font-medium text-fd-muted-foreground">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />}
          {item.url ? (
            <Link href={item.url} className="truncate hover:text-fd-accent-foreground">
              {item.name}
            </Link>
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
```

### Link Component

Smart link component that automatically handles external links and internal routing.

```typescript
import { Link } from 'fumadocs-core/components/link';

<Link href="/docs/page">Link Text</Link>
```

### TOC (Table of Contents)

```typescript
import { getTOC } from 'fumadocs-core/utils';
import { Text } from 'fumadocs-ui/components/text';

const toc = await getTOC(markdownContent);
```

## Content Collections API

### Define Content Sources

Create `source.ts` or `loader.ts`:

```typescript
import { defineDocs } from 'fumadocs-mdx/config';
import { pageSchema, metaSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      index: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      category: z.string(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      title: z.string(),
      description: z.string(),
    }),
  },
});

export const loader = async (files: Awaited<ReturnType<typeof defineDocs>>) => ({
  ...docs(files),
});
```

### Access Content

```typescript
import { source } from '@/lib/source';

// Get all pages
const pages = source.getPageList();

// Get specific page
const page = source.getPage('/docs/guide');

// Get page tree
const tree = source.getPageTree();

// Get paginated list with filtering
const pages = source.getPageList({ filter: p => p.data.published });
```

## Search Integration

### Orama (Default)

```typescript
// search.server.ts
import { OramaSearch } from 'fumadocs-core/search/orama';

export const search = new OramaSearch({
  location: 'server',
});
```

#### Static Mode

```typescript
import { create } from '@orama/orama';

function initOrama() {
  return create({
    schema: { _: 'string' },
    language: 'english',
  });
}

export const search = new OramaSearch({
  location: 'static',
  initOrama,
});
```

#### Custom Schema

```typescript
function initOrama() {
  return create({
    schema: {
      title: 'string',
      url: 'string',
      tags: 'string[]',
      content: 'string',
    },
    language: 'english',
  });
}

export const search = new OramaSearch({
  location: 'static',
  initOrama,
});
```

### Algolia

```typescript
import { AlgoliaSearch } from 'fumadocs-core/search/algolia';

export const search = new AlgoliaSearch({
  appId: process.env.ALGOLIA_APP_ID!,
  apiKey: process.env.ALGOLIA_API_KEY!,
});
```

### Mixedbread

```typescript
import { MixedbreadSearch } from 'fumadocs-core/search/mixedbread';

export const search = new MixedbreadSearch({
  apiKey: process.env.MIXEDBREAD_API_KEY!,
});
```

### Trieve

```typescript
import { TrieveSearch } from 'fumadocs-core/search/trieve';

export const search = new TrieveSearch({
  client: {
    apiKey: process.env.TRIEVE_API_KEY!,
    base: process.env.TRIEVE_BASE!,
  },
});
```

## MDX Plugins

### Code Highlighting

```typescript
import { rehypeCode } from 'fumadocs-core/mdx/rehype-code';

export const mdxOptions = {
  rehypePlugins: [rehypeCode()],
};
```

### Admonitions (Alerts)

```typescript
import { remarkAdmonition } from 'fumadocs-core/mdx/remark-admonition';

export const mdxOptions = {
  remarkPlugins: [remarkAdmonition()],
};
```

### TypeScript/JavaScript Toggle

```typescript
import { remarkTS2JS } from 'fumadocs-core/mdx/remark-ts2js';

export const mdxOptions = {
  remarkPlugins: [remarkTS2JS()],
};
```

### Image Size

```typescript
import { remarkImage } from 'fumadocs-core/mdx/remark-image';

export const mdxOptions = {
  remarkPlugins: [remarkImage()],
};
```

### MDX Structure Extraction

```typescript
import { remarkStructure } from 'fumadocs-core/mdx/remark-structure';

export const mdxOptions = {
  remarkPlugins: [remarkStructure()],
};
```

## Page Tree Configuration

### Root Folders

Create `meta.json` in the folder:

```json
{
  "title": "Components",
  "description": "Component documentation",
  "root": true
}
```

### Custom Page Tree

```typescript
import type { PageTree } from 'fumadocs-core/page-tree';

const tree: PageTree.Root = {
  name: 'docs',
  children: [
    {
      name: 'getting-started',
      children: [
        {
          name: 'introduction.mdx',
          url: '/docs/getting-started/introduction',
        },
      ],
      url: '/docs/getting-started',
    },
  ],
};
```

**Reference Documentation**:
- [Headless Documentation](https://www.fumadocs.dev/docs/headless)
- [Components List](https://www.fumadocs.dev/docs/headless/components)
- [Search Integration](https://www.fumadocs.dev/docs/headless/search)
- [MDX Plugins](https://www.fumadocs.dev/docs/headless/mdx)
- [Content Collections](https://www.fumadocs.dev/docs/mdx/collections)