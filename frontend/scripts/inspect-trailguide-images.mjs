import fs from 'fs';

const html = fs.readFileSync('scripts/trailguide_rana.html', 'utf-8');

// Search for image URLs in the downloaded HTML
const imgMatches = html.match(/https?:\/\/[^\s"'>]+\.(?:jpg|jpeg|png|webp)/gi);
console.log('Image URLs found in trailguide_rana.html:', imgMatches ? imgMatches.length : 0);
if (imgMatches) {
  const unique = [...new Set(imgMatches)];
  console.log('Unique image URLs (first 20):', unique.slice(0, 20));
}

// Search for any photo, image, or cloudflare / s3 storage paths
const s3Matches = html.match(/(?:https?:\/\/|src=["'])[^"'\s>]*(?:trailguide|s3|photo|image|cdn|cloudinary|img)[^"'\s>]*\.(?:jpg|jpeg|png|webp)/gi);
console.log('S3 / CDN image matches:', s3Matches ? [...new Set(s3Matches)].slice(0, 20) : 'none');
