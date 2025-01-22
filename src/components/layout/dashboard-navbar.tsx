'use client';

import Link from 'next/link';
import { Settings, User } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useTranslations } from '@/contexts/translations-context';

export function DashboardNavbar() {
  const { t, currentLanguage, changeLanguage } = useTranslations();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {t('navbar.dashboard')}
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={changeLanguage}
            />

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Settings className="h-4 w-4" />
              {t('navbar.settings')}
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="h-4 w-4" />
              {t('navbar.profile')}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
} 