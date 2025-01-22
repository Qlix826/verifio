'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export function Navbar() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Verifio
            </Link>
            <div className="flex gap-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 text-sm">
                Fonctionnalités
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900 text-sm">
                Documentation
              </Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
            <Button variant="outline" asChild>
              <Link href="/dashboard">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Essai gratuit</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 