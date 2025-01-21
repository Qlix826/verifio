'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import {
  Building2,
  Users,
  TrendingUp,
  Globe,
  Activity,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface DashboardStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  weeklyGrowth: number;
  companiesByRegion: { [key: string]: number };
  companiesByIndustry: { [key: string]: number };
  subscriptionStats: {
    active: number;
    cancelled: number;
    trial: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    weeklyGrowth: 0,
    companiesByRegion: {},
    companiesByIndustry: {},
    subscriptionStats: {
      active: 0,
      cancelled: 0,
      trial: 0
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Entreprises totales',
      value: stats.totalCompanies,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Entreprises actives',
      value: stats.activeCompanies,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Utilisateurs RH',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Croissance hebdomadaire',
      value: `${stats.weeklyGrowth}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Distribution géographique */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-500" />
          Distribution géographique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.companiesByRegion).map(([region, count]) => (
            <div key={region} className="flex justify-between items-center">
              <span className="text-gray-600">{region}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Distribution par industrie */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-500" />
          Distribution par industrie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.companiesByIndustry).map(([industry, count]) => (
            <div key={industry} className="flex justify-between items-center">
              <span className="text-gray-600">{industry}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistiques d'abonnement */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">État des abonnements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <span className="text-green-600">Actifs</span>
            <span className="font-semibold">{stats.subscriptionStats.active}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
            <span className="text-yellow-600">En période d'essai</span>
            <span className="font-semibold">{stats.subscriptionStats.trial}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
            <span className="text-red-600">Annulés</span>
            <span className="font-semibold">{stats.subscriptionStats.cancelled}</span>
          </div>
        </div>
      </Card>
    </div>
  );
} 