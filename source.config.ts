import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { locales } from './src/lib/i18n';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
    async: true,
  },
  meta: {
    schema: metaSchema,
  },
  i18n: {
    languages: [...locales],
    defaultLanguage: 'en',
  },
});

export default defineConfig({
  mdxOptions: {},
});
