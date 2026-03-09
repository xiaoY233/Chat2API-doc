import { docs } from 'fumadocs-mdx:collections/server';
import { loader, type InferPageType } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { locales } from './i18n';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n: {
    languages: [...locales],
    defaultLanguage: 'en',
    parser: 'dir',
  },
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.webp'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
