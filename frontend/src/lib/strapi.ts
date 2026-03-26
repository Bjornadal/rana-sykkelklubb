const STRAPI_URL = import.meta.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || "";

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface StrapiEvent {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  date?: string;
  location?: string;
  publishedAt: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface NewsItem {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

export interface EventItem {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  date?: string;
  location?: string;
  image?: string;
}

async function fetchFromStrapi<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T | null> {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  try {
    const response = await fetch(url.toString(), {
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      console.warn(`Strapi fetch failed: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn("Could not connect to Strapi:", error);
    return null;
  }
}

function getStrapiImageUrl(image?: { url: string }): string | undefined {
  if (!image?.url) return undefined;
  if (image.url.startsWith("http")) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

function mapArticleToNews(article: StrapiArticle): NewsItem {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || "",
    content: article.content || "",
    date: article.publishedAt,
    image: getStrapiImageUrl(article.image),
  };
}

function mapStrapiEvent(event: StrapiEvent): EventItem {
  return {
    title: event.title,
    slug: event.slug,
    excerpt: event.excerpt,
    content: event.content || "",
    date: event.date || event.publishedAt,
    location: event.location,
    image: getStrapiImageUrl(event.image),
  };
}

// Fallback data used when Strapi is unavailable
const fallbackNews: NewsItem[] = [
  {
    title: "Årsmøtet må utsettes!",
    slug: "arsmotet-ma-utsettes",
    excerpt:
      "Valgkomiteen har fått en ekstra utfordring med ledervervet i klubben. Det betyr at vi må gi valgkomiteen ekstra tid til å løse denne utfordringen.",
    content:
      "<p>Valgkomiteen har fått en ekstra utfordring med ledervervet i klubben. Det betyr at vi må gi valgkomiteen ekstra tid til å løse denne utfordringen. Nytt årsmøte-tidspunkt vil bli annonsert.</p>",
    date: "2026-03-10",
  },
  {
    title: "Årsmøte for sesong 2024 avviklet",
    slug: "arsmote-sesong-2024",
    excerpt: "Referat fra årsmøtet finner du under Om klubben.",
    content: "<p>Referat fra årsmøtet finner du under Om klubben.</p>",
    date: "2025-04-27",
  },
  {
    title: "Innkalling til årsmøte for sesongen 2025",
    slug: "innkalling-arsmote-2025",
    excerpt:
      "Det innkalles til årsmøte 12. mars 2026 kl. 19:00. Møtested er Vitensenteret.",
    content:
      "<p>Det innkalles til årsmøte 12. mars 2026 kl. 19:00. Møtested er Vitensenteret. Mer info finnes under Om klubben.</p>",
    date: "2025-02-08",
  },
  {
    title: "Terrengsykkelgruppe etablert",
    slug: "terrengsykkelgruppe-etablert",
    excerpt:
      "26. juni ble det vedtatt at klubben skal opprette en egen gruppe for terreng- og stisykling.",
    content:
      "<p>26. juni ble det vedtatt at klubben skal opprette en egen gruppe for terreng- og stisykling. Referat fra etableringsmøtet finnes under Om klubben.</p>",
    date: "2024-06-29",
  },
  {
    title: "Klubbpris på treningsavtale",
    slug: "klubbpris-treningsavtale",
    excerpt:
      "Som medlem av klubben kan du tegne treningsavtale til gunstig pris på Family Sports Club.",
    content:
      "<p>Som medlem av klubben kan du tegne treningsavtale til gunstig pris på Family Sports Club. All in idrettsmedlemskap kr 363,- pr mnd.</p>",
    date: "2020-10-21",
  },
];

export async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetchFromStrapi<StrapiResponse<StrapiArticle>>(
    "articles",
    {
      "sort[0]": "publishedAt:desc",
      "populate": "image",
      "pagination[pageSize]": "100",
    }
  );

  if (response?.data && response.data.length > 0) {
    return response.data.map(mapArticleToNews);
  }

  return fallbackNews;
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
  const response = await fetchFromStrapi<StrapiResponse<StrapiArticle>>(
    "articles",
    {
      "filters[slug][$eq]": slug,
      "populate": "image",
    }
  );

  if (response?.data?.[0]) {
    return mapArticleToNews(response.data[0]);
  }

  return fallbackNews.find((n) => n.slug === slug) || null;
}

export async function fetchEvents(): Promise<EventItem[]> {
  const response = await fetchFromStrapi<StrapiResponse<StrapiEvent>>(
    "events",
    {
      "sort[0]": "date:desc",
      "populate": "image",
      "pagination[pageSize]": "100",
    }
  );

  if (response?.data && response.data.length > 0) {
    return response.data.map(mapStrapiEvent);
  }

  return [];
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | null> {
  const response = await fetchFromStrapi<StrapiResponse<StrapiEvent>>(
    "events",
    {
      "filters[slug][$eq]": slug,
      "populate": "image",
    }
  );

  if (response?.data?.[0]) {
    return mapStrapiEvent(response.data[0]);
  }

  return null;
}
