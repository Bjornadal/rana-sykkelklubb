import fs from 'fs';
import path from 'path';

const markdownConfigs = [
  {
    slug: 'idavollen',
    title: 'Idavollen',
    excerpt: 'Sykle opp markert sti ved de gamle husene på høyresida på Stenneset. Fantastisk flyt på barnålsbunn i furuskogen!',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 2.1,
    elevationM: 338,
    estimatedTime: '45 – 90 min',
    surface: 'Barnålsbunn, svaberg og tørr skogssti',
    startingPoint: 'Stenneset / Båsmoen',
    trailguideId: '264',
    featured: true,
    order: 1,
    quote: 'Sykle opp markert sti ved de gamle husene på høyresida på Stenneset. Følg videre over en grusvei og følg etterhvert skilting mot Idavollen. Vel oppe på Idavollen venter fantastisk flyt på barnålsbunn!',
    body: '**Idavollen** er fremhevet på Trailguide som en av stiene med aller best naturlig flyt i hele Rana. Stien slynger seg gjennom furuskogen med god fart, doserte svinger og lite tekniske stopp.'
  },
  {
    slug: 'almlia',
    title: 'Almlia',
    excerpt: 'A speed trail that is mostly an old fire road. Rask fartsløype fra Almlia (362 moh) ned mot Skillevollen (38 moh).',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 2.4,
    elevationM: 324,
    estimatedTime: '30 – 60 min',
    surface: 'Gammel skogsvei / brannvei og singletrack',
    startingPoint: 'Almlia (362 moh)',
    trailguideId: '5832',
    featured: false,
    order: 2,
    quote: 'A speed trail that is mostly an old fire road.',
    body: '**Almlia** er en 2,4 km lang dedikert fartsløype som i hovedsak følger en gammel skogsvei/brannvei. Den gir herlig fartsfølelse og god sikt uten for mange tekniske bråstopp.'
  },
  {
    slug: 'moan',
    title: 'Moan',
    discipline: 'Terreng / Sti',
    difficulty: 'Enkel',
    distanceKm: 2.6,
    elevationM: 167,
    excerpt: 'A nice speed trail that is partially single track and partially fire road. Fin fartsløype i Ytternmarka (236 - 69 moh).',
    estimatedTime: '30 – 45 min',
    surface: 'Enkeltspor og fast skogsvei',
    startingPoint: 'Moan (236 moh)',
    trailguideId: '5828',
    featured: false,
    order: 3,
    quote: 'A nice speed trail that is partially single track and partially fire road.',
    body: '**Moan** er en 2,6 km lang populær fartsløype i skogen ovenfor Ytteren. Med en fin miks av singletrack og skogsvei gir den en kjempefin rytme og god fart.'
  },
  {
    slug: 'yttraskaret-flyt',
    title: 'Yttraskaret Flyt',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 1.5,
    elevationM: 183,
    excerpt: 'Øvre del av stien er singletrack, mens den nedre delen følger en gammel traktorvei. En rask og morsom sti med god flyt (324 - 141 moh).',
    estimatedTime: '30 – 45 min',
    surface: 'Singletrack øverst, gammel traktorvei nederst',
    startingPoint: 'Yttraskaret (324 moh)',
    trailguideId: '7985',
    featured: true,
    order: 4,
    quote: 'Øvre del av stien er singletrack, mens den nedre delen følger en gammel traktorvei. En rask og morsom sti med god flyt. Kan sykles begge veier.',
    body: '**Yttraskaret Flyt** er en 1,5 km lang stiperle i Båsmofjellet. Den øvre delen byr på leken singletrack mellom trærne, før den åpner seg opp i en rask traktorvei med naturlige doseringer.'
  },
  {
    slug: 'yttrafjellet-deluxe',
    title: 'Yttrafjellet Deluxe',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 1.7,
    elevationM: 237,
    excerpt: 'En morsom flytsti som bare har blitt bedre med årene. Kan sykles i begge retninger over flotte svaberg og furuskog (279 - 42 moh).',
    estimatedTime: '30 – 60 min',
    surface: 'Svaberg, barnålsbunn og åpen furuskog',
    startingPoint: 'Yttrafjellet (279 moh)',
    trailguideId: '8122',
    featured: true,
    order: 5,
    quote: 'En morsom flytsti som bare har blitt bedre med årene. Noen steder kan bregner gjøre stien litt trang. Stien kan sykles i begge retninger.',
    body: '**Yttrafjellet Deluxe** er en 1,7 km lang flytsti over Yttrafjellet. Den tar deg over tørre svaberg og gjennom åpen furuskog med god flyt og herlig utsikt mot fjorden.'
  },
  {
    slug: 'isbilen',
    title: 'Isbilen',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 1.4,
    elevationM: 249,
    excerpt: 'Singletrack med delvis god flyt og med noen tekniske elementer. Burde bare sykles nedover (284 - 35 moh).',
    estimatedTime: '20 – 40 min',
    surface: 'Teknisk downhill singletrack, røtter og stein',
    startingPoint: 'Toppen av Isbilen (284 moh)',
    trailguideId: '11149',
    featured: false,
    order: 6,
    quote: 'Singletrack med delvis god flyt og med noen tekniske elementer. Burde bare sykles nedover.',
    body: '**Isbilen** er en 1,4 km lang dedikert nedoversingletrack i Munklia/Båsmofjellet. Stien har god naturlig flyt med doserte svinger og tekniske elementer.'
  },
  {
    slug: 'ytternmarka-roundtrip',
    title: 'Ytternmarka Roundtrip',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 4.7,
    elevationM: 217,
    excerpt: 'This is an wide trail that is great for cross country. The trail also has a fun downhill where you can get great speeds (21 - 212 moh).',
    estimatedTime: '45 – 75 min',
    surface: 'Bred sti, barnålsbunn og raske utforkjøringer',
    startingPoint: 'Nordsjona / Ytternmarka (21 moh)',
    trailguideId: '7979',
    featured: false,
    order: 7,
    quote: 'This is an wide trail that is great for cross country. The trail also has a fun "downhill" where you can get great speeds.',
    body: '**Ytternmarka Roundtrip** er en 4,7 km lang klassisk rundtur i Ytternmarka logget av Andreas Bjørnådal. Løypa starter på ca. 21 moh og klatrer opp til 212 moh før den byr på en herlig, fartsfylt utforkjøring på fast skogssti.'
  },
  {
    slug: 'selforsfjellet-tjuvtrappa',
    title: 'Selforsfjellet / Tjuvtrappa',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 3.8,
    elevationM: 352,
    excerpt: 'The trail is fairly easy and wide singletrack. Nice view at the end. Fin tur over Selforsfjellet til Tjuvtrappa og Veten (64 - 409 moh).',
    estimatedTime: '1.0 – 1.5 timer',
    surface: 'Bred singletrack, traktorvei og svaberg',
    startingPoint: 'Selfors Skistua (64 moh)',
    trailguideId: '7916',
    featured: true,
    order: 8,
    quote: 'The trail is fairly easy and wide singletrack. Nice view at the end.',
    body: '**Selforsfjellet og Tjuvtrappa** er en av de flotteste stiturene på østsiden av Ranelva. Turen byr på bred, god singletrack med fantastiske utsiktspunkter over hele byen og fjorden.'
  },
  {
    slug: 'hauknestinden',
    title: 'Hauknestinden',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 3.5,
    elevationM: 562,
    excerpt: 'Fin flytsti i bunnen, singletrack og teknisk snaufjell opp mot 798 moh med 360 graders fjordutsikt.',
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Skogsti, teknisk stein, svaberg og snaufjell',
    startingPoint: 'Toppen av Hauknestinden (798 moh) / Hauknes',
    trailguideId: '8609',
    featured: true,
    order: 9,
    quote: 'Fin flytsti i bunnen, singletrack som fort kan bli gjørmete i vått vær lengre opp. På toppen er stien mer utydelig, men her kan du stort sett sykle overalt.',
    body: '**Hauknestinden** er den store toppturklassikeren for stisyklister i Mo i Rana. Stien byr på spektakulær utsikt over hele Ranfjorden og rå teknisk utforkjøring.'
  },
  {
    slug: 'reinfjellet',
    title: 'Reinfjellet',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 5.3,
    elevationM: 270,
    excerpt: 'This trail is fun when it is not too wet. Ekte snaufjellssykling på fast, tørt underlag med utsikt mot Dunderlandsdalen (388 - 658 moh).',
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Fjellsti, lyng, svaberg og tørt snaufjell',
    startingPoint: 'Reinfjellet (496 moh)',
    trailguideId: '5820',
    featured: false,
    order: 10,
    quote: 'This trail is fun when it is not too wet. The first and the last part can be a little muddy if it has rained.',
    body: '**Reinfjellet** byr på 5,3 km med herlig snaufjellssykling på det tørre fjellplatået over Skonseng.'
  },
  {
    slug: 'rausandhaugen',
    title: 'Rausandhaugen',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 3.1,
    elevationM: 326,
    excerpt: 'The trail has good flow in the upper section from the top and down to the creek (819 - 493 moh).',
    estimatedTime: '45 – 75 min',
    surface: 'Flytsti på svaberg, lyng og skogsbunn',
    startingPoint: 'Toppen av Rausandhaugen (819 moh)',
    trailguideId: '5819',
    featured: false,
    order: 11,
    quote: 'The trail has good flow in the upper section from the top and down to the creek. The end of the trail can be a little confusing, since it is not easy to see where the trail is going.',
    body: '**Rausandhaugen** har særlig god flyt i øvre del fra toppen og nedover mot bekken, og er et fast innslag i mange stisykkelrunder.'
  },
  {
    slug: 'lappfjelltjonna',
    title: 'Lappfjelltjønna',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 4.2,
    elevationM: 345,
    excerpt: 'This trail goes to Lappfjelltjønna. Stien åpner seg i nydelig snaufjell over tregrensen (523 - 868 moh).',
    estimatedTime: '1.0 – 2.0 timer',
    surface: 'Bratt skogssti, røtter, lyng og snaufjell',
    startingPoint: 'Lappfjellet (868 moh)',
    trailguideId: '5863',
    featured: false,
    order: 12,
    quote: 'This trail goes to Lappfjelltjønna. The trail has some steep parts in the woods. But when you get above the tree line, the trail gets easier.',
    body: '**Lappfjelltjønna** byr på en fin kontrast med bratt og teknisk skogssti i starten fra Gruben, før terrenget slakker ut og gir herlig fjellstisykling innover platået.'
  },
  {
    slug: 'kubben',
    title: 'Kubben',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 3.3,
    elevationM: 360,
    excerpt: 'A fun flow trail with a lot of bedrock and rocks. Artig og teknisk flytsti med mye svaberg og stein (650 - 1010 moh).',
    estimatedTime: '45 – 75 min',
    surface: 'Mye berg, stein, doseringer og skogssti',
    startingPoint: 'Kubben (1010 moh)',
    trailguideId: '5818',
    featured: false,
    order: 13,
    quote: 'A fun flow trail with a lot of bedrock and rocks.',
    body: '**Kubben** er en leken sti med mye fast berg og stein, doserte svinger og morsom rytme i flott natur.'
  },
  {
    slug: 'hellerfjellet',
    title: 'Hellerfjellet',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 4.9,
    elevationM: 431,
    excerpt: 'This trail is a combination of single track and some bedrock. Singletrack og snaufjell på fast berggrunn (645 - 1076 moh).',
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Singletrack, snaufjell og fast berggrunn',
    startingPoint: 'Hellerfjellet snaufjell (1076 moh)',
    trailguideId: '5864',
    featured: false,
    order: 14,
    quote: 'This trail is a combination of single track and some bedrock. The middle part of this trail is hard to follow due bad marking.',
    body: '**Hellerfjellet** tar deg opp i åpent snaufjellsterreng. Stien byr på 4,9 km med enkeltspor og fast berggrunn.'
  },
  {
    slug: 'tindan',
    title: 'Tindan',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 3.4,
    elevationM: 579,
    excerpt: 'The trail includes some enjoyable flow sections through the forest and bedrock. Spektakulær topptursti i Dalsgrenda med rå fjordutsikt (67 - 646 moh).',
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Fjellsti, svaberg, lyng og tekniske partier',
    startingPoint: 'Toppen av Tindan (646 moh) / Dalsgrenda',
    trailguideId: '9510',
    featured: true,
    order: 15,
    quote: 'The trail includes some enjoyable flow sections through the forest and bedrock. However, there is a segment in the center where it is necessary to carry your bike.',
    body: '**Tindan** i Dalsgrenda er en av de mest spektakulære toppturene for stisykling på sørsiden av Ranfjorden. Stien byr på krevende motbakker og belønner med fantastisk flyt og utforkjøringer på åpne svaberg.'
  },
];

const ruterDir = path.resolve('src/content/ruter');

for (const c of markdownConfigs) {
  const content = `---
title: "${c.title}"
excerpt: "${c.excerpt}"
discipline: "${c.discipline}"
difficulty: "${c.difficulty}"
distanceKm: ${c.distanceKm}
elevationM: ${c.elevationM}
estimatedTime: "${c.estimatedTime}"
surface: "${c.surface}"
startingPoint: "${c.startingPoint}"
gpxFile: "/gpx/${c.slug}.gpx"
trailguideUrl: "https://trailguide.net/html/${c.trailguideId}"
trailforksUrl: "https://www.trailforks.com/region/mo-i-rana-29667/"
stravaUrl: "https://trailguide.net/html/${c.trailguideId}"
highlights:
  - "Trailguide #${c.trailguideId}: ${c.title}"
  - "Distanse: ${c.distanceKm} km (${c.elevationM} hm)"
featured: ${c.featured}
order: ${c.order}
---

## Om stien (Trailguide #${c.trailguideId})

> *«${c.quote}»*

${c.body}
`;

  fs.writeFileSync(path.join(ruterDir, `${c.slug}.md`), content, 'utf-8');
  console.log(`Updated ${c.slug}.md`);
}
