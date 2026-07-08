import { createServerClient, type CookieOptionsWithName } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const cookieOptions: CookieOptionsWithName = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
};

function parseCookieHeader(header: string | null): { name: string; value: string }[] {
  if (!header) return [];
  return header
    .split(';')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const index = pair.indexOf('=');
      const name = index === -1 ? pair : pair.slice(0, index);
      const value = index === -1 ? '' : pair.slice(index + 1);
      return { name, value: decodeURIComponent(value) };
    });
}

export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY environment variables.',
    );
  }

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookieOptions,
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('cookie'));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, { ...cookieOptions, ...options });
        });
      },
    },
  });
}
