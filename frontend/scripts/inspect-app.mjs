async function run() {
  const res = await fetch('https://trailguide.net/');
  const html = await res.text();
  const scripts = [];
  const regex = /src="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  console.log('Scripts:', scripts);

  for (const s of scripts) {
    if (s.endsWith('.js')) {
      const jsUrl = s.startsWith('http') ? s : `https://trailguide.net${s.startsWith('/') ? '' : '/'}${s}`;
      const jsRes = await fetch(jsUrl);
      const jsText = await jsRes.text();
      console.log(`\nJS: ${jsUrl} (len: ${jsText.length})`);
      // Search for API urls in JS
      const apiMatches = jsText.match(/https?:\/\/[a-zA-Z0-9\.\-_]+\/(?:api|data|graphql|tracks|v\d|geo)[^\s"'`)]*/gi);
      if (apiMatches) {
        console.log('API URLs found in JS:', [...new Set(apiMatches)].slice(0, 30));
      }
    }
  }
}

run();
