'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  BarChart3,
  Settings,
  CreditCard,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  {
    name: 'Tableau de bord',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Utilisateurs',
    href: '/admin/users',
    icon: Users
  },
  {
    name: 'Entreprises',
    href: '/admin/companies',
    icon: Building2
  },
  {
    name: 'Demandes',
    href: '/admin/requests',
    icon: ClipboardList
  },
  {
    name: 'Analytiques',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    name: 'Paramètres',
    href: '/admin/settings',
    icon: Settings
  },
  {
    name: 'Facturation',
    href: '/admin/billing',
    icon: CreditCard
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-indigo-600 text-white">
            <h1 className="text-xl font-bold">Administration</h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-indigo-600" : "text-gray-400"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "lg:pl-64 flex flex-col min-h-screen",
        sidebarOpen && "lg:pl-0"
      )}>
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 