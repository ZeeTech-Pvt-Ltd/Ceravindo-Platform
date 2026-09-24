import MiniChart from './MiniChart.jsx'
import { marketRows, formatPrice, formatChange } from '../data/market.js'

/**
 * The visual beside "What is Ceravindo?".
 *
 * Where the hero shows the live market view, this shows the thing the section
 * is actually describing: the output. A brief has a finding, a confidence
 * level and named sources, so the card is laid out as those three things
 * rather than as another price panel - otherwise the page would say the same
 * thing twice.
 *
 * Same provenance rule as the hero panel: the figures come from
 * src/data/market.js and are generated. The "Brief · illustrative" badge is
 * load-bearing and comes off only when a real feed replaces that file.
 */
const SOURCES = ['Price & volume', 'On-chain', 'Sentiment', 'Macro calendar']

export default function WhatIsVisual() {
  const row = marketRows[0]
  const confidence = 78
  const up = row.change >= 0

  return (
    <div className="brief-card">
      <div className="brief-card__head">
        <span className="badge-sample">Brief</span>
        <span className="brief-card__symbol">{row.symbol}</span>
      </div>

      <p className="brief-card__finding">
        Momentum building above the 30-day range on rising volume, with funding still
        neutral.
      </p>

      <div className="brief-card__chart">
        <MiniChart
          series={row.series}
          stroke={up ? 'var(--chart-up)' : 'var(--chart-down)'}
          fill={up ? 'var(--chart-up)' : 'var(--chart-down)'}
          showBaseline
        />
      </div>

      <div className="brief-card__price">
        <span className="tnum">${formatPrice(row.price)}</span>
        <span className={`tnum${up ? ' is-up' : ' is-down'}`}>{formatChange(row.change)}</span>
      </div>

      {/* Confidence is the part of a brief that a signal service never shows,
          so it gets its own row rather than being folded into the header. */}
      <div className="brief-card__confidence">
        <div className="brief-card__confidence-row">
          <span>Model confidence</span>
          <span className="tnum">{confidence}%</span>
        </div>
        <div
          className="meter"
          role="img"
          aria-label={`Model confidence ${confidence} percent`}
        >
          <span className="meter__fill" style={{ width: `${confidence}%` }} />
        </div>
      </div>

      <div className="brief-card__sources">
        <p className="brief-card__sources-label">Sources</p>
        <ul>
          {SOURCES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
