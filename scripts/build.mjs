// Full production build:
//
//   1. `vite build`          -> client bundle in dist/ (hashed assets, empty
//                               #root, homepage-default head)
//   2. `vite build --ssr`    -> compiles scripts/prerender-entry.jsx (JSX +
//                               React) into .ssr-dist/, so Node can render it
//   3. prerender             -> renderToString(renderRoute(route)) for every
//                               route; each route's full HTML document is
//                               written with a baked head (per-route
//                               title/description/keywords/robots/canonical/
//                               Open Graph/Twitter + JSON-LD from
//                               src/data/seo.js) and an inlined <style>, so
//                               there is no render-blocking CSS request.
//   4. outputs               -> dist/index.html (home),
//                               dist/<route>/index.html per content route,
//                               dist/404.html (noindex; no canonical)
//
// Every head tag mirrors what <Seo/> sets at runtime, so a hydrated page's
// head is identical to what the server shipped - which is what lets Vercel
// serve the prerendered files directly instead of an SPA fallback.
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { seo, OG_IMAGE, SITE, BRAND } from '../src/data/seo.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(ROOT, 'dist')
const assetsDir = path.join(dist, 'assets')
const ssrDir = path.join(ROOT, '.ssr-dist')

const escA = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escT = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Per-route output file, keyed the same way seo.js and prerender-entry.jsx
// are keyed. The route key and the URL slug are the same string, so
// 'risk-disclosure' lands at dist/risk-disclosure/index.html with the
// canonical https://ceravindo-platform.com/risk-disclosure.
const OUTPUT = {
  home: 'index.html',
  about: 'about/index.html',
  contact: 'contact/index.html',
  faq: 'faq/index.html',
  terms: 'terms/index.html',
  privacy: 'privacy/index.html',
  'risk-disclosure': 'risk-disclosure/index.html',
  'thank-you': 'thank-you/index.html',
  404: '404.html',
}

// The per-route <title>/meta/canonical/OG/Twitter block - mirrors Seo.jsx
// field for field (og:url falls back to SITE + '/', e.g. on the 404).
function headMeta(conf) {
  const L = []
  L.push(`    <title>${escT(conf.title)}</title>`)
  L.push(`    <meta name="description" content="${escA(conf.description)}" />`)
  if (conf.keywords) L.push(`    <meta name="keywords" content="${escA(conf.keywords)}" />`)
  L.push(`    <meta name="robots" content="${escA(conf.robots)}" />`)
  // Noindex routes carry no canonical. The two are contradictory signals, so
  // the tag is omitted rather than pointed at the homepage.
  if (conf.canonical) L.push(`    <link rel="canonical" href="${escA(conf.canonical)}" />`)

  const og = {
    'og:site_name': BRAND,
    'og:title': conf.title,
    'og:description': conf.description,
    'og:url': conf.canonical || `${SITE}/`,
    'og:image': OG_IMAGE,
    'og:image:alt': conf.ogImageAlt,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:type': conf.type || 'website',
    'og:locale': 'en_AU',
  }
  for (const [k, v] of Object.entries(og)) {
    L.push(`    <meta property="${k}" content="${escA(v)}" />`)
  }

  const tw = {
    'twitter:card': 'summary_large_image',
    'twitter:title': conf.title,
    'twitter:description': conf.description,
    'twitter:image': OG_IMAGE,
  }
  for (const [k, v] of Object.entries(tw)) {
    L.push(`    <meta name="${k}" content="${escA(v)}" />`)
  }
  return L.join('\n')
}

