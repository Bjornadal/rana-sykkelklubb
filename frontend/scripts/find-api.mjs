async function run() {
  const jsRes = await fetch('https://trailguide.net/assets/index.BsLA-WEc.js');
  const jsText = await jsRes.text();

  // Find all occurrences of kvande.com or API calls
  const matches = [...jsText.matchAll(/https?:\/\/kvande\.com[^\s"'`)]*/gi)].map(m => m[0]);
  console.log('kvande.com matches:', [...new Set(matches)]);

  // Look for fetch or axios or API path definitions
  const paths = [...jsText.matchAll(/["'](\/(?:api|trail|track|search|region)[^"']*)["']/gi)].map(m => m[1]);
  console.log('API paths:', [...new Set(paths)]);
}

run();
