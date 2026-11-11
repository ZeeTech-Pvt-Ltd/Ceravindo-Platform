import { REVIEW_PAGE, FEATURES } from '../data/content.js'
import PageHero from './PageHero.jsx'
import TradingDashboard from './TradingDashboard.jsx'
import FinalCta from './FinalCta.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import Faq from './Faq.jsx'
import { Chart, Layers, Compass, Shield, Activity, Check, Close } from './icons.jsx'

/**
 * The review page.
 *
 * Structured like the review pages used across the family - verdict, tools,
 * balance, fit, sign up, questions - but written only from facts this site
 * states elsewhere. The reference page carries a deposit figure, fee claims,
 * trading modes and broker arrangements; none of those are true here, so none
 * of them appear. A review page is still a page this site has to stand behind.
 *
 * The six tools are rendered from FEATURES rather than retyped, so a change to
 * a tool description cannot leave the review page quoting the old one.
 */
const ICONS = {
  chart: Chart,
  layers: Layers,
  compass: Compass,
  shield: Shield,
  activity: Activity,
}

export default function ReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Review"
        title={REVIEW_PAGE.title}
        lead={REVIEW_PAGE.lead}
        tone="surface"
        visual={<TradingDashboard />}
      />

      <section className="principles" aria-label="The short version">
        <div className="wrap">
          <ul className="principles__list">
            {REVIEW_PAGE.shortAnswers.map((row, i) => (
              <Reveal as="li" key={row.text} delay={i * 60}>
                {row.ok ? (
                  <Check className="principles__mark" width={17} height={17} />
                ) : (
                  <Close
                    className="principles__mark principles__mark--no"
                    width={17}
                    height={17}
                  />
                )}
                <span>{row.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Verdict"
            title={REVIEW_PAGE.verdict.title}
            lead={REVIEW_PAGE.verdict.body}
          />

          <ul className="review-facts">
            {REVIEW_PAGE.facts.map((fact, i) => (
              <Reveal as="li" className="review-fact card" key={fact.label} delay={i * 55}>
                <span className="review-fact__label">{fact.label}</span>
                <span className="review-fact__value">{fact.value}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--surface">
        <div className="wrap">
          <SectionHead
            eyebrow="The Tools"
            title={REVIEW_PAGE.toolsTitle}
            lead={REVIEW_PAGE.toolsLead}
          />

          <div className="features">
            {FEATURES.items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Chart
              return (
                <Reveal className="feature card" key={item.title} delay={i * 55}>
                  <span className="feature__icon" aria-hidden="true">
                    <Icon width={21} height={21} />
                  </span>
                  <h3 className="feature__title">{item.title}</h3>
                  <p className="feature__body">{item.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="The Balance"
            title={REVIEW_PAGE.balance.title}
            lead={REVIEW_PAGE.balance.lead}
          />

          <div className="review-columns">
            <Reveal className="review-column card">
              <h3 className="review-column__title">{REVIEW_PAGE.balance.prosTitle}</h3>
              <ul className="review-list">
                {REVIEW_PAGE.balance.pros.map((item) => (
                  <li key={item}>
                    <Check className="review-list__mark" width={17} height={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="review-column card" delay={60}>
              <h3 className="review-column__title">{REVIEW_PAGE.balance.consTitle}</h3>
              <ul className="review-list">
                {REVIEW_PAGE.balance.cons.map((item) => (
                  <li key={item}>
                    <Close
                      className="review-list__mark review-list__mark--no"
                      width={17}
                      height={17}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="wrap">
          <SectionHead
            eyebrow="Fit"
            title={REVIEW_PAGE.audience.title}
            lead={REVIEW_PAGE.audience.lead}
          />

          <div className="review-columns">
            <Reveal className="review-column card">
              <h3 className="review-column__title">{REVIEW_PAGE.audience.forTitle}</h3>
              <ul className="review-list">
                {REVIEW_PAGE.audience.forList.map((item) => (
                  <li key={item}>
                    <Check className="review-list__mark" width={17} height={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="review-column card" delay={60}>
              <h3 className="review-column__title">{REVIEW_PAGE.audience.notForTitle}</h3>
              <ul className="review-list">
                {REVIEW_PAGE.audience.notForList.map((item) => (
                  <li key={item}>
                    <Close
                      className="review-list__mark review-list__mark--no"
                      width={17}
                      height={17}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="Sign Up" title={REVIEW_PAGE.signup.title} />

          {REVIEW_PAGE.signup.body.map((paragraph) => (
            <p className="review-prose" key={paragraph}>
              {paragraph}
            </p>
          ))}

          <div className="review-fields card">
            <h3 className="review-fields__title">{REVIEW_PAGE.signup.fieldsTitle}</h3>
            <ul className="review-list">
              {REVIEW_PAGE.signup.fields.map((field) => (
                <li key={field}>
                  <Check className="review-list__mark" width={17} height={17} />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="review-prose">
            Read the <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms</a>{' '}
            before you sign up.
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="wrap wrap--narrow">
          <SectionHead
            eyebrow="Questions"
            title={REVIEW_PAGE.faqTitle}
            lead={REVIEW_PAGE.faqLead}
          />
          <Faq items={REVIEW_PAGE.faq} heading={false} />
        </div>
      </section>

      <FinalCta variant="grid" {...REVIEW_PAGE.cta} />
    </>
  )
}
