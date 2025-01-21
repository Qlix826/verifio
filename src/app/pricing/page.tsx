'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QjTp8QZwHS3JHzjGtnO37twHWj2ZrhKrPy5BBg0Oz8oLvb2uKPTaKcb1sONXs5L23ZYgWWiYRAGsKjewuT10sdg00j8uipx68');

const plans = [
  {
    id: 'starter',
    name: "Starter",
    price: "99",
    description: "Parfait pour les petites entreprises",
    features: [
      "Jusqu'à 20 vérifications par mois",
      "Vérifications de base",
      "Support par email",
      "Tableau de bord simple",
    ],
  },
  {
    id: 'pro',
    name: "Pro",
    price: "299",
    description: "Pour les entreprises en croissance",
    features: [
      "Jusqu'à 100 vérifications par mois",
      "Vérifications avancées",
      "Support prioritaire",
      "API d'intégration",
      "Rapports personnalisés",
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    price: "Sur mesure",
    description: "Pour les grandes organisations",
    features: [
      "Vérifications illimitées",
      "Vérifications personnalisées",
      "Support dédié 24/7",
      "API avancée",
      "Intégration sur mesure",
      "SLA garanti",
    ],
  },
];

export default function PricingPage() {
  const { user, isLoading } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      window.location.href = '/api/auth/login';
      return;
    }

    try {
      setIsProcessing(true);
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Erreur lors de la redirection vers Stripe:', error);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'abonnement:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tarifs simples et transparents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins. 
            Tous nos plans incluent une période d'essai de 14 jours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative p-8 bg-white rounded-lg shadow-sm border-2",
                plan.popular ? "border-indigo-600" : "border-gray-200"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white">
                    Populaire
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {typeof plan.price === "number" ? `${plan.price}€` : plan.price}
                  </span>
                  {typeof plan.price === "number" && (
                    <span className="text-gray-600">/mois</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isProcessing}
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  )}
                >
                  {isProcessing ? "Traitement..." : plan.price === "Sur mesure" ? "Nous contacter" : "Commencer"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tous nos plans incluent une garantie satisfait ou remboursé de 30 jours. 
            Pas de contrat à long terme, annulez à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
} 