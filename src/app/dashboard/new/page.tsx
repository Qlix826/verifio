'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTranslations } from "@/contexts/translations-context"

export default function NewRequestPage() {
  const router = useRouter();
  const { t } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    birthPlace: '',
    mainAddress: '',
    secondaryAddress: '',
    region: '',
    services: [] as string[],
  });

  const services = [
    {
      id: "criminal-canada",
      label: t('newRequest.services.criminal.canada')
    },
    {
      id: "criminal-international",
      label: t('newRequest.services.criminal.international')
    },
    {
      id: "education",
      label: t('newRequest.services.education')
    },
    {
      id: "professional",
      label: t('newRequest.services.professional')
    }
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setSelectedServices(prev => {
      if (checked) {
        return [...prev, services.find(s => s.id === serviceId)?.label || ""];
      } else {
        return prev.filter(s => s !== services.find(s => s.id === serviceId)?.label);
      }
    });
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (selectedServices.length === 0) {
      setFormError(t('newRequest.messages.selectService'));
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        services: selectedServices
      };

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(t('newRequest.messages.errorDetails'));
      }

      toast.success(t('newRequest.messages.success'), {
        description: t('newRequest.messages.successDetails'),
      });

      // Redirection vers le tableau de bord après 2 secondes
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast.error(t('newRequest.messages.error'), {
        description: t('newRequest.messages.errorDetails'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">{t('newRequest.title')}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t('newRequest.candidateInfo.title')}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    {t('newRequest.candidateInfo.firstName')}
                  </label>
                  <Input id="firstName" name="firstName" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    {t('newRequest.candidateInfo.lastName')}
                  </label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('newRequest.candidateInfo.email')}
                </label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  {t('newRequest.candidateInfo.phone')}
                </label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t('newRequest.services.title')}</h2>
              {formError && (
                <p className="text-sm text-red-500 font-medium">{formError}</p>
              )}
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={service.id} 
                      checked={selectedServices.includes(service.label)}
                      onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                    />
                    <label 
                      htmlFor={service.id} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {service.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => router.push('/dashboard')}
                disabled={isSubmitting}
              >
                {t('newRequest.buttons.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('newRequest.buttons.submitting') : t('newRequest.buttons.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 