import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return context.redirect('/private/login?next=%2Fprivate%2Fquestions');
  }

  const form = await context.request.formData();
  const body = String(form.get('body') ?? '').trim();

  if (!body) {
    return context.redirect(`/private/questions?error=${encodeURIComponent('Question cannot be empty.')}`);
  }

  const { error } = await supabase.from('questions').insert({
    body,
    author_id: user.id,
    author_email: user.email,
  });

  if (error) {
    return context.redirect(`/private/questions?error=${encodeURIComponent(error.message)}`);
  }

  return context.redirect('/private/questions');
};
