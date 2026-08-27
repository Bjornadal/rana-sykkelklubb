async function run() {
  const url = 'https://trailguide.net/html/Norway/Nordland/Rana';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Cookie': 'fbssls_760316783990741={"authResponse":{"userID":"10154338591016930","expiresIn":5090,"accessToken":"EAAKzgQvTl9UBSdqcDWZAZB2XQ7JCkU25B6UeKST6ZBwGqXStpxyhOkiVs8wPls7ZC5Snvv6oTblhcrrEUXlfYr1XMD5UlcSPJZCCyvZCNslr6z9BZBfqnoYObR63bF3uZAgOyqplYmQznP1AUm2tRBkZBgVG50TiwGx0k1cu1numvpnZBAYBgpcxhZAnOg0suXwkfn154BVdJkLuXV43PyrFImyZCLjwZCZB26CGJYa28qCzNmKDwJobicCWmbKDBLXi3HZCZBMusHo0x9L1KRjHJJI32g5ZAJQZDZD"},"status":"connected"}'
    }
  });

  const html = await res.text();
  console.log('Status:', res.status, 'HTML length:', html.length);

  // Find all links to trails
  const links = [];
  const regex = /<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    links.push({ href, text });
  }

  console.log('Found links:', links.length);
  const trailLinks = links.filter(l => l.href.includes('/html/') || l.href.includes('trail') || /^\d+$/.test(l.href) || !l.href.startsWith('#'));
  console.log(JSON.stringify(trailLinks, null, 2));
}

run();
