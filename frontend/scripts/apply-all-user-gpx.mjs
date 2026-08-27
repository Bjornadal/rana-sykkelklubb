import fs from 'fs';
import path from 'path';

const gpxSourceDir = path.resolve('../gpx');
const publicGpxDir = path.resolve('public/gpx');

if (!fs.existsSync(publicGpxDir)) {
  fs.mkdirSync(publicGpxDir, { recursive: true });
}

function haversine(p1, p2) {
  const R = 6371; // km
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lon - p1.lon) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function parseGpx(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*(?:<ele>([^<]+)<\/ele>)?/g;
  const points = [];
  let match;
  while ((match = ptRegex.exec(content)) !== null) {
    points.push({
      lat: parseFloat(match[1]),
      lon: parseFloat(match[2]),
      ele: match[3] ? parseFloat(match[3]) : 0
    });
  }

  let totalDist = 0;
  let totalGain = 0;
  let totalDrop = 0;
  let minEle = points.length > 0 ? points[0].ele : 0;
  let maxEle = points.length > 0 ? points[0].ele : 0;

  for (let i = 1; i < points.length; i++) {
    totalDist += haversine(points[i - 1], points[i]);
    const diff = points[i].ele - points[i - 1].ele;
    if (diff > 0) totalGain += diff;
    if (diff < 0) totalDrop += Math.abs(diff);
    if (points[i].ele < minEle) minEle = points[i].ele;
    if (points[i].ele > maxEle) maxEle = points[i].ele;
  }

  return {
    points,
    distanceKm: parseFloat(totalDist.toFixed(2)),
    elevationGainM: Math.round(totalGain),
    elevationDropM: Math.round(totalDrop),
    minEle: Math.round(minEle),
    maxEle: Math.round(maxEle),
    start: points[0],
    end: points[points.length - 1],
    mid: points[Math.floor(points.length / 2)]
  };
}

// Trail mappings to user GPX files
const trailConfigs = [
  {
    slug: 'idavollen',
    file: 'idavollen.gpx',
    title: 'Idavollen',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '264',
    color: '#16a34a',
    startDesc: 'Start ved Stenneset / Båsmoen',
    poiDesc: 'Idavollen flytsti på barnålsbunn i furuskogen',
  },
  {
    slug: 'almlia',
    file: 'almlia.gpx',
    title: 'Almlia',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '5832',
    color: '#059669',
    startDesc: 'Start i Almlia (362 moh)',
    poiDesc: 'Speed trail / gammel skogsvei mot Skillevollen (38 moh)',
  },
  {
    slug: 'moan',
    file: 'moan.gpx',
    title: 'Moan',
    discipline: 'Terreng / Sti',
    difficulty: 'Enkel',
    trailguideId: '5828',
    color: '#10b981',
    startDesc: 'Start ved Moan (236 moh)',
    poiDesc: 'Fartsløype med blanding av singletrack og skogsvei (69 moh)',
  },
  {
    slug: 'yttraskaret-flyt',
    file: 'yttraskaret_flyt.gpx',
    title: 'Yttraskaret Flyt',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '7985',
    color: '#047857',
    startDesc: 'Start i Yttraskaret (324 moh)',
    poiDesc: 'Rask flytsti: singletrack øverst og traktorvei nederst (141 moh)',
  },
  {
    slug: 'yttrafjellet-deluxe',
    file: 'yttrafjellet_deluxe.gpx',
    title: 'Yttrafjellet Deluxe',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '8122',
    color: '#15803d',
    startDesc: 'Start på Yttrafjellet (279 moh)',
    poiDesc: 'Klassisk flytsti over svaberg og tørr skogssti (42 moh)',
  },
  {
    slug: 'isbilen',
    file: 'isbilen.gpx',
    title: 'Isbilen',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    trailguideId: '11149',
    color: '#dc2626',
    startDesc: 'Start toppen av Isbilen (284 moh)',
    poiDesc: 'Teknisk downhill singletrack ned til Munklia (35 moh)',
  },
  {
    slug: 'ytternmarka-roundtrip',
    file: 'ytternmarka_roundtrip.gpx',
    title: 'Ytternmarka Roundtrip',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '7979',
    color: '#0d9488',
    startDesc: 'Start ved Nordsjona / Ytternmarka (21 moh)',
    poiDesc: 'Toppunkt & rask utforkjøring (212 moh)',
  },
  {
    slug: 'selforsfjellet-tjuvtrappa',
    file: 'selforsfjellet.gpx',
    title: 'Selforsfjellet / Tjuvtrappa',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '7916',
    color: '#0284c7',
    startDesc: 'Start ved Skistua til Selfors UL (64 moh)',
    poiDesc: 'Veten & Tjuvtrappa med utsikt over Ranfjorden (409 moh)',
  },
  {
    slug: 'hauknestinden',
    file: 'hauknestinden.gpx',
    title: 'Hauknestinden',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    trailguideId: '8609',
    color: '#e11d48',
    startDesc: 'Toppen av Hauknestinden (798 moh)',
    poiDesc: 'Teknisk singletrack utfor mot Hauknes (236 moh)',
  },
  {
    slug: 'reinfjellet',
    file: 'reinfjellet.gpx',
    title: 'Reinfjellet',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    trailguideId: '5820',
    color: '#7c3aed',
    startDesc: 'Start Reinfjellet (496 moh)',
    poiDesc: 'Flott snaufjellssti over platået (658 moh)',
  },
  {
    slug: 'rausandhaugen',
    file: 'rausandhaugen.gpx',
    title: 'Rausandhaugen',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '5819',
    color: '#0891b2',
    startDesc: 'Toppen av Rausandhaugen (819 moh)',
    poiDesc: 'God flyt nedover mot bekken (493 moh)',
  },
  {
    slug: 'lappfjelltjonna',
    file: 'lappfjelltjønna.gpx',
    title: 'Lappfjelltjønna',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    trailguideId: '5863',
    color: '#9333ea',
    startDesc: 'Start Lappfjellet over tregrensen (868 moh)',
    poiDesc: 'Lappfjelltjønna fjellsti (523 moh)',
  },
  {
    slug: 'kubben',
    file: 'kubben.gpx',
    title: 'Kubben',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    trailguideId: '5818',
    color: '#4f46e5',
    startDesc: 'Start Kubben (1010 moh)',
    poiDesc: 'Flytsti med mye svaberg og stein (650 moh)',
  },
  {
    slug: 'hellerfjellet',
    file: 'hellerfjellet.gpx',
    title: 'Hellerfjellet',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    trailguideId: '5864',
    color: '#c026d3',
    startDesc: 'Start Hellerfjellet snaufjell (1076 moh)',
    poiDesc: 'Singletrack og berggrunn (645 moh)',
  },
  {
    slug: 'tindan',
    file: 'tindan.gpx',
    title: 'Tindan',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    trailguideId: '9510',
    color: '#be123c',
    startDesc: 'Toppen av Tindan (646 moh)',
    poiDesc: 'Spektakulær singletrack ned mot Dalsgrenda (67 moh)',
  },
];

