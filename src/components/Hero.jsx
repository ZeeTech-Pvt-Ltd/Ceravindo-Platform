import { HERO } from '../data/content.js'
import HeroVisual from './HeroVisual.jsx'
import { Check, ArrowRight } from './icons.jsx'

/**
 * Homepage hero.
 *
 * The right-hand side is a market panel - price, change, chart, watchlist -
 * because that is what tells a visitor in the first second what kind of
 * product this is. An earlier version put the research method there instead
 * and the page read as a publication rather than a trading tool.
 *
 * The figures in that panel are generated, not live, and carry an
 * "Illustrative data" badge. See src/data/market.js.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="hero__title">{HERO.title}</h1>
          <p className="lead hero__lead">{HERO.lead}</p>

          <ul className="checks">
            {HERO.checks.map((item) => (
              <li key={item}>
                <Check className="checks__icon" width={18} height={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#register">
              {HERO.primaryCta.label}
              <ArrowRight className="btn__arrow" width={18} height={18} />
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
