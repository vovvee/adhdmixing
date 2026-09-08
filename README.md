# ADHD Mixing

A fast, static portfolio site for **ADHD Mixing** — mixing, vocal production, and project mixing.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deployment

The project is configured for a repository named `adhdmixing`. Pushing `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and deploys it to GitHub Pages.

In the repository settings, set **Settings → Pages → Source** to **GitHub Actions** once. The expected URL is `https://<github-username>.github.io/adhdmixing/`.

For a custom domain, build with `VITE_BASE_URL=/`.

## Audio

Place MP3 comparisons under [`public/audio/`](public/audio/README.md) using the documented before/after filenames. The player is native HTML5 and audio is not preloaded.

## Editing content

All editable site copy lives in [`src/data/site.ts`](src/data/site.ts):

- `pricing` — prices, inclusions, conditions, revisions
- `projects` — artist names, descriptions, genres, and audio paths
- `contact` — email and Instagram URL
- `about` — biography placeholders

> The original pricing PDF was not included in the workspace. The price cards deliberately retain clear placeholders and a TODO instead of invented figures or terms.
