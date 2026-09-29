# Snackster

## Production SEO Deployment

Use the SEO build command for production deploys:

```bash
npm run build:seo
```

This command:

1. Generates `public/sitemap.xml` from Contentful.
2. Builds the React app into `build/`.
3. Prerenders every URL in `build/sitemap.xml` into route-specific HTML files.

Examples of prerendered output:

```text
build/index.html
build/products/index.html
build/products/classic-chicken-nuggets/index.html
build/recipes/brekkie-roll/index.html
build/blogs/<blog-slug>/index.html
build/collections/<collection-slug>/index.html
build/party-snacks-bangalore/index.html
```

Deploy the final `build/` directory to production.

## Server Routing

The production web server must serve existing files and directories first, then fall back to the React app.

For nginx:

```nginx
try_files $uri $uri/ /index.html;
```

This lets requests such as `/products/classic-chicken-nuggets` serve the prerendered file at:

```text
build/products/classic-chicken-nuggets/index.html
```

If a prerendered file does not exist, the request falls back to `build/index.html`.

## Prerender Requirements

The prerender step uses local Chrome or Edge in headless mode. On production/CI, install Chrome/Chromium or set:

```bash
CHROME_PATH=/path/to/chrome
```

Contentful environment variables must also be available before running the SEO build:

```bash
REACT_APP_GRAPHQL_URI=...
REACT_APP_AUTH_TOKEN=...
```

## Useful Commands

```bash
npm start
npm run build
npm run prerender
npm run build:prerender
npm run build:seo
```

For production, prefer `npm run build:seo`.
