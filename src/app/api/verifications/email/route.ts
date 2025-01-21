import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSmsVerificationCode } from '@/lib/email';

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
    if (verification.emailVerificationCode !== code) {
      return NextResponse.json(
        { error: 'Code invalide' },
        { status: 400 }
      );
    }

    // Marquer l'email comme vérifié
    await prisma.verification.update({
      where: { id: verificationId },
      data: {
        status: 'verified'
      }
    });

    // Envoyer le code SMS seulement si le numéro de téléphone existe
    if (verification.phone) {
      await sendSmsVerificationCode(verification.phone, verificationId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 