async function run() {
  const url = 'https://trailguide.net/html/264';
  const res = await fetch(url);
  const html = await res.text();
  console.log('HTML for Idavollen (264):');
  console.log(html);
}

run();
