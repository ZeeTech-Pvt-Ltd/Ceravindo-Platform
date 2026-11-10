import { WHY } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

/**
 * Why traders use the platform.
 *
 * These are differences in how the product works, not claims about being the
 * best: the reasoning is published, the simulator exists, the tools share one
 * dataset, the limits are stated, and the account stays with your broker.
 * Nothing here compares the site to a named competitor or invents a statistic.
 */
export default function Why() {
  return (
    <section className="section" id="why">
      <div className="wrap">
        <SectionHead eyebrow={WHY.eyebrow} title={WHY.title} lead={WHY.lead} />

        <div className="why">
          {WHY.points.map((point, i) => (
            <Reveal className="why__item" key={point.title} delay={i * 55}>
              <span className="why__n tnum" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="why__title">{point.title}</h3>
              <p className="why__body">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
