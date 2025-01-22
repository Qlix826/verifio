'use client';

import { DashboardNavbar } from '@/components/layout/dashboard-navbar';
import { FileText, Users, Clock } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import Link from 'next/link';
import { useTranslations } from '@/hooks/use-translations';

export default function DashboardPage() {
  const { t, currentLanguage, changeLanguage } = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {t('dashboard.title')}
              </h1>
              <Link
                href="/dashboard/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('dashboard.newRequest')}
              </Link>
            </div>
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={changeLanguage}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.inProgress')}</p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.verified')}</p>
                  <p className="text-2xl font-semibold text-gray-900">48</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.averageTime')}</p>
                  <p className="text-2xl font-semibold text-gray-900">24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent verifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {t('dashboard.recentVerifications.title')}
            </h2>
            <div className="space-y-6">
              {[
                { 
                  id: '1',
                  name: 'Jean Dupont', 
                  status: 'inProgress', 
                  date: '2024-01-15',
                  type: 'Vérification criminelle',
                  email: 'jean.dupont@email.com',
                  department: 'Ingénierie'
                },
                { 
                  id: '2',
                  name: 'Marie Martin', 
                  status: 'completed', 
                  date: '2024-01-14',
                  type: 'Vérification d\'emploi',
                  email: 'marie.martin@email.com',
                  department: 'Marketing'
                },
                { 
                  id: '3',
                  name: 'Paul Bernard', 
                  status: 'pending', 
                  date: '2024-01-13',
                  type: 'Vérification d\'éducation',
                  email: 'paul.bernard@email.com',
                  department: 'Finance'
                },
              ].map((verification) => (
                <div 
                  key={verification.id} 
                  className="group relative flex flex-col space-y-3 border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/verification/${verification.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{verification.name}</p>
                      <p className="text-sm text-gray-500">{verification.date}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      verification.status === 'completed' ? 'bg-green-100 text-green-700' :
                      verification.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {t(`dashboard.recentVerifications.status.${verification.status}`)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">{t('dashboard.recentVerifications.labels.type')}:</span> {verification.type}
                    </div>
                    <div>
                      <span className="font-medium">{t('dashboard.recentVerifications.labels.department')}:</span> {verification.department}
                    </div>
                    <div>
                      <span className="font-medium">{t('dashboard.recentVerifications.labels.email')}:</span> {verification.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 