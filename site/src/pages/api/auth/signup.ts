import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');

  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const url = new URL('/private/signup', context.url);
    url.searchParams.set('error', error.message);
    url.searchParams.set('email', email);
    return context.redirect(url.pathname + url.search);
  }

  if (!data.session) {
    const url = new URL('/private/login', context.url);
    url.searchParams.set('notice', 'Check your email to confirm your account, then sign in.');
    url.searchParams.set('email', email);
    return context.redirect(url.pathname + url.search);
  }

  return context.redirect('/private');
};
