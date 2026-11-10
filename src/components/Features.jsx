import { FEATURES } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { Chart, Layers, Compass, Shield, Activity, Refresh } from './icons.jsx'

/**
 * The seven core tools.
 *
 * Each card carries two paragraphs: what the tool does, and the practical part
 * a reader actually cares about. They are separated visually because they
 * answer different questions, and merging them produced a wall of text that
 * people skipped.
 *
 * No invented capabilities. Everything described here is a thing the product
 * says it does, and the limits (signals are not predictions, backtests are not
 * forecasts) are stated in the copy itself rather than left to the FAQ.
 */
const ICONS = {
  chart: Chart,
  layers: Layers,
  compass: Compass,
  shield: Shield,
  activity: Activity,
  refresh: Refresh,
}

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <SectionHead eyebrow={FEATURES.eyebrow} title={FEATURES.title} lead={FEATURES.lead} />

        <div className="features">
          {FEATURES.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Chart
            return (
              <Reveal className="feature card" key={item.title} delay={i * 55}>
                <span className="feature__icon" aria-hidden="true">
                  <Icon width={21} height={21} />
                </span>
                <h3 className="feature__title">{item.title}</h3>
                <p className="feature__body">{item.body}</p>
                <p className="feature__detail">{item.detail}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
