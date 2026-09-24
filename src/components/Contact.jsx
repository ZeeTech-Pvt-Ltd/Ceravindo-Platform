import { CONTACT, PAGE_CTA } from '../data/content.js'
import PageHero from './PageHero.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import SupportPanel from './SupportPanel.jsx'
import FinalCta from './FinalCta.jsx'
import Reveal from './Reveal.jsx'
import { Check } from './icons.jsx'

/**
 * Contact page.
 *
 * Opens with a hero like every other inner page, and the panel beside it
 * carries the contact details. That is a change from the old layout, which
 * stacked four cards next to the form: the stack ran four cards tall while
 * the form ended two thirds of the way up, so the column beneath the form was
 * dead space and the page read as two unrelated halves.
 *
 * The form gets the page to itself below the fold, with a short list beside
 * it saying what happens after submit - the question a form always raises -
 * and that list is the same three steps the confirmation page shows.
 *
 * The form is the same RegistrationForm the homepage renders, from one
 * component, so the two cannot drift.
 */
export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={CONTACT.title}
        lead={CONTACT.lead}
        tone="surface"
        visual={<SupportPanel />}
      />

      <section className="section contact-section">
        <div className="wrap contact-section__inner">
          <Reveal className="contact-section__form card">
            <h2 className="contact-section__title">{CONTACT.formHeading}</h2>
            <RegistrationForm variant="contact" submitLabel="Create Your Account" />
          </Reveal>

          <Reveal className="contact-section__aside" delay={80}>
            <h2 className="contact-section__aside-title">{CONTACT.nextSteps.title}</h2>
            <ol className="contact-steps">
              {CONTACT.nextSteps.steps.map((step, i) => (
                <li key={step}>
                  <span className="contact-steps__n tnum" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="contact-section__reassure">
              <Check className="contact-section__reassure-mark" width={17} height={17} />
              <span>No card details, bank details or passwords, ever.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta variant="grid" {...PAGE_CTA.contact} />
    </>
  )
}
