import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';

export const prerender = false;

// Handles both the first-time answer (from an open question) and later edits
// (from the "Answered" list). Editing re-uses this same route: it keeps the
// original answered_at, and can also fix the question's wording via `body`.
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

  if (!questionId) {
    return context.redirect(`/private/admin?error=${encodeURIComponent('Missing question id.')}`);
  }
  if (!answer) {
    return context.redirect(`/private/admin?error=${encodeURIComponent('Answer cannot be empty.')}`);
  }

  const admin = createSupabaseAdminClient();

  // Preserve the original publish date when this is an edit of an already
  // answered question; only stamp "now" the first time it gets answered.
  const { data: existing } = await admin
    .from('questions')
    .select('answered_at')
    .eq('id', questionId)
    .single();
  const answeredAt = existing?.answered_at ?? new Date().toISOString();

  const update: Record<string, unknown> = {
    answer,
    tags,
    status: 'answered',
    answered_at: answeredAt,
  };

  // Optional: let the admin fix a typo in the question itself.
  const bodyRaw = form.get('body');
  if (bodyRaw !== null) {
    const body = String(bodyRaw).trim();
    if (body) update.body = body;
  }

  const { error } = await admin.from('questions').update(update).eq('id', questionId);
  if (error) {
    return context.redirect(
      `/private/admin?error=${encodeURIComponent(`Could not save answer: ${error.message}`)}`,
    );
  }

  return context.redirect('/private/admin');
};
