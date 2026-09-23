// Renders public/og-image.png (1200x630) and public/apple-touch-icon.png.
//
// The social card is generated rather than hand-drawn so the palette and the
// wordmark stay tied to the design tokens - if the accent changes, re-running
// `npm run images` brings the card with it. Output is committed; this is not
// part of `npm run build`.
//
//   npm run images
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public')

// Mirrors the tokens in src/index.css. Kept in step by hand - this script is
// run rarely and a stale hex here is visible the moment the card is looked at.
const BG = '#FBFAF7'
const INK = '#14161A'
const ACCENT = '#4A5D23'
const MUTED = '#6B675E'
const SAGE = '#8A9A5B'
const BORDER = '#E4E0D6'

// The site sets headings in Instrument Sans, but this SVG is rasterised by
// librsvg, which can only reach fonts installed on the machine - not the
// WOFF2 in public/fonts. A system sans is the closest thing that renders
// reliably here. The card is a static asset, so an exact match matters less
// than the palette and layout being right.
const SANS = "Helvetica, Arial, sans-serif"

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- Hairline frame, echoing the card borders on the site. -->
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="none" stroke="${BORDER}" stroke-width="2"/>

  <!-- Mark: the same olive tile and data line as the header logo and favicon,
       drawn at 2x from the 32-unit source geometry. -->
  <g transform="translate(88 88) scale(2)">
    <rect width="32" height="32" rx="9" fill="${ACCENT}"/>
    <path d="M7 22 12.5 16.5 17 20 25 10" fill="none" stroke="${BG}"
          stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="25" cy="10" r="2.6" fill="${BG}"/>
  </g>

  <text x="172" y="134" font-family="${SANS}" font-weight="600"
        font-size="38" fill="${INK}">Ceravindo</text>

  <!-- Headline. Tracking is negative to match the h1 treatment on the page. -->
  <text x="88" y="288" font-family="${SANS}" font-weight="600" letter-spacing="-1.6"
        font-size="64" fill="${INK}">Research first.</text>
  <text x="88" y="368" font-family="${SANS}" font-weight="600" letter-spacing="-1.6"
        font-size="64" fill="${INK}">Decisions yours.</text>

  <rect x="88" y="408" width="96" height="5" rx="2.5" fill="${SAGE}"/>

  <text x="88" y="470" font-family="${SANS}" font-size="25" fill="${MUTED}">AI-assisted market research for Australian investors.</text>
  <text x="88" y="508" font-family="${SANS}" font-size="25" fill="${MUTED}">Published with its sources and its limits.</text>

  <text x="88" y="560" font-family="${SANS}" font-size="21" fill="${MUTED}">ceravindo-platform.com</text>
</svg>
`

// Same 32-unit geometry as public/favicon.svg and the data-URI icon in
// index.html, scaled to the 180px canvas iOS wants.
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${ACCENT}"/>
  <path d="M7 22 12.5 16.5 17 20 25 10" fill="none" stroke="${BG}"
        stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="25" cy="10" r="2.6" fill="${BG}"/>
</svg>
`

async function main() {
  mkdirSync(OUT, { recursive: true })

  const og = await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toBuffer()
  writeFileSync(path.join(OUT, 'og-image.png'), og)

  const icon = await sharp(Buffer.from(iconSvg)).png({ compressionLevel: 9 }).toBuffer()
  writeFileSync(path.join(OUT, 'apple-touch-icon.png'), icon)

  // Self-check: the dimensions are the whole point of an OG card, and a
  // silent resize would only show up as a cropped preview on someone's feed.
  const meta = await sharp(og).metadata()
  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`og-image.png is ${meta.width}x${meta.height}, expected 1200x630`)
  }

  console.log(`og-image.png      ${meta.width}x${meta.height}  ${(og.length / 1024).toFixed(1)} KB`)
  console.log(`apple-touch-icon  ${(icon.length / 1024).toFixed(1)} KB`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
