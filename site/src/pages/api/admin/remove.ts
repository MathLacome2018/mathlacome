import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient, isAdminEmail } from '../../../lib/supabase-admin';
import { generateInviteCode } from '../../../lib/invites';

export const prerender = false;

// Removing a member deletes their account and REFUNDS the invite they used
// back to whoever brought them -- rotating that code to a fresh value so the
// removed person can't reuse it. Their own unredeemed codes are revoked;
// any people they'd already brought in stay (their lineage link goes null).
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

  // Refund the code this member redeemed, back to its creator, rotated.
  const { data: redeemedInvite } = await admin
    .from('invites')
    .select('id')
    .eq('redeemed_by', userId)
    .maybeSingle();
  if (redeemedInvite) {
    await admin
      .from('invites')
      .update({
        redeemed_by: null,
        redeemed_by_email: null,
        redeemed_at: null,
        code: generateInviteCode(),
      })
      .eq('id', redeemedInvite.id);
  }

  // Kill this member's own unredeemed codes so they can't be used later.
  await admin
    .from('invites')
    .update({ revoked: true, active: false })
    .eq('created_by', userId)
    .is('redeemed_by', null);

  await admin.auth.admin.deleteUser(userId);

  return context.redirect('/private/admin');
};
