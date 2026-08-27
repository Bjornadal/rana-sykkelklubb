import fs from 'fs';
import path from 'path';

const gpx = fs.readFileSync('../gpx/ytternmarka_roundtrip.gpx', 'utf-8');

const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*<ele>([^<]+)<\/ele>\s*<\/trkpt>/g;
const points = [];
let match;
while ((match = ptRegex.exec(gpx)) !== null) {
  points.push([parseFloat(match[1]), parseFloat(match[2])]);
}

console.log(`Parsed ${points.length} coordinates for ytternmarka-roundtrip`);

// Read routeTracks.ts
const tsPath = path.resolve('src/lib/routeTracks.ts');
let tsContent = fs.readFileSync(tsPath, 'utf-8');

// Parse JSON inside routeTracks
const jsonMatch = tsContent.match(/export const routeTracks: Record<string, RouteTrackData> = (\{[\s\S]*\});/);
if (jsonMatch) {
  const data = JSON.parse(jsonMatch[1]);
  if (data['ytternmarka-roundtrip']) {
    data['ytternmarka-roundtrip'].coordinates = points;
    data['ytternmarka-roundtrip'].waypoints = [
      {
        lat: points[0][0],
        lng: points[0][1],
        title: "Start: Ytternmarka",
        desc: "Start ved Nordsjona / Ytternmarka (21 moh).",
        type: "start"
      },
      {
        lat: points[110][0],
        lng: points[110][1],
        title: "Ytternmarka Toppunkt & Utforkjøring",
        desc: "Rask og morsom downhill mot Ytteren (212 moh).",
        type: "viewpoint"
      }
    ];
    data['ytternmarka-roundtrip'].stravaSegments = [
      {
        name: "Ytternmarka Roundtrip (Trailguide #7979)",
        url: "https://trailguide.net/html/7979",
        distanceKm: 4.7,
        avgGradePercent: 4.6,
        description: "Offisiell Trailguide-trasé logget av Andreas Bjørnådal."
      }
    ];
  }

  const newTs = `export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteWaypoint {
  lat: number;
  lng: number;
  title: string;
  desc: string;
  type: "start" | "summit" | "viewpoint" | "cafe" | "poi";
}

export interface StravaSegmentData {
  name: string;
  id?: string;
  url: string;
  distanceKm: number;
  avgGradePercent?: number;
  maxGradePercent?: number;
  description: string;
}

export interface RouteTrackData {
  slug: string;
  title: string;
  discipline: "Landevei" | "Terreng / Sti" | "Grus / Gravel" | "Enduro";
  color: string;
  coordinates: [number, number][];
  waypoints: RouteWaypoint[];
  stravaSegments?: StravaSegmentData[];
}

export const routeTracks: Record<string, RouteTrackData> = ${JSON.stringify(data, null, 2)};
`;

  fs.writeFileSync(tsPath, newTs, 'utf-8');
  console.log('Successfully updated routeTracks.ts with exact ytternmarka coordinates!');
}