function jsonLd(conf) {
  // Same data-seo-jsonld marker + JSON.stringify output as Seo.jsx, with <
  // escaped so the script content survives HTML parsing intact.
  return (conf.schema || [])
    .map(
      (data) =>
        `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n')
}

function docFor(prefix, staticHead, style, moduleTag, body, conf) {
  const meta = headMeta(conf)
  const ld = jsonLd(conf)
  return `${prefix}
${staticHead.trimEnd()}
${meta}
${ld ? `${ld}\n` : ''}    <style>
${style}
    </style>
    ${moduleTag}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`
}

function log(step, msg) {
  console.log(`[build] ${step} - ${msg}`)
}

// ---------------- 1) client build ----------------
rmSync(dist, { recursive: true, force: true })
log('vite', 'client build…')
execSync('npx vite build', { cwd: ROOT, stdio: 'inherit' })

// ---------------- 2) SSR bundle of the prerender entry ----------------
rmSync(ssrDir, { recursive: true, force: true })
log('vite', 'SSR build of prerender entry…')
execSync('npx vite build --ssr scripts/prerender-entry.jsx --outDir .ssr-dist', {
  cwd: ROOT,
  stdio: 'inherit',
})

// Everything from here on is wrapped so a failed prerender cannot leave
// .ssr-dist behind - a stale directory makes the next failure harder to read.
try {
  // ---------------- 3) render every route to markup ----------------
  //
  // filter(), not find(): find() silently takes the first match, so a build
  // that emitted two bundles would pick one arbitrarily and the failure would
  // surface much later as wrong content on a page.
  const ssrFiles = readdirSync(ssrDir).filter(
    (f) => f.startsWith('prerender-entry') && f.endsWith('.js'),
  )
  if (ssrFiles.length !== 1) {
    throw new Error(`Expected 1 SSR bundle, found ${ssrFiles.length}: ${ssrFiles.join(', ')}`)
  }
  const { default: prerender } = await import(
    pathToFileURL(path.join(ssrDir, ssrFiles[0])).href
  )
  const pages = prerender()

  // ---------------- 4) assemble full HTML documents ----------------
  const tpl = readFileSync(path.join(dist, 'index.html'), 'utf8')
  const headOpen = tpl.indexOf('<head>')
  const marker = '<!-- Primary metadata'
  const headStart = headOpen + '<head>'.length
  const staticEnd = tpl.indexOf(marker, headStart)
  if (headOpen < 0 || staticEnd < 0) {
    throw new Error('Could not locate <head> / title marker in built index.html')
  }

  const prefix = tpl.slice(0, headOpen + '<head>'.length)
  const staticHead = tpl.slice(headStart, staticEnd)

  const entryMatch = tpl.match(/<script type="module"[^>]*src="([^"]+\.js)"/)
  if (!entryMatch) throw new Error('Entry module script not found in built index.html')
  const entrySrc = entryMatch[1]
  const moduleTag = `<link rel="modulepreload" crossorigin href="${entrySrc}">\n    <script type="module" crossorigin src="${entrySrc}"></script>`

  const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
  if (cssFiles.length !== 1) {
    throw new Error(
      `Expected exactly 1 CSS file, found ${cssFiles.length}: ${cssFiles.join(', ')}\n` +
        'All styling must live in src/index.css - the build inlines it into every page.',
    )
  }
  const css = readFileSync(path.join(assetsDir, cssFiles[0]), 'utf8')

  let wrote = 0
  for (const [route, rel] of Object.entries(OUTPUT)) {
    const conf = seo[route]
    if (!conf) throw new Error(`No seo config for route "${route}"`)
    const body = pages[route]
    if (typeof body !== 'string') throw new Error(`No prerendered markup for route "${route}"`)

    const html = docFor(prefix, staticHead, css, moduleTag, body, conf)
    const out = path.join(dist, rel)
    mkdirSync(path.dirname(out), { recursive: true })
    writeFileSync(out, html)

    // Per-route post-write assertions. This is the check that catches the
    // whole class of bug where a route silently renders the wrong tree - the
    // head says one thing and the body is the homepage, and nothing else in
    // the build would notice.
    if (!html.includes(`<title>${escT(conf.title)}</title>`)) {
      throw new Error(`${route}: title was not baked into ${rel}`)
    }
    if (conf.canonical && !html.includes(`rel="canonical" href="${escA(conf.canonical)}"`)) {
      throw new Error(`${route}: canonical was not baked into ${rel}`)
    }
    if (!conf.canonical && html.includes('rel="canonical"')) {
      throw new Error(`${route}: ${rel} is noindex but carries a canonical`)
    }
    if (body.length < 500) {
      throw new Error(`${route}: rendered body is suspiciously small (${body.length} chars)`)
    }
    wrote++
  }

  rmSync(path.join(assetsDir, cssFiles[0]))

  log('done', `wrote ${wrote} prerendered HTML files (CSS inlined, ${cssFiles[0]} deleted)`)
} finally {
  rmSync(ssrDir, { recursive: true, force: true })
}
