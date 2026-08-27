async function run() {
  const token = "EAAKzgQvTl9UBSdqcDWZAZB2XQ7JCkU25B6UeKST6ZBwGqXStpxyhOkiVs8wPls7ZC5Snvv6oTblhcrrEUXlfYr1XMD5UlcSPJZCCyvZCNslr6z9BZBfqnoYObR63bF3uZAgOyqplYmQznP1AUm2tRBkZBgVG50TiwGx0k1cu1numvpnZBAYBgpcxhZAnOg0suXwkfn154BVdJkLuXV43PyrFImyZCLjwZCZB26CGJYa28qCzNmKDwJobicCWmbKDBLXi3HZCZBMusHo0x9L1KRjHJJI32g5ZAJQZDZD";

  // Let's test different Trailguide API endpoints
  const endpoints = [
    'https://trailguide.net/api/trails/5819',
    'https://trailguide.net/api/v1/trails/5819',
    'https://trailguide.net/api/trail/5819',
    'https://trailguide.net/api/trail/5819.gpx',
    'https://trailguide.net/trail/5819.gpx',
    'https://trailguide.net/html/5819.gpx',
    'https://trailguide.net/api/search?q=Mo%20i%20Rana',
    'https://trailguide.net/api/region/Rana',
    'https://trailguide.no/api/trails/5819',
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      });
      console.log(`Endpoint ${ep} -> Status ${res.status}`);
      if (res.ok) {
        const data = await res.text();
        console.log(`Data (first 200 chars):`, data.slice(0, 200));
      }
    } catch (e) {
      console.log(`Endpoint ${ep} -> Error:`, e.message);
    }
  }
}

run();
