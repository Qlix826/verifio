import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature') as string;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Erreur de signature webhook:', err);
      return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
    }

    // Gérer les différents types d'événements
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await handleSubscriptionChange(subscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await handleSubscriptionDeletion(deletedSubscription);
        break;

      case 'checkout.session.completed':
        const session = event.data.object;
        await handleCheckoutComplete(session);
        break;

      // Ajouter d'autres cas selon les besoins
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionChange(subscription: any) {
  const customerId = subscription.customer;
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;

  // Mettre à jour l'utilisateur dans la base de données
  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: status,
      subscriptionPlan: getPlanFromPriceId(priceId)
    }
  });
}

async function handleSubscriptionDeletion(subscription: any) {
  const customerId = subscription.customer;

  // Mettre à jour l'utilisateur dans la base de données
  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: {
      subscriptionId: null,
      subscriptionStatus: 'canceled',
      subscriptionPlan: null
    }
  });
}

async function handleCheckoutComplete(session: any) {
  if (session.mode === 'subscription') {
    const subscriptionId = session.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionChange(subscription);
  }
}

function getPlanFromPriceId(priceId: string): string {
  // Mapper les IDs de prix aux noms des plans
  const planMap: { [key: string]: string } = {
    'price_starter': 'starter',
    'price_pro': 'pro',
    'price_enterprise': 'enterprise'
  };
  return planMap[priceId] || 'unknown';
} 