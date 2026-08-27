import fs from 'fs';
import path from 'path';

const routesConfig = [
  // ==========================================
  // 🌾 GRAVEL / GRUS (4 TOPPVARIANTER)
  // ==========================================
  {
    slug: 'svartisdalen-gravel-epic',
    title: 'Svartisdalen Gravel Epic',
    discipline: 'Grus / Gravel',
    difficulty: 'Krevende',
    distanceKm: 62,
    elevationM: 690,
    estimatedTime: '3.0 – 4.5 timer',
    surface: 'Fast grus, traktorvei og gruset fjellvei',
    startingPoint: 'Røssvoll / Flyplassen',
    color: '#d97706',
    waypoints: [
      [14.3200, 66.3550], // Røssvoll
      [14.1600, 66.4250], // Svartisdalen
      [14.0150, 66.5150], // Svartisvatnet
      [14.1600, 66.4250],
      [14.3200, 66.3550],
    ],
    markers: [
      { lat: 66.3550, lng: 14.3200, title: 'Start: Røssvoll', desc: 'Parkering ved Røssvoll / flyplassen.', type: 'start' },
      { lat: 66.4650, lng: 14.0900, title: 'Svartisdalen juv', desc: 'Spektakulært elvegjel med turkis brevann.', type: 'viewpoint' },
      { lat: 66.5150, lng: 14.0150, title: 'Svartisvatnet Brygge', desc: 'Vendepunkt med utsikt mot isbreen og fjelltoppene.', type: 'summit' },
    ],
    stravaSegments: [
      {
        name: 'Svartisvatnet Gravel Run',
        url: 'https://www.strava.com/segments/2194021',
        distanceKm: 12.8,
        avgGradePercent: 1.4,
        description: 'Herlig grusstrekning inn mot nasjonalparkgrensen.',
      },
    ],
  },
  {
    slug: 'plurdalen-kaldvatnet-gravel',
    title: 'Plurdalen & Kaldvatnet Gravel Adventure',
    discipline: 'Grus / Gravel',
    difficulty: 'Middels',
    distanceKm: 46,
    elevationM: 520,
    estimatedTime: '2.0 – 3.0 timer',
    surface: 'Fast fin grus og skogsbilvei',
    startingPoint: 'Gruben / Rana Gruber',
    color: '#b45309',
    waypoints: [
      [14.2100, 66.3350], // Gruben
      [14.4500, 66.3600], // Plurdalen midtre
      [14.6200, 66.3810], // Pluragrotta / Kaldvatnet veiskille
      [14.4500, 66.3600],
      [14.2100, 66.3350],
    ],
    markers: [
      { lat: 66.3350, lng: 14.2100, title: 'Start: Gruben', desc: 'Start ved innkjøringen til Plurdalsveien.', type: 'start' },
      { lat: 66.3810, lng: 14.6200, title: 'Pluragrotta & Karstlandskap', desc: 'Kjent stoppested med spektakulær natur og rasteplass.', type: 'viewpoint' },
    ],
    stravaSegments: [
      {
        name: 'Plurdalen Gravel Grind',
        url: 'https://www.strava.com/segments/1532049',
        distanceKm: 8.5,
        avgGradePercent: 2.9,
        description: 'Jevn og fin grusstigning innover Plurdalen.',
      },
    ],
  },
  {
    slug: 'reinforsen-og-skonseng-grus',
    title: 'Reinforsen & Skonseng Grusrunde',
    discipline: 'Grus / Gravel',
    difficulty: 'Enkel',
    distanceKm: 42,
    elevationM: 410,
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Fin grus, skogsveier og landevei',
    startingPoint: 'Mo i Rana Sentrum',
    color: '#ea580c',
    waypoints: [
      [14.1428, 66.3125], // Mo i Rana
      [14.2800, 66.3450], // Selfors/Hauknes
      [14.3350, 66.3580], // Reinforsen
      [14.3100, 66.3680], // Skonseng
      [14.1428, 66.3125], // Mo i Rana
    ],
    markers: [
      { lat: 66.3125, lng: 14.1428, title: 'Start: Mo i Rana', desc: 'Start langs Ranelva nordover.', type: 'start' },
      { lat: 66.3580, lng: 14.3350, title: 'Reinforsen Fossefall', desc: 'Mektig fossefall med rasteplass og utsikt.', type: 'viewpoint' },
      { lat: 66.3680, lng: 14.3100, title: 'Skonseng Skogsveier', desc: 'Fine, faste grusveier gjennom furuskogen.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Skonseng til Reinforsen Grus',
        url: 'https://www.strava.com/segments/2349012',
        distanceKm: 5.1,
        avgGradePercent: 2.1,
        description: 'Fin grusklatring opp mot kraftstasjonen og juvet.',
      },
    ],
  },
  {
    slug: 'dunderlandsdalen-gravel-trail',
    title: 'Dunderlandsdalen Skogsbilveier (Gravel Trail)',
    discipline: 'Grus / Gravel',
    difficulty: 'Middels',
    distanceKm: 52,
    elevationM: 580,
    estimatedTime: '2.5 – 3.5 timer',
    surface: 'Grov og fin skogsbilvei',
    startingPoint: 'Storforshei Stasjon',
    color: '#9a3412',
    waypoints: [
      [14.5200, 66.4020], // Storforshei
      [14.6520, 66.4380], // Nevernes
      [14.7100, 66.4550], // Dunderland øst
      [14.6520, 66.4380],
      [14.5200, 66.4020],
    ],
    markers: [
      { lat: 66.4020, lng: 14.5200, title: 'Start: Storforshei', desc: 'Parkering ved idrettsbanen / stasjonen.', type: 'start' },
      { lat: 66.4550, lng: 14.7100, title: 'Dunderland Grusplatå', desc: 'Stille skogsbilveier langs elvebredden.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Dunderlandsdalen Skogsbilvei Sør',
        url: 'https://www.strava.com/segments/2874190',
        distanceKm: 8.9,
        avgGradePercent: 1.1,
        description: 'Rask og lite trafikkert grusvei på østsiden av Ranelva.',
      },
    ],
  },

  // ==========================================
  // 🏔️ DE 15 BESTE STITURNENE I RANA (TRAILGUIDE DATA)
  // ==========================================
  {
    slug: 'idavollen',
    title: 'Idavollen',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 2.1,
    elevationM: 140,
    estimatedTime: '45 – 90 min',
    surface: 'Barnålsbunn, svaberg og tørr skogssti',
    startingPoint: 'Stenneset / Skillevollen (Båsmoen)',
    color: '#16a34a',
    trailguideId: '264',
    waypoints: [
      [14.0720, 66.3350], // Stenneset
      [14.0620, 66.3400], // Idavollen
      [14.0550, 66.3450], // Toppen
    ],
    markers: [
      { lat: 66.3350, lng: 14.0720, title: 'Start: Stenneset', desc: 'Opp markert sti ved de gamle husene på Stenneset.', type: 'start' },
      { lat: 66.3400, lng: 14.0620, title: 'Idavollen Flytsti', desc: 'Fantastisk flyt på barnålsbunn i furuskogen.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Idavollen Flyt',
        url: 'https://trailguide.net/html/264',
        distanceKm: 2.1,
        avgGradePercent: 2.4,
        description: 'Trailguide #264: En av stiene med best naturlig flyt i Rana.',
      },
    ],
  },
  {
    slug: 'almlia',
    title: 'Almlia',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 2.4,
    elevationM: 110,
    estimatedTime: '30 – 60 min',
    surface: 'Gammel skogsvei / brannvei og singletrack',
    startingPoint: 'Almlia / Skillevollen',
    color: '#059669',
    trailguideId: '5832',
    waypoints: [
      [14.0880, 66.3310], // Almlia
      [14.0820, 66.3340],
      [14.0740, 66.3370],
    ],
    markers: [
      { lat: 66.3310, lng: 14.0880, title: 'Start: Almlia', desc: 'Start i Almlia ovenfor Skillevollen.', type: 'start' },
      { lat: 66.3370, lng: 14.0740, title: 'Almlia Speed Trail', desc: 'Gammel skogsvei med herlig fart og god oversikt.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Almlia Speed Descent',
        url: 'https://trailguide.net/html/5832',
        distanceKm: 2.4,
        avgGradePercent: -4.5,
        description: 'Trailguide #5832: A speed trail that is mostly an old fire road.',
      },
    ],
  },
  {
    slug: 'moan',
    title: 'Moan',
    discipline: 'Terreng / Sti',
    difficulty: 'Enkel',
    distanceKm: 2.6,
    elevationM: 90,
    estimatedTime: '30 – 45 min',
    surface: 'Enkeltspor og fast skogsvei',
    startingPoint: 'Moan / Ytteren',
    color: '#10b981',
    trailguideId: '5828',
    waypoints: [
      [14.0950, 66.3420], // Ytteren/Moan
      [14.1020, 66.3460], // Moan singletrack
      [14.1080, 66.3500],
    ],
    markers: [
      { lat: 66.3420, lng: 14.0950, title: 'Start: Moan', desc: 'Start i skogkanten ved Moan på Ytteren.', type: 'start' },
      { lat: 66.3480, lng: 14.1050, title: 'Moan Fartsløype', desc: 'Leken blanding av singletrack og brannvei.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Moan Flow',
        url: 'https://trailguide.net/html/5828',
        distanceKm: 2.6,
        avgGradePercent: 1.1,
        description: 'Trailguide #5828: Partially single track and partially fire road.',
      },
    ],
  },
  {
    slug: 'yttraskaret-flyt',
    title: 'Yttraskaret Flyt',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 1.5,
    elevationM: 130,
    estimatedTime: '30 – 45 min',
    surface: 'Singletrack øverst, gammel traktorvei nederst',
    startingPoint: 'Yttraskaret / Båsmofjellet',
    color: '#047857',
    trailguideId: '7985',
    waypoints: [
      [14.0650, 66.3420], // Yttraskaret topp
      [14.0680, 66.3380], // Singletrack
      [14.0720, 66.3340], // Traktorvei
    ],
    markers: [
      { lat: 66.3420, lng: 14.0650, title: 'Start: Yttraskaret', desc: 'Toppen av Yttraskaret.', type: 'start' },
      { lat: 66.3340, lng: 14.0720, title: 'Utfor Yttraskaret', desc: 'Overgang fra singletrack til gammel traktorvei.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Yttraskaret Flyt',
        url: 'https://trailguide.net/html/7985',
        distanceKm: 1.5,
        avgGradePercent: -7.2,
        description: 'Trailguide #7985: Rask og morsom sti med god flyt.',
      },
    ],
  },
  {
    slug: 'yttrafjellet-deluxe',
    title: 'Yttrafjellet Deluxe',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 1.7,
    elevationM: 120,
    estimatedTime: '30 – 60 min',
    surface: 'Svaberg, barnålsbunn og åpen furuskog',
    startingPoint: 'Yttrafjellet / Skillevollen',
    color: '#15803d',
    trailguideId: '8122',
    waypoints: [
      [14.0500, 66.3350], // Yttrafjellet
      [14.0550, 66.3380],
      [14.0600, 66.3410],
    ],
    markers: [
      { lat: 66.3350, lng: 14.0500, title: 'Start: Yttrafjellet', desc: 'Inngangen til stien på Yttrafjellet.', type: 'start' },
      { lat: 66.3410, lng: 14.0600, title: 'Yttrafjellet Svaberg', desc: 'Klassisk flytsti som kan sykles i begge retninger.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Yttrafjellet Deluxe',
        url: 'https://trailguide.net/html/8122',
        distanceKm: 1.7,
        avgGradePercent: 1.2,
        description: 'Trailguide #8122: En morsom flytsti som bare har blitt bedre med årene.',
      },
    ],
  },
  {
    slug: 'isbilen',
    title: 'Isbilen',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 1.4,
    elevationM: 160,
    estimatedTime: '20 – 40 min',
    surface: 'Teknisk downhill singletrack, røtter og stein',
    startingPoint: 'Munklia / Båsmofjellet',
    color: '#dc2626',
    trailguideId: '11149',
    waypoints: [
      [14.0480, 66.3400], // Toppen
      [14.0520, 66.3360], // Midtparti
      [14.0580, 66.3310], // Bunnen
    ],
    markers: [
      { lat: 66.3400, lng: 14.0480, title: 'Start: Isbilen Topp', desc: 'Starten av downhill-stien i Munklia.', type: 'start' },
      { lat: 66.3310, lng: 14.0580, title: 'Isbilen Mål', desc: 'Slutten av stien nede i Munklia.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Isbilen Downhill',
        url: 'https://trailguide.net/html/11149',
        distanceKm: 1.4,
        avgGradePercent: -10.8,
        description: 'Trailguide #11149: Singletrack med god flyt og tekniske elementer. Bør bare sykles nedover.',
      },
    ],
  },
  {
    slug: 'ytternmarka-roundtrip',
    title: 'Ytternmarka Roundtrip',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 4.7,
    elevationM: 180,
    estimatedTime: '45 – 75 min',
    surface: 'Bred sti, barnål og raske utforkjøringer',
    startingPoint: 'Ytteren Idrettsanlegg / Lysløypa',
    color: '#0d9488',
    trailguideId: '7979',
    waypoints: [
      [14.0880, 66.3380], // Ytteren
      [14.0820, 66.3440], // Ytternmarka
      [14.0750, 66.3480],
      [14.0880, 66.3380],
    ],
    markers: [
      { lat: 66.3380, lng: 14.0880, title: 'Start: Ytteren', desc: 'Parkering ved lysløypa på Ytteren.', type: 'start' },
      { lat: 66.3480, lng: 14.0750, title: 'Ytternmarka Downhill', desc: 'Morsom og bred utforkjøring med god fart.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Ytternmarka Roundtrip',
        url: 'https://trailguide.net/html/7979',
        distanceKm: 4.7,
        avgGradePercent: 0.8,
        description: 'Trailguide #7979: Flott rundtursti i Ytternmarka med god flyt.',
      },
    ],
  },
  {
    slug: 'selforsfjellet-tjuvtrappa',
    title: 'Selforsfjellet / Tjuvtrappa',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 3.8,
    elevationM: 260,
    estimatedTime: '1.0 – 1.5 timer',
    surface: 'Bred singletrack, traktorvei og svaberg',
    startingPoint: 'Selfors Skistua / Varmorsletta',
    color: '#0284c7',
    trailguideId: '7916',
    waypoints: [
      [14.1850, 66.3320], // Skistua Selfors
      [14.2050, 66.3380], // Varmorsletta
      [14.2250, 66.3450], // Tjuvtrappa & Jo Pennesla-helleren
    ],
    markers: [
      { lat: 66.3320, lng: 14.1850, title: 'Start: Selfors Skistua', desc: 'Parkering ved skistua til Selfors UL.', type: 'start' },
      { lat: 66.3450, lng: 14.2250, title: 'Tjuvtrappa & Helleren', desc: 'Bred singletrack med fantastisk utsikt over Ranfjorden og Mo.', type: 'viewpoint' },
    ],
    stravaSegments: [
      {
        name: 'Tjuvtrappa Singletrack',
        url: 'https://trailguide.net/html/7916',
        distanceKm: 3.8,
        avgGradePercent: 5.2,
        description: 'Trailguide #7916 & #10138: Enkel og bred singletrack med nydelig utsikt.',
      },
    ],
  },
  {
    slug: 'hauknestinden',
    title: 'Hauknestinden',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 3.5,
    elevationM: 520,
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Skogsti, teknisk stein, svaberg og snaufjell',
    startingPoint: 'Hauknes / Hauknesbakken',
    color: '#e11d48',
    trailguideId: '8609',
    waypoints: [
      [14.0850, 66.2850], // Hauknes
      [14.1000, 66.2750], // Skogen
      [14.1150, 66.2620], // Toppen
    ],
    markers: [
      { lat: 66.2850, lng: 14.0850, title: 'Start: Hauknes', desc: 'Start fra Hauknes ved foten av fjellet.', type: 'start' },
      { lat: 66.2620, lng: 14.1150, title: 'Hauknestinden Varde', desc: 'Toppunkt med spektakulær 360-graders fjordutsikt.', type: 'summit' },
    ],
    stravaSegments: [
      {
        name: 'Hauknestinden Topptur',
        url: 'https://trailguide.net/html/8609',
        distanceKm: 3.5,
        avgGradePercent: 12.4,
        description: 'Trailguide #8609: Fin flyt i bunnen og teknisk snaufjell mot toppen.',
      },
    ],
  },
  {
    slug: 'reinfjellet',
    title: 'Reinfjellet',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 5.3,
    elevationM: 460,
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Fjellsti, lyng, svaberg og tørt snaufjell',
    startingPoint: 'Reinfjellet bom / Skonseng',
    color: '#7c3aed',
    trailguideId: '5820',
    waypoints: [
      [14.3100, 66.3680], // Skonseng bom
      [14.3450, 66.3780], // Oppstigning
      [14.3850, 66.3880], // Fjellplatået
    ],
    markers: [
      { lat: 66.3680, lng: 14.3100, title: 'Start: Reinfjellet bom', desc: 'Parkering ved bomveien fra Skonseng.', type: 'start' },
      { lat: 66.3880, lng: 14.3850, title: 'Reinfjellet Snaufjell', desc: 'Herlig fjellsti på tørt underlag med utsikt mot Dunderlandsdalen.', type: 'summit' },
    ],
    stravaSegments: [
      {
        name: 'Reinfjellet Fjellsti',
        url: 'https://trailguide.net/html/5820',
        distanceKm: 5.3,
        avgGradePercent: 6.8,
        description: 'Trailguide #5820: Artig fjellsti på tørt snaufjell.',
      },
    ],
  },
  {
    slug: 'rausandhaugen',
    title: 'Rausandhaugen',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 3.1,
    elevationM: 160,
    estimatedTime: '45 – 75 min',
    surface: 'Flytsti på svaberg, lyng og skogsbunn',
    startingPoint: 'Rausandhaugen / Båsmoen',
    color: '#0891b2',
    trailguideId: '5819',
    waypoints: [
      [14.0780, 66.3320], // Båsmoen
      [14.0750, 66.3350], // Rausandhaugen
      [14.0700, 66.3390], // Bekken
    ],
    markers: [
      { lat: 66.3320, lng: 14.0780, title: 'Start: Båsmoen', desc: 'Start ved Rausandhaugen på Båsmoen.', type: 'start' },
      { lat: 66.3350, lng: 14.0750, title: 'Rausandhaugen Flytparti', desc: 'Super flyt i øvre del fra toppen og ned mot bekken.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Rausandhaugen Flow',
        url: 'https://trailguide.net/html/5819',
        distanceKm: 3.1,
        avgGradePercent: 2.1,
        description: 'Trailguide #5819: God flyt i øvre del fra toppen og ned mot bekken.',
      },
    ],
  },
  {
    slug: 'lappfjelltjonna',
    title: 'Lappfjelltjønna',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 4.2,
    elevationM: 380,
    estimatedTime: '1.0 – 2.0 timer',
    surface: 'Bratt skogssti som åpner seg i fjellterreng',
    startingPoint: 'Gruben / Lappfjellet',
    color: '#9333ea',
    trailguideId: '5863',
    waypoints: [
      [14.1950, 66.3180], // Gruben
      [14.2300, 66.3120], // Skogen
      [14.2650, 66.3050], // Lappfjelltjønna
    ],
    markers: [
      { lat: 66.3180, lng: 14.1950, title: 'Start: Gruben', desc: 'Start fra Gruben mot Lappfjellet.', type: 'start' },
      { lat: 66.3050, lng: 14.2650, title: 'Lappfjelltjønna', desc: 'Stien blir lettere og åpnere når du kommer over tregrensen.', type: 'summit' },
    ],
    stravaSegments: [
      {
        name: 'Lappfjelltjønna Climb',
        url: 'https://trailguide.net/html/5863',
        distanceKm: 4.2,
        avgGradePercent: 7.9,
        description: 'Trailguide #5863: Går til Lappfjelltjønna med flott fjellterreng over tregrensen.',
      },
    ],
  },
  {
    slug: 'kubben',
    title: 'Kubben',
    discipline: 'Terreng / Sti',
    difficulty: 'Middels',
    distanceKm: 3.3,
    elevationM: 170,
    estimatedTime: '45 – 75 min',
    surface: 'Mye fast berg, stein og naturlige doseringer',
    startingPoint: 'Kubben / Munklia (Båsmofjellet)',
    color: '#4f46e5',
    trailguideId: '5818',
    waypoints: [
      [14.0550, 66.3380], // Munklia
      [14.0520, 66.3410], // Kubben
      [14.0480, 66.3450],
    ],
    markers: [
      { lat: 66.3380, lng: 14.0550, title: 'Start: Munklia', desc: 'Start mot Kubben i Munklia.', type: 'start' },
      { lat: 66.3410, lng: 14.0520, title: 'Kubben Svaberg', desc: 'Artig flytsti med mye svaberg og stein.', type: 'poi' },
    ],
    stravaSegments: [
      {
        name: 'Kubben Flow Trail',
        url: 'https://trailguide.net/html/5818',
        distanceKm: 3.3,
        avgGradePercent: 1.8,
        description: 'Trailguide #5818: A fun flow trail with a lot of bedrock and rocks.',
      },
    ],
  },
  {
    slug: 'hellerfjellet',
    title: 'Hellerfjellet',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 4.9,
    elevationM: 390,
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Singletrack og snaufjell på berggrunn',
    startingPoint: 'Hellerfjellet / Ytteren',
    color: '#c026d3',
    trailguideId: '5864',
    waypoints: [
      [14.0850, 66.3420], // Ytteren
      [14.0720, 66.3520], // Hellerfjellet
      [14.0650, 66.3600], // Toppen
    ],
    markers: [
      { lat: 66.3420, lng: 14.0850, title: 'Start: Ytteren', desc: 'Start fra Ytteren opp mot snaufjellet.', type: 'start' },
      { lat: 66.3600, lng: 14.0650, title: 'Hellerfjellet Snaufjell', desc: 'Kombinasjon av enkeltspor og fast berggrunn over snaufjellet.', type: 'summit' },
    ],
    stravaSegments: [
      {
        name: 'Hellerfjellet Singletrack',
        url: 'https://trailguide.net/html/5864',
        distanceKm: 4.9,
        avgGradePercent: 6.2,
        description: 'Trailguide #5864: Kombinasjon av singletrack og berggrunn.',
      },
    ],
  },
  {
    slug: 'tindan',
    title: 'Tindan',
    discipline: 'Terreng / Sti',
    difficulty: 'Krevende',
    distanceKm: 3.4,
    elevationM: 480,
    estimatedTime: '1.5 – 2.5 timer',
    surface: 'Fjellsti, svaberg, lyng og tekniske partier',
    startingPoint: 'Dalsgrenda / Tindan',
    color: '#be123c',
    trailguideId: '9510',
    waypoints: [
      [13.9850, 66.2450], // Dalsgrenda
      [13.9650, 66.2350], // Skogen
      [13.9450, 66.2250], // Toppen
    ],
    markers: [
      { lat: 66.2450, lng: 13.9850, title: 'Start: Dalsgrenda', desc: 'Parkering i Dalsgrenda ved foten av stien.', type: 'start' },
      { lat: 66.2250, lng: 13.9450, title: 'Tindan Toppunkt', desc: 'Spektakulære svaberg og panoramautsikt over Ranfjorden.', type: 'summit' },
    ],
    stravaSegments: [
      {
        name: 'Tindan Topptur',
        url: 'https://trailguide.net/html/9510',
        distanceKm: 3.4,
        avgGradePercent: 11.8,
        description: 'Trailguide #9510: Nydelige flytpartier gjennom skog og svaberg med rå utsikt.',
      },
    ],
  },
];

