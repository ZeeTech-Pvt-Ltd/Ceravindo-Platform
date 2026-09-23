import { TRUST } from '../data/content.js'

/**
 * The strip under the hero. It replaces the payment-network logos the sibling
 * sites carry in this slot: displaying a card network's mark implies a
 * deposit relationship that does not exist here, and the four statements
 * below are the information a reader actually needs before leaving a phone
 * number.
 */
export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Important information">
      <div className="wrap">
        <ul className="trust__list">
          {TRUST.map((item) => (
            <li key={item.label} className="trust__item">
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
