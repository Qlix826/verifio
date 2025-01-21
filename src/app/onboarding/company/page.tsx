'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { validateNEQ } from '@/lib/services/neq-validator';
import { PROVINCES, QUEBEC_CITIES, INDUSTRIES, COMPANY_SIZES } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompanyForm {
  name: string;
  neq: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  website: string;
  industry: string;
  size: string;
  description: string;
}

export default function CompanyProfilePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompanyForm>({
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
    description: ''
  });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      toast.success(t('companyProfile.success'));
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('companyProfile.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            verifio
          </h1>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLanguageChange('fr')}
              className={i18n.language === 'fr' ? 'bg-blue-50 text-blue-700' : ''}
            >
              Français
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLanguageChange('en')}
              className={i18n.language === 'en' ? 'bg-blue-50 text-blue-700' : ''}
            >
              English
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-lg">
          <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl">{t('companyProfile.title')}</CardTitle>
            <CardDescription className="text-blue-100">
              {t('companyProfile.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('companyProfile.fields.name')}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('companyProfile.fields.neq')}
                  </label>
                  <Input
                    name="neq"
                    value={formData.neq}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('companyProfile.fields.address')}
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('companyProfile.fields.city')}
                    </label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => handleSelectChange('city', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {QUEBEC_CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('companyProfile.fields.province')}
                    </label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) => handleSelectChange('province', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((province) => (
                          <SelectItem key={province.value} value={province.value}>
                            {province.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('companyProfile.fields.postalCode')}
                    </label>
                    <Input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                      placeholder="H3B 2Y7"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('companyProfile.fields.phone')}
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="514-555-0123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('companyProfile.fields.website')}
                  </label>
                  <Input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('companyProfile.fields.industry')}
                    </label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleSelectChange('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('companyProfile.fields.size')}
                    </label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) => handleSelectChange('size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une taille" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t bg-gray-50/50">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : t('companyProfile.submit')}
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-sm text-gray-500">
          Besoin d'aide ? <a href="#" className="text-blue-600 hover:text-blue-800">Contactez-nous</a>
        </p>
      </div>
    </div>
  );
} 