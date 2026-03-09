import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const config = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withMDX(withNextIntl(config));
