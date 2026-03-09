---
name: Fumadocs UI
description: Customize documentation appearance and layouts using Fumadocs UI theme and component library
---

# Fumadocs UI Usage Guide

Fumadocs UI provides beautiful documentation themes and interactive components.

## Component Library

### Accordion

```typescript
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

<Accordions type="single">
  <Accordion title="What is Fumadocs?">
    Fumadocs is a documentation framework...
  </Accordion>
  <Accordion title="How to use?">
    You can use it with Next.js, React Router, etc.
  </Accordion>
</Accordions>
```

**Props**:
- `type`: 'single' | 'multiple'
- `disabled`: boolean
- `orientation`: 'vertical' | 'horizontal'

#### Linking to Accordion

```typescript
<Accordions>
  <Accordion title="My Title" id="my-title">
    Content
  </Accordion>
</Accordions>
```

Automatically opens when navigating to the page with the specified id:

```typescript
<Link href="/docs?#my-title">Jump to my title</Link>
```

### Tabs

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';

<Tabs defaultValue="docs">
  <TabsList>
    <TabsTrigger value="docs">Documentation</TabsTrigger>
    <TabsTrigger value="api">API Reference</TabsTrigger>
    <TabsTrigger value="examples">Examples</TabsTrigger>
  </TabsList>
  <TabsContent value="docs">
    Documentation content...
  </TabsContent>
  <TabsContent value="api">
    API documentation...
  </TabsContent>
</Tabs>
```

**Props**:
- `value`: Currently selected value
- `defaultValue`: Default value

### Steps

```typescript
import { Steps, Step, StepList } from 'fumadocs-ui/components/steps';

<Steps>
  <StepList>
    <Step title="Install">npm install fumadocs</Step>
    <Step title="Configure">Update config files</Step>
    <Step title="Run">npm run dev</Step>
  </StepList>
</Steps>
```

### Code Block

```typescript
import { CodeBlock, DynamicCodeBlock } from 'fumadocs-ui/components/codeblock';

<CodeBlock filename="example.ts">
  console.log('Hello, Fumadocs!');
</CodeBlock>

<CodeBlock
  filename="index.tsx"
  language="typescript"
  showLineNumbers
>
  export default function App() {
    return <div>Hello World</div>;
  }
</CodeBlock>

// Dynamic code block
<DynamicCodeBlock code={codeString} language="typescript" />
```

**Props**:
- `filename`: File name
- `language`: Language type
- `showLineNumbers`: Show line numbers
- `copyButton`: Show copy button

### Banner

```typescript
import { Banner } from 'fumadocs-ui/components/banner';

<Banner>
  ⚠️ New feature coming soon! Check out the beta version.
</Banner>

<Banner variant="info">
  ℹ️ Documentation is being updated.
</Banner>
```

**Props**:
- `variant`: 'default' | 'info' | 'warning' | 'success'

### Files

```typescript
import { Files } from 'fumadocs-ui/components/files';

<Files>
  <Files.Item name="src" type="folder">
    <Files.Item name="components" type="folder">
      <Files.Item name="Button.tsx" type="file" />
      <Files.Item name="Input.tsx" type="file" />
    </Files.Item>
    <Files.Item name="App.tsx" type="file" />
  </Files.Item>
</Files>
```

### GitHub Info

```typescript
import { GitHubInfo } from 'fumadocs-ui/components/github-info';

<GitHubInfo
  repository="fuma-nama/fumadocs"
  branch="main"
/>
```

### Inline TOC

```typescript
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';

<InlineTOC />
```

## Layout System

### Docs Layout

Standard documentation layout (sidebar + header + TOC):

```typescript
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      sidebar={{ enabled: true }}
      header={{ title: 'My Documentation' }}
    >
      {children}
    </DocsLayout>
  );
}
```

#### Sidebar Configuration

```typescript
<DocsLayout
  tree={source.getPageTree()}
  sidebar={{
    enabled: true,
    tabs: true, // Enable tabs
    collapsible: true, // Collapsible
    defaultOpenLevel: 2, // Default open level
    prefetch: true, // Prefetch
  }}
>
  {children}
</DocsLayout>
```

#### Sidebar Breadcrumb

```typescript
<DocsLayout
  tree={source.getPageTree()}
  sidebar={{
    enabled: true,
    banner: <div>Welcome to our docs!</div>,
  }}
>
  {children}
