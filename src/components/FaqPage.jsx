import Faq from './Faq.jsx'
import PageHero from './PageHero.jsx'
import FinalCta from './FinalCta.jsx'
import Reveal from './Reveal.jsx'
import { PAGE_CTA } from '../data/content.js'
import { Check, Close } from './icons.jsx'

/**
 * The FAQ page.
 *
 * The hero carries an illustration rather than a panel of text: twelve
 * questions below already say what the page is, and an image at the top gives
 * the eye somewhere to land first. The image is drawn from scratch in
 * scripts/make-illustrations.mjs and rasterised to WebP - no stock, so the
 * palette matches the site and nothing in it depicts a business this is not.
 *
 * The quick answers moved out of the hero and into a strip beneath it, the
 * same treatment the About page's commitments get. They answer the four
 * questions people actually arrive with, so they belong above the fold-ish
 * but not inside a chart's frame.
 */
const SHORT = [
  { ok: true, text: 'General information, never personal advice' },
  { ok: true, text: 'No trade execution and no client money' },
  { ok: false, text: 'We never ask for card or bank details' },
  { ok: true, text: 'Close your account whenever you like' },
]

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Frequently asked questions"
        lead="How the research is produced, what the platform does and does not do, and what happens to the details you enter."
        tone="surface"
        visual={
          <img
            className="page-hero__image"
            src="/faq-hero.webp"
            alt="A rising candlestick chart on a dark panel, behind a large question mark"
            width="1400"
            height="1000"
            loading="eager"
            decoding="async"
          />
        }
      />

      <section className="principles" aria-label="The short version">
        <div className="wrap">
          <ul className="principles__list">
            {SHORT.map((row, i) => (
              <Reveal as="li" key={row.text} delay={i * 60}>
                {row.ok ? (
                  <Check className="principles__mark" width={17} height={17} />
                ) : (
                  <Close className="principles__mark principles__mark--no" width={17} height={17} />
                )}
                <span>{row.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faq-page">
        <div className="wrap wrap--narrow">
          {/* The accordion renders its questions as h3, and this page passes
              heading={false} because the hero's h1 already says what the list
              is. That left the outline jumping h1 to h3 - which is the level
              a screen reader navigates by, so the skip is real even though
              nothing looks wrong. This heading restores the h2 step and is
              never seen. */}
          <h2 className="sr-only">All questions</h2>
          <Faq heading={false} />
        </div>
      </section>

      <FinalCta variant="bars" {...PAGE_CTA.faq} />
    </>
  )
}
