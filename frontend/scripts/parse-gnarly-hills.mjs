import fs from 'fs';

const gpx = fs.readFileSync('../gpx/gnarly_hills.gpx', 'utf-8');
console.log('GPX file content (first 500 chars):');
console.log(gpx.slice(0, 500));

// Extract keywords
const kwMatch = gpx.match(/<keywords>([^<]+)<\/keywords>/i);
console.log('Keywords/Difficulty:', kwMatch ? kwMatch[1] : 'none');

// Parse points
const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*(?:<ele>([^<]+)<\/ele>)?/g;
const points = [];
let match;
while ((match = ptRegex.exec(gpx)) !== null) {
  points.push({
    lat: parseFloat(match[1]),
    lon: parseFloat(match[2]),
    ele: match[3] ? parseFloat(match[3]) : 0
  });
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

console.log(`Point count: ${points.length}`);
console.log(`Total Distance: ${totalDist.toFixed(2)} km`);
console.log(`Elevation Gain: ${Math.round(totalGain)} m, Elevation Drop: ${Math.round(totalDrop)} m`);
console.log(`Min Ele: ${minEle} m, Max Ele: ${maxEle} m`);
console.log('Start point:', points[0]);
console.log('End point:', points[points.length - 1]);
