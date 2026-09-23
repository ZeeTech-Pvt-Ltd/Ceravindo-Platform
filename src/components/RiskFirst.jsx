import { RISK } from '../data/content.js'
import RiskVisual from './RiskVisual.jsx'
import Reveal from './Reveal.jsx'
import { Alert } from './icons.jsx'

/**
 * The risk band.
 *
 * Positioned before the sign-up form rather than buried in the footer: a
 * reader should meet the downside before they are asked for a phone number,
 * not after.
 *
 * The olive-deep fill is one of only two dark bands on the page, and the
 * drawdown chart inside it is the one visual on the site that argues against
 * the product. That is deliberate - a risk section illustrated with a rising
 * line would undercut every sentence beside it.
 *
 * The points are numbered so each is a thing the reader can check, rather
 * than a paragraph of caveats they skim past.
 */
export default function RiskFirst() {
  return (
    <section className="risk" id="risk">
      <div className="wrap">
        <Reveal className="risk__head">
          <span className="risk__icon" aria-hidden="true">
            <Alert width={22} height={22} />
          </span>
          <h2 className="risk__title">{RISK.title}</h2>
        </Reveal>

        {/* Sits directly under the heading rather than at the foot of the
            section. It reads as the summary of everything below it - and a
            disclaimer a reader meets before the list, not after, is one they
            have actually read. */}
        <Reveal>
          <p className="risk__lead">{RISK.footnote}</p>
        </Reveal>

        <div className="risk__grid">
          <ol className="risk__list">
            {RISK.points.map((point, i) => (
              <Reveal as="li" key={point} delay={i * 45}>
                <span className="risk__n tnum" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{point}</span>
              </Reveal>
            ))}
          </ol>

          <Reveal className="risk__visual" delay={80}>
            <RiskVisual />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
