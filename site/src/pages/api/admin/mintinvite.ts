import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';
import { mintInviteCodes } from '../../../lib/invites';

export const prerender = false;

// Admin-only: mint fresh seed invite codes (owned by the admin, active
// immediately) to bootstrap the first members. Unlike regular members, the
// admin has no cap -- these codes make the admin the root of the tree.
export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email) || !user) {
    return new Response('Forbidden', { status: 403 });
  }

  const form = await context.request.formData();
  const count = Math.min(Math.max(Number(form.get('count') ?? 1) || 1, 1), 10);

  try {
    const admin = createSupabaseAdminClient();
    await mintInviteCodes(admin, {
      count,
      createdBy: user.id,
      createdByEmail: user.email ?? '',
      active: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error.';
    return context.redirect(`/private/admin?error=${encodeURIComponent(`Could not mint invites: ${message}`)}`);
  }

  return context.redirect('/private/admin');
};
