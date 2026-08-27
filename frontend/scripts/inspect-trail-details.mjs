async function run() {
  const ids = ['5819', '5828', '5832', '5833', '5840', '5863', '7916', '7985', '8122', '11149'];

  for (const id of ids) {
    const url = `https://trailguide.net/html/${id}`;
    const res = await fetch(url);
    const html = await res.text();
    console.log(`\n=== ID ${id} (${url}) ===`);

    // Find title, difficulty, length, elevation, start point
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    console.log('H1:', h1 ? h1[1].replace(/<[^>]+>/g, '').trim() : 'none');

    // Find description paragraphs
    const desc = html.match(/<p class="[^"]*leading-relaxed[^"]*">([\s\S]*?)<\/p>/gi);
    if (desc) {
      console.log('Descriptions:', desc.map(d => d.replace(/<[^>]+>/g, '').trim()));
    }

    // Find all spans / meta tags with numbers (km, hm, etc.)
    const meta = [...html.matchAll(/<(?:span|div|p)[^>]*class="[^"]*(?:font-bold|text-|meta)[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div|p)>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 0 && t.length < 100);
    console.log('Meta spans:', meta.slice(0, 15));

    // Check for map coordinates or geo data in the page
    const geoRegex = /\[\s*([0-9\.]+)\s*,\s*([0-9\.]+)\s*\]/g;
    const geoMatches = [...html.matchAll(geoRegex)].map(m => `[${m[1]}, ${m[2]}]`);
    if (geoMatches.length > 0) {
      console.log('Geo matches in HTML:', geoMatches.slice(0, 10));
    }
  }
}

run();
