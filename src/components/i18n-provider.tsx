'use client';

import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { localeNames } from '@/lib/i18n';

const locales = Object.entries(localeNames).map(([locale, name]) => ({
  locale,
  name,
}));

const translationsMap: Record<string, Record<string, string>> = {
  zh: {
    search: '搜索',
    toc: '目录',
    lastUpdate: '最后更新',
    searchNoResult: '没有找到结果',
    previousPage: '上一页',
    nextPage: '下一页',
    chooseLanguage: '选择语言',
  },
  en: {
    search: 'Search',
    toc: 'On this page',
    lastUpdate: 'Last updated on',
    searchNoResult: 'No results found',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    chooseLanguage: 'Choose Language',
  },
};

export function I18nProviderWrapper({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const onLocaleChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <I18nProvider
      locale={locale}
      locales={locales}
      onLocaleChange={onLocaleChange}
      translations={translationsMap[locale] || {}}
    >
      {children}
    </I18nProvider>
  );
}