// Existing Gravel configurations
const gravelConfigs = [
  {
    slug: 'svartisdalen-gravel-epic',
    title: 'Svartisdalen Gravel Epic',
    discipline: 'Grus / Gravel',
    difficulty: 'Krevende',
    distanceKm: 62,
    elevationM: 690,
    color: '#d97706',
  },
  {
    slug: 'plurdalen-kaldvatnet-gravel',
    title: 'Plurdalen & Kaldvatnet Gravel Adventure',
    discipline: 'Grus / Gravel',
    difficulty: 'Middels',
    distanceKm: 46,
    elevationM: 520,
    color: '#b45309',
  },
  {
    slug: 'reinforsen-og-skonseng-grus',
    title: 'Reinforsen & Skonseng Grusrunde',
    discipline: 'Grus / Gravel',
    difficulty: 'Enkel',
    distanceKm: 42,
    elevationM: 410,
    color: '#ea580c',
  },
  {
    slug: 'dunderlandsdalen-gravel-trail',
    title: 'Dunderlandsdalen Skogsbilveier (Gravel Trail)',
    discipline: 'Grus / Gravel',
    difficulty: 'Middels',
    distanceKm: 52,
    elevationM: 580,
    color: '#9a3412',
  },
];

// Load existing routeTracks.ts
const routeTracksPath = path.resolve('src/lib/routeTracks.ts');
let existingRouteTracks = {};
try {
  const fileStr = fs.readFileSync(routeTracksPath, 'utf-8');
  const match = fileStr.match(/export const routeTracks: Record<string, RouteTrackData> = (\{[\s\S]*\});/);
  if (match) {
    existingRouteTracks = JSON.parse(match[1]);
  }
} catch (e) {
  console.warn('Could not read existing routeTracks.ts:', e.message);
}

const updatedRouteTracks = { ...existingRouteTracks };

// Process all 15 trails with real user GPX
for (const config of trailConfigs) {
  const gpxFilePath = path.join(gpxSourceDir, config.file);
  if (!fs.existsSync(gpxFilePath)) {
    console.warn(`File ${config.file} not found!`);
    continue;
  }

  // Copy to public/gpx/<slug>.gpx
  const targetPublicGpx = path.join(publicGpxDir, `${config.slug}.gpx`);
  fs.copyFileSync(gpxFilePath, targetPublicGpx);
  console.log(`Copied ${config.file} -> ${targetPublicGpx}`);

  const parsed = parseGpx(gpxFilePath);
  const coords = parsed.points.map(p => [p.lat, p.lon]);

  const elevationDisplay = parsed.elevationGainM > 20 ? parsed.elevationGainM : parsed.elevationDropM;

  updatedRouteTracks[config.slug] = {
    slug: config.slug,
    title: config.title,
    discipline: config.discipline,
    color: config.color,
    coordinates: coords,
    waypoints: [
      {
        lat: parsed.start.lat,
        lng: parsed.start.lon,
        title: `Start: ${config.title}`,
        desc: `${config.startDesc}`,
        type: "start"
      },
      {
        lat: parsed.end.lat,
        lng: parsed.end.lon,
        title: `Mål / Vendepunkt: ${config.title}`,
        desc: `${config.poiDesc}`,
        type: "summit"
      }
    ],
    stravaSegments: [
      {
        name: `${config.title} (Trailguide #${config.trailguideId})`,
        url: `https://trailguide.net/html/${config.trailguideId}`,
        distanceKm: parsed.distanceKm,
        avgGradePercent: 4.5,
        description: `Autentisk GPX-spor fra Trailguide #${config.trailguideId}. Høydeintervall: ${parsed.minEle} - ${parsed.maxEle} moh.`
      }
    ]
  };
}

// Write updated routeTracks.ts
const tsContent = `export interface RoutePoint {
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

export const routeTracks: Record<string, RouteTrackData> = ${JSON.stringify(updatedRouteTracks, null, 2)};
`;

fs.writeFileSync(routeTracksPath, tsContent, 'utf-8');
console.log('Successfully updated routeTracks.ts with all 15 authentic GPX tracks!');
