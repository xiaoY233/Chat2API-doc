'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ColorTheme = 'neutral' | 'black' | 'vitepress' | 'emerald' | 'purple' | 'ocean' | 'ruby' | 'dusk' | 'aspen' | 'catppuccin';

interface ColorThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  themes: { value: ColorTheme; label: string }[];
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'color-theme';

export const colorThemes: { value: ColorTheme; label: string }[] = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'black', label: 'Black' },
  { value: 'vitepress', label: 'VitePress' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'purple', label: 'Purple' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'dusk', label: 'Dusk' },
  { value: 'aspen', label: 'Aspen' },
  { value: 'catppuccin', label: 'Catppuccin' },
];

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ColorTheme>('neutral');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ColorTheme | null;
    if (stored && colorThemes.some((t) => t.value === stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const setTheme = (newTheme: ColorTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return (
      <ColorThemeContext.Provider value={{ theme, setTheme, themes: colorThemes }}>
        {children}
      </ColorThemeContext.Provider>
    );
  }

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme, themes: colorThemes }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
}
