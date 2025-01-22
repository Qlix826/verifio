import { useState, useCallback } from 'react';
import { en } from '@/translations/en';
import { fr } from '@/translations/fr';

type Language = 'en' | 'fr';
type Translations = typeof en;

export function useTranslations() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  const translations = currentLanguage === 'fr' ? fr : en;

  const t = useCallback((path: string) => {
    return path.split('.').reduce((obj, key) => obj[key as keyof typeof obj], translations as any) || path;
  }, [translations]);

  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  }, []);

  return {
    t,
    currentLanguage,
    changeLanguage
  };
} 