import { marketRows, formatPrice, formatChange } from '../data/market.js'

/**
 * Scrolling market strip.
 *
 * The list is rendered twice and translated by -50%, which is what makes the
 * loop seamless - the second copy is what the viewport sees while the first
 * is off-screen. The duplicate is aria-hidden so a screen reader reads the
 * symbols once.
 *
 * Under prefers-reduced-motion the animation is switched off in CSS and the
 * row wraps instead, so the figures stay readable rather than sliding past.
 *
 * The figures come from src/data/market.js and are generated, not fetched.
 * The sr-only line above keeps that fact available to a screen reader; there
 * is no visible label, at the site owner's request.
 */
function TickerRow({ ariaHidden }) {
  return (
    <ul className="ticker__group" aria-hidden={ariaHidden || undefined}>
      {marketRows.map((row) => (
        <li className="ticker__item" key={row.key}>
          <span className="ticker__symbol">{row.symbol}</span>
          <span className="ticker__price tnum">{formatPrice(row.price)}</span>
          <span className={`ticker__change tnum${row.change >= 0 ? ' is-up' : ' is-down'}`}>
            {formatChange(row.change)}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Ticker() {
  return (
    <section className="ticker" aria-label="Market snapshot">
      <p className="sr-only">
        Market snapshot. Figures shown are illustrative, not live market data.
      </p>
      <div className="ticker__viewport">
        <div className="ticker__track">
          <TickerRow />
          <TickerRow ariaHidden />
        </div>
      </div>
    </section>
  )
}
