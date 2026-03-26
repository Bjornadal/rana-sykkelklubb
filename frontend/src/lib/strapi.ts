/** Production Strapi Cloud (public read; no API token). */
const STRAPI_URL = "https://light-chocolate-8bc19f5e89.strapiapp.com";

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

interface StrapiActivity {
  id: number;
  documentId: string;
  activity: string;
  day: string;
  time: string;
  location?: string;
  type: "Inne" | "Ute";
  description?: string;
  publishedAt: string;
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

export interface ActivityItem {
  activity: string;
  day: string;
  time: string;
  location?: string;
  type: "Inne" | "Ute";
  description?: string;
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
    const response = await fetch(url.toString());

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

function mapStrapiActivity(item: StrapiActivity): ActivityItem {
  return {
    activity: item.activity,
    day: item.day,
    time: item.time,
    location: item.location,
    type: item.type,
    description: item.description,
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

export async function fetchActivities(): Promise<ActivityItem[]> {
  const response = await fetchFromStrapi<StrapiResponse<StrapiActivity>>(
    "activities",
    {
      "sort[0]": "day:asc",
      "pagination[pageSize]": "100",
    }
  );

  if (response?.data && response.data.length > 0) {
    return response.data.map(mapStrapiActivity);
  }

  return [];
}

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

  return [];
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

  return null;
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
