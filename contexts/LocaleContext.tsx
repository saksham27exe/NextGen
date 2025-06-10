
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '@/i18n'; // Import the configured i18next instance
import { I18nextProvider } from 'react-i18next';
import { type Language, SUPPORTED_LANGUAGES } from '@/config/languages';
import { Loader2 } from 'lucide-react';

interface LocaleContextType {
  locale: Language['code'];
  setLocale: (locale: Language['code']) => void;
  supportedLanguages: Language[];
  isInitializing: boolean; // Add state to track initialization
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [locale, _setLocale] = useState<Language['code']>(i18n.language);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      _setLocale(lng);
      document.documentElement.lang = lng;
    };

    const handleInitialized = () => {
      _setLocale(i18n.language);
      document.documentElement.lang = i18n.language;
      setIsInitializing(false); // Mark initialization complete
    };

    i18n.on('languageChanged', handleLanguageChanged);
    i18n.on('initialized', handleInitialized);

    // Check if already initialized (in case event fired before listener attached)
    if (i18n.isInitialized) {
       handleInitialized();
    }


    // Cleanup listeners on unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      i18n.off('initialized', handleInitialized);
    };
  }, []);


  const setLocale = useCallback((newLocale: Language['code']) => {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === newLocale)) {
      i18n.changeLanguage(newLocale); // Let i18next handle the change and persistence
    } else {
      console.warn(`Attempted to set unsupported locale: ${newLocale}`);
    }
  }, []);

  // Render loading state or children based on initialization status
  const renderContent = () => {
    if (isInitializing) {
      return (
        <div className="flex items-center justify-center h-screen w-screen fixed inset-0 bg-background z-50">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading language...</p>
        </div>
      );
    }
    return children;
  };


  return (
    <LocaleContext.Provider value={{ locale, setLocale, supportedLanguages: SUPPORTED_LANGUAGES, isInitializing }}>
      <I18nextProvider i18n={i18n}>
         {renderContent()}
      </I18nextProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Export the i18n instance if needed elsewhere directly (though useTranslation is preferred)
export { i18n };
