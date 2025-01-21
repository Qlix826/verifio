import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Vérifier si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({
      where: { id: session.user.sub },
      include: { company: true }
    });

    // Si l'utilisateur a déjà une entreprise, retourner une erreur
    if (user?.company) {
      return NextResponse.json(
        { error: 'Vous avez déjà une entreprise' },
        { status: 400 }
      );
    }

    // Créer l'entreprise et mettre à jour l'utilisateur
    const company = await prisma.company.create({
      data: {
        name: data.name,
        neq: data.neq,
        industry: data.industry,
        size: data.size,
        website: data.website,
        address: data.address,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        phone: data.phone,
        users: {
          connect: { id: session.user.sub }
        }
      }
    });

    // Mettre à jour le rôle de l'utilisateur
    await prisma.user.update({
      where: { id: session.user.sub },
      data: {
        role: 'ADMIN'
      }
    });

    return NextResponse.json(company);

  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'entreprise' },
      { status: 500 }
    );
  }
} 