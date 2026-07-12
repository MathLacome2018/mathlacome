import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';

export const prerender = false;

// "Vetting" a member unlocks the 2 dormant invite codes they were given at
// signup, letting them start bringing people. Access itself was already
// granted the moment they registered with a valid code.
export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return new Response('Forbidden', { status: 403 });
  }

  const form = await context.request.formData();
  const userId = String(form.get('userId') ?? '');

  const admin = createSupabaseAdminClient();
  await admin.auth.admin.updateUserById(userId, {
    app_metadata: { approved: true, vetted: true },
  });
  await admin.from('invites').update({ active: true }).eq('created_by', userId).eq('revoked', false);

  return context.redirect('/private/admin');
};
