import { CONTACT, PAGE_CTA } from '../data/content.js'
import RegistrationForm from './RegistrationForm.jsx'
import Placeholder from './Placeholder.jsx'
import FinalCta from './FinalCta.jsx'
import Reveal from './Reveal.jsx'
import { Mail, Globe, Clock } from './icons.jsx'

/**
 * Contact page.
 *
 * Renders the same RegistrationForm the homepage uses, so there is one
 * implementation of the form on the site rather than two that drift. The
 * contact channels sit beside it rather than replacing it - the sibling
 * projects that did the same thing also had no message field, which was a
 * deliberate trade here: a lead that arrives through the same pipeline as
 * every other lead is one the operator can actually see.
 */
const ICONS = { Email: Mail, 'Based in': Globe, 'Support hours': Clock }

export default function Contact() {
  return (
    <>
      <section className="section page">
        <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Contact</p>
          <h1 className="page__title">{CONTACT.title}</h1>
          <p className="lead page__lead">{CONTACT.lead}</p>
        </header>

        <div className="contact">
          <Reveal className="contact__side">
            <ul className="contact__cards">
              {CONTACT.cards.map((card) => {
                const Icon = ICONS[card.label] ?? Mail
                return (
                  <li className="card contact__card" key={card.label}>
                    <span className="contact__icon" aria-hidden="true">
                      <Icon width={20} height={20} />
                    </span>
                    <p className="contact__label">{card.label}</p>
                    <p className="contact__value">
                      {card.value === null ? (
                        <Placeholder label={card.label}>{`[${card.label.toUpperCase()}]`}</Placeholder>
                      ) : card.href ? (
                        <a href={`${card.href}${card.value}`}>{card.value}</a>
                      ) : (
                        card.value
                      )}
                    </p>
                  </li>
                )
              })}
            </ul>
            <p className="contact__note">{CONTACT.formNote}</p>
          </Reveal>

          <Reveal className="contact__form card" delay={80}>
            <h2 className="contact__form-title">{CONTACT.formHeading}</h2>
            <RegistrationForm variant="contact" submitLabel="Send message" />
          </Reveal>
        </div>
      </div>
      </section>

      <FinalCta variant="grid" {...PAGE_CTA.contact} />
    </>
  )
}
