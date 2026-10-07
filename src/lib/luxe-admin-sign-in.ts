import type { AuthError, SupabaseClient } from '@supabase/supabase-js';

/**
 * Send the correct email for either kind of authorised admin account:
 *
 * - confirmed users receive the normal one-time magic link;
 * - invited users who have not accepted their first invitation receive a
 *   fresh confirmation link.
 *
 * Public sign-ups remain disabled. Unknown addresses receive Supabase's
 * non-enumerating response but can never pass the private admin allowlist.
 */
export async function sendAdminSignInLink(
  client: SupabaseClient,
  email: string,
  redirectTo: string,
): Promise<AuthError | null> {
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: false,
    },
  });

  if (!error) return null;

  // An invited-but-unconfirmed user follows the signup confirmation flow in
  // GoTrue. With public signups disabled, resend that existing confirmation
  // rather than asking the browser to create a new user.
  if (error.code !== 'signup_disabled') return error;

  const { error: resendError } = await client.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo: redirectTo },
  });

  return resendError;
}
