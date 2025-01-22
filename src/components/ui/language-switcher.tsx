'use client';

type Language = 'en' | 'fr';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onLanguageChange('fr')}
        className={`px-2 py-1 text-sm font-medium rounded-md ${
          currentLanguage === 'fr'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 text-sm font-medium rounded-md ${
          currentLanguage === 'en'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        EN
      </button>
    </div>
  );
} 