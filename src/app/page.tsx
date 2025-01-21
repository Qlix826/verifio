'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield, 
  ChevronDown,
  Bolt,
  Grid as Squares2X2
} from 'lucide-react';
import { cn } from "@/lib/utils"
import { useState } from "react"
import { OptimizedImage } from '@/components/ui/optimized-image';
import type { Testimonial } from '@/types';
import { Feature } from "@/types/icons";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown className={cn(
          "h-5 w-5 text-gray-500 transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}

// Définir les features en dehors du composant
const features: Feature[] = [
  {
    name: 'Vérification instantanée',
    description: 'Obtenez des résultats en quelques minutes grâce à notre processus automatisé et notre technologie de pointe.',
    icon: Bolt,
  },
  {
    name: 'Conformité garantie',
    description: 'Respectez toutes les réglementations en vigueur avec nos processus certifiés et notre expertise juridique.',
    icon: Shield,
  },
  {
    name: 'Interface intuitive',
    description: 'Une expérience utilisateur simple et efficace pour tous vos besoins de vérification.',
    icon: Squares2X2,
  },
];

// Définir les testimonials en dehors du composant
const testimonials: Testimonial[] = [
  {
    content: "L'outil nous a permis de réduire considérablement le temps consacré aux vérifications tout en augmentant leur fiabilité.",
    author: {
      name: 'Marie Dubois',
      role: 'DRH, Tech Solutions',
      imageUrl: '/testimonials/avatar-1.svg',
    },
  },
  {
    content: "Une solution complète qui s'est parfaitement intégrée à notre processus de recrutement existant.",
    author: {
      name: 'Pierre Martin',
      role: 'Responsable RH, InnovCorp',
      imageUrl: '/testimonials/avatar-2.svg',
    },
  },
  {
    content: "Le support client est exceptionnel et l'équipe est toujours à l'écoute de nos besoins.",
    author: {
      name: 'Sophie Laurent',
      role: 'Recruteuse, StartupFlow',
      imageUrl: '/testimonials/avatar-3.svg',
    },
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white py-2 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          🚀 Découvrez notre nouvelle fonctionnalité de vérification instantanée
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.2]" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-50/30 to-blue-50/10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Vérification de candidats <span className="text-blue-600">simplifiée</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Automatisez vos vérifications d'antécédents et prenez des décisions éclairées en toute confiance
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="default"
                size="lg"
                icon="check"
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <Link href="/dashboard">Essai gratuit</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="user"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                asChild
              >
                <Link href="/dashboard">Se connecter</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Fonctionnalités</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tout ce dont vous avez besoin pour vérifier vos candidats
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Une suite complète d'outils pour simplifier et sécuriser votre processus de recrutement.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      {React.createElement(feature.icon, {
                        className: "h-6 w-6 text-white",
                        "aria-hidden": "true",
                      })}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Secteurs Section */}
      <div id="secteurs" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Secteurs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Solutions adaptées à votre industrie
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <dt className="text-lg font-semibold text-gray-900">Ressources Humaines</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Solutions adaptées pour les professionnels RH et recruteurs.</p>
                </dd>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col"
              >
                <dt className="text-lg font-semibold text-gray-900">Services Financiers</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Vérifications approfondies pour le secteur financier.</p>
                </dd>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col"
              >
                <dt className="text-lg font-semibold text-gray-900">Santé</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Solutions conformes aux normes du secteur de la santé.</p>
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div id="solutions" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Solutions</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Des solutions complètes pour vos besoins
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <dt className="text-lg font-semibold text-gray-900">Vérification d'identité</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Validation rapide et sécurisée des identités.</p>
                </dd>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col"
              >
                <dt className="text-lg font-semibold text-gray-900">Antécédents criminels</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Vérification complète des antécédents.</p>
                </dd>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col"
              >
                <dt className="text-lg font-semibold text-gray-900">Validation professionnelle</dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Vérification des références et diplômes.</p>
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </div>

      {/* À propos Section */}
      <div id="about" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">À propos</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Notre mission
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Verifio est une plateforme canadienne spécialisée dans la vérification d'antécédents, 
              conçue pour simplifier et sécuriser vos processus de recrutement.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Notre mission est de fournir des solutions de vérification rapides, fiables et conformes 
              aux normes les plus strictes de protection des données.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Contact</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contactez-nous
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Notre équipe est disponible pour répondre à toutes vos questions.
            </p>
            <div className="mt-10 flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-blue-600">contact@verifio.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Téléphone</h3>
                <p className="text-blue-600">+1 (514) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Témoignages</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ce que nos utilisateurs en pensent
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.author.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <dt className="text-lg font-semibold text-gray-900">{testimonial.author.name}</dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{testimonial.content}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-50/30 to-blue-50/10" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Automatisez vos vérifications d'antécédents <span className="text-blue-600">maintenant</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Automatisez vos vérifications d'antécédents et prenez des décisions éclairées en toute confiance
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  variant="default"
                  size="lg"
                  icon="check"
                  className="bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link href="/dashboard">Essai gratuit</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon="user"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <Link href="/dashboard">Se connecter</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gray-50 text-gray-600 py-2 text-center text-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2">
          🔒 Conforme à la Loi 25 sur la protection des renseignements personnels - Vos données sont sécurisées
          <img 
            src="/flag-canada.svg" 
            alt="Drapeau du Canada" 
            className="h-3 w-auto ml-2"
          />
        </div>
      </div>
    </div>
  );
}
