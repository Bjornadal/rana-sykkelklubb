# Rana Sykkelklubb – Nettside

Nettside for Rana Sykkelklubb, bygget med [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) og [Strapi Cloud](https://strapi.io/cloud) som CMS.

## Forutsetninger

- Node.js 22.12+ 
- npm 10+
- Strapi Cloud-instans (valgfritt – siden fungerer med fallback-data)

## Kom i gang

```bash
# Installer avhengigheter
cd frontend
npm install

# Kopier miljøvariabler
cp .env.example .env

# Rediger .env med dine Strapi-verdier (valgfritt)

# Start utviklingsserver
npm run dev
```

Åpne [http://localhost:4321](http://localhost:4321) i nettleseren.

## Prosjektstruktur

```
frontend/
├── public/                 # Statiske filer (favicon, bilder)
├── src/
│   ├── components/         # Gjenbrukbare Astro-komponenter
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── DisciplineCard.astro
│   │   ├── NewsCard.astro
│   │   ├── PageHeader.astro
│   │   └── SectionHeading.astro
│   ├── layouts/
│   │   └── Layout.astro    # Hovedlayout med head, header, footer
│   ├── lib/
│   │   └── strapi.ts       # Strapi API-integrasjon
│   ├── pages/
│   │   ├── index.astro            # Forsiden
│   │   ├── om-klubben.astro       # Om klubben
│   │   ├── medlemskap.astro       # Medlemskap og priser
│   │   ├── aktiviteter.astro      # Aktiviteter og treninger
│   │   ├── kontakt.astro          # Kontaktinformasjon
│   │   ├── nyheter/
│   │   │   ├── index.astro        # Nyhetsoversikt
│   │   │   └── [slug].astro       # Enkelt nyhetsartikkel
│   │   └── arrangement/
│   │       ├── index.astro        # Arrangementsoversikt
│   │       └── [slug].astro       # Enkelt arrangement
│   └── styles/
│       └── global.css             # Tailwind CSS + tema
├── .env.example
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Strapi Cloud-oppsett

### Innholdstyper i Strapi

Opprett følgende innholdstyper i Strapi admin-panelet:

#### Article (Nyheter)
| Felt       | Type          | Beskrivelse                    |
|------------|---------------|--------------------------------|
| title      | Text          | Tittel på artikkelen           |
| slug       | UID (title)   | URL-vennlig versjon av tittelen|
| excerpt    | Text (long)   | Kort sammendrag                |
| content    | Rich text     | Hovedinnholdet (HTML)          |
| image      | Media (single)| Forsidebilde                   |

#### Event (Arrangement)
| Felt       | Type          | Beskrivelse                    |
|------------|---------------|--------------------------------|
| title      | Text          | Tittel på arrangementet        |
| slug       | UID (title)   | URL-vennlig versjon            |
| excerpt    | Text (long)   | Kort beskrivelse               |
| content    | Rich text     | Detaljert informasjon (HTML)   |
| date       | Date          | Dato for arrangementet         |
| location   | Text          | Sted for arrangementet         |
| image      | Media (single)| Forsidebilde                   |

### API-token

1. Gå til Strapi admin > Settings > API Tokens
2. Opprett et nytt token med "Read-only" tilgang
3. Legg tokenet i `.env`-filen som `STRAPI_TOKEN`

### Miljøvariabler

```env
STRAPI_URL=https://din-strapi-instans.strapiapp.com
STRAPI_TOKEN=ditt-api-token
```

## Kommandoer

| Kommando         | Beskrivelse                           |
|------------------|---------------------------------------|
| `npm run dev`    | Start utviklingsserver på port 4321   |
| `npm run build`  | Bygg produksjonsversjon til `./dist`  |
| `npm run preview`| Forhåndsvis produksjonsbygg lokalt    |

## Teknologier

- **[Astro](https://astro.build)** – Rask, moderne nettside-rammeverk
- **[Tailwind CSS v4](https://tailwindcss.com)** – Utility-first CSS
- **[Strapi Cloud](https://strapi.io/cloud)** – Headless CMS
- **TypeScript** – Typesikker kode
