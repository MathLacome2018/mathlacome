import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return new Response('Forbidden', { status: 403 });
  }

  const form = await context.request.formData();
  const questionId = String(form.get('questionId') ?? '');
  const answer = String(form.get('answer') ?? '').trim();
  const tags = String(form.get('tags') ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  if (!answer) {
    return context.redirect(`/private/admin?error=${encodeURIComponent('Answer cannot be empty.')}`);
  }

  const admin = createSupabaseAdminClient();
  await admin
    .from('questions')
    .update({ answer, tags, status: 'answered', answered_at: new Date().toISOString() })
    .eq('id', questionId);

  return context.redirect('/private/admin');
};
