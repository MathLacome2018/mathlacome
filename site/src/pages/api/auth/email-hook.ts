import type { APIRoute } from 'astro';
import { Webhook, WebhookVerificationError } from 'standardwebhooks';

export const prerender = false;

// Supabase's "Send Email" Auth Hook posts here instead of sending auth
// emails itself -- this lets password recovery (and signup confirmation,
// if ever enabled) work on the free plan without custom SMTP. Configure
// in Supabase: Authentication -> Hooks -> Send Email Hook -> HTTPS,
// pointing at https://<your-domain>/api/auth/email-hook. The secret it
// generates goes in SUPABASE_HOOK_SECRET.

const HOOK_SECRET = import.meta.env.SUPABASE_HOOK_SECRET;
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const EMAIL_FROM = import.meta.env.EMAIL_FROM;
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;

interface EmailHookPayload {
  user: { email: string };
  email_data: {
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
  };
}

function hookError(message: string, httpCode = 500) {
  return new Response(JSON.stringify({ error: { http_code: httpCode, message } }), {
    status: httpCode,
    headers: { 'Content-Type': 'application/json' },
  });
}

function buildEmail(payload: EmailHookPayload): { subject: string; html: string } {
  const { user, email_data } = payload;
  const { token_hash, email_action_type, site_url, redirect_to } = email_data;

  switch (email_action_type) {
    case 'recovery': {
      const link = `${site_url}/private/reset-password?token_hash=${token_hash}&type=recovery`;
      return {
        subject: 'Reset your Mathlacome password',
        html: `
          <p>Someone requested a password reset for ${user.email} on Mathlacome.</p>
          <p><a href="${link}">Reset your password</a></p>
          <p>If you didn't request this, you can safely ignore this email -- your password won't change.</p>
        `,
      };
    }
    case 'signup': {
      // Delegates the actual confirmation to Supabase's own hosted verify
      // endpoint (unaffected by this hook, which only replaces sending),
      // so there's no need for a dedicated confirm page on our side.
      const link = `${SUPABASE_URL}/auth/v1/verify?token_hash=${token_hash}&type=signup&redirect_to=${encodeURIComponent(
        `${site_url}/private/login`,
      )}`;
      return {
        subject: 'Confirm your Mathlacome account',
        html: `
          <p>Thanks for signing up. Confirm your email to finish creating your account:</p>
          <p><a href="${link}">Confirm your email</a></p>
        `,
      };
    }
    default: {
      const link = `${SUPABASE_URL}/auth/v1/verify?token_hash=${token_hash}&type=${email_action_type}&redirect_to=${encodeURIComponent(
        redirect_to || site_url,
      )}`;
      return {
        subject: 'Mathlacome account notice',
        html: `<p><a href="${link}">Continue</a></p>`,
      };
    }
  }
}

export const POST: APIRoute = async (context) => {
  if (!HOOK_SECRET || !RESEND_API_KEY || !EMAIL_FROM) {
    return hookError('Email hook is missing required environment variables.');
  }

  const payloadText = await context.request.text();
  const headers = Object.fromEntries(context.request.headers);

  let payload: EmailHookPayload;
  try {
    // Supabase's dashboard may display the secret with a leading "v1,";
    // the library only understands a bare "whsec_..." value.
    const webhook = new Webhook(HOOK_SECRET.replace(/^v1,/, ''));
    payload = webhook.verify(payloadText, headers) as EmailHookPayload;
  } catch (err) {
    const message = err instanceof WebhookVerificationError ? err.message : 'Invalid webhook signature.';
    return hookError(message, 401);
  }

  const { subject, html } = buildEmail(payload);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: EMAIL_FROM, to: payload.user.email, subject, html }),
  });

  if (!res.ok) {
    return hookError(`Resend failed to send the email: ${await res.text()}`);
  }

  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
