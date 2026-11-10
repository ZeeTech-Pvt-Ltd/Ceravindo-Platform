import { SECURITY } from '../data/content.js'
import Reveal from './Reveal.jsx'
import { Shield, Check } from './icons.jsx'

/**
 * Security and trust.
 *
 * Deliberately a dark band: it is the section that has to feel like a
 * commitment rather than marketing, and the darker surface carries that.
 *
 * Every line is a practice this site actually keeps. There are no
 * certifications, audits or compliance badges here because none have been
 * supplied, and inventing one on a financial site would be a false claim.
 */
export default function Security() {
  return (
    <section className="security" id="security">
      <div className="wrap security__inner">
        <Reveal className="security__head">
          <span className="security__icon" aria-hidden="true">
            <Shield width={24} height={24} />
          </span>
          <p className="eyebrow eyebrow--on-dark">{SECURITY.eyebrow}</p>
          <h2 className="security__title">{SECURITY.title}</h2>
          <p className="security__lead">{SECURITY.lead}</p>
        </Reveal>

        <ul className="security__list">
          {SECURITY.points.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 55}>
              <Check className="security__mark" width={18} height={18} />
              <div>
                <h3 className="security__point-title">{point.title}</h3>
                <p className="security__point-body">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
