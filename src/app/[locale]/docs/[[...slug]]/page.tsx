import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Locale } from '@/lib/i18n';
import { locales } from '@/lib/i18n';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[]; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const page = source.getPage(slug ?? [], locale);

  if (!page) {
    notFound();
  }

  const { body: MDX, toc } = await page.data.load();

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk' }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];
  
  for (const locale of locales) {
    const pages = source.getPages(locale);
    for (const page of pages) {
      params.push({
        locale,
        slug: page.slugs,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[]; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const page = source.getPage(slug ?? [], locale);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
