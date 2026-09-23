import { useEffect, useState } from 'react'
import { THANK_YOU } from '../data/content.js'
import { Check } from './icons.jsx'

/**
 * Confirmation page.
 *
 * The greeting is read from sessionStorage in an effect, never during render.
 * sessionStorage does not exist in Node, so reading it while rendering would
 * both throw during the prerender and make the baked HTML disagree with the
 * client's first render - a hydration mismatch. Starting from null and
 * filling it in after mount keeps the two identical.
 */
export default function ThankYou({ storageKey = 'ceravindo-form' }) {
  const [name, setName] = useState(null)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey)
      if (!saved) return
      const parsed = JSON.parse(saved)
      if (parsed?.firstName) setName(String(parsed.firstName))
    } catch {
      // Storage unavailable or the value is not JSON - the generic copy below
      // covers it.
    }
  }, [storageKey])

  return (
    <section className="section ty">
      <div className="wrap wrap--narrow ty__inner">
        <span className="ty__tick" aria-hidden="true">
          <Check width={30} height={30} />
        </span>
        <h1 className="ty__title">
          {name ? `Thanks, ${name} - your details are in` : THANK_YOU.title}
        </h1>
        <p className="lead ty__lead">{THANK_YOU.body}</p>

        <ol className="ty__steps">
          {THANK_YOU.steps.map((step, i) => (
            <li key={step}>
              <span className="ty__n tnum" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <a className="btn btn--ghost" href="/">
          Back to the homepage
        </a>
      </div>
    </section>
  )
}
