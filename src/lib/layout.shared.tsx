import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { locales, type Locale } from './i18n';

export const gitConfig = {
  user: 'xiaoY233',
  repo: 'Chat2API',
  branch: 'main',
};

export function baseOptions(locale: Locale = 'en'): BaseLayoutProps {
  return {
    nav: {
      title: 'Chat2API',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n: true,
  };
}
