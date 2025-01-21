import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { verificationId, code } = await request.json();

    // Vérifier la demande
    const verification = await prisma.verification.findUnique({
      where: { id: verificationId }
    });

    if (!verification) {
      return NextResponse.json(
        { error: 'Vérification non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier le code
    if (verification.smsVerificationCode !== code) {
      return NextResponse.json(
        { error: 'Code invalide' },
        { status: 400 }
      );
    }

    // Marquer le téléphone comme vérifié
    await prisma.verification.update({
      where: { id: verificationId },
      data: {
        status: 'verified'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying SMS:', error);
    return NextResponse.json(
      { error: 'Failed to verify SMS' },
      { status: 500 }
    );
  }
}

// Route pour renvoyer le code SMS
export async function PUT(request: Request) {
  try {
    const { verificationId } = await request.json();

    const verification = await prisma.verification.findUnique({
      where: { id: verificationId }
    });

    if (!verification) {
      return NextResponse.json(
        { error: 'Vérification non trouvée' },
        { status: 404 }
      );
    }

    // Générer et envoyer un nouveau code SMS
    const smsVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    await prisma.verification.update({
      where: { id: verificationId },
      data: {
        smsVerificationCode
      }
    });

    // TODO: Intégrer un service SMS (Twilio, Vonage, etc.)
    console.log(`New SMS code for ${verification.phone}: ${smsVerificationCode}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resending SMS code:', error);
    return NextResponse.json(
      { error: 'Failed to resend SMS code' },
      { status: 500 }
    );
  }
} 