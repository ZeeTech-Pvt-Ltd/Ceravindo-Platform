import { HOW_IT_WORKS } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

/**
 * Three steps. The heading is doing work here: only the first step belongs to
 * the platform, and saying so up front is the difference between a research
 * tool and something that reads like a signal service.
 */
export default function HowItWorks() {
  return (
    <section className="section section--surface" id="how-it-works">
      <div className="wrap">
        <SectionHead eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title} center />
        <ol className="steps">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <Reveal as="li" className="steps__item" key={step.n} delay={i * 90}>
              <span className="steps__n tnum" aria-hidden="true">
                {step.n}
              </span>
              <h3 className="steps__title">{step.title}</h3>
              <p className="steps__body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
