import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import type { Locale } from '@/lib/i18n';
import { I18nProviderWrapper } from '@/components/i18n-provider';
import { ColorThemeProvider } from '@/contexts/color-theme-context';
import { ColorThemeSelector } from '@/components/color-theme-selector';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const pageTree = source.getPageTree(typedLocale);
  
  return (
    <I18nProviderWrapper locale={typedLocale}>
      <ColorThemeProvider>
        <DocsLayout
          tree={pageTree}
          {...baseOptions(typedLocale)}
          links={[
            {
              type: 'icon',
              url: '#',
              text: 'Color Theme',
              label: 'Color Theme',
              icon: <ColorThemeSelector />,
            },
          ]}
        >
          {children}
        </DocsLayout>
      </ColorThemeProvider>
    </I18nProviderWrapper>
  );
}
