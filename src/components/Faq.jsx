import { useId, useState } from 'react'
import { FAQ } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { ChevronDown } from './icons.jsx'

/**
 * FAQ accordion. One item open at a time, as a disclosure list rather than a
 * set of divs, so the open/closed state is announced correctly and the
 * keyboard behaviour is the browser's own.
 *
 * `limit` gives the homepage teaser its short list. Both callers read the
 * same FAQ array, which is also what buildFaqPage() turns into JSON-LD - so
 * the structured answer and the visible answer cannot diverge.
 */
export default function Faq({ limit, heading = true }) {
  const [open, setOpen] = useState(0)
  const uid = useId()
  const items = limit ? FAQ.slice(0, limit) : FAQ

  return (
    <>
      {heading && (
        <SectionHead
          eyebrow="Questions"
          title="Answers before you sign up"
          lead="What the platform does, what it does not do, and what happens to your details."
        />
      )}

      <div className="faq">
        {items.map((item, i) => {
          const isOpen = open === i
          const panelId = `${uid}-panel-${i}`
          const buttonId = `${uid}-button-${i}`
          return (
            <Reveal className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q} delay={i * 40}>
              <h3 className="faq__q">
                <button
                  type="button"
                  id={buttonId}
                  className="faq__button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <ChevronDown className="faq__chevron" width={19} height={19} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="faq__panel"
                hidden={!isOpen}
              >
                <p>{item.a}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
