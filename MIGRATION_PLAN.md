# Astro migration plan

## Goal

Replace the legacy DocPad site on the `astro` branch with a statically generated Astro site while preserving the existing routes and portfolio content. Use the newer project data from `origin/nextjs` where it exists, and move all repeated portfolio content out of page templates and into JSON files.

## Content sources and precedence

| Area | Source | Migration rule |
| --- | --- | --- |
| Home | `origin/nextjs:src/pages/index.tsx` | Use the newer biography as the initial copy. |
| Games | `origin/nextjs:src/data/games.json` | Reuse this file as the canonical games dataset, including the newer Playdate and Game2020 entries. |
| Websites | `src/documents/websites/index.html.swig` | Extract the frontmatter list into a new `src/data/websites.json` file with the same data-driven pattern as games. |
| Résumé | Current `resume` page and PDF | Preserve `/resume` and provide a direct link to the PDF. Do not migrate the Google Docs embed. |
| Images and icons | `origin/nextjs:public/static` plus current assets not present there | Preserve existing asset paths initially to reduce migration risk. |
| 404 page | Current `404.html.swig` | Rebuild as `src/pages/404.astro` using the shared layout and metadata. |

The Next.js branch is only a partial migration: it has no websites or résumé page, and its games page references `game.game` even though the JSON uses `key`. Astro should use the JSON's `key` field directly and should not copy that mismatch.

## Target structure

```text
.
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── static/
│       ├── download/Daniel_Jost_Resume.pdf
│       ├── img/
│       └── fonts/                 # only if the old icon font is retained
└── src/
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   └── ProjectCard.astro
    ├── data/
    │   ├── games.json
    │   └── websites.json
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── games.astro
    │   ├── websites.astro
    │   ├── resume.astro
    │   └── 404.astro
    ├── styles/
    │   └── global.css
    └── types/
        └── portfolio.ts
```

Use `public/` for the PDF, favicons, and assets whose URLs should remain stable. JSON can be imported directly from `src/data` by the Astro pages.

## Data model

### Games

Copy `origin/nextjs:src/data/games.json` into `src/data/games.json` without dropping entries. Treat these fields as the canonical schema:

```ts
interface Game {
  key: string;
  name: string;
  year: string;
  short_desc: string;
  link: string;
  thumb?: string;
}
```

Implementation notes:

- An empty `link` means the card is not clickable; do not render an empty anchor.
- Audit every external link during migration. If the original page is stale or unavailable, replace `link` with a verified, representative `web.archive.org` snapshot instead of leaving a broken URL.
- `thumb` is optional because the two newest games do not currently have thumbnails.
- Keep `year` as a string because the existing data includes values such as `20xx`.
- Render external links with `target="_blank"` and `rel="noreferrer"` or `rel="noopener noreferrer"`.

### Websites

Create `src/data/websites.json` by moving the website list out of the Swig frontmatter. Normalize it to:

```ts
interface Website {
  key: string;
  name: string;
  year: string;
  link: string;
  thumb?: string;
  short_desc?: string;
}
```

Map the old `website` field to `key`, retain every existing item and its order, and use an empty string when an old item has no link or archived page. Check every URL and replace stale or unavailable destinations with verified, representative `web.archive.org` snapshots. Keep descriptions optional so they can be added later without changing the page/component contract.

Both pages should map their JSON into the same `ProjectCard.astro` component. Pass an explicit asset category (`game` or `website`) rather than hard-coding game image paths inside the component.

## Implementation phases

### 1. Bootstrap Astro

- Replace the DocPad dependencies and scripts with Astro, TypeScript-aware tooling, Biome, and Wrangler:
  - `dev`: `astro dev`
  - `build`: `astro build`
  - `preview`: `astro preview`
  - `lint`: `biome lint .`
  - `format`: `biome format --write .`
  - `check`: `astro check && biome ci .`
  - `deploy`: `npm run build && wrangler deploy`
- Install `@biomejs/biome` as an exact-version development dependency and add `biome.json` for formatting, linting, and import organization. Enable Biome's current experimental full HTML/Astro support (`html.experimentalFullSupportEnabled`) so `.astro` files are included, document that limitation, and exclude generated output such as `dist/`.
- Add `astro.config.mjs` with `site: "https://danieljost.com"` and static output.
- Add Astro's strict TypeScript configuration.
- Add Wrangler as a development dependency; the Worker static-assets configuration is completed in the deployment phase.
- Keep the legacy source files temporarily so pages can be compared during the port.

**Exit criteria:** a minimal Astro home page runs locally and produces a non-empty `dist/` directory.

### 2. Establish the shared shell

- Build `BaseLayout.astro` with the document structure, title/description props, viewport metadata, canonical URL, favicons, header, main content, and footer.
- Port the navigation to plain Astro links for `/`, `/resume`, `/games`, `/websites`, and the external blog.
- Highlight the current route using `Astro.url.pathname` and `aria-current="page"`.
- Prefer a responsive CSS navigation that needs no client-side JavaScript. Only add an Astro island if interaction cannot be implemented accessibly without one.
- Replace the fixed 2014/2022 copyright with the current year generated at build time.

