import fs from 'fs';
import path from 'path';

// 1. Copy file
fs.copyFileSync('../gpx/rausandhaugen_bratta.gpx', 'public/gpx/rausandhaugen_bratta.gpx');
console.log('Copied rausandhaugen_bratta.gpx to public/gpx/');

// 2. Parse coordinates
const brattaGpx = fs.readFileSync('../gpx/rausandhaugen_bratta.gpx', 'utf-8');
const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*(?:<ele>([^<]+)<\/ele>)?/g;
const brattaPoints = [];
let match;
while ((match = ptRegex.exec(brattaGpx)) !== null) {
  brattaPoints.push([parseFloat(match[1]), parseFloat(match[2])]);
}

// 3. Update routeTracks.ts
const tsPath = path.resolve('src/lib/routeTracks.ts');
let tsContent = fs.readFileSync(tsPath, 'utf-8');
const jsonMatch = tsContent.match(/export const routeTracks: Record<string, RouteTrackData> = (\{[\s\S]*\});/);

if (jsonMatch) {
  const data = JSON.parse(jsonMatch[1]);
  if (data['rausandhaugen']) {
    data['rausandhaugen'].waypoints = [
      {
        lat: data['rausandhaugen'].coordinates[0][0],
        lng: data['rausandhaugen'].coordinates[0][1],
        title: "Start: Rausandhaugen Topp",
        desc: "Start fra toppen av Rausandhaugen (819 moh).",
        type: "start"
      },
      {
        lat: brattaPoints[0][0],
        lng: brattaPoints[0][1],
        title: "Alternativ: Rausandhaugen Bratta",
        desc: "Start på den bratte alternative utforkjøringen (Trailguide #9063, 685 moh).",
        type: "poi"
      },
      {
        lat: data['rausandhaugen'].coordinates[data['rausandhaugen'].coordinates.length - 1][0],
        lng: data['rausandhaugen'].coordinates[data['rausandhaugen'].coordinates.length - 1][1],
        title: "Mål: Bekken",
        desc: "Sluttpunkt ved bekken (493 moh).",
        type: "summit"
      }
    ];

    data['rausandhaugen'].stravaSegments = [
      {
        name: "Rausandhaugen Hovedsti (Trailguide #5819)",
        url: "https://trailguide.net/html/5819",
        distanceKm: 3.14,
        avgGradePercent: 5.2,
        description: "Super flyt i øvre del fra toppen og ned mot bekken (819 - 493 moh)."
      },
      {
        name: "Rausandhaugen Bratta (Trailguide #9063)",
        url: "https://trailguide.net/html/9063",
        distanceKm: 1.01,
        avgGradePercent: -18.0,
        description: "Bratt og leken alternativ utforkjøring med herlig flyt (685 - 503 moh)."
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
  console.log('Updated routeTracks.ts with Rausandhaugen Bratta!');
}

// 4. Update rausandhaugen.md
const mdPath = path.resolve('src/content/ruter/rausandhaugen.md');
const mdContent = `---
title: "Rausandhaugen & Rausandhaugen Bratta"
excerpt: "Flott flytsti fra toppen og ned mot bekken (819 - 493 moh), inkludert den bratte alternative utforkjøringen Rausandhaugen Bratta."
discipline: "Terreng / Sti"
difficulty: "Krevende"
distanceKm: 3.1
elevationM: 326
estimatedTime: "45 – 75 min"
surface: "Flytsti på svaberg, lyng, bratte partier og skogsbunn"
startingPoint: "Toppen av Rausandhaugen (819 moh)"
gpxFile: "/gpx/rausandhaugen.gpx"
trailguideUrl: "https://trailguide.net/html/5819"
trailforksUrl: "https://www.trailforks.com/region/mo-i-rana-29667/"
stravaUrl: "https://trailguide.net/html/5819"
highlights:
  - "Trailguide #5819: Rausandhaugen (3,14 km)"
  - "Trailguide #9063: Alternativet Rausandhaugen Bratta (1,01 km)"
  - "Super flyt fra toppen og ned mot bekken"
featured: false
order: 11
---

## Om stien (Trailguide #5819)

> *«The trail has good flow in the upper section from the top and down to the creek. The end of the trail can be a little confusing, since it is not easy to see where the trail is going.»*

**Rausandhaugen** har særlig god flyt i øvre del fra toppen (819 moh) og nedover mot bekken (493 moh). 

### ⚡ Alternativ rute: Rausandhaugen Bratta (Trailguide #9063)

> *«This trail has some steep parts and has nice flow. Best ridden downhill.»*

Underveis kan du velge den bratte varianten **Rausandhaugen Bratta** – en 1,01 km lang utforkjøring (fra 685 moh ned til 503 moh) med brattere terreng og herlig flyt.

- **Last ned alternativ GPX:** [Last ned Rausandhaugen Bratta GPX](/gpx/rausandhaugen_bratta.gpx)
`;

fs.writeFileSync(mdPath, mdContent, 'utf-8');
console.log('Updated rausandhaugen.md!');
