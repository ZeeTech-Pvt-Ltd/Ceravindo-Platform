import { COVERAGE } from '../data/content.js'
import { marketRows, formatChange } from '../data/market.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import MiniChart from './MiniChart.jsx'

/**
 * The four markets covered.
 *
 * Each card carries the price series for a representative market rather than
 * an icon. That was the fix for this section reading as filler: it sat
 * directly after the method section's charts, and four small icon tiles with
 * two lines of text were a visible step down. The series are the same ones
 * the rest of the page draws, so the section is consistent with the hero, the
 * brief card and the input cards.
 *
 * No instrument count appears anywhere. The sibling sites publish figures
 * like "300+ markets", which nobody can check and which the operator has not
 * supplied - so the section says what is covered, not how much.
 */
const byKey = new Map(marketRows.map((r) => [r.key, r]))

export default function Coverage() {
  return (
    <section className="section section--surface" id="coverage">
      <div className="wrap">
        <SectionHead eyebrow={COVERAGE.eyebrow} title={COVERAGE.title} lead={COVERAGE.lead} />

        <div className="coverage">
          {COVERAGE.items.map((item, i) => {
            const row = byKey.get(item.seriesKey)
            const up = (row?.change ?? 0) >= 0
            return (
              <Reveal className="coverage__item" key={item.title} delay={i * 70}>
                <div className="coverage__head">
                  <h3 className="coverage__title">{item.title}</h3>
                  {row && (
                    <span className="coverage__symbol tnum">{row.symbol}</span>
                  )}
                </div>

                {row && (
                  <>
                    <div className="coverage__chart">
                      <MiniChart
                        series={row.series}
                        stroke={up ? 'var(--sage-ink)' : 'var(--danger)'}
                        fill={up ? 'var(--sage)' : 'var(--danger)'}
                        showBaseline
                      />
                    </div>
                    <p className={`coverage__change tnum${up ? ' is-up' : ' is-down'}`}>
                      {formatChange(row.change)}
                      <span className="coverage__period"> illustrative</span>
                    </p>
                  </>
                )}

                <p className="coverage__body">{item.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
