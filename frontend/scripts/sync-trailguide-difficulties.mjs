import fs from 'fs';
import path from 'path';

const trailguideDifficulties = {
  'almlia': 'Enkel',                  // Trailguide: green
  'moan': 'Enkel',                    // Trailguide: green
  'ytternmarka-roundtrip': 'Enkel',   // Trailguide: green
  'selforsfjellet-tjuvtrappa': 'Enkel', // Trailguide: green
  'idavollen': 'Middels',             // Trailguide: blue
  'yttraskaret-flyt': 'Middels',      // Trailguide: blue
  'lappfjelltjonna': 'Middels',       // Trailguide: blue
  'hauknestinden': 'Krevende',        // Trailguide / User: red / Krevende
  'yttrafjellet-deluxe': 'Krevende',  // Trailguide: red
  'isbilen': 'Krevende',              // Trailguide: red
  'rausandhaugen': 'Krevende',        // Trailguide: red
  'kubben': 'Krevende',               // Trailguide: red
  'reinfjellet': 'Krevende',          // Trailguide: red
  'hellerfjellet': 'Krevende',        // Trailguide: red
  'tindan': 'Krevende',               // Trailguide: red
};

const ruterDir = path.resolve('src/content/ruter');

for (const [slug, difficulty] of Object.entries(trailguideDifficulties)) {
  const filePath = path.join(ruterDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/difficulty:\s*"[^"]+"/g, `difficulty: "${difficulty}"`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${slug}.md -> difficulty: "${difficulty}"`);
}
