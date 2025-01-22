'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

export default function EmailVerificationPage({
  params
}: {
  params: { id: string }
}) {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/verifications/email', {
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

      toast.success("Email vérifié avec succès");

      // Rediriger vers la vérification SMS
      window.location.href = `/verification/sms/${params.id}`;

    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Vérification de votre email</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                Code de vérification
              </label>
              <Input
                id="code"
                type="text"
                placeholder="Entrez le code reçu par email"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
              <p className="text-sm text-gray-500">
                Veuillez entrer le code à 6 chiffres reçu par email
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || code.length !== 6}
            >
              {isSubmitting ? 'Vérification...' : 'Vérifier'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
} 