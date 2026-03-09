---
name: Fumadocs Deploy
description: Build and deploy Fumadocs documentation sites, supporting static export, PDF, RSS, and more
---

# Fumadocs Deploy Usage Guide

Build and deploy documentation sites.

## Static Build

### Next.js Static Export

Create or modify `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

#### Disable Dynamic Imports

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

module.exports = nextConfig;
```

### Build Command

```bash
npm run build
npm run start
```

### Build Output

Static files will be generated in the `out/` directory:

```
out/
├── index.html
├── docs/
│   ├── index.html
│   ├── guide/
│   │   └── getting-started.html
│   └── api/
│       └── users.html
├── static/
│   ├── _next/
│   └── images/
└── 404.html
```

## PDF Export

### Create API Route

Create `app/api/pdf/[slug]/route.ts`:

```typescript
import { pdf } from '@react-pdf/renderer';
import { source } from '@/lib/source';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const page = source.getPage(`/docs/${params.slug}`);

  if (!page) {
    return new Response('Page not found', { status: 404 });
  }

  const element = <MyDocument page={page} />;

  const blob = await pdf(element).toBlob();

  return new Response(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${page.data.title}.pdf"`,
    },
  });
}
```

### Create PDF Component

```typescript
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

interface MyDocumentProps {
  page: any;
}

function MyDocument({ page }: MyDocumentProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{page.data.title}</Text>
        <View style={styles.content}>
          <Text>{page.data.description}</Text>
        </View>
      </Page>
    </Document>
  );
}
```

### Import PDF

```typescript
import { PDFDownloadLink } from '@react-pdf/renderer';

<PDFDownloadLink
  document={<MyDocument page={page} />}
  filename={`${page.data.title}.pdf`}
>
  {({ loading }) => loading ? 'Loading...' : 'Download PDF'}
</PDFDownloadLink>
```

## RSS Feed

### Generate RSS

Create `app/rss/route.ts`:

```typescript
import { source } from '@/lib/source';

export async function GET() {
  const pages = source.getPageList().filter(p => p.data.published);

  const feed = {
    title: 'My Documentation',
    link: 'https://example.com',
    description: 'Documentation for my project',
    language: 'en',
    lastBuildDate: new Date().toUTCString(),
    items: pages
      .sort((a, b) => b.data.date.localeCompare(a.data.date))
      .map(p => ({
        title: p.data.title,
        link: `https://example.com${p.url}`,
        date: p.data.date,
        description: p.data.description,
        author: p.data.author,
      })),
  };

  return new Response(feed.toString(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

### Add RSS Link

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="Documentation RSS"
  href="/rss"
/>
```

### Use RSS Feed

```typescript
import { RSS } from 'rss';

export async function GET() {
  const feed = new RSS({
    title: 'My Documentation',
    description: 'Documentation for my project',
    feed_url: 'https://example.com/rss',
    site_url: 'https://example.com',
  });

  const pages = source.getPageList().filter(p => p.data.published);

  pages.forEach(p => {
    feed.item({
      title: p.data.title,
      url: `https://example.com${p.url}`,
      date: p.data.date,
      description: p.data.description,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

## Access Control

### Role-Based Access

```typescript
export const pages = source.getPageList().filter(page => {
  const role = page.data.role;
  return role === 'public' || userRole === role;
});
```

### Password Protection

```typescript
import { getServerSession } from 'next-auth';
import { source } from '@/lib/source';

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const pages = source.getPageList();

  return new Response(JSON.stringify(pages));
}
```

## Deployment Platform Configuration

### Vercel

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": null,
  "installCommand": "npm install"
}
```

Deploy:

```bash
vercel --prod
```

### Netlify

Create `netlify.toml`:

```toml
[build]
  publish = "out"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy:

```bash
netlify deploy --prod --dir=out
```

### GitHub Pages

Modify `package.json`:

```json
{
  "scripts": {
    "export": "npm run build"
  }
}
```

Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=/docs" />
</head>
<body>
  Redirecting to documentation...
</body>
</html>
```

### Cloudflare Pages

Create `wrangler.toml`:

```toml
name = "my-docs"
compatibility_date = "2024-01-01"

[site]
bucket = "./out"
```

Deploy:

```bash
npx wrangler pages deploy ./out
```

## Environment Variables

### Production Environment Configuration

Create `.env.production`:

```bash
NEXT_PUBLIC_BASE_URL=https://example.com
```

## Performance Optimization

### Compress Resources

```typescript
// next.config.js
const nextConfig = {
  output: 'export',
  compress: true,
};

module.exports = nextConfig;
```

### Enable Caching

```typescript
const nextConfig = {
  output: 'export',
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
```

## Deployment Checklist

- [ ] Configure static export
- [ ] Test all links
- [ ] Verify SEO metadata
- [ ] Configure RSS Feed
- [ ] Set up access control
- [ ] Configure deployment platform
- [ ] Test deployed site

**Reference Documentation**:
- [Deployment Documentation](https://www.fumadocs.dev/docs/deploying)
- [Static Export](https://www.fumadocs.dev/docs/deploying/static)
- [PDF Export](https://www.fumadocs.dev/docs/guides/export-pdf)
- [RSS Feed](https://www.fumadocs.dev/docs/guides/rss)