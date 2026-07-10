import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export const ADMIN_EMAIL = (import.meta.env.ADMIN_EMAIL ?? 'mathlacome@gmail.com').toLowerCase();

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && email.toLowerCase() === ADMIN_EMAIL;
}

/**
 * Server-only client authenticated as the Supabase service role. This can list
 * and modify any user account, bypassing Row Level Security entirely — never
 * import this file from client-side code, and never expose SERVICE_ROLE_KEY
 * with a PUBLIC_ prefix.
 */
export function createSupabaseAdminClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('Missing PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }

  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
