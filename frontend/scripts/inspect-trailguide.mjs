import fs from 'fs';

async function run() {
  const url = 'https://trailguide.net/html/Norway/Nordland/Rana';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  });

  const html = await res.text();
  fs.writeFileSync('scripts/trailguide_rana.html', html, 'utf-8');
  console.log('Saved trailguide_rana.html of length:', html.length);

  // Search for the 15 trails inside the HTML
  const trailsToFind = [
    'idavollen', 'almlia', 'moan', 'yttraskaret', 'yttrafjellet', 'isbilen',
    'ytternmarka', 'selforsfjellet', 'tjuvtrappa', 'hauknestinden', 'reinfjellet',
    'rausandhaugen', 'lappfjelltj', 'kubben', 'hellerfjellet', 'tindan'
  ];

  for (const t of trailsToFind) {
    const idx = html.toLowerCase().indexOf(t);
    console.log(`Searching for "${t}": index = ${idx}`);
    if (idx !== -1) {
      console.log(`Snippet around ${t}:`, html.slice(Math.max(0, idx - 100), idx + 300).replace(/\s+/g, ' '));
    }
  }
}

run();
