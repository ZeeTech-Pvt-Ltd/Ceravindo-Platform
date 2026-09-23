import { BRAND } from '../data/seo.js'

/**
 * Wordmark.
 *
 * The mark is a rising data line with an end point, drawn inside an olive
 * tile. It replaced a plain "C" in a tile: a single letter says nothing about
 * what the product is, and every other visual on this site is a chart, so the
 * logo is one too. The shape is deliberately three segments - enough to read
 * as a series at 16px in a browser tab, few enough to stay legible there.
 *
 * The same drawing lives in three places and they must stay in step:
 *   - here
 *   - public/favicon.svg
 *   - the data-URI icon in index.html
 * The geometry below is duplicated verbatim in all three rather than shared,
 * because two of them are not React and cannot import it.
 *
 * `onDark` swaps the wordmark for the light text token. It exists because the
 * header sits on paper and the footer does not, and a wordmark in --ink on a
 * near-black footer is invisible - which is a bug this component has had once
 * already, when a tone was added for a footer that was still light.
 */
export default function Logo({ onDark = false }) {
  return (
    <span className={`logo${onDark ? ' logo--on-dark' : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        {/* Literal colours, not tokens: a logo is fixed artwork, and the mark
            has to render identically in the tab icon and the OG card where no
            stylesheet is loaded. Olive fill, paper line. */}
        <svg viewBox="0 0 32 32" focusable="false">
          <rect width="32" height="32" rx="9" fill="#4A5D23" />
          <path
            d="M7 22 12.5 16.5 17 20 25 10"
            fill="none"
            stroke="#FBFAF7"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="10" r="2.6" fill="#FBFAF7" />
        </svg>
      </span>
      <span className="logo__word">{BRAND}</span>
    </span>
  )
}
