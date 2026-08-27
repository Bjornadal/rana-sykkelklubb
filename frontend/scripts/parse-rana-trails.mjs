import fs from 'fs';

const html = fs.readFileSync('scripts/trailguide_rana.html', 'utf-8');

// Find all trail blocks in HTML
// Each block is inside <a class="m-5 cursor-pointer" href="/html/{id}"> ... </a>
const cardRegex = /<a class="m-5 cursor-pointer" href="\/html\/(\d+)">([\s\S]*?)<\/a>/gi;

const extractedTrails = [];
let cardMatch;

while ((cardMatch = cardRegex.exec(html)) !== null) {
  const id = cardMatch[1];
  const block = cardMatch[2];

  const titleMatch = block.match(/<h4[^>]*>([^<]+)<\/h4>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = block.match(/<div class="h-32[^"]*">([\s\S]*?)<\/div>/i);
  const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim() : '';

  // Check for length, elevation, difficulty, tags, images, etc.
  const infoMatches = [...block.matchAll(/<span[^>]*>([^<]+)<\/span>/gi)].map(m => m[1].trim());

  extractedTrails.push({
    id,
    title,
    desc,
    info: infoMatches,
    rawBlock: block
  });
}

console.log(`Extracted ${extractedTrails.length} full trails from Trailguide Rana:`);

for (const t of extractedTrails) {
  console.log(`\n---------------------------------------`);
  console.log(`ID: ${t.id} | Title: ${t.title}`);
  console.log(`Description: ${t.desc}`);
  console.log(`Info spans: ${t.info.join(' | ')}`);
}
