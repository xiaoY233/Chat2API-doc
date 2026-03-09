'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useColorTheme, type ColorTheme } from '@/contexts/color-theme-context';

const themeColors: Record<ColorTheme, string> = {
  neutral: 'bg-gray-500',
  black: 'bg-gray-900',
  vitepress: 'bg-blue-600',
  emerald: 'bg-emerald-500',
  purple: 'bg-purple-500',
  ocean: 'bg-blue-500',
  ruby: 'bg-red-500',
  dusk: 'bg-pink-500',
  aspen: 'bg-green-500',
  catppuccin: 'bg-violet-400',
};

export function ColorThemeSelector() {
  const { theme, setTheme, themes } = useColorTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedTheme: ColorTheme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center justify-center rounded-md p-2 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
        aria-label="Select color theme"
      >
        <Palette className="size-5" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 min-w-[160px] rounded-md border border-fd-border bg-fd-popover p-1 shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {themes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(t.value);
              }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-fd-popover-foreground hover:bg-fd-accent hover:text-fd-accent-foreground ${
                theme === t.value ? 'bg-fd-accent/50' : ''
              }`}
            >
              <span className={`size-4 rounded-full ${themeColors[t.value]}`} />
              <span>{t.label}</span>
              {theme === t.value && (
                <span className="ml-auto text-fd-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
