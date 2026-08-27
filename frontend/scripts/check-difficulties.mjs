import fs from 'fs';
import path from 'path';

const gpxDir = path.resolve('../gpx');
const files = fs.readdirSync(gpxDir).filter(f => f.endsWith('.gpx'));

console.log('=== Difficulty in GPX files (<keywords>) ===');
const gpxDifficulties = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(gpxDir, file), 'utf-8');
  const kwMatch = content.match(/<keywords>([^<]+)<\/keywords>/i);
  const nameMatch = content.match(/<name>([^<]+)<\/name>/i);
  const name = nameMatch ? decodeURIComponent(nameMatch[1]) : file;
  const kw = kwMatch ? kwMatch[1] : 'none';
  console.log(`${file} (${name}): ${kw}`);
  gpxDifficulties[file] = kw;
}

console.log('\n=== Difficulty in Trailguide Rana HTML ===');
const html = fs.readFileSync('scripts/trailguide_rana.html', 'utf-8');

// Check trail card colors/ratings in HTML
// Look for card html and find difficulty badges or icons
const cardRegex = /<a class="m-5 cursor-pointer" href="\/html\/(\d+)">([\s\S]*?)<\/a>/gi;
let cardMatch;
while ((cardMatch = cardRegex.exec(html)) !== null) {
  const id = cardMatch[1];
  const block = cardMatch[2];
  const title = (block.match(/<h4[^>]*>([^<]+)<\/h4>/i) || [])[1]?.trim() || '';
  
  // Find color or difficulty indicators (green, blue, red, black, easy, medium, hard, etc.)
  const colorMatches = block.match(/(?:bg-|text-|border-|fill-)(green|blue|red|black|yellow|emerald|rose|orange|gray)[^\s"'>]*/gi);
  const difficultyMatch = block.match(/data-difficulty="([^"]+)"/i) || block.match(/(green|blue|red|black|expert|easy|moderate|difficult)/i);

  // Print for target trails
  const targets = ['idavollen', 'almlia', 'moan', 'yttraskaret', 'yttrafjellet', 'isbilen', 'ytternmarka', 'selforsfjellet', 'tjuvtrappa', 'hauknestinden', 'reinfjellet', 'rausandhaugen', 'lappfjelltj', 'kubben', 'hellerfjellet', 'tindan'];
  if (targets.some(t => title.toLowerCase().includes(t))) {
    console.log(`ID ${id} | Title: "${title}" | Colors in HTML:`, colorMatches ? [...new Set(colorMatches)].join(', ') : 'none');
  }
}
