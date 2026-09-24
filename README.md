# Ceravindo — ceravindo-platform.com

An AI-assisted market research platform for Australian investors — a lead-generation
site built as a **statically prerendered React SPA**.

## Stack

- **React 19 + Vite 8** — no router dependency; clean-path routing is hand-rolled
- **Static prereander (SSG)** — every route ships as a real HTML file with its own
  `<head>`, JSON-LD and inlined CSS
- **Plain CSS** — one stylesheet (`src/index.css`), design tokens as custom properties
- **No third-party runtime requests** — fonts and flags are self-hosted

## Getting started

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # full SSG build into dist/
npm run preview   # note: Vite's preview applies an SPA fallback — see below
npm run images    # regenerate og-image.png, favicon art, FAQ illustration, and
                  # convert anything in source-images/ to public/*.webp
npm run lint      # oxlint
```

`npm run preview` is not a faithful preview of production: it falls back to
`index.html` for unknown paths, so a 404 renders the homepage with a 200. Use
the harness instead, which serves `dist/` the way Vercel does:

```bash
node .arttmp/serve-dist.mjs 4180
```

## How the build works

`npm run build` runs `scripts/build.mjs`, which does four things:

1. `vite build` — the client bundle into `dist/` (empty `#root`)
2. `vite build --ssr scripts/prerender-entry.jsx` — compiles the render entry for Node
3. `renderToString(renderRoute(route))` for all nine routes
4. Assembles each page as a complete HTML document with a baked `<head>` and the
   single CSS file inlined, then deletes the CSS asset

**`src/renderRoute.jsx` is the single source of truth for what a route renders.**
It is used by both the client (`App.jsx`) and the build. If the two ever diverge,
every page load starts with React discarding the server's markup — so anything
that reads the DOM or a browser API must run in an effect, never during render.

Two consequences worth knowing before editing:

- **All styling must stay in `src/index.css`.** The build asserts there is exactly
  one CSS file in the bundle so it can inline it. A second stylesheet (CSS modules,
  a co-located `.css`) fails the build rather than shipping a render-blocking request.
- **`index.html` needs its `<!-- Primary metadata` comment.** Everything above it is
  copied into all nine pages; everything below is replaced per route.

`src/main.jsx` calls `hydrateRoot` when `#root` already has children, and
`createRoot` otherwise. That single branch is what makes the prerender work.

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
Nothing is downloaded, so the palette always matches `src/index.css`. Run
`npm run images` after changing a token.

**Supplied** — photographs and illustrations that arrive by hand go in
`source-images/`, never in `public/`. `npm run images` converts them to WebP at
1400px into `public/`, and the build copies `public/` verbatim — so a 1.5 MB
PNG left in there ships on every deploy even though the page loads the WebP.
That is not hypothetical: four supplied PNGs once added 6.2 MB to a 12 MB
build. `verify-ssg.mjs` now fails if a stray PNG or anything over 400 KB
reaches `dist/`.

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
node .arttmp/serve-dist.mjs 4180 &     # serve dist/ the way Vercel will

node .arttmp/verify-ssg.mjs            # static: files, head, JSON-LD, banned claims, asset weight
node .arttmp/verify-seo.mjs            # titles, descriptions, heading outline, sitemap, robots
node .arttmp/verify-links.mjs          # every href and asset URL resolves; anchors resolve
node .arttmp/verify-routes.mjs         # every route cold: title, canonical, hydration
node .arttmp/verify-a11y.mjs           # contrast, reduced motion, picker keyboard
node .arttmp/verify-responsive.mjs     # 5 widths x 5 routes: tap targets, text size, clipping
node .arttmp/test-form.mjs             # validation, wire format, error paths, honeypot

node .arttmp/check.mjs http://localhost:5173/   # screenshot + structural dump (dev)
```

`test-form.mjs` intercepts the outgoing request and never contacts the real relay,
so it is safe to run repeatedly. To probe the live endpoint, see `live-probe.mjs` —
the relay rate-limits to **three attempts per five minutes per IP**, so run it once.
