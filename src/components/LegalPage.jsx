import { LEGAL_DOCS } from '../data/legal.js'
import { LegalBody } from './LegalModal.jsx'

/**
 * Renders one of the three legal documents as a full page.
 *
 * It calls the same LegalBody the quick-view dialog uses, so the page and the
 * dialog show identical text. The only difference between the three routes is
 * which document is read.
 */
export default function LegalPage({ docId }) {
  const doc = LEGAL_DOCS[docId]
  if (!doc) return null

  return (
    <section className="section page">
      <div className="wrap wrap--narrow">
        <header className="page__head">
          <p className="eyebrow">Legal</p>
          <h1 className="page__title">{doc.title}</h1>
        </header>
        <div className="legal prose">
          <LegalBody doc={doc} />
        </div>
      </div>
    </section>
  )
}
