'use client';

import { useTranslations } from 'next-intl';
import { Monitor, Cpu, Server, Database, Lock, Bolt, Star, Github } from 'lucide-react';

const layers = [
  {
    icon: Monitor,
    name: 'Electron',
    description: 'Cross-platform desktop framework',
    color: 'from-teal-500/20 to-cyan-500/10',
    borderColor: 'border-teal-500/30',
    iconColor: 'text-teal-500',
    bgIcon: 'bg-teal-500',
  },
  {
    icon: Cpu,
    name: 'React + TypeScript',
    description: 'Modern UI with type safety',
    color: 'from-blue-500/20 to-indigo-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
    bgIcon: 'bg-blue-500',
  },
  {
    icon: Server,
    name: 'Koa Proxy',
    description: 'Lightweight HTTP proxy server',
    color: 'from-gray-500/20 to-slate-500/10',
    borderColor: 'border-gray-500/30',
    iconColor: 'text-gray-500',
    bgIcon: 'bg-gray-500',
  },
];

const features = [
  {
    icon: Database,
    title: 'Local Storage',
    description: 'Encrypted local data persistence',
    color: 'from-emerald-500/20 to-green-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-500',
    bgIcon: 'bg-emerald-500',
  },
  {
    icon: Lock,
    title: 'Secure',
    description: 'Credentials encrypted with AES-256',
    color: 'from-green-500/20 to-emerald-500/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
    bgIcon: 'bg-green-500',
  },
  {
    icon: Bolt,
    title: 'Fast',
    description: 'Native performance with Electron',
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-500',
    bgIcon: 'bg-amber-500',
  },
];

export function Architecture() {
  const t = useTranslations('home.architecture');

  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.name}
                className={`flex items-center gap-4 rounded-xl border ${layer.borderColor} bg-gradient-to-r ${layer.color} p-4 transition-all hover:scale-[1.02]`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-fd-background/50 ${layer.iconColor}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <h5 className="text-base font-semibold text-fd-foreground">
                    {layer.name}
                  </h5>
                  <p className="text-sm text-fd-muted-foreground">
                    {layer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`flex items-center gap-4 rounded-xl border ${feature.borderColor} bg-gradient-to-r ${feature.color} p-4 transition-all hover:scale-[1.02]`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-fd-background/50 ${feature.iconColor}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <h5 className="text-base font-semibold text-fd-foreground">
                    {feature.title}
                  </h5>
                  <p className="text-sm text-fd-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/xiaoY233/Chat2API"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-8 py-4 text-base font-medium text-fd-primary-foreground shadow-lg shadow-fd-primary/25 transition-all hover:bg-fd-primary/90 hover:shadow-xl hover:shadow-fd-primary/30 hover:scale-105"
          >
            <Star className="size-5 fill-current" />
            Give me a star
            <Github className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
