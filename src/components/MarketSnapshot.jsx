import { MARKET_SNAPSHOT } from '../data/content.js'
import { marketRows, formatPrice, formatChange } from '../data/market.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import MiniChart from './MiniChart.jsx'

/**
 * Markets at a glance.
 *
 * One card per market family, each carrying a representative instrument with
 * its series and change. The scrolling ticker above does the same job in a
 * strip; this section is the readable version, which is why it only shows one
 * instrument per family rather than all twelve.
 *
 * The figures are generated, so the section carries a visible note. It is
 * called "Market Snapshot" rather than "Live Market Data" for that reason.
 */
const BY_MARKET = ['Crypto', 'Forex', 'Equities', 'Commodities'].map((market) => ({
  market,
  rows: marketRows.filter((r) => r.market === market),
}))

/* One representative per family: the instrument a reader would look at first. */
const LEAD = {
  Crypto: 'btc',
  Forex: 'eur',
  Equities: 'spx',
  Commodities: 'xau',
}

export default function MarketSnapshot() {
  return (
    <section className="section section--surface" id="markets">
      <div className="wrap">
        <SectionHead
          eyebrow={MARKET_SNAPSHOT.eyebrow}
          title={MARKET_SNAPSHOT.title}
          lead={MARKET_SNAPSHOT.lead}
        />

        <div className="coverage">
          {BY_MARKET.map((group, i) => {
            const lead = group.rows.find((r) => r.key === LEAD[group.market]) ?? group.rows[0]
            const up = lead.change >= 0
            return (
              <Reveal className="coverage__item" key={group.market} delay={i * 60}>
                <div className="coverage__head">
                  <h3 className="coverage__title">{group.market}</h3>
                  <span className="coverage__symbol tnum">{lead.symbol}</span>
                </div>

                <div className="coverage__chart">
                  <MiniChart
                    series={lead.series}
                    stroke={up ? 'var(--sage-ink)' : 'var(--danger)'}
                    fill={up ? 'var(--sage)' : 'var(--danger)'}
                    showBaseline
                  />
                </div>

                <p className={`coverage__change tnum${up ? ' is-up' : ' is-down'}`}>
                  ${formatPrice(lead.price)} {formatChange(lead.change)}
                </p>

                <ul className="snapshot__list">
                  {group.rows
                    .filter((r) => r.key !== lead.key)
                    .slice(0, 2)
                    .map((r) => (
                      <li key={r.key}>
                        <span>{r.symbol}</span>
                        <span className={`tnum${r.change >= 0 ? ' is-up' : ' is-down'}`}>
                          {formatChange(r.change)}
                        </span>
                      </li>
                    ))}
                </ul>
              </Reveal>
            )
          })}
        </div>

        <p className="snapshot__note">{MARKET_SNAPSHOT.note}</p>
      </div>
    </section>
  )
}
