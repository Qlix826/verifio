import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier si l'utilisateur est un administrateur
    const user = await prisma.user.findUnique({
      where: { id: session.user.sub },
    });

    if (!user?.role || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer les statistiques
    const [
      totalCompanies,
      totalUsers,
      companiesByProvince,
      companiesByIndustry,
      subscriptionStats,
      lastWeekCompanies,
      thisWeekCompanies
    ] = await Promise.all([
      // Total des entreprises
      prisma.company.count(),
      
      // Total des utilisateurs RH
      prisma.user.count(),
      
      // Distribution géographique
      prisma.company.groupBy({
        by: ['province'],
        _count: true,
      }),
      
      // Distribution par industrie
      prisma.company.groupBy({
        by: ['industry'],
        _count: true,
      }),
      
      // Statistiques d'abonnement
      prisma.company.groupBy({
        by: ['subscriptionId'],
        _count: true,
      }),
      
      // Entreprises de la semaine dernière
      prisma.company.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      
      // Entreprises de cette semaine
      prisma.company.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Calculer la croissance hebdomadaire
    const weeklyGrowth = lastWeekCompanies === 0 
      ? thisWeekCompanies * 100 
      : ((thisWeekCompanies - lastWeekCompanies) / lastWeekCompanies) * 100;

    // Formater les données géographiques
    const regionStats = companiesByProvince.reduce((acc, curr) => {
      acc[curr.province] = curr._count;
      return acc;
    }, {} as { [key: string]: number });

    // Formater les données par industrie
    const industryStats = companiesByIndustry.reduce((acc, curr) => {
      acc[curr.industry] = curr._count;
      return acc;
    }, {} as { [key: string]: number });

    // Formater les statistiques d'abonnement
    const subscriptionCounts = subscriptionStats.reduce((acc, curr) => {
      const status = curr.subscriptionId ? 'active' : 'inactive';
      acc[status] = (acc[status] || 0) + curr._count;
      return acc;
    }, { active: 0, inactive: 0 } as { [key: string]: number });

    // Calculer le nombre d'entreprises actives (avec un abonnement)
    const activeCompanies = subscriptionCounts.active || 0;

    return NextResponse.json({
      totalCompanies,
      activeCompanies,
      totalUsers,
      weeklyGrowth: Math.round(weeklyGrowth * 100) / 100,
      companiesByRegion: regionStats,
      companiesByIndustry: industryStats,
      subscriptionStats: {
        active: subscriptionCounts.active || 0,
        inactive: subscriptionCounts.inactive || 0,
      },
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
} 