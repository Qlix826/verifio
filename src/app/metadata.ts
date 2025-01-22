import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://verifio.com'),
  title: 'Verifio - Vérification d\'antécédents simplifiée',
  description: 'Solution SaaS innovante pour la vérification d\'antécédents, conçue pour les entreprises modernes.',
  keywords: ['vérification antécédents', 'background check', 'recrutement', 'RH', 'entreprise'],
  openGraph: {
    type: 'website',
    title: 'Verifio - Vérification d\'antécédents simplifiée',
    description: 'Solution SaaS innovante pour la vérification d\'antécédents, conçue pour les entreprises modernes.',
    url: 'https://verifio.com',
  },
  robots: {
    index: true,
    follow: true,
  }
} 