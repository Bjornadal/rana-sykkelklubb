import fs from 'fs';
import path from 'path';

const gpxDir = path.resolve('../gpx');
const files = fs.readdirSync(gpxDir).filter(f => f.endsWith('.gpx'));

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

const summary = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(gpxDir, file), 'utf-8');
  
  // Extract name
  const nameMatch = content.match(/<name>([^<]+)<\/name>/i);
  const name = nameMatch ? decodeURIComponent(nameMatch[1]) : file;

  // Extract author
  const authorMatch = content.match(/<author><name>([^<]+)<\/name><\/author>/i);
  const author = authorMatch ? authorMatch[1] : '';

  // Extract points
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
  let minEle = points.length > 0 ? points[0].ele : 0;
  let maxEle = points.length > 0 ? points[0].ele : 0;

  for (let i = 1; i < points.length; i++) {
    totalDist += haversine(points[i - 1], points[i]);
    const diff = points[i].ele - points[i - 1].ele;
    if (diff > 0) totalGain += diff;
    if (points[i].ele < minEle) minEle = points[i].ele;
    if (points[i].ele > maxEle) maxEle = points[i].ele;
  }

  summary.push({
    file,
    name,
    author,
    pointCount: points.length,
    distanceKm: parseFloat(totalDist.toFixed(2)),
    elevationGainM: Math.round(totalGain),
    minEle: Math.round(minEle),
    maxEle: Math.round(maxEle),
    start: points[0],
    end: points[points.length - 1]
  });
}

console.log(JSON.stringify(summary, null, 2));
