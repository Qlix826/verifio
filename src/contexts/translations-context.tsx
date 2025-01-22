'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { en } from '@/translations/en';
import { fr } from '@/translations/fr';

type Language = 'en' | 'fr';
type TranslationsContextType = {
  t: (path: string) => string;
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
};

const TranslationsContext = createContext<TranslationsContextType | null>(null);

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  const translations = currentLanguage === 'fr' ? fr : en;

  useEffect(() => {
    // Récupérer la langue sauvegardée dans le localStorage au chargement
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const t = (path: string) => {
    return path.split('.').reduce((obj, key) => obj[key as keyof typeof obj], translations as any) || path;
  };

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

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