</DocsLayout>
```

### Flux Layout

Minimalist layout, suitable for technical blogs:

```typescript
import { FluxLayout } from 'fumadocs-ui/layouts/flux';
import { source } from '@/lib/source';

export default function FluxLayout({ children }: { children: React.ReactNode }) {
  return (
    <FluxLayout tree={source.getPageTree()}>
      {children}
    </FluxLayout>
  );
}
```

### Home Layout

Homepage layout, ideal as a website entry point:

```typescript
import { HomeLayout } from 'fumadocs-ui/layouts/home-layout';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  );
}
```

### Notebook Layout

Notebook-style layout, compact for technical documentation:

```typescript
import { NotebookLayout } from 'fumadocs-ui/layouts/notebook';
import { source } from '@/lib/source';

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotebookLayout tree={source.getPageTree()}>
      {children}
    </NotebookLayout>
  );
}
```

## Search UI

### Basic Search Dialog

```typescript
'use client';
import { SearchDialog, SearchDialogList } from 'fumadocs-ui/components/dialog/search';

export default function SearchDialog() {
  const { search, setSearch, query } = useDocsSearch();

  return (
    <SearchDialog search={search} onSearchChange={setSearch}>
      <SearchDialogList items={query.data} />
    </SearchDialog>
  );
}
```

### Complete Search Dialog

```typescript
'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogList,
  SearchDialogOverlay,
} from 'fumadocs-ui/components/dialog/search';

export default function CustomSearchDialog() {
  const { search, setSearch, query } = useDocsSearch();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SearchDialog search={search} onSearchChange={setSearch}>
      <SearchDialogOverlay className={isFocused ? 'opacity-100' : 'opacity-0'} />
      <SearchDialogContent className={isFocused ? 'scale-100' : 'scale-95'}>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
```

### Tag Filtering

```typescript
'use client';
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { useState } from 'react';

export default function TagFilterSearchDialog() {
  const [tag, setTag] = useState<string | undefined>();

  const { search, setSearch, query } = useDocsSearch({
    tag,
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter className="flex flex-row">
          <TagsList tag={tag} onTagChange={setTag}>
            <TagsListItem value="getting-started">Getting Started</TagsListItem>
            <TagsListItem value="api">API Reference</TagsListItem>
            <TagsListItem value="guides">Guides</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
```

### Custom Result List

```typescript
'use client';
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogList,
  SearchDialogOverlay,
} from 'fumadocs-ui/components/dialog/search';

export default function CustomSearchDialog() {
  const { search, setSearch, query } = useDocsSearch();

  return (
    <SearchDialog search={search} onSearchChange={setSearch}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
        </SearchDialogHeader>
        <SearchDialogList
          items={query.data !== 'empty' ? query.data : null}
          renderItem={(item) => (
            <div className="p-4 border-b">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Link href={item.url} className="text-blue-500">
                Read more →
              </Link>
            </div>
          )}
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
```

## Theme Configuration

### Basic Configuration

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        fd: {
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#f59e0b',
          background: '#ffffff',
          foreground: '#0f172a',
          muted: '#f1f5f9',
          'muted-foreground': '#64748b',
          border: '#e2e8f0',
        },
      },
    },
  },
};
```

### Base UI vs Radix UI

Default uses Radix UI:

```typescript
import { RootProvider } from 'fumadocs-ui/provider/nextjs';

<RootProvider>
  {children}
</RootProvider>
```

Switch to Base UI:

```json
// cli.json
{
  "uiLibrary": "base-ui"
}
```

## CSS Variable Customization

Fumadocs uses CSS variables for color customization:

```css
:root {
  --fd-primary: #3b82f6;
  --fd-secondary: #64748b;
  --fd-accent: #f59e0b;
  --fd-background: #ffffff;
  --fd-foreground: #0f172a;
  --fd-muted: #f1f5f9;
  --fd-muted-foreground: #64748b;
  --fd-border: #e2e8f0;
  --fd-sidebar-width: 280px;
  --fd-header-height: 60px;
}
```

**Reference Documentation**:
- [UI Documentation](https://www.fumadocs.dev/docs/ui)
- [Component Library](https://www.fumadocs.dev/docs/ui/component-library)
- [Layouts](https://www.fumadocs.dev/docs/ui/layouts)
- [Search UI](https://www.fumadocs.dev/docs/ui/search)