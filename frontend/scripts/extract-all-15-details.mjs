const trailMapping = [
  { slug: 'idavollen', id: '264' },
  { slug: 'almlia', id: '5832' },
  { slug: 'moan', id: '5828' },
  { slug: 'yttraskaret-flyt', id: '7985' },
  { slug: 'yttrafjellet-deluxe', id: '8122' },
  { slug: 'isbilen', id: '11149' },
  { slug: 'ytternmarka-roundtrip', id: '7979' },
  { slug: 'selforsfjellet-tjuvtrappa', id: '7916' },
  { slug: 'hauknestinden', id: '8609' },
  { slug: 'reinfjellet', id: '5820' },
  { slug: 'rausandhaugen', id: '5819' },
  { slug: 'lappfjelltjonna', id: '5863' },
  { slug: 'kubben', id: '5818' },
  { slug: 'hellerfjellet', id: '5864' },
  { slug: 'tindan', id: '9510' }
];

async function run() {
  for (const t of trailMapping) {
    const url = `https://trailguide.net/html/${t.id}`;
    const res = await fetch(url);
    const html = await res.text();
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim();
    const len = (html.match(/(\d+(?:\.\d+)?)\s*km/i) || [])[1];
    
    // Find all text inside description paragraphs
    const paragraphs = [...html.matchAll(/<p[^>]*class="[^"]*leading-relaxed[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(p => p.length > 0);

    console.log(`\n========================================`);
    console.log(`Slug: ${t.slug} | ID: ${t.id} | H1: ${h1} | Length: ${len} km`);
    console.log(`Paragraphs:`, paragraphs.join('\n\n'));
  }
}

run();
