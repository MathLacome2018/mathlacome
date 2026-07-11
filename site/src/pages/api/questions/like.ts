import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const form = await context.request.formData();
  const questionId = String(form.get('questionId') ?? '');
  const next = String(form.get('next') ?? '/private/questions');

  if (!user) {
    return context.redirect(`/private/login?next=${encodeURIComponent(next)}`);
  }

  const { data: existing } = await supabase
    .from('question_likes')
    .select('id')
    .eq('question_id', questionId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from('question_likes').delete().eq('id', existing.id);
  } else {
    await supabase.from('question_likes').insert({ question_id: questionId, user_id: user.id });
  }

  return context.redirect(next);
};
