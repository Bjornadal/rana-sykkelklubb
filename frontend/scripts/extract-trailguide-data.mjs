import fs from 'fs';

const html = fs.readFileSync('scripts/trailguide_rana.html', 'utf-8');

// Regex to find trail cards with ID, title, and excerpt
const regex = /<a class="[^"]*cursor-pointer"[^>]*href="\/html\/(\d+)"[^>]*>[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?<div class="h-32[^"]*">([\s\S]*?)<\/div>/gi;

const trails = [];
let match;
while ((match = regex.exec(html)) !== null) {
  trails.push({
    id: match[1],
    title: match[2].trim(),
    desc: match[3].replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim()
  });
}

console.log(`Found ${trails.length} trails in Rana on Trailguide:`);
console.log(JSON.stringify(trails, null, 2));

// Test fetching one trail detail page to see where coordinates/GPX are stored
async function testDetail(id) {
  const url = `https://trailguide.net/html/${id}`;
  const res = await fetch(url);
  const text = await res.text();
  console.log(`\nDetail for ID ${id} (${url}): length = ${text.length}`);
  
  // Check for GPX / geojson / coordinates / map
  const gpxMatch = text.match(/href="([^"]*\.gpx)"/i);
  console.log('GPX link:', gpxMatch ? gpxMatch[1] : 'none');

  // Check for script or data tags
  const latLngMatch = text.match(/(\d{2}\.\d{4,}),\s*(\d{2}\.\d{4,})/g);
  console.log('Lat/lng occurrences found:', latLngMatch ? latLngMatch.slice(0, 10) : 'none');

  // Check for json in scripts
  const jsonMatches = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const jm of jsonMatches) {
    if (jm[1].includes('coordinates') || jm[1].includes('lat') || jm[1].includes('polyline') || jm[1].includes('geojson')) {
      console.log('Found script with spatial data! Length:', jm[1].length);
      console.log('Sample:', jm[1].slice(0, 500));
    }
  }
}

testDetail(trails[0].id);
