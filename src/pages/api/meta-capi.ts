export const prerender = false;

import type { APIRoute } from 'astro';

async function sha256hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value.toLowerCase().trim());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '');
}

export const POST: APIRoute = async ({ request }) => {
  const pixelId = import.meta.env.META_PIXEL_ID;
  const accessToken = import.meta.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return new Response(JSON.stringify({ ok: false, error: 'CAPI not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: {
    event_id?: string;
    event_source_url?: string;
    phone?: string;
    name?: string;
    service?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { event_id, event_source_url, phone, name, service } = body;

  // Build hashed user data
  const userData: Record<string, string> = {};

  if (phone) {
    userData.ph = await sha256hex(normalizePhone(phone));
  }

  if (name) {
    const parts = name.trim().split(/\s+/);
    userData.fn = await sha256hex(parts[0]);
    if (parts.length > 1) {
      userData.ln = await sha256hex(parts.slice(1).join(' '));
    }
  }

  // Client IP forwarded by Cloudflare
  const clientIp = request.headers.get('CF-Connecting-IP') ?? undefined;
  const userAgent = request.headers.get('User-Agent') ?? undefined;

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: 'website',
        user_data: {
          ...userData,
          ...(clientIp ? { client_ip_address: clientIp } : {}),
          ...(userAgent ? { client_user_agent: userAgent } : {}),
        },
        custom_data: {
          content_name: 'Site Inspection Request',
          ...(service ? { content_category: service } : {}),
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.warn('[LUXEHOME] CAPI error:', res.status, err);
      return new Response(JSON.stringify({ ok: false, error: err }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.warn('[LUXEHOME] CAPI fetch failed:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
