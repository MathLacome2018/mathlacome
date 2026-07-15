import type { SupabaseClient } from '@supabase/supabase-js';

// Human-friendly, unguessable codes: no 0/O/1/I/L to avoid misreads when
// someone says a code aloud or types it from a text message.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateInviteCode(length = 8): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = '';
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export interface Invite {
  id: string;
  code: string;
  created_by: string | null;
  created_by_email: string | null;
  redeemed_by: string | null;
  redeemed_by_email: string | null;
  active: boolean;
  revoked: boolean;
  created_at: string;
  redeemed_at: string | null;
}

export interface MintOptions {
  count: number;
  createdBy: string;
  createdByEmail: string;
  active: boolean;
}

/**
 * Inserts `count` fresh invite codes for a creator, retrying on the
 * astronomically rare unique-code collision. Must be called with a
 * service-role client (writes bypass RLS).
 */
export async function mintInviteCodes(admin: SupabaseClient, opts: MintOptions): Promise<Invite[]> {
  const inserted: Invite[] = [];
  for (let i = 0; i < opts.count; i++) {
    let placed = false;
    let lastError: { code?: string; message?: string } | null = null;
    for (let attempt = 0; attempt < 5 && !placed; attempt++) {
      const { data, error } = await admin
        .from('invites')
        .insert({
          code: generateInviteCode(),
          created_by: opts.createdBy,
          created_by_email: opts.createdByEmail,
          active: opts.active,
        })
        .select()
        .single();
      if (!error && data) {
        inserted.push(data as Invite);
        placed = true;
        break;
      }
      lastError = error;
      // Only a duplicate-code collision (23505) is worth retrying. Anything
      // else -- most commonly the `invites` table not existing yet -- will
      // never succeed, so fail fast and surface the real message.
      if (error && error.code !== '23505') break;
    }
    if (!placed) {
      throw new Error(lastError?.message || 'Could not generate a unique invite code.');
    }
  }
  return inserted;
}
