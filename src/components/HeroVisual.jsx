import { useState } from 'react'
import MiniChart from './MiniChart.jsx'
import { marketRows, featuredMarket, TIMEFRAMES, formatPrice, formatChange } from '../data/market.js'

/**
 * The hero's market panel.
 *
 * This is what makes the page read as a trading product rather than a
 * publication: a price, a change, a chart and a watchlist, in the dark panel
 * that every trading interface uses.
 *
 * The "Illustrative" badge is not decoration and must not be removed while
 * the numbers come from src/data/market.js. They are generated, not fetched,
 * and an unlabelled generated price on a financial page is a fabricated
 * claim.
 */
export default function HeroVisual() {
  const [timeframe, setTimeframe] = useState('1D')
  const up = featuredMarket.change >= 0

  // The series is the same walk at every timeframe; only the window shown
  // changes. Enough to make the control feel real without inventing a second
  // dataset that would then need its own provenance.
  const window = { '1H': 12, '1D': 24, '1W': 38, '1M': 48 }[timeframe] ?? 48
  const series = featuredMarket.series.slice(-window)

  return (
    <div className="market-panel">
      <div className="market-panel__head">
        <span className="badge-sample">
          <span className="badge-sample__dot" aria-hidden="true" />
          Illustrative data
        </span>
        <span className="market-panel__market">{featuredMarket.market}</span>
      </div>

      <div className="market-panel__price">
        <div>
          <p className="market-panel__symbol">{featuredMarket.symbol}</p>
          <p className="market-panel__name">{featuredMarket.name}</p>
        </div>
        <div className="market-panel__figures">
          <p className="market-panel__value tnum">${formatPrice(featuredMarket.price)}</p>
          <p className={`market-panel__change tnum${up ? ' is-up' : ' is-down'}`}>
            <span aria-hidden="true">{up ? '▲' : '▼'}</span> {formatChange(featuredMarket.change)}
            <span className="market-panel__period"> today</span>
          </p>
        </div>
      </div>

      <div className="market-panel__chart">
        <MiniChart
          series={series}
          stroke={up ? 'var(--chart-up)' : 'var(--chart-down)'}
          fill={up ? 'var(--chart-up)' : 'var(--chart-down)'}
          showBaseline
        />
      </div>

      <div className="market-panel__timeframes" role="group" aria-label="Chart timeframe">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            type="button"
            className={`tf${tf === timeframe ? ' is-active' : ''}`}
            aria-pressed={tf === timeframe}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <ul className="market-panel__rows">
        {marketRows.slice(1, 5).map((row) => (
          <li key={row.key}>
            <span className="market-panel__row-symbol">{row.symbol}</span>
            <span className="market-panel__row-price tnum">${formatPrice(row.price)}</span>
            <span
              className={`market-panel__row-change tnum${row.change >= 0 ? ' is-up' : ' is-down'}`}
            >
              {formatChange(row.change)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
