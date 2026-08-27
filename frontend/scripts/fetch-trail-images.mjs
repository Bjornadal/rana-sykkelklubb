import https from 'https';
import fs from 'fs';
import path from 'path';

const trailIds = {
  'idavollen': '264',
  'almlia': '5832',
  'moan': '5828',
  'yttraskaret-flyt': '7985',
  'yttrafjellet-deluxe': '8122',
  'isbilen': '11149',
  'ytternmarka-roundtrip': '7979',
  'selforsfjellet-tjuvtrappa': '7916',
  'hauknestinden': '8609',
  'reinfjellet': '5820',
  'rausandhaugen': '5819',
  'lappfjelltjonna': '5863',
  'kubben': '5818',
  'hellerfjellet': '5864',
  'tindan': '9510',
  'gnarly-hills': '10067'
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function checkAll() {
  const images = {};
  for (const [slug, id] of Object.entries(trailIds)) {
    try {
      console.log(`Fetching Trailguide #${id} for ${slug}...`);
      const html = await fetchUrl(`https://trailguide.net/html/${id}`);
      
      // Look for trailguide image URLs
      const imgRegex = /https:\/\/trailguide\.net\/images\/([a-f0-9]+)\.jpg/gi;
      const matches = [];
      let m;
      while ((m = imgRegex.exec(html)) !== null) {
        matches.push(m[0]);
      }

      // Also look for cloudinary fetch urls
      const cloudRegex = /https:\/\/res\.cloudinary\.com\/trailguide-as\/image\/fetch\/[^\s"'>]+\/(https:\/\/trailguide\.net\/images\/[a-f0-9]+\.jpg)/gi;
      while ((m = cloudRegex.exec(html)) !== null) {
        matches.push(m[1]);
      }

      const unique = [...new Set(matches)];
      images[slug] = {
        id,
        count: unique.length,
        images: unique
      };
      console.log(`-> Found ${unique.length} image(s) for ${slug}:`, unique);
    } catch (e) {
      console.error(`Error fetching #${id}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/trailguide_images.json', JSON.stringify(images, null, 2), 'utf-8');
  console.log('\nWrote results to scripts/trailguide_images.json');
}

checkAll();
