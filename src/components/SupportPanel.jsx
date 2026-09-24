import { CONTACT } from '../data/content.js'

/**
 * The Contact hero's panel.
 *
 * The four things a visitor came for - how to reach us, where we are, when we
 * answer - in one object, rather than four identical cards stacked beside a
 * much shorter form. That stack was the old layout's problem: it ran to four
 * cards' height while the form ended two thirds of the way up, leaving a
 * column of dead space and pulling the eye away from the one thing the page
 * is for.
 *
 * Everything here is a fact already published elsewhere on the site - the
 * address and the domain from src/data/site.js, the hours from the contact
 * copy. Nothing is invented.
 */
export default function SupportPanel() {
  const { panel } = CONTACT

  return (
    <div className="support-panel">
      <div className="support-panel__head">
        <span className="badge-sample">Support</span>
      </div>

      <div className="support-panel__status">
        <span className="support-panel__dot" aria-hidden="true" />
        <span className="support-panel__status-text">Available around the clock</span>
      </div>

      <p className="support-panel__hours">{panel.hours.value}</p>
      <p className="support-panel__hours-note">{panel.hours.note}</p>

      <dl className="support-panel__channels">
        {panel.channels.map((c) => (
          <div key={c.label}>
            <dt>{c.label}</dt>
            <dd>
              {c.href ? (
                <a href={c.href}>{c.value}</a>
              ) : (
                c.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
