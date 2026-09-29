const fs = require('fs');
const http = require('http');
const path = require('path');
const { execFile } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const SITE_URL = process.env.SITE_URL || 'https://www.snackster.co.in';
const DEFAULT_WAIT_MS = 20000; // 20 seconds for default pages

// Routes that need extra time to load (data-heavy pages)
const WAIT_TIMES = {
  '/blogs': 30000,           // 30 seconds for blogs
  '/recipes': 30000,         // 30 seconds for recipes
  '/products': 30000,        // 30 seconds for products
  '/collections': 30000,     // 30 seconds for collections
};
const DEFAULT_DETAIL_WAIT_MS = 28000; // 28 seconds for detail pages

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    // macOS (Intel & Apple Silicon/M1/M2/M3)
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    // Windows
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ].filter(Boolean);

  const chromePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!chromePath) {
    throw new Error('Chrome or Edge was not found. Set CHROME_PATH to a Chromium executable and run again.');
  }

  return chromePath;
}

function readSitemapRoutes() {
  const BUILD_DIR_PATH = path.join(BUILD_DIR);
  const sitemapFiles = [
    'sitemap.xml',
    'products.sitemap.xml',
    'recipes.sitemap.xml',
    'blogs.sitemap.xml',
  ];

  const allRoutes = new Set();

  sitemapFiles.forEach((sitemapFile) => {
    const sitemapPath = path.join(BUILD_DIR_PATH, sitemapFile);
    if (fs.existsSync(sitemapPath)) {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');
      const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
      const routes = locs.map((loc) => {
        const url = new URL(loc);
        return url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
      });

      routes.forEach((route) => allRoutes.add(route));
    }
  });

  if (allRoutes.size === 0) {
    throw new Error(`Missing sitemaps in ${BUILD_DIR_PATH}. Run npm run generate-sitemap && npm run build before prerendering.`);
  }

  return [...allRoutes];
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(BUILD_DIR, 'index.html');

  // Write as path.html (not path/index.html) so hosts prefer /path over /path/
  const relativeRoute = route.replace(/^\/+/, '');
  return path.join(BUILD_DIR, `${relativeRoute}.html`);
}

function sanitizeRenderedHtml(html) {
  return html
    // Headless Chrome executes analytics tags while rendering. Keep local app
    // scripts and JSON-LD, but remove third-party scripts injected during crawl.
    .replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])(?=[^>]*\bsrc=["']https?:\/\/)[\s\S]*?<\/script>/gi, '')
    .replace(/<script\b[^>]*>\s*\(function\(a,e,b,f,g,c,d\)\{a\[b\]=a\[b\]\|\|function\(\)[\s\S]*?nvdluy79tb[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b(?=[^>]*(?:_dc_test|~oref|googleads\.g\.doubleclick\.net))[\s\S]*?<\/iframe>/gi, '');
}

function serveBuild() {
  const indexHtml = path.join(BUILD_DIR, 'index.html');

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, 'http://127.0.0.1');
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const safePath = decodedPath.replace(/^\/+/, '').replace(/\\/g, '/');
    const requestedFile = path.normalize(path.join(BUILD_DIR, safePath));

    if (!requestedFile.startsWith(BUILD_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const filePath = fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()
      ? requestedFile
      : indexHtml;

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

function dumpRoute({ chromePath, url, waitMs }) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--virtual-time-budget=${waitMs}`,
    '--dump-dom',
    url,
  ];

  return new Promise((resolve, reject) => {
    execFile(chromePath, args, { maxBuffer: 25 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Chrome failed for ${url}\n${stderr || error.message}`));
        return;
      }

      resolve(stdout);
    });
  });
}

async function prerender() {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error('Missing build directory. Run npm run build before prerendering.');
  }

  const chromePath = findChrome();
  const routes = process.env.PRERENDER_ROUTES
    ? process.env.PRERENDER_ROUTES.split(',').map((route) => route.trim()).filter(Boolean)
    : readSitemapRoutes();
  
  const server = await serveBuild();
  const { port } = server.address();

  try {
    console.log(`\n🚀 Prerendering ${routes.length} routes with ${chromePath}\n`);

    for (const route of routes) {
      // Determine wait time based on route type
      let waitMs = DEFAULT_WAIT_MS;
      if (route.startsWith('/products/') || route.startsWith('/recipes/') || route.startsWith('/blogs/')) {
        waitMs = DEFAULT_DETAIL_WAIT_MS; // Detail pages need more time to load data
      } else {
        // Check if route matches collection or list page patterns
        for (const [pattern, time] of Object.entries(WAIT_TIMES)) {
          if (route.includes(pattern)) {
            waitMs = time;
            break;
          }
        }
      }

      const localUrl = `http://127.0.0.1:${port}${route}`;
      try {
        const html = await dumpRoute({ chromePath, url: localUrl, waitMs });
        const renderedHtml = html.trimStart().toLowerCase().startsWith('<!doctype')
          ? html
          : `<!doctype html>\n${html}`;
        const outputPath = outputPathForRoute(route);

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, sanitizeRenderedHtml(renderedHtml).replaceAll(localUrl, `${SITE_URL}${route}`));
        console.log(`✓ Rendered ${route} -> ${path.relative(ROOT_DIR, outputPath)}`);
      } catch (error) {
        console.error(`✗ Failed to render ${route}: ${error.message}`);
        // Continue prerendering other routes instead of stopping
      }
    }
    console.log('\n✅ Prerendering complete!\n');
  } finally {
    server.close();
  }
}

prerender().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
