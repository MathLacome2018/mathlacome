import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';

export const prerender = false;

// Permanently removes a question (open or answered). Cascades to its likes
// via the on-delete-cascade FK on question_likes. Admin-only.
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

  if (!questionId) {
    return context.redirect(`/private/admin?error=${encodeURIComponent('Missing question id.')}`);
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('questions').delete().eq('id', questionId);
  if (error) {
    return context.redirect(
      `/private/admin?error=${encodeURIComponent(`Could not delete question: ${error.message}`)}`,
    );
  }

  return context.redirect('/private/admin');
};
