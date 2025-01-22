'use client';

import { ThemeProvider } from 'next-themes';
import { TranslationsProvider } from '@/contexts/translations-context'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <TranslationsProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </TranslationsProvider>
    </UserProvider>
  );
} 