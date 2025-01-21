import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { notifyStatusChange } from '@/lib/notifications';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { status, message } = await request.json();
    const verificationId = params.id;

    // Mettre à jour le statut
    const updatedVerification = await prisma.verification.update({
      where: { id: verificationId },
      data: { status },
      include: {
        company: {
          include: {
            users: true
          }
        }
      }
    });

    // Envoyer les notifications
    await notifyStatusChange(verificationId, status, message);

    return NextResponse.json(updatedVerification);
  } catch (error) {
    console.error('Error updating verification:', error);
    return NextResponse.json(
      { error: 'Failed to update verification' },
      { status: 500 }
    );
  }
} 