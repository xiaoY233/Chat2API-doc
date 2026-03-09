'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const screenshots = [
  { key: 'dashboard', image: '/images/screenshots/dashboard.png' },
  { key: 'providers', image: '/images/screenshots/providers.png' },
  { key: 'proxy', image: '/images/screenshots/proxy.png' },
  { key: 'models', image: '/images/screenshots/models.png' },
  { key: 'api-keys', image: '/images/screenshots/api-keys.png' },
  { key: 'logs', image: '/images/screenshots/logs.png' },
  { key: 'settings', image: '/images/screenshots/settings.png' },
  { key: 'about', image: '/images/screenshots/about.png' },
];

export function Screenshots() {
  const t = useTranslations('home.screenshots');

  return (
    <div className="flex flex-col items-center w-full py-12">
      <h3 className="text-xl lg:text-2xl font-medium tracking-tight mb-4 text-center">
        {t('title')}
      </h3>
      <p className="mb-8 text-fd-muted-foreground text-center max-w-2xl">
        {t('subtitle')}
      </p>
      
      <div className="relative w-full max-w-5xl overflow-hidden mx-auto">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-fd-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-fd-background to-transparent pointer-events-none" />
        <div className="flex animate-scroll">
          {[...screenshots, ...screenshots].map((screenshot, index) => (
            <div
              key={`${screenshot.key}-${index}`}
              className="group flex flex-col items-center justify-center px-3 flex-shrink-0"
            >
              <div className="relative overflow-hidden rounded-md border border-fd-border bg-fd-muted/30 h-40 w-64 transition-transform group-hover:scale-105">
                <Image
                  src={screenshot.image}
                  alt={t(`items.${screenshot.key}`)}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-fd-foreground whitespace-nowrap">
                {t(`items.${screenshot.key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
