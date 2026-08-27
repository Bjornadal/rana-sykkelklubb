async function run() {
  const jsRes = await fetch('https://trailguide.net/assets/index.BsLA-WEc.js');
  const jsText = await jsRes.text();

  // Search for how trail data is fetched
  const fetchMatches = [...jsText.matchAll(/fetch\s*\(([^)]+)\)/g)].map(m => m[1]);
  console.log('fetch calls in JS:', fetchMatches.slice(0, 20));

  // Search for supabase or firebase or graphql or custom backend
  const backendMatches = jsText.match(/https?:\/\/[a-zA-Z0-9\.\-_]+(?:\.firebase|\.supabase|\.appspot|\.herokuapp|\.workers\.dev|\.azure|\.aws)[^\s"'`]*/gi);
  console.log('Cloud backends:', backendMatches);
}

run();
