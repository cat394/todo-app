import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  cookies.delete("auth_token");
  
  throw redirect(301, "/sign-in");
};