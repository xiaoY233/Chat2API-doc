'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#3b82f6" />
      <g className="animate-download-arrow" stroke="#3b82f6">
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </g>
      <style jsx>{`
        @keyframes download-arrow {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(2px); opacity: 0.7; }
        }
        .animate-download-arrow {
          animation: download-arrow 1.5s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g className="animate-rocket" stroke="#f97316">
        <path d="M12 2c0 0-4 4-4 10v4l2 2h4l2-2v-4c0-6-4-10-4-10z" />
        <circle cx="12" cy="10" r="2" fill="#f97316" />
        <path d="M8 18l-2 2v-2h2z" fill="#f97316" />
        <path d="M16 18l2 2v-2h-2z" fill="#f97316" />
      </g>
      <g className="animate-flame">
        <path d="M10 22c0-1 1-2 2-2s2 1 2 2" fill="#ef4444" stroke="#ef4444" strokeWidth="0" />
        <path d="M11 20c0-0.5 0.5-1 1-1s1 0.5 1 1" fill="#fbbf24" stroke="#fbbf24" strokeWidth="0" />
      </g>
      <style jsx>{`
        @keyframes rocket {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes flame {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
        .animate-rocket {
          animation: rocket 2s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-flame {
          animation: flame 0.5s ease-in-out infinite;
          transform-origin: center top;
        }
      `}</style>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g className="animate-settings" stroke="#a855f7">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </g>
      <style jsx>{`
        @keyframes settings {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        .animate-settings {
          animation: settings 3s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" className="animate-code-left" stroke="#22c55e" />
      <polyline points="8 6 2 12 8 18" className="animate-code-right" stroke="#22c55e" />
      <line x1="12" y1="2" x2="12" y2="22" className="animate-code-cursor" stroke="#16a34a" />
      <style jsx>{`
        @keyframes code-left {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes code-right {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes code-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-code-left {
          animation: code-left 2s ease-in-out infinite;
        }
        .animate-code-right {
          animation: code-right 2s ease-in-out infinite 0.5s;
        }
        .animate-code-cursor {
          animation: code-cursor 1s step-end infinite;
        }
      `}</style>
    </svg>
  );
}

const stepIcons = [DownloadIcon, RocketIcon, SettingsIcon, CodeIcon];
const stepColors = ['#3b82f6', '#f97316', '#a855f7', '#22c55e'];

export function QuickStart() {
  const t = useTranslations('home.quickStart');

  const steps = [
    {
      key: 'step1',
      Icon: stepIcons[0],
      color: stepColors[0],
      link: 'https://github.com/xiaoY233/Chat2API/releases',
    },
    {
      key: 'step2',
      Icon: stepIcons[1],
      color: stepColors[1],
    },
    {
      key: 'step3',
      Icon: stepIcons[2],
      color: stepColors[2],
    },
    {
      key: 'step4',
      Icon: stepIcons[3],
      color: stepColors[3],
    },
  ];

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
          {t('title')}
        </h3>
        <p className="text-fd-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row items-start justify-center gap-2 lg:gap-0">
        {steps.map((step, index) => {
          const { Icon, color } = step;
          const label = t(step.key);
          const isLast = index === steps.length - 1;
          
          const content = (
            <div className="flex items-center gap-4 group">
              <div className="relative flex items-center justify-center">
                <div 
                  className="flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon />
                </div>
                <span 
                  className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ 
                    backgroundColor: 'var(--fd-background)', 
                    border: `1.5px solid ${color}`,
                    color: color 
                  }}
                >
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p 
                  className="text-base font-medium transition-colors"
                  style={{ color: 'var(--fd-foreground)' }}
                >
                  {label}
                </p>
              </div>
            </div>
          );

          return (
            <div key={step.key} className="flex items-center">
              {step.link ? (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                content
              )}
              {!isLast && (
                <div className="hidden lg:flex items-center justify-center w-16 mx-2 overflow-hidden">
                  <div className="flex items-center animate-flow">
                    <ChevronRight className="size-4 text-fd-primary/30" />
                    <ChevronRight className="size-4 -ml-2 text-fd-primary/50" />
                    <ChevronRight className="size-4 -ml-2 text-fd-primary/70" />
                    <ChevronRight className="size-4 -ml-2 text-fd-primary" />
                    <ChevronRight className="size-4 -ml-2 text-fd-primary/70" />
                    <ChevronRight className="size-4 -ml-2 text-fd-primary/50" />
                    <ChevronRight className="size-4 -ml-2 text-fd-primary/30" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes flow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-flow {
          animation: flow 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
}
