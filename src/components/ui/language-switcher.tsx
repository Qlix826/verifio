import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLanguageChange('fr')}
        className={currentLanguage === 'fr' ? 'bg-blue-50 text-blue-700' : ''}
      >
        Français
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLanguageChange('en')}
        className={currentLanguage === 'en' ? 'bg-blue-50 text-blue-700' : ''}
      >
        English
      </Button>
    </div>
  );
} 