import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '/private');

  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const url = new URL('/private/login', context.url);
    url.searchParams.set('error', error.message);
    url.searchParams.set('email', email);
    if (next) url.searchParams.set('next', next);
    return context.redirect(url.pathname + url.search);
  }

  return context.redirect(next);
};
