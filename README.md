# danieljost.com

The source for [danieljost.com](https://danieljost.com), built as a static [Astro](https://astro.build/) portfolio and deployed with Cloudflare Workers Static Assets.

## Requirements

- Node.js 22 or newer
- npm

## Local development

```sh
npm install
npm run dev
```

Astro prints the local development URL when it starts.

## Quality checks

```sh
npm run check
npm run build
npm run preview
```

`npm run check` runs Astro's TypeScript/content diagnostics and Biome's formatter and linter checks. Biome is the project's only formatter and linter. Its complete Astro/HTML support is currently experimental, so `html.experimentalFullSupportEnabled` must remain enabled in `biome.json`.

Use `npm run format` to format the repository and `npm run lint` to run lint rules only.

## Deployment

The production build is emitted to `dist/` and served directly by Cloudflare Workers Static Assets; no Astro server adapter or Worker script is required.

```sh
npm run deploy
```

Cloudflare authentication and the `danieljost.com` custom domain are configured outside the repository. Do not commit account credentials or API tokens.

## Content and assets

Portfolio entries are maintained in:

- `src/data/games.json`
- `src/data/websites.json`

Stable public assets, including the résumé PDF, live under `public/static/`.

## Reuse

Please do not reuse project information, résumé content, downloadable files, or personal identifying information. See [LICENSE.md](LICENSE.md) for the source-code license.
