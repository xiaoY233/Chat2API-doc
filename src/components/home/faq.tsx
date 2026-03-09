'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/cn';

const faqItems = [
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
  'q6',
  'q7',
];

export function FAQ() {
  const t = useTranslations('home.faq');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['q6', 'q7']));

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

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

        <div className="mt-12 max-w-4xl mx-auto space-y-3">
          {faqItems.map((key) => {
            const isOpen = openItems.has(key);
            const isImportant = key === 'q6';
            const isWarning = key === 'q7';
            return (
              <div
                key={key}
                className={cn(
                  "rounded-xl border bg-fd-card overflow-hidden",
                  isImportant ? "border-amber-500/50" : isWarning ? "border-blue-500/50" : "border-fd-border"
                )}
              >
                <button
                  onClick={() => toggleItem(key)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-fd-muted/30"
                >
                  <div className="flex items-center gap-2">
                    {isImportant && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium">
                        <AlertTriangle className="size-3" />
                        {t('important')}
                      </span>
                    )}
                    {isWarning && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
                        <Info className="size-3" />
                        {t('notice')}
                      </span>
                    )}
                    <span className="font-medium text-fd-foreground">
                      {t(`items.${key}.question`)}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'size-5 text-fd-muted-foreground transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="border-t border-fd-border px-4 py-5 text-fd-muted-foreground">
                    {t(`items.${key}.answer`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
