import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Vous devez être connecté pour créer une vérification' },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { firstName, lastName, email, phone, type, position, department } = data;

    if (!firstName || !lastName || !email || !type || !position || !department) {
      return NextResponse.json(
        { message: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true },
    });

    if (!user?.company) {
      return NextResponse.json(
        { message: 'Vous devez être associé à une entreprise pour créer une vérification' },
        { status: 404 }
      );
    }

    const verification = await prisma.verification.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        type,
        position,
        department,
        userId: user.id,
        companyId: user.company.id,
      },
    });

    return NextResponse.json(verification);
  } catch (error) {
    console.error('[VERIFICATIONS_POST]', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la création de la vérification' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Vous devez être connecté pour accéder aux vérifications' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true },
    });

    if (!user?.company) {
      return NextResponse.json(
        { message: 'Vous devez être associé à une entreprise pour accéder aux vérifications' },
        { status: 404 }
      );
    }

    const verifications = await prisma.verification.findMany({
      where: { companyId: user.company.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(verifications);
  } catch (error) {
    console.error('[VERIFICATIONS_GET]', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la récupération des vérifications' },
      { status: 500 }
    );
  }
} 