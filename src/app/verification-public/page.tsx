'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef } from 'react';
import { useRateLimit } from '@/hooks/use-rate-limit';

const verificationServices = [
  { value: 'criminal', label: 'Vérification criminelle' },
  { value: 'employment', label: 'Vérification d\'emploi' },
  { value: 'education', label: 'Vérification d\'éducation' },
  { value: 'reference', label: 'Vérification des références' },
  { value: 'identity', label: 'Vérification d\'identité' },
] as const;

// Regex plus stricts pour la validation
const nameRegex = /^[a-zA-ZÀ-ÿ\- ]{2,50}$/;
const phoneRegex = /^(\+?\d{1,3}[-.]?)?\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = z.object({
  firstName: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne doit pas dépasser 50 caractères')
    .regex(nameRegex, 'Le prénom ne doit contenir que des lettres'),
  lastName: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères')
    .regex(nameRegex, 'Le nom ne doit contenir que des lettres'),
  email: z.string()
    .email('Email invalide')
    .regex(emailRegex, 'Format d\'email invalide')
    .min(5, 'Email trop court')
    .max(100, 'Email trop long'),
  phone: z.string()
    .regex(phoneRegex, 'Numéro de téléphone invalide')
    .optional(),
  services: z.array(z.string())
    .min(1, 'Veuillez sélectionner au moins un service')
    .max(5, 'Vous ne pouvez pas sélectionner plus de 5 services'),
  consent: z.boolean()
    .refine((val) => val === true, {
      message: 'Vous devez accepter les conditions',
    }),
  recaptchaToken: z.string()
    .min(1, 'Veuillez confirmer que vous n\'êtes pas un robot'),
});

type FormData = z.infer<typeof formSchema>;

export default function PublicVerificationPage() {
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isRateLimited, incrementRateLimit } = useRateLimit('verification-form', 5, 3600); // 5 tentatives par heure

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      consent: false,
      recaptchaToken: '',
    },
  });

  const watchedServices = watch('services', []);

  const onSubmit = async (data: FormData) => {
    try {
      // Vérifier la limitation de taux
      if (isRateLimited) {
        toast.error('Trop de tentatives. Veuillez réessayer plus tard.');
        return;
      }

      // Incrémenter le compteur de tentatives
      incrementRateLimit();

      // Sanitisation des données
      const sanitizedData = {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone?.trim(),
      };

      const response = await fetch('/api/verifications/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Recaptcha-Token': recaptchaToken,
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la soumission');
      }

      toast.success('Votre demande a été envoyée avec succès');
      reset(); // Réinitialiser le formulaire
      recaptchaRef.current?.reset(); // Réinitialiser le captcha
      
      // Redirection vers une page de confirmation
      window.location.href = '/verification-public/confirmation';
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi de votre demande');
      recaptchaRef.current?.reset(); // Réinitialiser le captcha en cas d'erreur
    }
  };

  const handleServiceChange = (value: string, checked: boolean) => {
    const currentServices = watchedServices;
    const newServices = checked
      ? [...currentServices, value]
      : currentServices.filter((service) => service !== value);
    setValue('services', newServices, { shouldValidate: true });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token || '');
    setValue('recaptchaToken', token || '', { shouldValidate: true });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Demande de vérification
          </CardTitle>
          <p className="text-gray-600 text-center mt-2">
            Remplissez ce formulaire pour demander une vérification d'antécédents
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  aria-invalid={!!errors.firstName}
                  autoComplete="given-name"
                  maxLength={50}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  aria-invalid={!!errors.lastName}
                  autoComplete="family-name"
                  maxLength={50}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={!!errors.email}
                autoComplete="email"
                maxLength={100}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                autoComplete="tel"
                placeholder="ex: +1 514-123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Services */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Services de vérification <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {verificationServices.map((service) => (
                  <label key={service.value} className="flex items-center space-x-3">
                    <Checkbox
                      checked={watchedServices.includes(service.value)}
                      onCheckedChange={(checked) => 
                        handleServiceChange(service.value, checked as boolean)
                      }
                    />
                    <span className="text-sm text-gray-700">{service.label}</span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="text-sm text-red-500">{errors.services.message}</p>
              )}
            </div>

            {/* Consentement */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  {...register('consent')}
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  Je confirme que les informations fournies sont exactes et j'autorise la vérification de mes antécédents conformément aux services sélectionnés. Je comprends que ces vérifications sont nécessaires et j'accepte que les résultats soient traités de manière confidentielle.
                </label>
              </div>
              {errors.consent && (
                <p className="text-sm text-red-500">{errors.consent.message}</p>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleRecaptchaChange}
              />
              {errors.recaptchaToken && (
                <p className="text-sm text-red-500 mt-2">{errors.recaptchaToken.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting || isRateLimited}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 