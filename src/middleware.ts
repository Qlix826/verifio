import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { getSession } from '@auth0/nextjs-auth0/edge';

// Middleware pour gérer l'authentification et les redirections
export async function middleware(req: NextRequest) {
  // Désactivé temporairement pour le développement
  return NextResponse.next();
  
  /* const res = NextResponse.next();
  const session = await getSession(req, res);

  // Autoriser l'accès aux routes publiques et aux ressources statiques
  if (
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname.startsWith('/api/auth/') ||
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/static/') ||
    req.nextUrl.pathname === '/favicon.ico'
  ) {
    return res;
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à la page d'accueil
  if (session?.user && req.nextUrl.pathname === '/') {
    try {
      // Vérifier si l'utilisateur a un profil d'entreprise
      const companyResponse = await fetch(`${process.env.API_URL}/api/companies/profile?email=${session.user.email}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      if (!companyResponse.ok) {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }

      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (error) {
      console.error('Error checking company profile:', error);
      return NextResponse.redirect(new URL('/error', req.url));
    }
  }

  // Vérifier si l'utilisateur a déjà configuré son entreprise
  const hasCompany = session?.user?.['https://verifio.com/has_company'] || false;
  if (!hasCompany && req.nextUrl.pathname !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  // Vérifier les rôles pour l'accès à l'administration
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const roles = session?.user?.['https://verifio.com/roles'] || [];
    if (!roles.includes('ADMIN') && !roles.includes('SUPER_ADMIN')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res; */
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/admin/:path*',
    '/onboarding',
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}; 