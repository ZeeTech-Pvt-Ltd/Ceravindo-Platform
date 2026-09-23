// Renders the page illustrations into public/, as WebP.
//
//   npm run images
//
// Every image here is drawn from scratch in SVG and rasterised - nothing is
// sourced, downloaded or stock. That matters for two reasons: the palette has
// to match the site's tokens, and a page carrying a stock photo of a trading
// floor would be publishing a picture of a business it is not.
//
// Output is committed. This is not part of `npm run build`.
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public')

// Mirrors the tokens in src/index.css. Kept in step by hand; a stale hex here
// is visible the moment the image is looked at.
const PANEL = '#12150C'
const PANEL_2 = '#1B2011'
const LINE = 'rgba(255,255,255,0.07)'
const UP = '#93D94F'
const DOWN = '#F2825F'
const PAPER = '#FBFAF7'

// A deterministic walk so the chart is identical on every run - a build step
// that produces a different image each time makes for noisy diffs.
function seeded(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * The FAQ hero.
 *
 * A market chart with a large question mark behind it - "questions about the
 * data", which is what the page is. Drawn at 1400x1000 so it stays crisp at
 * the ~560px it is displayed at on a 2x screen.
 */
function faqHero() {
  const W = 1400
  const H = 1000
  const rnd = seeded(20260923)

  // Candles across the lower two thirds.
  const N = 26
  const mid = H * 0.66
  let price = 0
  const candles = Array.from({ length: N }, (_, i) => {
    const open = price
    const close = open + (rnd() - 0.42) * 3.4
    const high = Math.max(open, close) + rnd() * 1.5
    const low = Math.min(open, close) - rnd() * 1.5
    price = close
    return { i, open, close, high, low }
  })

  const highs = candles.map((c) => c.high)
  const lows = candles.map((c) => c.low)
  const max = Math.max(...highs)
  const min = Math.min(...lows)
  const span = max - min || 1

  const slot = (W - 160) / N
  const y = (v) => mid + 210 - ((v - min) / span) * 340
  const bodyW = slot * 0.46

  const body = candles
    .map((c) => {
      const x = 80 + c.i * slot + slot / 2
      const rising = c.close >= c.open
      const stroke = rising ? UP : DOWN
      const top = y(Math.max(c.open, c.close))
      const bottom = y(Math.min(c.open, c.close))
      return `
      <line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${y(c.high).toFixed(1)}" y2="${y(c.low).toFixed(1)}" stroke="${stroke}" stroke-width="3"/>
      <rect x="${(x - bodyW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bodyW.toFixed(1)}" height="${Math.max(bottom - top, 5).toFixed(1)}" rx="3" fill="${stroke}"/>`
    })
    .join('')

  const grid = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => `<line x1="0" x2="${W}" y1="${(90 + i * ((H - 180) / 6)).toFixed(0)}" y2="${(90 + i * ((H - 180) / 6)).toFixed(0)}" stroke="${LINE}" stroke-width="2"/>`)
    .join('')

  const cols = Array.from({ length: 8 }, (_, i) => `<line y1="0" y2="${H}" x1="${(i * W) / 7}" x2="${(i * W) / 7}" stroke="${LINE}" stroke-width="2"/>`).join('')

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PANEL}"/>
      <stop offset="1" stop-color="${PANEL_2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.3" r="0.62">
      <stop offset="0" stop-color="${UP}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${UP}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g>${grid}${cols}</g>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- The question mark, large and behind the chart. Arial rather than the
       site's webfont: librsvg can only reach fonts installed on the machine,
       and a WOFF2 in public/fonts is not one of them. -->
  <text x="${W * 0.7}" y="${H * 0.66}" font-family="Georgia, 'Times New Roman', serif"
        font-weight="700" font-size="${H * 0.82}" fill="${PAPER}" fill-opacity="0.07"
        text-anchor="middle">?</text>

  <g>${body}</g>
</svg>
`
}

async function main() {
  mkdirSync(OUT, { recursive: true })

  const svg = faqHero()
  const webp = await sharp(Buffer.from(svg)).webp({ quality: 82, effort: 6 }).toBuffer()
  writeFileSync(path.join(OUT, 'faq-hero.webp'), webp)

  const meta = await sharp(webp).metadata()
  if (meta.format !== 'webp') throw new Error(`expected webp, got ${meta.format}`)

  console.log(`faq-hero.webp  ${meta.width}x${meta.height}  ${(webp.length / 1024).toFixed(1)} KB`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
