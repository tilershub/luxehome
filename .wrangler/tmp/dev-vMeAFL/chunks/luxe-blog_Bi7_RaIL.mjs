globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createClient, L as LUXE_SUPABASE_KEY, a as LUXE_SUPABASE_URL } from './luxe-supabase_BoRC35do.mjs';

let _client = null;
function sb() {
  if (!_client) {
    _client = createClient(LUXE_SUPABASE_URL, LUXE_SUPABASE_KEY, {
      auth: { persistSession: false }
    });
  }
  return _client;
}
async function getPublishedPosts() {
  try {
    const { data, error } = await sb().from("blog_posts").select("id,title,slug,author,category,reading_time,pub_date,cover_image,excerpt,content,meta_title,meta_description,og_image,include_in_sitemap,updated_at").eq("status", "published").order("pub_date", { ascending: false }).order("created_at", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
async function getPublishedPost(slug) {
  try {
    const { data, error } = await sb().from("blog_posts").select("*").eq("status", "published").eq("slug", slug).maybeSingle();
    if (error) return null;
    return data ?? null;
  } catch {
    return null;
  }
}
function readingTime(post) {
  if (post.reading_time) return post.reading_time;
  const words = (post.content ?? "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
function excerptOf(post) {
  if (post.excerpt) return post.excerpt;
  const text = (post.content ?? "").replace(/^#+\s.*$/gm, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_>`#|-]/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}
function formatPostDate(value) {
  return new Date(value).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export { getPublishedPosts as a, excerptOf as e, formatPostDate as f, getPublishedPost as g, readingTime as r };
