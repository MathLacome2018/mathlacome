import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const form = await context.request.formData();
  const bookId = String(form.get('bookId') ?? '');
  const body = String(form.get('body') ?? '').trim();

  if (!user) {
    return context.redirect(`/private/login?next=${encodeURIComponent(`/private/books/${bookId}`)}`);
  }

  if (!body) {
    return context.redirect(`/private/books/${bookId}?error=${encodeURIComponent('Comment cannot be empty.')}`);
  }

  const { error } = await supabase.from('book_comments').insert({
    book_id: bookId,
    user_id: user.id,
    user_email: user.email,
    body,
  });

  if (error) {
    return context.redirect(`/private/books/${bookId}?error=${encodeURIComponent(error.message)}`);
  }

  return context.redirect(`/private/books/${bookId}`);
};
