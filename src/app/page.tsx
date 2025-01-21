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
    <div className="flex flex-col min-h-screen">
      {/* Sections */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Secteurs */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Secteurs</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Ressources Humaines</h3>
                <p className="text-gray-600">Solutions adaptées pour les professionnels RH et recruteurs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Services Financiers</h3>
                <p className="text-gray-600">Vérifications approfondies pour le secteur financier.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Santé</h3>
                <p className="text-gray-600">Solutions conformes aux normes du secteur de la santé.</p>
              </div>
            </div>
          </div>

          {/* Prix */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Prix</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Démarrage</h3>
                <p className="text-3xl font-bold mb-4">Gratuit</p>
                <p className="text-gray-600">Parfait pour commencer avec les vérifications de base.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200 ring-1 ring-blue-500">
                <h3 className="text-lg font-semibold mb-2">Professionnel</h3>
                <p className="text-3xl font-bold mb-4">49$/mois</p>
                <p className="text-gray-600">Pour les entreprises en croissance.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Entreprise</h3>
                <p className="text-3xl font-bold mb-4">Sur mesure</p>
                <p className="text-gray-600">Solutions personnalisées pour grandes entreprises.</p>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Solutions</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Vérification d'identité</h3>
                <p className="text-gray-600">Validation rapide et sécurisée des identités.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Antécédents criminels</h3>
                <p className="text-gray-600">Vérification complète des antécédents.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Validation professionnelle</h3>
                <p className="text-gray-600">Vérification des références et diplômes.</p>
              </div>
            </div>
          </div>

          {/* À propos */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">À propos</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                Verifio est une plateforme canadienne spécialisée dans la vérification d'antécédents, 
                conçue pour simplifier et sécuriser vos processus de recrutement.
              </p>
              <p className="text-gray-600">
                Notre mission est de fournir des solutions de vérification rapides, fiables et conformes 
                aux normes les plus strictes de protection des données.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Contact</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-blue-600">contact@verifio.com</p>
                </div>
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-blue-600">+1 (514) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à simplifier vos vérifications ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-50">
              Commencez dès aujourd'hui et découvrez comment nous pouvons vous aider à sécuriser vos recrutements.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50"
                size="lg"
                asChild
              >
                <Link href="/dashboard">Démarrer gratuitement</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                size="lg"
                asChild
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
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
            className="h-4 w-auto ml-2"
          />
        </div>
      </div>
    </div>
  );
}
