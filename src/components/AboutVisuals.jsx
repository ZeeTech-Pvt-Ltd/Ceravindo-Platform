import MiniChart from './MiniChart.jsx'
import { marketRows, formatPrice, formatChange } from '../data/market.js'
import { Check, Close } from './icons.jsx'

/**
 * The panel beside each About section.
 *
 * Four sections, four different panels, because the sections make four
 * different claims and one repeated chart would not distinguish them:
 *
 *   data        four markets with their series   - what is gathered
 *   boundary    a list of what we are not        - the limits, drawn
 *   correction  a reading and its revision       - the standards, in practice
 *   process     inputs feeding a reviewed brief  - how the model is used
 *
 * These are drawn rather than photographed on purpose: a stock photo of a
 * trading floor would define nothing, and every other visual on the site is
 * built from the same data, so these are too. The market figures are the
 * generated ones from src/data/market.js.
 */

function Panel({ title, children }) {
  return (
    <div className="about-panel">
      <div className="about-panel__head">
        <span className="badge-sample">{title}</span>
      </div>
      {children}
    </div>
  )
}

const NOT = ['A broker or dealer', 'A financial adviser', 'A fund manager or custodian', 'Ever holding your money']

const PRINCIPLES = [
  'Every figure is sourced before it is published',
  'Uncertainty is stated, not rounded away',
  'A wrong reading is corrected in public, not deleted',
  'No performance claims and no testimonials',
]

export default function AboutVisual({ kind }) {
  /* The hero's panel. It carries the four commitments rather than another
     market view - the "what we gather" panel belongs to the section that
     makes that claim, and showing it twice would say nothing twice. */
  if (kind === 'principles') {
    return (
      <Panel title="How we work">
        <ul className="about-not about-not--principles">
          {PRINCIPLES.map((item) => (
            <li key={item}>
              <Check className="about-not__mark" width={16} height={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Panel>
    )
  }

  if (kind === 'data') {
    return (
      <Panel title="Public data · illustrative">
        <ul className="about-rows">
          {marketRows.slice(0, 4).map((row) => (
            <li key={row.key}>
              <span className="about-rows__symbol">{row.symbol}</span>
              <span className="about-rows__chart">
                <MiniChart
                  series={row.series.slice(-24)}
                  stroke={row.change >= 0 ? 'var(--chart-up)' : 'var(--chart-down)'}
                  fill={row.change >= 0 ? 'var(--chart-up)' : 'var(--chart-down)'}
                />
              </span>
              <span className="about-rows__price tnum">${formatPrice(row.price)}</span>
              <span className={`about-rows__change tnum${row.change >= 0 ? ' is-up' : ' is-down'}`}>
                {formatChange(row.change)}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    )
  }

  if (kind === 'boundary') {
    return (
      <Panel title="What we are not">
        <ul className="about-not">
          {NOT.map((item) => (
            <li key={item}>
              <Close className="about-not__mark" width={16} height={16} />
              <span>{item}</span>
            </li>
          ))}
          <li className="about-not__yes">
            <Check className="about-not__mark" width={16} height={16} />
            <span>A research platform, and only that</span>
          </li>
        </ul>
      </Panel>
    )
  }

  if (kind === 'correction') {
    return (
      <Panel title="Correction record · illustrative">
        <ol className="about-corrections">
          <li>
            <span className="about-corrections__when tnum">14 Aug</span>
            <p className="about-corrections__body is-original">
              Momentum building above the 30-day range on rising volume.
            </p>
          </li>
          <li>
            <span className="about-corrections__when tnum">16 Aug</span>
            <p className="about-corrections__body">Revised: funding turned negative and the reading no longer holds.</p>
          </li>
        </ol>
      </Panel>
    )
  }

  if (kind === 'process') {
    const inputs = ['Price & volume', 'On-chain activity', 'Market sentiment', 'Scheduled events']
    return (
      <Panel title="How the model runs">
        <div className="about-flow">
          <ul className="about-flow__inputs">
            {inputs.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <span className="about-flow__arrow" aria-hidden="true" />
          <div className="about-flow__stage">
            <span className="about-flow__stage-title">Model reads</span>
            <span className="about-flow__stage-sub">Public data only</span>
          </div>
          <span className="about-flow__arrow" aria-hidden="true" />
          <div className="about-flow__stage about-flow__stage--end">
            <span className="about-flow__stage-title">Reviewed brief</span>
            <span className="about-flow__stage-sub">Checked against its sources</span>
          </div>
        </div>
      </Panel>
    )
  }

  return null
}
