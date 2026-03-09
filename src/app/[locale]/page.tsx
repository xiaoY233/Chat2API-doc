import type { Locale } from '@/lib/i18n';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { Providers } from '@/components/home/providers';
import { CodeExample } from '@/components/home/code-example';
import { Architecture } from '@/components/home/architecture';
import { QuickStart } from '@/components/home/quick-start';
import { Screenshots } from '@/components/home/screenshots';
import { FAQ } from '@/components/home/faq';
import { getTranslations } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home.intro');

  return (
    <HomeLayout
      nav={{
        title: 'Chat2API',
        url: `/${locale}`,
        transparentMode: 'top',
      }}
      i18n
      githubUrl="https://github.com/xiaoY233/Chat2API"
      links={[
        {
          text: locale === 'zh' ? '文档' : 'Docs',
          url: `/${locale}/docs`,
        },
      ]}
    >
      <main className="text-fd-foreground pt-4 pb-6 dark:text-fd-foreground md:pb-12">
        <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px]">
          <Hero locale={locale} />
        </div>

        <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12">
          <p className="text-2xl tracking-tight leading-snug font-light md:text-3xl xl:text-4xl">
            {t.rich('description', {
              highlight: (chunks) => <span className="text-fd-primary font-medium">{chunks}</span>,
            })}
          </p>

          <QuickStart />
          <CodeExample />
          <Providers />
          <Features />
          <Screenshots />
          <Architecture />
          <FAQ />
        </div>
      </main>
    </HomeLayout>
  );
}
