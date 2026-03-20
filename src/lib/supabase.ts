import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase client — null when env vars are not configured.
 * All callers should check for null before using (graceful degradation).
 */
export const supabase = url && key ? createClient(url, key) : null;

// ── Typed row shapes ──────────────────────────────────────────────────────

export interface LeadInsert {
  name: string;
  phone: string;
  service: string;
  location: string;
  service_details?: Record<string, string> | null;
  notes?: string | null;
  source_url?: string;
}

export interface CartEventInsert {
  session_id: string;
  service_name: string;
  price: number;
  details?: string;
  page_url?: string;
}
