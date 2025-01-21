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
    
    // Créer l'entreprise
    const company = await prisma.company.create({
      data: {
        name: data.name,
        neq: data.neq,
        address: data.address,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        phone: data.phone,
        website: data.website,
        industry: data.industry,
        size: data.size,
      },
    });

    // Mettre à jour l'utilisateur avec l'ID de l'entreprise
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        companyId: company.id,
        role: 'ADMIN', // Premier utilisateur devient admin
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: true },
    });

    if (!user?.company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user.company);
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
} 