import { getSession as getAuth0Session } from '@auth0/nextjs-auth0';

export async function getSession() {
  return await getAuth0Session();
} 