import { LucideIcon } from 'lucide-react';

export interface Verification {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  type: string;
  position: string;
  department: string;
  status: 'pending' | 'completed' | 'failed';
  emailVerificationCode?: string;
  smsVerificationCode?: string;
  userId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  neq: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone?: string;
  website?: string;
  industry: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
  subscriptionId?: string;
  trialEndsAt?: Date;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

export interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface CompanyInfo {
  name: string;
  neq: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

// Remove export of undefined Feature type