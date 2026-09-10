import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE = "https://ranasykkelklubb.no";

const staticRoutes = [
  "/",
  "/om-klubben/",
  "/aktiviteter/",
  "/medlemskap/",
  "/kontakt/",
  "/nyheter/",
  "/ruter/",
  "/sykkelpark/",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async () => {
  const [news, routes, events] = await Promise.all([
    getCollection("nyheter"),
    getCollection("ruter"),
    getCollection("arrangement"),
  ]);

  const entries = [
    ...staticRoutes.map((path) => ({ loc: `${SITE}${path}` })),
    ...news.map((item) => ({
      loc: `${SITE}/nyheter/${item.id.replace(/\.[^/.]+$/, "")}/`,
      lastmod: item.data.date?.toISOString(),
    })),
    ...routes.map((item) => ({
      loc: `${SITE}/ruter/${item.id.replace(/\.[^/.]+$/, "")}/`,
    })),
    ...events.map((item) => ({
      loc: `${SITE}/arrangement/${item.id.replace(/\.[^/.]+$/, "")}/`,
      lastmod: item.data.date?.toISOString(),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>${
          lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ""
        }\n  </url>`
    )
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
