import fs from 'fs';
import path from 'path';

const ruterDir = path.resolve('src/content/ruter');
const publicGpxDir = path.resolve('public/gpx');

// Load routeTracks.ts
const routeTracksContent = fs.readFileSync('src/lib/routeTracks.ts', 'utf-8');
const jsonMatch = routeTracksContent.match(/export const routeTracks: Record<string, RouteTrackData> = (\{[\s\S]*\});/);
const routeTracks = jsonMatch ? JSON.parse(jsonMatch[1]) : {};

// Load elevationProfiles.ts
const elevationContent = fs.readFileSync('src/lib/elevationProfiles.ts', 'utf-8');
const eleJsonMatch = elevationContent.match(/export const elevationProfiles: Record<string, ElevationProfileData> = (\{[\s\S]*\});/);
const elevationProfiles = eleJsonMatch ? JSON.parse(eleJsonMatch[1]) : {};

const mdFiles = fs.readdirSync(ruterDir).filter(f => f.endsWith('.md'));
console.log(`Found ${mdFiles.length} markdown route files in src/content/ruter/`);

let errorCount = 0;
let warningCount = 0;

for (const file of mdFiles) {
  const slug = file.replace('.md', '');
  const content = fs.readFileSync(path.join(ruterDir, file), 'utf-8');

  // Check discipline
  const discMatch = content.match(/discipline:\s*"([^"]+)"/);
  const discipline = discMatch ? discMatch[1] : 'unknown';

  // Check difficulty
  const diffMatch = content.match(/difficulty:\s*"([^"]+)"/);
  const difficulty = diffMatch ? diffMatch[1] : 'unknown';

  // Check gpxFile
  const gpxMatch = content.match(/gpxFile:\s*"([^"]+)"/);
  const gpxFile = gpxMatch ? gpxMatch[1] : null;

  if (gpxFile) {
    const gpxLocalPath = path.join('public', gpxFile);
    if (!fs.existsSync(gpxLocalPath)) {
      console.error(`[ERROR] ${slug}: GPX file ${gpxLocalPath} does not exist!`);
      errorCount++;
    }
  } else {
    console.warn(`[WARN] ${slug}: No gpxFile in frontmatter!`);
    warningCount++;
  }

  // Check image
  const imgMatch = content.match(/image:\s*"([^"]+)"/);
  if (imgMatch) {
    const imgLocalPath = path.join('public', imgMatch[1]);
    if (!fs.existsSync(imgLocalPath)) {
      console.error(`[ERROR] ${slug}: Image file ${imgLocalPath} does not exist!`);
      errorCount++;
    }
  }

  // Check Trailguide URL
  const tgMatch = content.match(/trailguideUrl:\s*"([^"]+)"/);
  if (discipline === 'Terreng / Sti' && !tgMatch) {
    console.warn(`[WARN] ${slug}: No trailguideUrl found for trail!`);
    warningCount++;
  }

  // Check Strava URL
  const stravaMatch = content.match(/stravaUrl:\s*"([^"]+)"/);
  if (stravaMatch && stravaMatch[1].includes('trailguide.net')) {
    console.error(`[ERROR] ${slug}: stravaUrl points to trailguide.net!`);
    errorCount++;
  }

  // Check routeTracks.ts
  const track = routeTracks[slug];
  if (!track) {
    console.error(`[ERROR] ${slug}: Missing entry in routeTracks.ts!`);
    errorCount++;
  } else if (!track.coordinates || track.coordinates.length === 0) {
    console.error(`[ERROR] ${slug}: Zero coordinates in routeTracks.ts!`);
    errorCount++;
  }

  // Check elevationProfiles.ts
  const eleProf = elevationProfiles[slug];
  if (!eleProf) {
    console.warn(`[WARN] ${slug}: Missing elevation profile in elevationProfiles.ts!`);
    warningCount++;
  }

  console.log(`✓ ${slug.padEnd(28)} [${discipline.padEnd(14)} | ${difficulty.padEnd(8)}] -> GPX: ${gpxFile ? 'OK' : 'None'}, Track points: ${track ? track.coordinates.length : 0}, Ele points: ${eleProf ? eleProf.sampledPoints.length : 0}`);
}

console.log(`\n========================================`);
console.log(`Audit complete: ${errorCount} errors, ${warningCount} warnings.`);
console.log(`========================================`);
