# Chat2API Documentation

This is the official documentation for Chat2API, built with [Fumadocs](https://fumadocs.dev) and [Next.js](https://nextjs.org).

## 🚀 Quick Start

### Development

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Build

```bash
npm run build
```

The static files will be generated in the `out/` directory.

## 📁 Project Structure

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `src/app/[locale]`        | The route group for landing page and other pages.      |
| `src/app/[locale]/docs`   | The documentation layout and pages.                    |
| `content/docs`            | MDX documentation files.                               |
| `lib/source.ts`           | Code for content source adapter.                       |
| `lib/layout.shared.tsx`   | Shared options for layouts.                            |

### Key Files

- `source.config.ts`: Configuration for Fumadocs MDX
- `next.config.mjs`: Next.js configuration with static export
- `vercel.json`: Vercel deployment configuration
- `.github/workflows/deploy.yml`: GitHub Actions workflow for auto-deployment

## 🌐 Deployment

This project is automatically deployed to Vercel via GitHub Actions when pushing to the `main` branch.

### Manual Deployment

```bash
npm run build
vercel --prod
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs Documentation](https://fumadocs.dev)
- [Fumadocs MDX](https://fumadocs.dev/docs/mdx)

## 📝 License

This project is open source and available under the MIT License.
