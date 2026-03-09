import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { I18nProviderWrapper } from '@/components/i18n-provider';
import { ColorThemeProvider } from '@/contexts/color-theme-context';
import '@/app/global.css';

const inter = Inter({
  subsets: ['latin'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <RootProvider>
            <ColorThemeProvider>
              <I18nProviderWrapper locale={locale}>
                {children}
              </I18nProviderWrapper>
            </ColorThemeProvider>
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
