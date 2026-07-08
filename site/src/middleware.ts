import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';

const PUBLIC_PRIVATE_PATHS = new Set(['/private/login', '/private/signup']);

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

  if (!user && !PUBLIC_PRIVATE_PATHS.has(pathname)) {
    return context.redirect(`/private/login?next=${encodeURIComponent(pathname)}`);
  }

  if (user && PUBLIC_PRIVATE_PATHS.has(pathname)) {
    return context.redirect('/private');
  }

  return next();
});
