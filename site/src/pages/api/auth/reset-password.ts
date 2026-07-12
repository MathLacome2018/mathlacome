import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return context.redirect('/private/forgot-password');
  }

  const form = await context.request.formData();
  const password = String(form.get('password') ?? '');
  const confirm = String(form.get('confirm') ?? '');

  if (password.length < 6) {
    return context.redirect(
      `/private/reset-password?formError=${encodeURIComponent('Password must be at least 6 characters.')}`,
    );
  }

  if (password !== confirm) {
    return context.redirect(`/private/reset-password?formError=${encodeURIComponent('Passwords do not match.')}`);
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return context.redirect(`/private/reset-password?formError=${encodeURIComponent(error.message)}`);
  }

  return context.redirect('/private/reset-password?success=1');
};
