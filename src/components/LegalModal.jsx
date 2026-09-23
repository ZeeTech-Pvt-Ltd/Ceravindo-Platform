import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { LEGAL_DOCS } from '../data/legal.js'
import Placeholder from './Placeholder.jsx'
import { Close } from './icons.jsx'

/**
 * One reader for the legal documents, used two ways.
 *
 * The consent checkbox opens a quick-view dialog, and the footer links open
 * the full pages. Both render LEGAL_DOCS from src/data/legal.js, so the text
 * a visitor skims in the dialog is the same text the page publishes - there
 * is no second copy to fall out of date.
 *
 * The tokens render inline in both places, so the modal shows the same
 * visibly-flagged placeholders the footer does.
 */

const LegalContext = createContext(null)

export function useLegal() {
  return useContext(LegalContext)
}

/** Renders one document's body. Shared by the modal and the legal pages. */
export function LegalBody({ doc }) {
  return (
    <>
      <p className="legal__updated">Last updated: {doc.updated}</p>
      <p className="legal__intro">{doc.intro}</p>
      {doc.sections.map((section) => (
        <section className="legal__section" key={section.heading}>
          <h2 className="legal__heading">{section.heading}</h2>
          {section.body.map((text) => (
            <p key={text.slice(0, 32)}>{renderTokens(text)}</p>
          ))}
        </section>
      ))}
    </>
  )
}

/**
 * Bracketed tokens inside the prose are flagged wherever they appear, so a
 * document reads as unfinished until the operator fills them in.
 */
function renderTokens(text) {
  const parts = String(text).split(/(\[[A-Z][^\]]*\])/g)
  return parts.map((part, i) =>
    /^\[[A-Z][^\]]*\]$/.test(part) ? <Placeholder key={`${part}-${i}`}>{part}</Placeholder> : part,
  )
}

export function LegalProvider({ children }) {
  const [openId, setOpenId] = useState(null)
  const dialogRef = useRef(null)
  const lastFocus = useRef(null)

  const openLegal = useCallback((id) => {
    lastFocus.current = document.activeElement
    setOpenId(id)
  }, [])

  const close = useCallback(() => {
    setOpenId(null)
    // Return focus to whatever opened the dialog.
    lastFocus.current?.focus?.()
  }, [])

  // Escape closes, Tab is trapped inside, and the page behind is frozen.
  useEffect(() => {
    if (!openId) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => dialogRef.current?.querySelector('button')?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openId, close])

  const doc = openId ? LEGAL_DOCS[openId] : null

  return (
    <LegalContext.Provider value={{ openLegal }}>
      {children}
      {doc && (
        <div className="modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            ref={dialogRef}
          >
            <div className="modal__head">
              <h2 className="modal__title" id="legal-modal-title">
                {doc.title}
              </h2>
              <button type="button" className="modal__close" onClick={close} aria-label="Close">
                <Close width={20} height={20} />
              </button>
            </div>
            <div className="modal__body legal">
              <LegalBody doc={doc} />
            </div>
          </div>
        </div>
      )}
    </LegalContext.Provider>
  )
}
