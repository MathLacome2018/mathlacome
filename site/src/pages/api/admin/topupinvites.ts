import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';
import { mintInviteCodes } from '../../../lib/invites';

export const prerender = false;

// Admin-only: grant a member 2 extra active invite codes on top of their
// standard allowance.
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

  try {
    const admin = createSupabaseAdminClient();
    const { data: target } = await admin.auth.admin.getUserById(userId);
    if (!target?.user) {
      return context.redirect('/private/admin');
    }
    const vetted = target.user.app_metadata?.vetted === true;

    await mintInviteCodes(admin, {
      count: 2,
      createdBy: userId,
      createdByEmail: target.user.email ?? '',
      // Match the member's current state: if they aren't vetted yet, the
      // bonus codes stay dormant until they are (consistent with the rest).
      active: vetted,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error.';
    return context.redirect(`/private/admin?error=${encodeURIComponent(`Could not add invites: ${message}`)}`);
  }

  return context.redirect('/private/admin');
};
