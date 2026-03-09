'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useIsVisible } from '@/lib/hooks/use-is-visible';
import Image from 'next/image';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  {
    ssr: false,
  },
);

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  {
    ssr: false,
  },
);

export function Hero({ locale }: { locale: string }) {
  const { resolvedTheme } = useTheme();
  const t = useTranslations('home.hero');
  const ref = useRef<HTMLImageElement | null>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowShaders(true);
    }, 400);
  }, []);

    return (
    <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-[#0f172a] dark:bg-[#0f172a]">
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={['#1a1a2e', '#3b82f6', '#0f172a']}
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          speed={visible ? 1 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
          fit="contain"
        />
      )}
      {showShaders && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront="#00b3ff"
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="absolute max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0 animate-fd-fade-in duration-400"
          minPixelRatio={1}
        />
      )}
      <Image
        ref={ref}
        src="/img/index.png"
        alt="hero-image"
        width={1200}
        height={800}
        className="absolute top-[460px] left-[20%] max-w-[1200px] rounded-xl border-2 lg:top-[400px] animate-in fade-in duration-400"
        priority
      />

      <div className="relative z-10 flex flex-col px-4 size-full md:p-12 max-md:items-center max-md:text-center">
        <p className="mt-12 text-xs font-medium rounded-full p-2 border border-white/50 w-fit text-white">
          {t('badge')}
        </p>
        <h1 className="text-4xl my-8 leading-tighter font-medium xl:text-5xl xl:mb-12 text-white">
          {t('title')}
        </h1>
        <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
          <a
            href={`/${locale}/docs`}
            className="inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-all bg-white text-[#0f172a] hover:-translate-y-[-2px] hover:shadow-md max-sm:text-sm"
          >
            {t('getStarted')}
          </a>
          <a
            href="https://github.com/xiaoY233/Chat2API"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-all bg-black text-white hover:bg-gray-800 max-sm:text-sm"
          >
            {t('viewOnGithub')}
          </a>
        </div>
      </div>
    </div>
  );
}
