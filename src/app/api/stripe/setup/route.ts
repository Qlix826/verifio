import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    // Créer les produits
    const starterProduct = await stripe.products.create({
      name: 'Starter',
      description: 'Parfait pour les petites entreprises',
    });

    const proProduct = await stripe.products.create({
      name: 'Pro',
      description: 'Pour les entreprises en croissance',
    });

    const enterpriseProduct = await stripe.products.create({
      name: 'Enterprise',
      description: 'Pour les grandes organisations',
    });

    // Créer les prix
    const starterPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 9900, // 99€
      currency: 'eur',
      recurring: {
        interval: 'month',
      },
    });

    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 29900, // 299€
      currency: 'eur',
      recurring: {
        interval: 'month',
      },
    });

    const enterprisePrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 99900, // 999€
      currency: 'eur',
      recurring: {
        interval: 'month',
      },
    });

    // Mettre à jour les constantes STRIPE_PLANS
    const STRIPE_PLANS = {
      starter: starterPrice.id,
      pro: proPrice.id,
      enterprise: enterprisePrice.id,
    };

    return NextResponse.json({
      message: 'Configuration Stripe terminée avec succès',
      plans: STRIPE_PLANS,
    });
  } catch (error) {
    console.error('Erreur lors de la configuration Stripe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la configuration Stripe' },
      { status: 500 }
    );
  }
} 