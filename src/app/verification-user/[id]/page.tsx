'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { FileText, User } from 'lucide-react';
import { toast } from 'sonner';

interface Verification {
  id: string;
  firstName: string;
  lastName: string;
  services: string[];
}

export default function VerificationUserPage({
  params
}: {
  params: { id: string }
}) {
  const [verification, setVerification] = useState<Verification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    consent: false,
  });

  useEffect(() => {
    // Simuler le chargement des données
    // À remplacer par un vrai appel API
    setTimeout(() => {
      setVerification({
        id: params.id,
        firstName: 'Jean',
        lastName: 'Dupont',
        services: [
          'Vérification des antécédents judiciaires au Canada',
          'Vérification des relevés de notes',
          'Vérification de références professionnelles'
        ],
      });
      setFormData({
        firstName: 'Jean',
        lastName: 'Dupont',
        consent: false,
      });
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      toast.error("Vous devez donner votre consentement pour continuer");
      return;
    }

    try {
      const response = await fetch(`/api/verifications/${params.id}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la validation');
      }

      toast.success("Vos informations ont été validées avec succès");

      // Rediriger vers la page de confirmation
      window.location.href = `/verification-user/confirmation/${params.id}`;
    } catch (error) {
      toast.error("Une erreur est survenue lors de la validation");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900">Vérification non trouvée</h1>
        <p className="mt-2 text-gray-600">Cette demande de vérification n'existe pas ou a expiré.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Validation de vos informations</h1>
                <p className="text-gray-600">Veuillez vérifier vos informations et donner votre consentement</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Services demandés</h2>
                <div className="space-y-2">
                  {verification.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Consentement</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleChange('consent', checked as boolean)}
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      Je confirme que les informations fournies sont exactes et j'autorise la vérification de mes antécédents conformément aux services sélectionnés. Je comprends que ces vérifications sont nécessaires dans le cadre du processus de recrutement et j'accepte que les résultats soient partagés avec l'entreprise concernée.
                    </label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Valider mes informations
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
} 