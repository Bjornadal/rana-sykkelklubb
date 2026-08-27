import { getCollection, getEntry } from "astro:content";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  body?: string;
}

export interface ActivityItem {
  id: string;
  activity: string;
  day: string;
  time: string;
  location?: string;
  type: "Inne" | "Ute";
  description?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  location?: string;
  image?: string;
  body?: string;
}

const dayOrder: Record<string, number> = {
  Mandag: 1,
  Tirsdag: 2,
  Onsdag: 3,
  Torsdag: 4,
  Fredag: 5,
  Lørdag: 6,
  Søndag: 7,
};

export async function fetchActivities(): Promise<ActivityItem[]> {
  try {
    const entries = await getCollection("aktiviteter");
    return entries
      .sort((a, b) => {
        const orderA = a.data.order ?? dayOrder[a.data.day] ?? 99;
        const orderB = b.data.order ?? dayOrder[b.data.day] ?? 99;
        return orderA - orderB;
      })
      .map((entry) => ({
        id: entry.id,
        activity: entry.data.activity,
        day: entry.data.day,
        time: entry.data.time,
        location: entry.data.location ?? undefined,
        type: entry.data.type,
        description: entry.data.description ?? undefined,
      }));
  } catch (err) {
    console.warn("Could not load activities collection:", err);
    return [];
  }
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const entries = await getCollection("nyheter");
    return entries
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map((entry) => ({
        id: entry.id,
        slug: entry.id.replace(/\.[^/.]+$/, ""),
        title: entry.data.title,
        excerpt: entry.data.excerpt,
        date: entry.data.date.toISOString(),
        image: entry.data.image ?? undefined,
        body: entry.body,
      }));
  } catch (err) {
    console.warn("Could not load nyheter collection:", err);
    return [];
  }
}

export async function fetchNewsBySlug(slug: string) {
  try {
    const entry = await getEntry("nyheter", slug);
    if (!entry) return null;
    return {
      id: entry.id,
      slug: entry.id.replace(/\.[^/.]+$/, ""),
      title: entry.data.title,
      excerpt: entry.data.excerpt,
      date: entry.data.date.toISOString(),
      image: entry.data.image ?? undefined,
      body: entry.body,
      entry,
    };
  } catch (err) {
    console.warn(`Could not load nyheter/${slug}:`, err);
    return null;
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const entries = await getCollection("arrangement");
    return entries
      .sort((a, b) => {
        const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
        const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
        return dateB - dateA;
      })
      .map((entry) => ({
        id: entry.id,
        slug: entry.id.replace(/\.[^/.]+$/, ""),
        title: entry.data.title,
        excerpt: entry.data.excerpt ?? undefined,
        date: entry.data.date ? entry.data.date.toISOString() : undefined,
        location: entry.data.location ?? undefined,
        image: entry.data.image ?? undefined,
        body: entry.body,
      }));
  } catch (err) {
    console.warn("Could not load arrangement collection:", err);
    return [];
  }
}

export interface RouteItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  discipline: "Landevei" | "Terreng / Sti" | "Grus / Gravel" | "Enduro";
  difficulty: "Enkel" | "Middels" | "Krevende" | "Ekspert";
  distanceKm: number;
  elevationM: number;
  estimatedTime: string;
  surface: string;
  startingPoint: string;
  gpxFile?: string;
  stravaUrl?: string;
  komootUrl?: string;
  trailforksUrl?: string;
  trailguideUrl?: string;
  utNoUrl?: string;
  highlights: string[];
  featured: boolean;
  image?: string;
  order?: number;
  body?: string;
}

export async function fetchRoutes(): Promise<RouteItem[]> {
  try {
    const entries = await getCollection("ruter");
    return entries
      .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0))
      .map((entry) => ({
        id: entry.id,
        slug: entry.id.replace(/\.[^/.]+$/, ""),
        title: entry.data.title,
        excerpt: entry.data.excerpt,
        discipline: entry.data.discipline,
        difficulty: entry.data.difficulty,
        distanceKm: entry.data.distanceKm,
        elevationM: entry.data.elevationM,
        estimatedTime: entry.data.estimatedTime,
        surface: entry.data.surface,
        startingPoint: entry.data.startingPoint,
        gpxFile: entry.data.gpxFile ?? undefined,
        stravaUrl: entry.data.stravaUrl ?? undefined,
        komootUrl: entry.data.komootUrl ?? undefined,
        trailforksUrl: entry.data.trailforksUrl ?? undefined,
        trailguideUrl: entry.data.trailguideUrl ?? undefined,
        utNoUrl: entry.data.utNoUrl ?? undefined,
        highlights: entry.data.highlights || [],
        featured: entry.data.featured ?? false,
        image: entry.data.image ?? undefined,
        order: entry.data.order ?? 0,
        body: entry.body,
      }));
  } catch (err) {
    console.warn("Could not load ruter collection:", err);
    return [];
  }
}

export async function fetchRouteBySlug(slug: string) {
  try {
    const entry = await getEntry("ruter", slug);
    if (!entry) return null;
    return {
      id: entry.id,
      slug: entry.id.replace(/\.[^/.]+$/, ""),
      title: entry.data.title,
      excerpt: entry.data.excerpt,
      discipline: entry.data.discipline,
      difficulty: entry.data.difficulty,
      distanceKm: entry.data.distanceKm,
      elevationM: entry.data.elevationM,
      estimatedTime: entry.data.estimatedTime,
      surface: entry.data.surface,
      startingPoint: entry.data.startingPoint,
      gpxFile: entry.data.gpxFile ?? undefined,
      stravaUrl: entry.data.stravaUrl ?? undefined,
      komootUrl: entry.data.komootUrl ?? undefined,
      trailforksUrl: entry.data.trailforksUrl ?? undefined,
      trailguideUrl: entry.data.trailguideUrl ?? undefined,
      utNoUrl: entry.data.utNoUrl ?? undefined,
      highlights: entry.data.highlights || [],
      featured: entry.data.featured ?? false,
      image: entry.data.image ?? undefined,
      order: entry.data.order ?? 0,
      body: entry.body,
      entry,
    };
  } catch (err) {
    console.warn(`Could not load ruter/${slug}:`, err);
    return null;
  }
}

