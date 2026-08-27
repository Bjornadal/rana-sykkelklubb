import fs from 'fs';

const gpx = fs.readFileSync('../gpx/ytternmarka_roundtrip.gpx', 'utf-8');

// Parse trkpt
const ptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)">\s*<ele>([^<]+)<\/ele>\s*<\/trkpt>/g;
const points = [];
let match;
while ((match = ptRegex.exec(gpx)) !== null) {
  points.push({
    lat: parseFloat(match[1]),
    lon: parseFloat(match[2]),
    ele: parseFloat(match[3])
  });
}

console.log(`Parsed ${points.length} track points from ytternmarka_roundtrip.gpx`);
console.log('Start point:', points[0]);
console.log('End point:', points[points.length - 1]);

// Calculate distance
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
let minEle = points[0].ele;
let maxEle = points[0].ele;

for (let i = 1; i < points.length; i++) {
  totalDist += haversine(points[i - 1], points[i]);
  const diff = points[i].ele - points[i - 1].ele;
  if (diff > 0) totalGain += diff;
  if (points[i].ele < minEle) minEle = points[i].ele;
  if (points[i].ele > maxEle) maxEle = points[i].ele;
}

console.log(`Total Distance: ${totalDist.toFixed(2)} km`);
console.log(`Total Elevation Gain: ${Math.round(totalGain)} m`);
console.log(`Min Elevation: ${minEle} m, Max Elevation: ${maxEle} m`);

// Copy file directly to frontend/public/gpx/ytternmarka-roundtrip.gpx
fs.copyFileSync('../gpx/ytternmarka_roundtrip.gpx', 'public/gpx/ytternmarka-roundtrip.gpx');
console.log('Copied to public/gpx/ytternmarka-roundtrip.gpx');
