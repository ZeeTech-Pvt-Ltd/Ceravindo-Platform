import Logo from './Logo.jsx'
import { NAV, FOOTER, RISK_WARNING } from '../data/content.js'
import { LEGAL_LINKS } from '../data/legal.js'
import { SUPPORT_EMAIL, SITE_LABEL } from '../data/site.js'

/**
 * Footer. Carries the risk warning and the legal column on every route -
 * those are the two things a reader should be able to reach from anywhere,
 * and the sibling sites that put them only on the homepage made them easy to
 * miss.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Logo onDark />
          <p className="footer__blurb">{FOOTER.blurb}</p>
          <p className="footer__contact">
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            <span className="footer__sep" aria-hidden="true">
              {' · '}
            </span>
            <a href="/">{SITE_LABEL}</a>
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__heading">Site</h2>
          <ul className="footer__list">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Legal</h2>
          <ul className="footer__list">
            {LEGAL_LINKS.map((doc) => (
              <li key={doc.id}>
                <a href={doc.path}>{doc.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <div className="footer__risk" role="note">
          <p>{RISK_WARNING}</p>
        </div>

        <div className="footer__legal">
          <p>{FOOTER.legalNote}</p>
          <p className="footer__copy">© {year} Ceravindo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
