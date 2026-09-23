import { FINAL_CTA } from '../data/content.js'
import FinalCtaBackdrop from './FinalCtaBackdrop.jsx'
import Reveal from './Reveal.jsx'
import { ArrowRight } from './icons.jsx'

/**
 * The closing band, on every page.
 *
 * Same design everywhere - olive-deep fill, a chart running off all four
 * edges, headline left and the button right - so the end of every page reads
 * as the end of the same site. Only the drawing behind it changes, one chart
 * type per page; see FinalCtaBackdrop.jsx.
 *
 * White on --accent-deep measures 11.96:1. The gradient in .final::after
 * keeps that contrast over the chart rather than relying on the chart being
 * faint.
 */
export default function FinalCta({
  variant = 'candles',
  title,
  body,
  label,
  href = '#register',
}) {
  return (
    <section className="final">
      <FinalCtaBackdrop variant={variant} />
      <div className="wrap final__inner">
        <Reveal>
          <h2 className="final__title">{title ?? FINAL_CTA.title}</h2>
          <p className="final__body">{body ?? FINAL_CTA.body}</p>
        </Reveal>
        <Reveal delay={80}>
          <a className="btn btn--light btn--lg" href={href}>
            {label ?? FINAL_CTA.primaryCta.label}
            <ArrowRight className="btn__arrow" width={18} height={18} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
