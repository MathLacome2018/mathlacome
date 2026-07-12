import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const email = String(form.get('email') ?? '').trim();

  if (!email) {
    return context.redirect(`/private/forgot-password?error=${encodeURIComponent('Enter your email address.')}`);
  }

  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const redirectTo = new URL('/private/reset-password', context.url.origin).toString();

  await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  // Always show the same message whether or not the address has an
  // account, so this can't be used to enumerate registered emails.
  return context.redirect('/private/forgot-password?sent=1');
};
