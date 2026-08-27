import fs from 'fs';
import path from 'path';

// 1. Copy GPX
fs.copyFileSync('../gpx/gnarly_hills.gpx', 'public/gpx/gnarly-hills.gpx');
console.log('Copied gnarly_hills.gpx -> public/gpx/gnarly-hills.gpx');

// 2. Parse coordinates
const gpx = fs.readFileSync('../gpx/gnarly_hills.gpx', 'utf-8');
const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*(?:<ele>([^<]+)<\/ele>)?/g;
const points = [];
let match;
while ((match = ptRegex.exec(gpx)) !== null) {
  points.push([parseFloat(match[1]), parseFloat(match[2])]);
}

// 3. Update routeTracks.ts
const tsPath = path.resolve('src/lib/routeTracks.ts');
let tsContent = fs.readFileSync(tsPath, 'utf-8');
const jsonMatch = tsContent.match(/export const routeTracks: Record<string, RouteTrackData> = (\{[\s\S]*\});/);

if (jsonMatch) {
  const data = JSON.parse(jsonMatch[1]);
  data['gnarly-hills'] = {
    slug: 'gnarly-hills',
    title: 'Gnarly Hills',
    discipline: 'Terreng / Sti',
    color: '#3b82f6',
    coordinates: points,
    waypoints: [
      {
        lat: points[0][0],
        lng: points[0][1],
        title: 'Start: Gnarly Hills Topp',
        desc: 'Start på stien på Selforsfjellet (396 moh).',
        type: 'start'
      },
      {
        lat: points[points.length - 1][0],
        lng: points[points.length - 1][1],
        title: 'Mål: Gnarly Hills Bunnen',
        desc: 'Sluttpunkt (303 moh).',
        type: 'summit'
      }
    ],
    stravaSegments: [
      {
        name: 'Gnarly Hills (Trailguide #10067)',
        url: 'https://trailguide.net/html/10067',
        distanceKm: 0.89,
        avgGradePercent: -10.4,
        description: 'Trailguide #10067: Flytsti til noen tighte partier med noen artige momenter underveis.'
      }
    ]
  };

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
  console.log('Added gnarly-hills to routeTracks.ts');
}

// 4. Create gnarly-hills.md
const mdPath = path.resolve('src/content/ruter/gnarly-hills.md');
const mdContent = `---
title: "Gnarly Hills"
excerpt: "Flytsti til noen tighte partier med noen artige momenter underveis. Fin singletrack over Selforsfjellet (396 - 303 moh)."
discipline: "Terreng / Sti"
difficulty: "Middels"
distanceKm: 0.9
elevationM: 93
estimatedTime: "15 – 30 min"
surface: "Singletrack, røtter, doseringer og svaberg"
startingPoint: "Selforsfjellet (396 moh)"
gpxFile: "/gpx/gnarly-hills.gpx"
trailguideUrl: "https://trailguide.net/html/10067"
trailforksUrl: "https://www.trailforks.com/region/mo-i-rana-29667/"
stravaUrl: "https://trailguide.net/html/10067"
highlights:
  - "Trailguide #10067: Gnarly Hills"
  - "Distanse: 0.9 km (93 hm utfor)"
featured: false
order: 16
---

## Om stien (Trailguide #10067)

> *«Flytsti til noen tighte partier med noen artige momenter underveis.»*

**Gnarly Hills** er en 0,9 km lang leken singletrack på Selforsfjellet. Stien starter på 396 moh og slynger seg ned til 303 moh med god flyt, naturlige doseringer og enkelte morsomme crux underveis.
`;

fs.writeFileSync(mdPath, mdContent, 'utf-8');
console.log('Created gnarly-hills.md');
