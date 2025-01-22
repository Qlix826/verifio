import './globals.css'
import { Inter } from 'next/font/google'
import { metadata } from './metadata'
import type { Metadata } from 'next'
import { TranslationsProvider } from '@/contexts/translations-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Verifio - Vérification de candidats',
  description: 'Plateforme de vérification de candidats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <TranslationsProvider>
          {children}
        </TranslationsProvider>
      </body>
    </html>
  )
}
