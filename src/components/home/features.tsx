'use client';

import { useTranslations } from 'next-intl';
import { Plug, Server, BarChart, Settings, Key, FileText } from 'lucide-react';

const icons = {
  openai: Plug,
  providers: Server,
  dashboard: BarChart,
  proxy: Settings,
  apikeys: Key,
  logs: FileText,
};

export function Features() {
  const t = useTranslations('home.features');

  const features = [
    { key: 'openai', icon: icons.openai },
    { key: 'providers', icon: icons.providers },
    { key: 'dashboard', icon: icons.dashboard },
    { key: 'proxy', icon: icons.proxy },
    { key: 'apikeys', icon: icons.apikeys },
    { key: 'logs', icon: icons.logs },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
          {t('title')}
        </h3>
        <p className="text-fd-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.key}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-fd-primary/20 rounded-2xl blur-xl group-hover:bg-fd-primary/30 transition-colors" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fd-primary/10 to-fd-primary/5 border border-fd-primary/20 text-fd-primary transition-all group-hover:scale-110 group-hover:border-fd-primary/40">
                  <Icon className="size-7" />
                </div>
              </div>
              <h4 className="text-base font-semibold text-fd-foreground mb-2 group-hover:text-fd-primary transition-colors">
                {t(`items.${feature.key}.title`)}
              </h4>
              <p className="text-sm text-fd-muted-foreground max-w-[200px] leading-relaxed">
                {t(`items.${feature.key}.description`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
