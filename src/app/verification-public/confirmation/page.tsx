'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function VerificationConfirmationPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Demande envoyée avec succès
            </h1>
            <p className="text-gray-600">
              Nous avons bien reçu votre demande de vérification. Vous recevrez un email de confirmation avec les prochaines étapes à suivre.
            </p>
          </div>

          <div className="pt-6">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
} 