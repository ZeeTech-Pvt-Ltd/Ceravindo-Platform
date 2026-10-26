# Ceravindo — ceravindo-platform.com

An AI-assisted market research platform for Australian investors — a lead-generation
site built as a **Next.js App Router static export**.

## Stack

- **Next.js 16 App Router** with `output: 'export'` — every route is prerendered
  to its own HTML file at build time
- **React 19**
- **Plain CSS** — one stylesheet (`app/globals.css`), design tokens as custom
  properties, no CSS framework
- **Fonts self-hosted** through `next/font/local`; flags are local SVG files, and
  the only third-party runtime request is Google Analytics

## Getting started

```bash
npm install
npm run dev       # dev server on http://localhost:3000
npm run build     # static export into out/
npm run images    # regenerate og-image.png, favicon art, FAQ illustration, and
                  # convert anything in source-images/ to public/*.webp
npm run lint      # oxlint
```

There is no `next start` with `output: 'export'` — the build is static files.
To preview it the way Vercel will:

```bash
node .arttmp/serve-dist.mjs 4180
```

## How the build works

`npm run build` runs `next build`, which renders every route to `out/<route>.html`
with its `<head>`, JSON-LD and the stylesheet linked. The routes are directories
under `app/`:

```
app/page.jsx              ->  out/index.html
app/about/page.jsx        ->  out/about.html
app/contact/page.jsx      ->  out/contact.html
…
app/not-found.jsx         ->  out/404.html
```

Each page is four lines: `export const metadata = pageMetadata('about')`, a
`<JsonLd route="about" />`, and the component. The head comes from
`src/lib/metadata.js`, which maps `src/data/seo.js` onto Next's Metadata API, so
there is still one place that owns titles, descriptions and canonicals.

Three consequences worth knowing before editing:

- **`'use client'` is required** on any component with a hook. The list is in
  `CLAUDE.md`; adding a hook to a server component fails the build.
- **Metadata is exported, not written as tags.** Do not add `<title>` or
  `<meta>` by hand in a page — `pageMetadata()` owns them.
- **The reveal animation is gated on `@media (scripting: enabled)`**, not on a
  class added to `<html>`. Next hydrates `<html>`'s attributes, so an inline
  script setting a class there is a hydration mismatch.

## The lead form

`src/components/RegistrationForm.jsx` (rendered on the homepage `#register`
section and on `/contact`) submits to the lead relay as JSON:

```json
{ "email": "…", "firstName": "…", "lastName": "…",
  "password": "Lh23s3", "phone": "+61412345678", "offerName": "Ceravindo-Site" }
```

- `Content-Type: application/json` is **required** — the relay does not parse a
  form-encoded body and forwards six empty fields if you send one.
- `offerName` is what routes the lead to this brand. Omitting it sends leads to a
  shared default funnel. It lives in `src/lib/submitLead.js`.
- The visitor's IP is **not** sent; the relay adds it server-side.
- The four input ids are exactly `firstName`, `lastName`, `email` and `phone`. The
  verification harness and password managers both depend on those names.

A hidden honeypot field (`.field-hp`) blocks bot submissions, and any server error
is either mapped onto the field it names or shown in a banner — the relay's
internal `(#abc12)` support codes are stripped before display.

The relay was probed once against the live endpoint (2026-09-23), which confirmed
three things worth keeping: it reads the JSON body (a form-encoded body arrives as
six empty fields), `offerName: 'Ceravindo-Site'` is what it forwards downstream so
leads route to this brand rather than a shared funnel, and the error codes in
`FIELD_BY_ERROR` resolve the way the table assumes. The visitor's IP is added by
the relay, not sent by the client.

## Images

Two kinds, handled two ways.

**Generated** — the favicon art, the OG card, the apple-touch icon and the FAQ
illustration are all drawn in SVG inside `scripts/` and rasterised by sharp.
Nothing is downloaded, so the palette always matches `app/globals.css`. Run
`npm run images` after changing a token.

**Supplied** — photographs and illustrations that arrive by hand go in
`source-images/`, never in `public/`. `npm run images` converts them to WebP at
1400px into `public/`, and the build copies `public/` verbatim — so a 1.5 MB
PNG left in there ships on every deploy even though the page loads the WebP.
That is not hypothetical: four supplied PNGs once added 6.2 MB to a 12 MB
build. `verify-ssg.mjs` now fails if a stray PNG or anything over 400 KB
reaches `out/`.

Images referenced from `src/data/content.js` carry explicit `width` and
`height` so the row reserves space before they load.

## Content rules

The site is written to be defensible, and the copy rules are load-bearing rather
than stylistic:

- **No figure appears unless the operator supplied it.** Unknown numbers are `null`
  in `src/data/content.js` and render through `<Placeholder/>`, which is deliberately
  conspicuous in every environment so one cannot ship unnoticed.
- **No performance claims, customer counts, ratings, testimonials, or invented
  AFSL/ABN numbers.** The structured-data `offers` block is emitted only when
  `MIN_DEPOSIT_AUD` is a real number.
- **Every claim states its limit.** The "what it cannot tell you" half of the
  research-method section is the point of that section, not a disclaimer on it.
- **No analytics, no pixels, no third-party scripts.** Fonts and flags are served
  from this domain, and the country field is set from the browser timezone rather
  than an IP lookup — which is what lets the privacy policy state that plainly.

## Before launch

1. Fill the operator placeholders in `src/data/legal.js` — legal entity name, ABN/ACN,
   registered office, support email, support hours. They render as visible amber
   tokens; search the built output for `[LEGAL ENTITY NAME]` to confirm.
2. Have the Privacy Policy, Terms of Use and Risk Disclosure reviewed by a qualified
   Australian legal practitioner. The sections marked `reviewRequired` make assertions
   about regulatory status; a dev-build console warning will keep reminding you.
3. Supply `MIN_DEPOSIT_AUD` and any other figures, or delete the corresponding copy.
4. Point the domain and confirm `www` redirects to the apex.

## Verification

The harness in `.arttmp/` (gitignored) is how the build is checked. It needs
Chrome at the path in `CHROME` at the top of each script.

```bash
npm run build
node .arttmp/serve-dist.mjs 4180 &     # serve out/ the way Vercel will

node .arttmp/verify-ssg.mjs            # static: files, head, JSON-LD, banned claims, asset weight
node .arttmp/verify-seo.mjs            # titles, descriptions, heading outline, sitemap, robots
node .arttmp/verify-links.mjs          # every href and asset URL resolves; anchors resolve
node .arttmp/verify-routes.mjs         # every route cold: title, canonical, hydration
node .arttmp/verify-a11y.mjs           # contrast, reduced motion, picker keyboard
node .arttmp/verify-responsive.mjs     # 5 widths x 5 routes: tap targets, text size, clipping
node .arttmp/test-form.mjs             # validation, wire format, error paths, honeypot
node .arttmp/smoke.mjs                 # nav, mobile menu, skip link, FAQ accordion

node .arttmp/check.mjs http://localhost:3000/   # screenshot + structural dump (next dev)
```

`test-form.mjs` intercepts the outgoing request and never contacts the real relay,
so it is safe to run repeatedly. To probe the live endpoint, see `live-probe.mjs` —
the relay rate-limits to **three attempts per five minutes per IP**, so run it once.
