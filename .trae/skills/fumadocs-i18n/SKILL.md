---
name: Fumadocs i18n
description: Configure internationalization support for Fumadocs, including multi-language routing and content organization
---

# Fumadocs i18n Usage Guide

Configure multi-language support.

## Internationalization Configuration

### configureI18n

Create `i18n.ts`:

```typescript
import { configureI18n } from 'fumadocs-ui/contexts/i18n';
import { source } from '@/lib/source';

const i18n = configureI18n({
  defaultLocale: 'en',
  locales: ['en', 'zh', 'es'],
});

export const { getTranslations, getLocale } = i18n;
```

### Use in RootProvider

```typescript
import { RootProvider } from 'fumadocs-ui/provider/nextjs';
import { i18n } from '@/lib/i18n';

<RootProvider i18n={i18n}>
  {children}
</RootProvider>
```

## Routing Configuration

### Next.js Routing

Create `middleware.ts`:

```typescript
// middleware.ts
import { i18nMiddleware } from 'fumadocs-core/internationalization/middleware';

export const config = {
  matcher: ['/((?!api/_next/static|_next/image|favicon.ico).*)']
};

export default i18nMiddleware();
```

Configure language path prefix:

```typescript
// middleware.ts
import { i18nMiddleware } from 'fumadocs-core/internationalization/middleware';
import { Locale } from 'i18n';

export const config = {
  matcher: ['/((?!api/_next/static|_next/image|favicon.ico).*)']
};

export default i18nMiddleware({
  locales: ['en', 'zh', 'es'],
  defaultLocale: 'en' as Locale,
  localeDetection: true,
});
```

### React Router Routing

```typescript
import { Route, Routes } from 'react-router-dom';
import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const locale = useLocale();

  return (
    <I18nProvider locale={locale}>
      <Routes>
        <Route path="/:lang/*" element={<AppContent />} />
      </Routes>
    </I18nProvider>
  );
}
```

### Tanstack Start Routing

```typescript
import { createRoute } from '@tanstack/react-router';
import { I18nProvider } from 'fumadocs-ui/contexts/i18n';

export const route = createRoute({
  path: '/:lang/*',
  component: () => (
    <I18nProvider locale="en">
      <App />
    </I18nProvider>
  ),
});
```

## Content Directory Structure

```
content/
├── en/
│   ├── index.mdx
│   ├── guide/
│   │   ├── getting-started.mdx
│   │   └── configuration.mdx
│   ├── api/
│   │   ├── auth.mdx
│   │   └── users.mdx
│   └── components/
│       ├── button.mdx
│       └── input.mdx
└── zh/
    ├── index.mdx
    ├── guide/
    │   ├── getting-started.mdx
    │   └── configuration.mdx
    ├── api/
    │   ├── auth.mdx
    │   └── users.mdx
    └── components/
        ├── button.mdx
        └── input.mdx
```

## Schema Extension

Add language information to content collections:

```typescript
import { pageSchema } from 'fumadocs-core/source/schema';

schema: pageSchema.extend({
  locale: z.string(),
  translatedFrom: z.string().optional(),
  translatedTo: z.string().optional(),
});
```

## Language Switching

### LocaleSelector Component

```typescript
import { LocaleSelector } from 'fumadocs-ui/components/selector/locale';

export default function LanguageSwitcher() {
  return (
    <LocaleSelector>
      <LocaleSelector.Button />
      <LocaleSelector.Items>
        <LocaleSelector.Item value="en">English</LocaleSelector.Item>
        <LocaleSelector.Item value="zh">中文</LocaleSelector.Item>
        <LocaleSelector.Item value="es">Español</LocaleSelector.Item>
      </LocaleSelector.Items>
    </LocaleSelector>
  );
}
```

### Using React Hook

```typescript
import { useLocale } from 'fumadocs-ui/contexts/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="zh">中文</LocaleSelector.Item>
      <option value="es">Español</option>
    </select>
  );
}
```

## Multi-Language Navigation

### In Sidebar

```typescript
<DocsLayout
  tree={source.getPageTree()}
  sidebar={{
    enabled: true,
    translations: {
      en: '/docs',
      zh: '/zh/docs',
      es: '/es/docs',
    },
  }}
>
  {children}
</DocsLayout>
```

### Get Translated Pages

```typescript
import { getPage } from '@/lib/source';

// Get English version page
const enPage = getPage('/docs/guide');

// Get Chinese version page
const zhPage = getPage('/zh/docs/guide');
```

## Internationalized Content Authoring

### Multi-Language Files

```typescript
// content/en/guide.mdx
---
title: "Getting Started"
---

# Getting Started

This is the English version.

// content/zh/guide.mdx
---
title: "入门指南"
---

# 入门指南

这是中文版本。
```

### Unified Structure

Keep the same content structure:

```
en/
  ├── getting-started.mdx
  ├── configuration.mdx
  └── api/
zh/
  ├── getting-started.mdx
  ├── configuration.mdx
  └── api/
```

## Translation Tools

### Using Crowdin

Upload language files to Crowdin for translation.

### Using DeepL API

```typescript
async function translate(text: string, target: string) {
  const response = await fetch('https://api.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPL_API_KEY}`,
    },
    body: JSON.stringify({
      text: [text],
      target_lang: target,
    }),
  });

  return response.json();
}
```

## Language Detection

```typescript
import { detectLocale } from 'fumadocs-core/internationalization';

const locale = detectLocale({
  locales: ['en', 'zh', 'es'],
});
```

## Configuration Examples

### Complete i18n Configuration

```typescript
// i18n.ts
import { configureI18n } from 'fumadocs-ui/contexts/i18n';
import { source } from '@/lib/source';

const i18n = configureI18n({
  defaultLocale: 'en',
  locales: ['en', 'zh', 'es'],
});

export default i18n;
```

### Complete Next.js Configuration

```typescript
// middleware.ts
import { i18nMiddleware } from 'fumadocs-core/internationalization/middleware';

export const config = {
  matcher: ['/((?!api/_next/static|_next/image|favicon.ico).*)']
};

export default i18nMiddleware();
```

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'zh', 'es'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
```

**Reference Documentation**:
- [i18n Documentation](https://www.fumadocs.dev/docs/internationalization)
- [Next.js Routing](https://www.fumadocs.dev/docs/internationalization/next)
- [React Router Routing](https://www.fumadocs.dev/docs/internationalization/react-router)
- [Tanstack Start Routing](https://www.fumadocs.dev/docs/internationalization/tanstack-start)