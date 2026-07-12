import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';
import { createSupabaseAdminClient } from '../../../lib/supabase-admin';
import { mintInviteCodes, type Invite } from '../../../lib/invites';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const code = String(form.get('invite') ?? '')
    .trim()
    .toUpperCase();

  const fail = (message: string) => {
    const url = new URL('/private/signup', context.url);
    url.searchParams.set('error', message);
    if (email) url.searchParams.set('email', email);
    if (code) url.searchParams.set('invite', code);
    return context.redirect(url.pathname + url.search);
  };

  if (!code) {
    return fail('An invite code is required to register.');
  }

  const admin = createSupabaseAdminClient();

  // The code must exist, belong to a vetted creator (active), and be unused.
  const { data: invite } = await admin
    .from('invites')
    .select('*')
    .eq('code', code)
    .maybeSingle<Invite>();

  if (!invite || invite.revoked || !invite.active || invite.redeemed_by) {
    return fail('That invite code is invalid or has already been used.');
  }

  // Create the account.
  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return fail(error.message);
  }
  const newUserId = data.user?.id;
  if (!newUserId) {
    return fail('Could not create your account. Please try again.');
  }

  // Redeem the code atomically: the filters mean only ONE concurrent signup
  // can win an unredeemed code -- the loser matches zero rows.
  const { data: redeemed } = await admin
    .from('invites')
    .update({
      redeemed_by: newUserId,
      redeemed_by_email: email,
      redeemed_at: new Date().toISOString(),
    })
    .eq('id', invite.id)
    .is('redeemed_by', null)
    .eq('active', true)
    .eq('revoked', false)
    .select('id');

  if (!redeemed || redeemed.length === 0) {
    // Lost the race (or the code was just deactivated). Roll back the account.
    await admin.auth.admin.deleteUser(newUserId);
    return fail('That invite was just used by someone else.');
  }

  // Instant access; the new member's own 2 codes stay dormant until vetted.
  await admin.auth.admin.updateUserById(newUserId, {
    app_metadata: { approved: true, vetted: false },
  });
  await mintInviteCodes(admin, {
    count: 2,
    createdBy: newUserId,
    createdByEmail: email,
    active: false,
  });

  // Email confirmation on -> no session yet; send them to sign in after.
  if (!data.session) {
    const url = new URL('/private/login', context.url);
    url.searchParams.set('notice', 'Check your email to confirm your account, then sign in.');
    url.searchParams.set('email', email);
    return context.redirect(url.pathname + url.search);
  }

  return context.redirect('/private');
};
