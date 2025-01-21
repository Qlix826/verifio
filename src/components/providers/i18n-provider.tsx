'use client';

import { PropsWithChildren } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      common: {
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        success: 'Opération réussie',
        save: 'Enregistrer',
        cancel: 'Annuler',
        delete: 'Supprimer',
        edit: 'Modifier',
        add: 'Ajouter',
        search: 'Rechercher',
        filter: 'Filtrer',
        noResults: 'Aucun résultat',
        required: 'Ce champ est requis',
        invalidFormat: 'Format invalide',
        retry: 'Réessayer',
      },
      auth: {
        signIn: 'Se connecter',
        signUp: 'S\'inscrire',
        signOut: 'Se déconnecter',
        forgotPassword: 'Mot de passe oublié ?',
        resetPassword: 'Réinitialiser le mot de passe',
      },
      navigation: {
        home: 'Accueil',
        dashboard: 'Tableau de bord',
        settings: 'Paramètres',
        profile: 'Profil',
        verifications: 'Vérifications',
        requests: 'Demandes',
        company: 'Entreprise',
      },
      status: {
        pending: 'En attente',
        completed: 'Complété',
        failed: 'Échoué',
        verified: 'Vérifié',
      },
      verifications: {
        new: 'Nouvelle vérification',
        list: 'Liste des vérifications',
        details: 'Détails de la vérification',
        type: {
          criminal: 'Vérification criminelle',
          employment: 'Vérification d\'emploi',
          education: 'Vérification d\'éducation',
          reference: 'Vérification des références',
          identity: 'Vérification d\'identité',
        },
      },
      companyProfile: {
        title: 'Profil de l\'entreprise',
        description: 'Complétez les informations de votre entreprise',
        fields: {
          name: 'Nom de l\'entreprise',
          neq: 'Numéro d\'entreprise du Québec (NEQ)',
          address: 'Adresse',
          city: 'Ville',
          province: 'Province',
          postalCode: 'Code postal',
          phone: 'Téléphone',
          website: 'Site web',
          industry: 'Secteur d\'activité',
          size: 'Taille de l\'entreprise',
          description: 'Description'
        },
        validation: {
          neqInvalid: 'NEQ invalide. Veuillez vérifier le numéro.',
          required: 'Ce champ est requis'
        },
        submit: 'Enregistrer',
        success: 'Profil mis à jour avec succès',
        error: 'Une erreur est survenue'
      }
    }
  },
  en: {
    translation: {
      companyProfile: {
        title: 'Company Profile',
        description: 'Complete your company information',
        fields: {
          name: 'Company Name',
          neq: 'Quebec Enterprise Number (NEQ)',
          address: 'Address',
          city: 'City',
          province: 'Province',
          postalCode: 'Postal Code',
          phone: 'Phone',
          website: 'Website',
          industry: 'Industry',
          size: 'Company Size',
          description: 'Description'
        },
        validation: {
          neqInvalid: 'Invalid NEQ. Please verify the number.',
          required: 'This field is required'
        },
        submit: 'Save',
        success: 'Profile updated successfully',
        error: 'An error occurred'
      }
    }
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export function I18nProvider({ children }: PropsWithChildren) {
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
} 