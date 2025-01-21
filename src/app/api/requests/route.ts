import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur et ses vérifications
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.sub
      },
      include: {
        company: {
          include: {
            verifications: true
          }
        }
      }
    });

    if (!user?.company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Calculer les métriques
    const verifications = user.company.verifications;
    const metrics = {
      totalVerifications: verifications.length,
      pendingVerifications: verifications.filter(v => v.status === 'pending').length,
      completedVerifications: verifications.filter(v => v.status === 'completed').length,
      rejectedVerifications: verifications.filter(v => v.status === 'rejected').length,
    };

    return NextResponse.json({ verifications, metrics });
  } catch (error) {
    console.error('Error fetching verifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch verifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, type, position, department } = body;

    // Récupérer l'utilisateur et son entreprise
    const user = await prisma.user.findUnique({
      where: { id: session.user.sub },
      include: { company: true }
    });

    if (!user?.company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Créer la vérification
    const newVerification = await prisma.verification.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        type,
        position,
        department,
        status: 'pending',
        userId: user.id,
        companyId: user.company.id,
      },
    });

    // Envoyer l'email au candidat
    await sendVerificationEmail(
      email,
      newVerification.id,
      `${firstName} ${lastName}`
    );

    return NextResponse.json(newVerification);
  } catch (error) {
    console.error('Error creating verification:', error);
    return NextResponse.json(
      { error: 'Failed to create verification' },
      { status: 500 }
    );
  }
} 