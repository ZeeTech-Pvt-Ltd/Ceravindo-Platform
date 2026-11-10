import { REVIEWS } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

/**
 * What traders say.
 *
 * There are no real reviews, so these are illustrative scenarios and they say
 * so twice: once in the note above the cards, and once in the attribution on
 * every card. A financial site that invents named customers is publishing a
 * false claim, and a label nobody reads is not a defence.
 *
 * Replace src/data/content.js REVIEWS with real quotes, with permission, and
 * delete the note when you do.
 */
export default function Reviews() {
  return (
    <section className="section section--surface" id="reviews">
      <div className="wrap">
        <SectionHead eyebrow={REVIEWS.eyebrow} title={REVIEWS.title} lead={REVIEWS.note} />

        <div className="reviews">
          {REVIEWS.items.map((item, i) => (
            <Reveal className="review card" key={item.quote} delay={i * 60}>
              <span className="review__mark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="review__quote">{item.quote}</p>
              <p className="review__name">{item.name}</p>
              <p className="review__role">{item.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
