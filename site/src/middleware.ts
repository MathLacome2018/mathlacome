import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';
import { isAdminEmail } from './lib/supabase-admin';

const AUTH_PATHS = new Set(['/private/login', '/private/signup']);
const PENDING_PATH = '/private/pending';

function isApproved(user: { app_metadata?: Record<string, unknown> } | null): boolean {
  return user?.app_metadata?.approved === true;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (!pathname.startsWith('/private')) {
    return next();
  }

  const supabase = createSupabaseServerClient(context.request, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  context.locals.user = user;

  // Not signed in: only the login/signup forms are reachable.
  if (!user) {
    if (AUTH_PATHS.has(pathname)) return next();
    return context.redirect(`/private/login?next=${encodeURIComponent(pathname)}`);
  }

  const admin = isAdminEmail(user.email);
  const approved = admin || isApproved(user);

  // Signed in: bounce away from the login/signup forms.
  if (AUTH_PATHS.has(pathname)) {
    return context.redirect(approved ? '/private' : PENDING_PATH);
  }

  // Signed in but not yet approved: only the "pending" screen is reachable.
  if (!approved) {
    if (pathname === PENDING_PATH) return next();
    return context.redirect(PENDING_PATH);
  }

  // Approved (or admin) users don't need the pending screen.
  if (pathname === PENDING_PATH) {
    return context.redirect('/private');
  }

  // The admin area is restricted to the configured admin email.
  if (pathname.startsWith('/private/admin') && !admin) {
    return context.redirect('/private');
  }

  return next();
});
