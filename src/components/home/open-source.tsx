'use client';

import { useTranslations } from 'next-intl';
import { Heart, Star, Users, Code, Shield } from 'lucide-react';

export function OpenSource() {
  const t = useTranslations('home.openSource');

  const stats = [
    { icon: Star, label: 'GitHub Stars', value: '1.2k+' },
    { icon: Users, label: 'Downloads', value: '10k+' },
    { icon: Code, label: 'Contributors', value: '50+' },
    { icon: Shield, label: 'License', value: 'GPL-3.0' },
  ];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-fd-background via-fd-muted/20 to-fd-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <Heart className="size-16 text-red-500 fill-red-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            {t('subtitle')}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-3 rounded-xl border border-fd-border bg-fd-background p-6 shadow-sm"
                >
                  <Icon className="size-8 text-fd-primary" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-fd-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-fd-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <a
              href="https://github.com/xiaoY233/Chat2API"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-8 py-4 text-base font-medium text-fd-primary-foreground shadow-lg shadow-fd-primary/25 transition-all hover:bg-fd-primary/90 hover:shadow-xl hover:shadow-fd-primary/30"
            >
              {t('viewOnGitHub')}
              <Star className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
