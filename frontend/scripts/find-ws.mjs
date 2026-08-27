async function run() {
  const jsRes = await fetch('https://trailguide.net/assets/index.BsLA-WEc.js');
  const jsText = await jsRes.text();

  const wsMatches = jsText.match(/wss?:\/\/[^\s"'`)]*/gi);
  console.log('WS Matches:', wsMatches);

  // Find occurrences of WebSocket or socket or sid
  const wsOccurrences = [...jsText.matchAll(/new WebSocket\(([^)]+)\)/g)].map(m => m[1]);
  console.log('WebSocket calls:', wsOccurrences);

  const serverMsgOccurrences = [...jsText.matchAll(/servermessage[^\n\r"']*/g)].map(m => m[0]);
  console.log('servermessage occurrences:', serverMsgOccurrences);
}

run();
