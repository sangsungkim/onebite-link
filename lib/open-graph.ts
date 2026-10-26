export type OpenGraph = {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};

function getMeta(html: string, keys: string[]): string {
  const tags = html.match(/<meta\s[^>]*>/gi) ?? [];
  for (const key of keys) {
    for (const tag of tags) {
      const name = tag.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
      if (name?.toLowerCase() !== key) continue;
      const content = tag.match(/content\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      const value = content?.[1] ?? content?.[2];
      if (value) return decodeEntities(value.trim());
    }
  }
  return "";
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'");
}

export async function fetchOpenGraph(rawUrl: string): Promise<OpenGraph> {
  const target = new URL(rawUrl);
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    throw new Error("http(s) 링크만 지원합니다.");
  }

  const res = await fetch(target, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)" },
    signal: AbortSignal.timeout(5000),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`페이지를 불러오지 못했습니다. (${res.status})`);

  const html = (await res.text()).slice(0, 500_000);
  const pageUrl = res.url || target.href;

  const title =
    getMeta(html, ["og:title", "twitter:title"]) ||
    decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? "");
  const description = getMeta(html, [
    "og:description",
    "twitter:description",
    "description",
  ]);
  const image = getMeta(html, ["og:image", "twitter:image"]);

  let thumbnail = "";
  if (image) {
    try {
      thumbnail = new URL(image, pageUrl).href;
    } catch {}
  }

  return {
    title: title || new URL(pageUrl).hostname,
    description,
    thumbnail,
    url: getMeta(html, ["og:url"]) || pageUrl,
  };
}
