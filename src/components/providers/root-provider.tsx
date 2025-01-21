'use client';

import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { Theme } from '@radix-ui/themes';
import { I18nProvider } from './i18n-provider';

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <Theme accentColor="blue" grayColor="gray" radius="medium">
        <Toaster position="top-right" />
        {children}
      </Theme>
    </I18nProvider>
  );
} 