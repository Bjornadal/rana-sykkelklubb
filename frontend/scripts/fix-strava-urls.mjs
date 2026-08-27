import fs from 'fs';
import path from 'path';

const ruterDir = path.resolve('src/content/ruter');
const files = fs.readdirSync(ruterDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(ruterDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // If stravaUrl contains trailguide.net, remove it or set to null
  if (content.includes('stravaUrl: "https://trailguide.net') || content.includes("stravaUrl: 'https://trailguide.net")) {
    content = content.replace(/stravaUrl:\s*["']https:\/\/trailguide\.net[^\r\n]*["']\r?\n?/g, '');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Cleaned stravaUrl from ${file}`);
  }
}
