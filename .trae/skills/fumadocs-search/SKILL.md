---
name: Fumadocs Search
description: Configure and integrate document search engines for Fumadocs, supporting Orama, Algolia, Mixedbread, and other solutions
---

# Fumadocs Search Usage Guide

Configure document search engines.

## Search Engine Selection

### Orama (Default)

Built-in search engine, no additional dependencies required.

#### Server Mode

```typescript
// search.server.ts
import { OramaSearch } from 'fumadocs-core/search/orama';

export const search = new OramaSearch({
  location: 'server',
});
```

Use in `RootProvider`:

```typescript
import { RootProvider } from 'fumadocs-ui/provider/nextjs';
import { search } from '@/lib/search.server';

<RootProvider search={{ search }}>
  {children}
</RootProvider>
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
// search.server.ts
import { AlgoliaSearch } from 'fumadocs-core/search/algolia';

export const search = new AlgoliaSearch({
  appId: process.env.ALGOLIA_APP_ID!,
  apiKey: process.env.ALGOLIA_API_KEY!,
});
```

Configure index:

```typescript
export const search = new AlgoliaSearch({
  appId: process.env.ALGOLIA_APP_ID!,
  apiKey: process.env.ALGOLIA_API_KEY!,
  indexName: 'my-docs',
});
```

### Mixedbread

```typescript
// search.server.ts
import { MixedbreadSearch } from 'fumadocs-core/search/mixedbread';

export const search = new MixedbreadSearch({
  apiKey: process.env.MIXEDBREAD_API_KEY!,
});
```

### Trieve

```typescript
// search.server.ts
import { TrieveSearch } from 'fumadocs-core/search/trieve';

export const search = new TrieveSearch({
  client: {
    apiKey: process.env.TRIEVE_API_KEY!,
    base: process.env.TRIEVE_BASE!,
  },
});
```

## Custom Search UI

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
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter className="flex flex-row">
          <TagsList tag={tag} onTagChange={setTag}>
            <TagsListItem value="getting-started">Getting Started</TagsListItem>
            <TagsListItem value="api">API Reference</TagsListItem>
            <TagsListItem value="guides">Guides</TagsListItem>
            <TagsListItem value="components">Components</TagsListItem>
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

## Configure RootProvider

```typescript
import { RootProvider } from 'fumadocs-ui/provider/nextjs';
import SearchDialog from '@/components/search';

<RootProvider
  search={{ SearchDialog }}
>
  {children}
</RootProvider>
```

## Internationalized Search

```typescript
'use client';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

export default function SearchDialog() {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    locale,
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch}>
      <SearchDialogList items={query.data} />
    </SearchDialog>
  );
}
```

## Performance Optimization

### Prefetch

```typescript
const { search, setSearch, query } = useDocsSearch({
  type: 'fetch',
  prefetch: true,
});
```

### Static Caching

For static sites, use static mode:

```typescript
export const search = new OramaSearch({
  location: 'static',
  initOrama,
});
```

## Search Configuration Options

### Orama Configuration

```typescript
export const search = new OramaSearch({
  location: 'server',
  options: {
    language: 'english',
    stemmer: true,
    minScore: 0.3,
  },
});
```

### Algolia Configuration

```typescript
export const search = new AlgoliaSearch({
  appId: process.env.ALGOLIA_APP_ID!,
  apiKey: process.env.ALGOLIA_API_KEY!,
  indexName: 'my-docs',
  searchParameters: {
    hitsPerPage: 10,
    attributesToHighlight: ['title', 'content'],
    attributesToSnippet: ['content:30'],
  },
});
```

**Reference Documentation**:
- [Search Configuration](https://www.fumadocs.dev/docs/search)
- [Orama Integration](https://www.fumadocs.dev/docs/headless/search/orama)
- [Algolia Integration](https://www.fumadocs.dev/docs/search/algolia)
- [Mixedbread Integration](https://www.fumadocs.dev/docs/headless/search/mixedbread)
- [Trieve Integration](https://www.fumadocs.dev/docs/headless/search/trieve)