// Helper to query OSRM routing
async function fetchOsrmGeometry(waypoints) {
  const coordString = waypoints.map((pt) => `${pt[0]},${pt[1]}`).join(';');
  const url = `http://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.routes && data.routes.length > 0) {
      return data.routes[0].geometry.coordinates; // array of [lon, lat]
    }
  } catch (err) {
    console.warn('OSRM fetch failed, falling back to waypoints:', err.message);
  }
  return waypoints;
}

// Generate valid GPX 1.1 XML string
function generateGpxXml(title, desc, points, markers = []) {
  let waypointsXml = '';
  if (markers && markers.length > 0) {
    waypointsXml = markers
      .map(
        (m) => `  <wpt lat="${m.lat.toFixed(6)}" lon="${m.lng.toFixed(6)}">
    <name>${escapeXml(m.title)}</name>
    <desc>${escapeXml(m.desc)}</desc>
  </wpt>`
      )
      .join('\n');
  }

  const trackPointsXml = points
    .map(
      (pt) => `      <trkpt lat="${pt[1].toFixed(6)}" lon="${pt[0].toFixed(6)}"></trkpt>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Rana Sykkelklubb - https://ranasykkelklubb.no" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${escapeXml(title)}</name>
    <desc>${escapeXml(desc)}</desc>
    <author>
      <name>Rana Sykkelklubb</name>
    </author>
  </metadata>
${waypointsXml}
  <trk>
    <name>${escapeXml(title)}</name>
    <trkseg>
${trackPointsXml}
    </trkseg>
  </trk>
</gpx>`;
}

function escapeXml(unsafe) {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Sample points evenly so map rendering stays lightning fast
function samplePoints(points, maxCount = 350) {
  if (points.length <= maxCount) return points;
  const step = points.length / maxCount;
  const result = [];
  for (let i = 0; i < maxCount; i++) {
    const idx = Math.min(Math.floor(i * step), points.length - 1);
    result.push(points[idx]);
  }
  result.push(points[points.length - 1]); // always include end
  return result;
}

async function run() {
  console.log('Fetching precise GPS tracks from OpenStreetMap / OSRM...');

  const gpxDir = path.resolve('public/gpx');
  if (!fs.existsSync(gpxDir)) fs.mkdirSync(gpxDir, { recursive: true });

  const routeTracksOutput = {};

  for (const r of routesConfig) {
    console.log(`Processing: ${r.title}...`);
    const fullCoords = await fetchOsrmGeometry(r.waypoints);
    console.log(` -> Fetched ${fullCoords.length} precise GPS points for ${r.slug}`);

    // 1. Write High-Precision full GPX file
    const gpxContent = generateGpxXml(r.title, r.title, fullCoords, r.markers);
    fs.writeFileSync(path.join(gpxDir, `${r.slug}.gpx`), gpxContent, 'utf-8');

    // 2. Sample for Leaflet map coordinates [lat, lng]
    const sampled = samplePoints(fullCoords, 350);
    const leafletCoords = sampled.map((pt) => [Number(pt[1].toFixed(5)), Number(pt[0].toFixed(5))]);

    routeTracksOutput[r.slug] = {
      slug: r.slug,
      title: r.title,
      discipline: r.discipline,
      color: r.color,
      coordinates: leafletCoords,
      waypoints: r.markers,
      stravaSegments: r.stravaSegments,
    };

    // Small delay to be gentle to public OSRM server
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  // 3. Write updated TypeScript file
  const tsContent = `export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteWaypoint {
  lat: number;
  lng: number;
  title: string;
  desc: string;
  type: "start" | "summit" | "viewpoint" | "cafe" | "poi";
}

export interface StravaSegmentData {
  name: string;
  id?: string;
  url: string;
  distanceKm: number;
  avgGradePercent?: number;
  maxGradePercent?: number;
  description: string;
}

export interface RouteTrackData {
  slug: string;
  title: string;
  discipline: "Landevei" | "Terreng / Sti" | "Grus / Gravel" | "Enduro";
  color: string;
  coordinates: [number, number][];
  waypoints: RouteWaypoint[];
  stravaSegments?: StravaSegmentData[];
}

export const routeTracks: Record<string, RouteTrackData> = ${JSON.stringify(routeTracksOutput, null, 2)};
`;

  fs.writeFileSync(path.resolve('src/lib/routeTracks.ts'), tsContent, 'utf-8');
  console.log('Successfully generated all precise GPX files and updated routeTracks.ts!');
}

run();
