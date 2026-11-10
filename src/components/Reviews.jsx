import { REVIEWS } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { Star } from './icons.jsx'

const STARS = Array.from({ length: 5 }, (_, i) => i)

/**
 * What traders say.
 *
 * Each card carries the trader's own words, their name, location and market,
 * and the rating supplied with the review. The quotes come from the operator
 * and are shown unedited. Do not rewrite them to fit the layout, and do not
 * add a review without a name behind it: an invented customer is a false claim.
 */
function Stars({ value }) {
  return (
    <p className="review__stars">
      <span className="stars" role="img" aria-label={`Rated ${value} out of 5`}>
        <span className="stars__track" aria-hidden="true">
          {STARS.map((i) => (
            <Star key={i} />
          ))}
        </span>
        <span
          className="stars__fill"
          aria-hidden="true"
          style={{ clipPath: `inset(0 ${100 - (value / 5) * 100}% 0 0)` }}
        >
          {STARS.map((i) => (
            <Star key={i} />
          ))}
        </span>
      </span>
      <span className="stars__value" aria-hidden="true">
        {value.toFixed(1)}
      </span>
    </p>
  )
}

export default function Reviews() {
  return (
    <section className="section section--surface" id="reviews">
      <div className="wrap">
        <SectionHead eyebrow={REVIEWS.eyebrow} title={REVIEWS.title} lead={REVIEWS.lead} />

        <div className="reviews">
          {REVIEWS.items.map((item, i) => (
            <Reveal className="review card" key={item.name} delay={i * 60}>
              <span className="review__mark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="review__quote">{item.quote}</p>
              <Stars value={item.rating} />
              <p className="review__name">{item.name}</p>
              <p className="review__role">
                {item.role} · {item.location} · {item.market}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
