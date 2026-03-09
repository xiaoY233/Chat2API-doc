'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const providers = [
  { name: 'DeepSeek', icon: 'deepseek.svg' },
  { name: 'GLM', icon: 'glm.svg' },
  { name: 'Kimi', icon: 'kimi.svg' },
  { name: 'MiniMax', icon: 'minimax.svg' },
  { name: 'Qwen', icon: 'qwen.svg' },
  { name: 'Z.ai', icon: 'zai.svg' },
];

export function Providers() {
  const t = useTranslations('home.providers');

  return (
    <section className="py-20 md:py-24 bg-fd-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="group flex flex-col items-center justify-center rounded-2xl border border-fd-border bg-fd-background p-6 shadow-sm transition-all hover:border-fd-primary/30 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center transition-transform group-hover:scale-110">
                <Image
                  src={`/icons/${provider.icon}`}
                  alt={provider.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-fd-foreground">
                {provider.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
