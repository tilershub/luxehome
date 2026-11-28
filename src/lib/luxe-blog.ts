/* ============================================================
   LUXEhome Journal — runtime data layer.
   The blog is server-rendered so articles published in the CMS
   go live immediately, with no site rebuild. Reads go through
   the same Supabase project the CMS writes to (luxe-supabase),
   and RLS only exposes rows with status = 'published'.
   ============================================================ */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { LUXE_SUPABASE_KEY, LUXE_SUPABASE_URL } from './luxe-supabase';

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string | null;
  reading_time: string | null;
  pub_date: string;
  cover_image: string | null;
  excerpt: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  include_in_sitemap: boolean;
  updated_at: string;
}

let _client: SupabaseClient | null = null;
function sb(): SupabaseClient {
  if (!_client) {
    _client = createClient(LUXE_SUPABASE_URL, LUXE_SUPABASE_KEY, {
      auth: { persistSession: false },
    });
  }
  return _client;
}

/** All published articles, newest first. Empty list on any failure. */
export async function getPublishedPosts(): Promise<JournalPost[]> {
  try {
    const { data, error } = await sb()
      .from('blog_posts')
      .select('id,title,slug,author,category,reading_time,pub_date,cover_image,excerpt,content,meta_title,meta_description,og_image,include_in_sitemap,updated_at')
      .eq('status', 'published')
      .order('pub_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) return [];
    return (data as JournalPost[]) ?? [];
  } catch {
    return [];
  }
}

/** A single published article by slug, or null. */
export async function getPublishedPost(slug: string): Promise<JournalPost | null> {
  try {
    const { data, error } = await sb()
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .eq('slug', slug)
      .maybeSingle();
    if (error) return null;
    return (data as JournalPost) ?? null;
  } catch {
    return null;
  }
}

/** "5 min read" — stored value if the editor set one, else estimated. */
export function readingTime(post: Pick<JournalPost, 'reading_time' | 'content'>): string {
  if (post.reading_time) return post.reading_time;
  const words = (post.content ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Card excerpt — stored value if set, else the article's opening text. */
export function excerptOf(post: Pick<JournalPost, 'excerpt' | 'content'>): string {
  if (post.excerpt) return post.excerpt;
  const text = (post.content ?? '')
    .replace(/^#+\s.*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_>`#|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}

/** Strip Markdown to plain text for structured data. */
function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Question/answer pairs for FAQPage schema. Reads the article's
 * "## Frequently asked questions" (or "## FAQ") section, where each
 * question is an H3 and the answer is the text beneath it, so editors
 * get FAQ rich results simply by following that convention in the CMS.
 */
export function faqItemsOf(post: Pick<JournalPost, 'content'>): Array<{ q: string; a: string }> {
  const content = (post.content ?? '').replace(/\r\n/g, '\n');
  const start = content.search(/^##\s+(frequently asked questions|faqs?)\b.*$/im);
  if (start < 0) return [];
  const afterHeading = content.slice(start).replace(/^.*\n/, '');
  const end = afterHeading.search(/^(##\s|---\s*$)/m);
  const section = end < 0 ? afterHeading : afterHeading.slice(0, end);
  return section
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [first, ...rest] = block.split('\n');
      return { q: plainText(first), a: plainText(rest.join(' ')) };
    })
    .filter((item) => item.q && item.a);
}

export function formatPostDate(value: string): string {
  return new Date(value).toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