**Exit criteria:** every target route can use one layout, keyboard navigation works, and the header/footer are responsive.

### 3. Migrate project data and cards

- Copy `games.json` from `origin/nextjs` into `src/data`.
- Extract the current websites frontmatter into `websites.json` using the normalized schema above.
- Add shared `Game`, `Website`, and/or `Project` TypeScript types.
- Build `ProjectCard.astro` to support:
  - optional links;
  - optional thumbnails and a deliberate no-image layout;
  - title, year, and optional description;
  - game and website thumbnail directories;
  - useful image alt text and visible keyboard focus.
- Implement `/games` and `/websites` as JSON-driven pages.

**Exit criteria:** all 13 games from the Next.js JSON and all 11 websites from the current Swig page render in their original order, with no broken image caused by a missing optional thumbnail.

### 4. Migrate the remaining pages

- Port the newer Next.js home copy into `index.astro` and add links to the portfolio sections.
- Port `/resume` as a simple page with a direct link to open or download the PDF. Do not include the external Google Docs embed.
- Create the shared-layout 404 page.
- Add unique titles and descriptions to each page.

**Exit criteria:** `/`, `/games`, `/websites`, `/resume`, and `/404` all build and contain the expected content.

### 5. Rebuild styling and assets

- Preserve the current DocPad site's visual direction: the blue background, illustrated header treatment, three-column portfolio grid, responsive navigation, typography, footer, and overall color/spacing language. Rebuild the appearance as modern CSS rather than carrying forward Bourbon, Neat, Node Sass, or the old sidebar-transition scripts. The Next.js visual style is not the target.
- Define shared color, spacing, width, and typography custom properties in `global.css`.
- Implement the project list with CSS Grid/Flexbox and responsive breakpoints.
- Copy the Next.js branch's `public/static` tree, then compare it against current assets so nothing needed by the website, résumé, home page, or favicons is lost.
- Prefer system or locally hosted fonts. Remove the obsolete social icon font if normal text/SVG links replace it.
- Preserve stable public URLs such as `/static/download/Daniel_Jost_Resume.pdf`; add redirects only if asset paths intentionally change.

**Exit criteria:** the site is usable at narrow mobile and desktop widths, has no horizontal overflow, and all local assets load successfully.

### 6. Validate and remove the legacy stack

Run:

```sh
npm run check
npm run build
npm run preview
```

Then verify:

- all five routes return the expected page;
- internal navigation and the PDF link work;
- each stale external project URL points to a working, relevant Archive.org snapshot;
- cards without links do not look or behave like links;
- cards without thumbnails still have a balanced layout;
- external links are safe and keyboard accessible;
- every image has meaningful alt text;
- browser console and network panel show no missing assets or runtime errors;
- metadata, canonical URLs, and favicon URLs are correct;
- mobile, tablet, and desktop layouts are visually reviewed.

After parity is confirmed, remove DocPad, Swig templates, CoffeeScript config, old SCSS dependencies, obsolete JavaScript, `.travis.yml`, `.deployment`, and `deploy.cmd` if they are no longer used. Update `README.md` with Astro setup and build commands.

**Exit criteria:** checks and production build pass after all legacy files and dependencies are removed.

### 7. Deploy with Cloudflare Workers

- Keep Astro's default static output in `dist/`. The site is fully static, so do not add `@astrojs/cloudflare`; the adapter is only needed if the site later adopts on-demand rendering.
- Add `wrangler.jsonc` for a Cloudflare Worker with Static Assets:

  ```jsonc
  {
    "$schema": "node_modules/wrangler/config-schema.json",
    "name": "danieljost-com",
    "compatibility_date": "<current-date>",
    "assets": {
      "directory": "./dist",
      "not_found_handling": "404-page"
    }
  }
  ```

- A Worker script is not required for the static site; Wrangler can upload and serve `dist/` directly.
- Replace the retired Travis/Azure configuration with Cloudflare's Git build configuration or a CI workflow that runs `npm run check`, `npm run build`, and `wrangler deploy`.
- Store Cloudflare credentials as deployment secrets rather than repository files.
- Attach the `danieljost.com` custom domain to the Worker and verify HTTPS, the custom domain, the 404 response, static asset caching, and direct navigation to every route before switching production traffic.

## Definition of done

- The repository builds entirely with Astro and contains no runtime React/Next.js or DocPad dependency.
- Games are sourced from the Next.js branch's `games.json`.
- Websites are sourced from a parallel `websites.json`, not embedded in page markup.
- The home, games, websites, résumé, and 404 routes are present and responsive.
- All retained content and downloadable assets are accounted for.
- Biome is the only formatter/linter, and `npm run check` and `npm run build` pass.
- The site is deployed as Cloudflare Worker Static Assets, and production direct-route behavior is verified.
- Stale project links resolve to verified Archive.org snapshots.

## Confirmed visual direction

The Astro site should reproduce the richer current DocPad design, not the newer minimal Next.js style. Preserve the existing visual language while modernizing the implementation and removing the legacy styling dependencies.
