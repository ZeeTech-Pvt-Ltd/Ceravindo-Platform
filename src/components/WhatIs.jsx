import { WHAT_IS } from '../data/content.js'
import WhatIsVisual from './WhatIsVisual.jsx'
import Reveal from './Reveal.jsx'

/**
 * The definitional block.
 *
 * Two columns from 940px up, with the brief card on the left. The visual
 * carries the "what you get" half of the answer so the copy can stay on the
 * "what it is not" half, which is the distinction that actually matters here.
 *
 * The card comes first in the DOM, so on a stacked mobile layout it appears
 * above the text - which is the right order for a reader deciding in three
 * seconds whether the page is worth reading.
 */
export default function WhatIs() {
  return (
    <section className="section" id="what-is">
      <div className="wrap whatis">
        <Reveal className="whatis__visual">
          <WhatIsVisual />
        </Reveal>

        <div className="whatis__copy">
          <Reveal>
            <p className="eyebrow">{WHAT_IS.eyebrow}</p>
            <h2>{WHAT_IS.title}</h2>
          </Reveal>
          {WHAT_IS.paragraphs.map((text, i) => (
            <Reveal key={text.slice(0, 24)} delay={60 * (i + 1)}>
              <p className="whatis__para">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
