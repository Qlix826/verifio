'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function SmsVerificationPage({
  params
}: {
  params: { id: string }
}) {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/verifications/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: params.id,
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de vérification');
      }

      toast({
        title: "Téléphone vérifié avec succès",
        description: "Vous pouvez maintenant compléter votre demande.",
        duration: 5000,
      });

      // Rediriger vers le formulaire principal
      window.location.href = `/verification/${params.id}`;

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      const response = await fetch('/api/verifications/sms/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: params.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du code');
      }

      toast({
        title: "Code envoyé",
        description: "Un nouveau code a été envoyé à votre téléphone.",
        duration: 5000,
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Vérification de votre téléphone</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                Code de vérification
              </label>
              <Input
                id="code"
                type="text"
                placeholder="Entrez le code reçu par SMS"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
              <p className="text-sm text-gray-500">
                Veuillez entrer le code à 6 chiffres reçu par SMS
              </p>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || code.length !== 6}
              >
                {isSubmitting ? 'Vérification...' : 'Vérifier'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={isResending}
              >
                {isResending ? 'Envoi en cours...' : 'Renvoyer le code'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 