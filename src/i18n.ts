
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '@/config/languages';

// Import language files
import en from './locales/en.json';
import hi from './locales/hi.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  es: { translation: es },
  fr: { translation: fr },
};

const supportedLngs = SUPPORTED_LANGUAGES.map(lang => lang.code);

i18n
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  // Learn more: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === 'development', // Enable debug output in development
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: supportedLngs,
    resources,
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Keys or locations to look for the language
      lookupLocalStorage: 'nextgen-ecourt-locale',
      // Cache user language on
      caches: ['localStorage'],
      // Optional expire and domain for set cookie
      // cookieMinutes: 10,
      // cookieDomain: 'myDomain'
    },
  });

export default i18n;
