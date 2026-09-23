import Reveal from './Reveal.jsx'

/**
 * The hero for an inner page.
 *
 * Shared by About and FAQ so the two open the same way - a page that is not
 * the homepage still needs to say what it is above the fold, and doing that
 * twice by hand is how two pages end up opening differently.
 *
 * `visual` is rendered in the right-hand column from 940px up and stacks
 * below the copy on narrow screens, matching the homepage hero.
 *
 * `tone="surface"` puts the band on the tinted background rather than the
 * page background, which is what About uses to separate its hero from the
 * claim rows beneath it.
 */
export default function PageHero({ eyebrow, title, lead, visual, tone }) {
  return (
    <section className={`page-hero${tone === 'surface' ? ' page-hero--surface' : ''}`}>
      <div className={`wrap page-hero__inner${visual ? '' : ' page-hero__inner--solo'}`}>
        <div className="page-hero__copy">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="page-hero__title">{title}</h1>
            {lead && <p className="lead page-hero__lead">{lead}</p>}
          </Reveal>
        </div>

        {visual && (
          <Reveal className="page-hero__visual" delay={80}>
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  )
}
