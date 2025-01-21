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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { toast } from 'sonner';

interface VerificationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  position: string;
  department: string;
}

const verificationTypes = [
  { value: 'criminal', label: 'Vérification criminelle' },
  { value: 'employment', label: 'Vérification d\'emploi' },
  { value: 'education', label: 'Vérification d\'éducation' },
  { value: 'reference', label: 'Vérification des références' },
  { value: 'identity', label: 'Vérification d\'identité' },
];

const departments = [
  { value: 'engineering', label: 'Ingénierie' },
  { value: 'sales', label: 'Ventes' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'Ressources Humaines' },
  { value: 'operations', label: 'Opérations' },
  { value: 'other', label: 'Autre' },
];

export default function NewVerificationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VerificationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: '',
    position: '',
    department: '',
  });

  const handleChange = (field: keyof VerificationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields: (keyof VerificationForm)[] = ['firstName', 'lastName', 'email', 'type', 'position', 'department'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      const fieldLabels = {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        type: 'Type de vérification',
        position: 'Poste',
        department: 'Département'
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
              <label htmlFor="type" className="block text-sm font-medium">
                Type de vérification <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.type}
                onValueChange={value => handleChange('type', value)}
                required
              >
                <SelectTrigger id="type" aria-required="true">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {verificationTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="position" className="block text-sm font-medium">
                Poste <span className="text-red-500">*</span>
              </label>
              <Input
                id="position"
                value={formData.position}
                onChange={e => handleChange('position', e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium">
                Département <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.department}
                onValueChange={value => handleChange('department', value)}
                required
              >
                <SelectTrigger id="department" aria-required="true">
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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