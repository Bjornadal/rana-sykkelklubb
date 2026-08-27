import https from 'https';
import fs from 'fs';
import path from 'path';

const imagesDir = path.resolve('public/images/ruter');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
    }).on('error', reject);
  });
}

const trailImages = JSON.parse(fs.readFileSync('scripts/trailguide_images.json', 'utf-8'));

async function processAll() {
  const ruterDir = path.resolve('src/content/ruter');

  for (const [slug, data] of Object.entries(trailImages)) {
    if (!data.images || data.images.length === 0) continue;

    console.log(`Processing ${slug} (${data.images.length} images)...`);
    const localImagePaths = [];

    for (let i = 0; i < data.images.length; i++) {
      const imgUrl = data.images[i];
      const filename = `${slug}-${i + 1}.jpg`;
      const dest = path.join(imagesDir, filename);

      try {
        await downloadImage(imgUrl, dest);
        localImagePaths.push(`/images/ruter/${filename}`);
        console.log(`-> Saved ${dest}`);
      } catch (e) {
        console.error(`Could not download ${imgUrl}:`, e.message);
      }
    }

    if (localImagePaths.length > 0) {
      const primaryImage = localImagePaths[0];
      const mdFile = path.join(ruterDir, `${slug}.md`);

      if (fs.existsSync(mdFile)) {
        let content = fs.readFileSync(mdFile, 'utf-8');

        // Update frontmatter image
        if (content.includes('image:')) {
          content = content.replace(/image:\s*.*(\r?\n)/, `image: "${primaryImage}"$1`);
        } else {
          content = content.replace(/---\r?\n/, `---\nimage: "${primaryImage}"\n`);
        }

        // If multiple images, add a photo gallery section at the end of the markdown if not already present
        if (localImagePaths.length > 1 && !content.includes('### 📷 Bilder fra stien')) {
          let galleryMd = `\n\n### 📷 Bilder fra stien (Trailguide)\n\n<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">\n`;
          for (let j = 0; j < localImagePaths.length; j++) {
            galleryMd += `  <div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm group">\n    <img src="${localImagePaths[j]}" alt="${slug} bilde ${j + 1}" class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />\n  </div>\n`;
          }
          galleryMd += `</div>\n`;
          content += galleryMd;
        }

        fs.writeFileSync(mdFile, content, 'utf-8');
        console.log(`-> Updated ${slug}.md with image(s)!`);
      }
    }
  }
}

processAll();
