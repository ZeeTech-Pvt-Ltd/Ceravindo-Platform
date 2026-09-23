import { ABOUT, PAGE_CTA } from '../data/content.js'
import PageHero from './PageHero.jsx'
import AboutVisual from './AboutVisuals.jsx'
import TradingDashboard from './TradingDashboard.jsx'
import FinalCta from './FinalCta.jsx'
import Reveal from './Reveal.jsx'
import { Check } from './icons.jsx'

/**
 * About page.
 *
 * The hero sits on the tinted band rather than the page background, so it
 * reads as a distinct opening rather than as the first of the rows beneath
 * it - and it carries the market dashboard, which is the fullest view of the
 * product anywhere on the site.
 *
 * The four sections below alternate sides, each with its own panel: what we
 * gather, what we refuse, how a correction works, how the model runs. The
 * panels are what make each claim legible at a glance - "we don't hold your
 * money" is a sentence, but a list with four crosses against it is a position.
 *
 * Deliberately carries no founder names, no team photographs, no company
 * history, no office address and no figures the operator has not supplied.
 * The reference page this borrows its structure from uses stat counters and a
 * team grid in those slots; both need real numbers and real people, and
 * inventing either on a financial site is the one thing this page cannot do.
 */
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={ABOUT.title}
        lead={ABOUT.lead}
        tone="surface"
        visual={<TradingDashboard />}
      />

      {/* The commitments, as a strip rather than a panel - they read as
          statements about how the site is run, which belong on the page
          itself rather than inside a chart's frame. */}
      <section className="principles" aria-label="How we work">
        <div className="wrap">
          <ul className="principles__list">
            {ABOUT.principles.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60}>
                <Check className="principles__mark" width={17} height={17} />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-sections">
        <div className="wrap">
          {ABOUT.sections.map((section, i) => (
            <div
              className={`about-row${i % 2 === 1 ? ' about-row--flip' : ''}`}
              key={section.title}
            >
              <Reveal className="about-row__copy">
                <span className="about-row__n tnum" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="about-row__title">{section.title}</h2>
                <p className="about-row__body">{section.body}</p>
              </Reveal>

              <Reveal className="about-row__visual" delay={80}>
                <AboutVisual kind={section.visual} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <FinalCta variant="line" {...PAGE_CTA.about} />
    </>
  )
}
