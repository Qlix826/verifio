'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '@/translations/en';
import { fr } from '@/translations/fr';

type Language = 'en' | 'fr';
type TranslationsContextType = {
  t: (path: string) => string;
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
};

// Initialiser i18next
i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

const TranslationsContext = createContext<TranslationsContextType | null>(null);

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Récupérer la langue sauvegardée dans le localStorage au chargement
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      i18next.changeLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const t = (path: string) => {
    if (!isLoaded) {
      return path;
    }
    return i18next.t(path);
  };

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    i18next.changeLanguage(language);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <TranslationsContext.Provider value={{ t, currentLanguage, changeLanguage }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context;
} 