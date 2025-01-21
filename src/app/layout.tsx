import { Inter } from 'next/font/google';
import { RootProvider } from '@/components/providers/root-provider';
import '@radix-ui/themes/styles.css';
import '@/styles/theme-config.css';
import '@/styles/globals.css';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
