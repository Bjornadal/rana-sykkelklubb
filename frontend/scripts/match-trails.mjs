import fs from 'fs';

const html = fs.readFileSync('scripts/trailguide_rana.html', 'utf-8');

const regex = /<a class="m-5 cursor-pointer" href="\/html\/(\d+)">([\s\S]*?)<\/a>/gi;
const all = [];
let match;
while ((match = regex.exec(html)) !== null) {
  const id = match[1];
  const block = match[2];
  const title = (block.match(/<h4[^>]*>([^<]+)<\/h4>/i) || [])[1]?.trim() || '';
  const desc = (block.match(/<div class="h-32[^"]*">([\s\S]*?)<\/div>/i) || [])[1]?.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim() || '';
  all.push({ id, title, desc });
}

const targetNames = [
  'idavollen', 'almlia', 'moan', 'yttraskaret flyt', 'yttrafjellet deluxe',
  'isbilen', 'ytternmarka roundtrip', 'selforsfjellet', 'tjuvtrappa', 'hauknestinden',
  'reinfjellet', 'rausandhaugen', 'lappfjelltjønna', 'kubben', 'hellerfjellet', 'tindan'
];

console.log('--- Matches from Trailguide Rana database ---');
for (const target of targetNames) {
  const matches = all.filter(t => t.title.toLowerCase().includes(target) || target.includes(t.title.toLowerCase()));
  console.log(`\nTarget: "${target}" (${matches.length} matches):`);
  for (const m of matches) {
    console.log(`  -> ID: ${m.id} | Title: "${m.title}"`);
    console.log(`     Desc: "${m.desc}"`);
  }
}
