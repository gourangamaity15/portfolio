'use client';

// import { isBrowser, detectLang } from '@brahma/utils';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import { DEFAULT_LNG, LANGUAGES, DEFAULT_NS, COOKIE_NAME } from './constants';
import { detectLang, isBrowser } from 'src/utils/browser';

export const initLocale = async () => {
  try {
    const t = await i18next
      .use(initReactI18next)
      .use(
        resourcesToBackend(
          async (language: string, namespace: string) =>
            await import(`./strings/${language}/${namespace}.json`)
        )
      )
      .init({
        supportedLngs: LANGUAGES,
        fallbackLng: DEFAULT_LNG,
        fallbackNS: DEFAULT_NS,
        defaultNS: DEFAULT_NS,
        lng: detectLang(COOKIE_NAME, DEFAULT_LNG, LANGUAGES),
        preload: !isBrowser() ? LANGUAGES : []
      });
    return t;
  } catch (e) {
    console.error('Error in initiating i18next', e);
  }
};
