import fs from 'fs';
import path from 'path';

const ruterDir = path.resolve('src/content/ruter');
const files = fs.readdirSync(ruterDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(ruterDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove the line with "Autentisk GPS-spor fra lokale stisyklister"
  content = content.replace(/\s*-\s*"Autentisk GPS-spor fra lokale stisyklister"\r?\n?/g, '\n');
  content = content.replace(/\s*-\s*'Autentisk GPS-spor fra lokale stisyklister'\r?\n?/g, '\n');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Cleaned ${file}`);
}
