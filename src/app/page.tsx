'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Clock, Users, Building2, FileCheck, UserCheck } from 'lucide-react'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

type Language = 'en' | 'fr';

const features = [
  {
    name: 'Vérification complète',
    description: 'Vérification approfondie des antécédents avec des rapports détaillés et conformes aux normes.',
    icon: Shield
  },
  {
    name: 'Résultats rapides',
    description: 'Obtenez vos résultats en moins de 24 heures grâce à notre processus automatisé.',
    icon: Clock
  },
  {
    name: 'Gestion simplifiée',
    description: 'Interface intuitive pour gérer toutes vos demandes de vérification au même endroit.',
    icon: Users
  }
]

const secondaryFeatures = [
  {
    name: 'Pour les entreprises',
    description: 'Solution adaptée aux besoins des entreprises de toutes tailles, de la startup à la grande entreprise.',
    icon: Building2
  },
  {
    name: 'Rapports détaillés',
    description: 'Accédez à des rapports complets et structurés pour prendre les meilleures décisions.',
    icon: FileCheck
  },
  {
    name: 'Conformité garantie',
    description: 'Processus de vérification conforme aux normes et réglementations en vigueur.',
    icon: UserCheck
  }
]

const testimonials = [
  {
    content: 'Verifio a considérablement simplifié notre processus de vérification. Le gain de temps est remarquable.',
    author: 'Marie Dubois',
    role: 'DRH chez TechCorp'
  },
  {
    content: 'La rapidité et la fiabilité des résultats sont impressionnantes. Un outil devenu indispensable pour notre entreprise.',
    author: 'Pierre Martin',
    role: 'Directeur des Opérations, InnovGroup'
  },
  {
    content: 'L\'interface intuitive et le support réactif font toute la différence. Exactement ce dont nous avions besoin.',
    author: 'Sophie Bernard',
    role: 'Responsable RH, StartupFlow'
  }
]

const pricing = [
  {
    name: 'Starter',
    description: 'Idéal pour les petites entreprises',
    price: '$49',
    features: [
      'Jusqu\'à 10 vérifications par mois',
      'Rapports standards',
      'Support par email',
      'Accès au tableau de bord',
      'Exportation des rapports'
    ]
  },
  {
    name: 'Business',
    description: 'Pour les entreprises en croissance',
    price: '$99',
    features: [
      'Jusqu\'à 50 vérifications par mois',
      'Rapports détaillés',
      'Support prioritaire',
      'API disponible',
      'Intégration ATS',
      'Personnalisation des rapports'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Solutions sur mesure pour les grandes entreprises',
    price: 'Sur mesure',
    features: [
      'Vérifications illimitées',
      'Rapports personnalisés',
      'Support dédié 24/7',
      'API complète',
      'Intégration sur mesure',
      'Formation des équipes'
    ]
  }
]

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr')

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    // Ici, vous pouvez ajouter la logique pour changer la langue dans votre application
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Verifio
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Témoignages
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Tarifs
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Essai gratuit
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero section */}
        <section className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50/50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 w-full transform-gpu overflow-hidden blur-3xl">
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] clip-path-polygon"
              />
            </div>
          </div>

          <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl whitespace-nowrap">
                Vérification d'antécédents simplifiée
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
                Une solution SaaS innovante pour la vérification d'antécédents, conçue pour les entreprises modernes.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/dashboard"
                  className="rounded-md bg-blue-600 px-4 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Commencer gratuitement
                </Link>
                <Link 
                  href="#features" 
                  className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="py-24 sm:py-32 bg-white">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Tout ce dont vous avez besoin</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-2xl">
                Une solution complète pour la vérification d'antécédents
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dl>
                    <dt className="flex items-center gap-x-3 text-base font-semibold text-gray-900">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <span>{feature.name}</span>
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secondary features */}
        <section className="py-24 sm:py-32 bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Tout est plus simple</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-2xl">
                Une meilleure façon de vérifier
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
                Nous simplifions chaque étape du processus de vérification pour vous permettre de vous concentrer sur l'essentiel.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="relative flex items-start p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-semibold text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 sm:py-32 bg-white">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              Ils nous font confiance
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.author} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-shadow">
                  <blockquote className="relative">
                    <p className="text-lg font-medium leading-8 text-gray-900">
                      "{testimonial.content}"
                    </p>
                  </blockquote>
                  <figcaption className="relative mt-8 flex items-center gap-x-4 border-t border-gray-100 pt-6">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 sm:py-32 bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-2xl">
                Des prix simples et transparents
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
                Choisissez le plan qui correspond le mieux à vos besoins
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-shadow xl:p-10"
                >
                  <div className="mb-4 flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h3>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">{plan.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                    {plan.name !== 'Enterprise' && <span className="text-sm font-semibold text-gray-600">/mois</span>}
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard"
                    className="mt-8 block rounded-md bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Commencer avec {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm leading-6 text-gray-400">
              Protection des données conforme aux normes en vigueur
            </p>
            <p className="flex items-center text-sm leading-6 text-gray-400">
              &copy; 2025 Verifio. Tous droits réservés.
              <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-label="Canada">
                <path d="M12 2L9 7H3L7 11L5 17L12 14L19 17L17 11L21 7H15L12 2Z" />
              </svg>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
