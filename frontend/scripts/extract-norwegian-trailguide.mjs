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
  const results = [];
  for (const t of trailMapping) {
    const url = `https://trailguide.net/html/no/${t.id}`;
    const res = await fetch(url);
    const html = await res.text();
    
    // Title
    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    // Description text
    const descMatch = html.match(/<div class="h-32[^"]*">([\s\S]*?)<\/div>/i) || html.match(/<p class="leading-relaxed[^"]*">([\s\S]*?)<\/p>/i);
    
    // Find all text inside the article
    const textMatches = [...html.matchAll(/<div class="[^"]*text-gray-700[^"]*">([\s\S]*?)<\/div>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 20);

    const lengthMatch = html.match(/(\d+(?:\.\d+)?)\s*km/i);
    const lengthKm = lengthMatch ? parseFloat(lengthMatch[1]) : null;

    // Location breadcrumb
    const breadcrumbMatch = html.match(/Rana\s*<!-- -->\s*\/\s*<!-- -->([^<]+)/i) || html.match(/Rana\s*\/\s*([^<]+)/i);
    const location = breadcrumbMatch ? breadcrumbMatch[1].trim() : '';

    results.push({
      slug: t.slug,
      id: t.id,
      url: `https://trailguide.net/html/${t.id}`,
      title,
      lengthKm,
      location,
      texts: textMatches
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

run();
