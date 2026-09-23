import { METHOD } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import InputVisual from './InputVisual.jsx'
import { Check, Close, Chart, Layers, Compass, Clock } from './icons.jsx'

/**
 * The four research inputs and the limit of each.
 *
 * Each card carries a chart of the data it describes rather than an icon or
 * an empty band: price gets a price series, on-chain gets net flows,
 * sentiment gets a position on a range, the calendar gets a schedule. Four
 * different shapes because they are four different kinds of reading.
 *
 * Every figure in those charts is generated - see src/data/market.js - so the
 * section carries a visible illustrative note. It sits with the heading
 * rather than per card, because one clear statement beats four small ones.
 *
 * The pipeline above the grid ends on a step that is a boundary rather than a
 * stage. "We go this far and no further" is the most useful thing this
 * section says, so it renders on the olive fill while the three real stages
 * stay on paper.
 */
const ICONS = { chart: Chart, layers: Layers, compass: Compass, clock: Clock }

export default function ResearchMethod() {
  return (
    <section className="section" id="method">
      <div className="wrap">
        <SectionHead eyebrow={METHOD.eyebrow} title={METHOD.title} center />

        {/* The pipeline: three stages the platform runs, then the line it
            does not cross. */}
        <ol className="pipeline">
          {METHOD.pipeline.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              className={`pipeline__step${step.limit ? ' is-limit' : ''}`}
              delay={i * 70}
            >
              <span className="pipeline__n tnum" aria-hidden="true">
                {step.n}
              </span>
              <span className="pipeline__label">{step.label}</span>
              <span className="pipeline__detail">{step.detail}</span>
            </Reveal>
          ))}
        </ol>

        <div className="inputs">
          {METHOD.inputs.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Chart
            return (
              <Reveal className="input-card" key={item.title} delay={i * 70}>
                <div className="input-card__head">
                  <span className="input-card__icon" aria-hidden="true">
                    <Icon width={19} height={19} />
                  </span>
                  <h3 className="input-card__title">{item.title}</h3>
                  {/* The figures below are generated. The section used to
                      carry one note for all four cards; it is per card now,
                      so the label travels with the chart it applies to. */}
                  <span className="badge-sample badge-sample--tight">Illustrative</span>
                </div>

                <InputVisual kind={item.visual} />

                <div className="input-card__rows">
                  <div className="input-card__row input-card__row--can">
                    <Check className="input-card__mark" width={17} height={17} />
                    <p>{item.can}</p>
                  </div>
                  <div className="input-card__row input-card__row--cannot">
                    <Close className="input-card__mark" width={17} height={17} />
                    <p>{item.cannot}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <p className="inputs__footnote">{METHOD.footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
