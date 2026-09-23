import RegistrationForm from './RegistrationForm.jsx'
import Reveal from './Reveal.jsx'
import { Check } from './icons.jsx'

/**
 * The homepage sign-up section. This is the anchor every CTA on the site
 * points at, so its id is part of the contract with Header, Hero and FinalCta.
 *
 * The copy beside the form sets expectations about what happens next and what
 * is not asked for. "No password" in particular is worth saying out loud: a
 * sign-up form that does not ask for one is unusual enough that its absence
 * reads as an omission unless it is named.
 */
const PROMISES = [
  'A research account, not a trading account',
  'No card details, bank details or password',
  'Briefs for the markets you choose to follow',
  'Unsubscribe or close your account at any time',
]

export default function Register() {
  return (
    <section className="section register" id="register">
      <div className="wrap register__inner">
        <Reveal className="register__copy">
          <p className="eyebrow">Get started</p>
          <h2>Create your research account</h2>
          <p className="lead">
            Tell us where to reach you and we will set up your account. It takes a minute, and it
            does not ask for anything you would not want to hand over.
          </p>
          <ul className="checks">
            {PROMISES.map((item) => (
              <li key={item}>
                <Check className="checks__icon" width={18} height={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="register__form" delay={80}>
          <RegistrationForm />
        </Reveal>
      </div>
    </section>
  )
}
