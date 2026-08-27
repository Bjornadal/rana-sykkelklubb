async function run() {
  const url = 'https://trailguide.net/html/264';
  const res = await fetch(url);
  const html = await res.text();
  console.log('Top half of Idavollen HTML:');
  console.log(html.slice(0, 3000));
}

run();
