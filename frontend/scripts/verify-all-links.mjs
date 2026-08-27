import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} generated HTML files in dist/`);

let brokenLinks = 0;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf-8');
  const relPath = path.relative(distDir, htmlFile);

  // Extract internal hrefs starting with /
  const hrefRegex = /href="(\/[^"#?]+)(?:[#?][^"]*)?"/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const targetUrl = match[1];
    
    // Ignore static assets or check their existence
    if (targetUrl.startsWith('/_astro/') || targetUrl.startsWith('/images/') || targetUrl.startsWith('/gpx/') || targetUrl.startsWith('/favicon.')) {
      const assetPath = path.join(distDir, targetUrl);
      if (!fs.existsSync(assetPath)) {
        console.error(`[BROKEN ASSET] in ${relPath}: ${targetUrl} not found!`);
        brokenLinks++;
      }
      continue;
    }

    // Check page HTML
    let possibleTarget = path.join(distDir, targetUrl, 'index.html');
    if (!fs.existsSync(possibleTarget)) {
      possibleTarget = path.join(distDir, targetUrl + '.html');
      if (!fs.existsSync(possibleTarget)) {
        if (targetUrl === '/') {
          // root index.html
          if (!fs.existsSync(path.join(distDir, 'index.html'))) {
            console.error(`[BROKEN LINK] in ${relPath}: ${targetUrl}`);
            brokenLinks++;
          }
        } else {
          console.error(`[BROKEN LINK] in ${relPath}: ${targetUrl}`);
          brokenLinks++;
        }
      }
    }
  }
}

console.log(`\nLink verification complete: ${brokenLinks} broken links found.`);
