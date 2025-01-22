'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { validateNEQ, fetchCompanyInfo } from '@/lib/services/neq-validator';
import { PROVINCES, QUEBEC_CITIES, INDUSTRIES, COMPANY_SIZES } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OnboardingPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    neq: '',
    address: '',
    city: '',
    province: 'QC',
    postalCode: '',
    phone: '',
    website: '',
    industry: '',
    size: '',
  });

  const handleNeqChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, neq: value }));

    // Attendre que l'utilisateur ait saisi 10 chiffres
    if (value.length === 10 && /^\d{10}$/.test(value)) {
      setIsLoading(true);
      try {
        const companyInfo = await fetchCompanyInfo(value);
        if (companyInfo) {
          setFormData(prev => ({
            ...prev,
            name: companyInfo.name,
            address: companyInfo.address,
            city: companyInfo.city,
            province: companyInfo.province,
            postalCode: companyInfo.postalCode,
          }));
          toast.success('Informations de l\'entreprise récupérées avec succès');
        } else {
          toast.error('NEQ invalide ou entreprise non trouvée');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Erreur lors de la récupération des informations');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Valider le NEQ
      const isValidNEQ = await validateNEQ(formData.neq);
      if (!isValidNEQ) {
        toast.error(t('companyProfile.validation.neqInvalid'));
        return;
      }

      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success('Profil créé avec succès');
      
      // Rediriger vers le tableau de bord après un court délai
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de la création du profil');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section avec gradient amélioré */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-24">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Vérification de candidats simplifiée
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Automatisez vos vérifications d'antécédents et prenez des décisions éclairées en toute confiance
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <Card className="shadow-xl bg-white/90 backdrop-blur-lg border-0">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companyProfile.fields.neq')}
                  </label>
                  <div className="relative">
                    <Input
                      name="neq"
                      value={formData.neq}
                      onChange={handleNeqChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="1234567890"
                      className={isLoading ? 'pr-10' : ''}
                    />
                    {isLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Format: 10 chiffres sans espaces
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companyProfile.fields.name')}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companyProfile.fields.address')}
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('companyProfile.fields.city')}
                    </label>
                    <Select
                      options={QUEBEC_CITIES.map(city => ({ value: city, label: city }))}
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('companyProfile.fields.postalCode')}
                    </label>
                    <Input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      required
                      pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                      placeholder="H3B 2Y7"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companyProfile.fields.industry')}
                  </label>
                  <Select
                    options={INDUSTRIES.map(industry => ({ value: industry, label: industry }))}
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companyProfile.fields.size')}
                  </label>
                  <Select
                    options={COMPANY_SIZES}
                    value={formData.size}
                    onChange={(e) => handleChange('size', e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
              >
                Commencer à utiliser Verifio
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
} 