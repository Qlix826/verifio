'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { name: 'Secteurs', href: '/secteurs' },
  { name: 'Prix', href: '/pricing' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Nav() {
  // const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock user for development
  const user = null;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <motion.div 
              className="flex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Verifio
                </span>
                <img 
                  src="/flag-canada.svg" 
                  alt="Drapeau du Canada" 
                  className="h-5 w-auto ml-2"
                />
              </Link>
            </motion.div>

            {/* Navigation items - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Icons.layoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/api/auth/logout">
                      <Icons.logOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Link>
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Icons.user className="w-4 h-4 mr-2" />
                      Se connecter
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Icons.check className="w-4 h-4 mr-2" />
                      Essai gratuit
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-blue-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Icons.layoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/api/auth/logout">
                      <Icons.logOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Icons.user className="w-4 h-4 mr-2" />
                      Se connecter
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Icons.check className="w-4 h-4 mr-2" />
                      Essai gratuit
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 