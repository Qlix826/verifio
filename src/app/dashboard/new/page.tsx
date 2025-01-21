'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function NewRequestPage() {
  const router = useRouter();
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
      id: "service1",
      label: "Vérification des antécédents judiciaires au Canada"
    },
    {
      id: "service2",
      label: "Vérification des antécédents judiciaires à l'extérieur du Canada"
    },
    {
      id: "service3",
      label: "Vérifications des relevés de notes"
    },
    {
      id: "service4",
      label: "Vérification de références professionnelles"
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
      setFormError("Veuillez sélectionner au moins un service");
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
        throw new Error('Erreur lors de l\'envoi de la demande');
      }

      toast({
        title: "Demande envoyée avec succès",
        description: "Un email de confirmation a été envoyé au candidat.",
        variant: "default",
        duration: 5000,
      });

      // Redirection vers le tableau de bord après 2 secondes
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Nouvelle demande de vérification</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Informations du candidat</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Prénom
                  </label>
                  <Input id="firstName" name="firstName" placeholder="Prénom du candidat" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Nom
                  </label>
                  <Input id="lastName" name="lastName" placeholder="Nom du candidat" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Courriel
                </label>
                <Input id="email" name="email" type="email" placeholder="email@exemple.com" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Numéro de téléphone
                </label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Services requis</h2>
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
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 