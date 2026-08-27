import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('scripts/trailguide_rana.html', 'utf-8');

// Match <a class="m-5 cursor-pointer" href="/html/(\d+)"> ... <img src="([^"]+)" ... <h4>([^<]+)</h4>
const cardRegex = /<a class="m-5 cursor-pointer" href="\/html\/(\d+)">([\s\S]*?)<\/a>/gi;
const results = [];

let match;
while ((match = cardRegex.exec(html)) !== null) {
  const id = match[1];
  const block = match[2];
  
  const titleMatch = block.match(/<h4[^>]*>([^<]+)<\/h4>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const imgMatch = block.match(/src="([^"]*images\/[^"]+\.jpg)"/i) || block.match(/src="([^"]+)"/i);
  const imgUrl = imgMatch ? imgMatch[1] : null;

  results.push({ id, title, imgUrl });
}

console.log('Found trail cards in HTML:', results.length);
for (const r of results) {
  if (r.imgUrl && !r.imgUrl.includes('flags') && !r.imgUrl.includes('portrait')) {
    console.log(`Trail #${r.id} ("${r.title}") -> Image: ${r.imgUrl}`);
  }
}
