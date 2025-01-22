'use client'

import Link from 'next/link'

export default function Documentation() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Documentation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tout ce dont vous avez besoin pour intégrer et utiliser Verifio.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900">Démarrage</h2>
              <p className="mt-2 text-gray-600">
                Commencez rapidement avec notre guide d'installation et de configuration.
              </p>
              <Link
                href="/docs/getting-started"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                En savoir plus <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900">Guides</h2>
              <p className="mt-2 text-gray-600">
                Explorez nos guides détaillés pour tirer le meilleur parti de Verifio.
              </p>
              <Link
                href="/docs/guides"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Voir les guides <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900">API Reference</h2>
              <p className="mt-2 text-gray-600">
                Documentation complète de notre API REST.
              </p>
              <Link
                href="/docs/api"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Voir la documentation API <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
