'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Button,
  Select,
} from '@/components/ui';
import { toast } from 'sonner';

interface VerificationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  services: string[];
}

const verificationServices = [
  { value: 'criminal', label: 'Vérification criminelle' },
  { value: 'employment', label: 'Vérification d\'emploi' },
  { value: 'education', label: 'Vérification d\'éducation' },
  { value: 'reference', label: 'Vérification des références' },
  { value: 'identity', label: 'Vérification d\'identité' },
];

export default function NewVerificationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VerificationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services: [],
  });

  const handleChange = (field: keyof VerificationForm, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields: (keyof VerificationForm)[] = ['firstName', 'lastName', 'email', 'services'];
    const missingFields = requiredFields.filter(field => {
      if (field === 'services') {
        return !formData[field].length;
      }
      return !formData[field];
    });
    
    if (missingFields.length > 0) {
      const fieldLabels = {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        services: 'Services',
      };
      
      const missingFieldNames = missingFields.map(field => fieldLabels[field]).join(', ');
      toast.error(`Veuillez remplir les champs suivants : ${missingFieldNames}`);
      return false;
    }
    
    if (!formData.email.includes('@')) {
      toast.error('Veuillez entrer une adresse email valide');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Une erreur est survenue lors de la création de la vérification');
      }

      toast.success('Vérification créée avec succès');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating verification:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la création de la vérification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Nouvelle vérification</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Nom <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Téléphone
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Services de vérification <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {verificationServices.map((service) => (
                  <label key={service.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.value)}
                      onChange={(e) => {
                        const newServices = e.target.checked
                          ? [...formData.services, service.value]
                          : formData.services.filter(s => s !== service.value);
                        handleChange('services', newServices);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{service.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Création en cours...' : 'Créer la vérification'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 