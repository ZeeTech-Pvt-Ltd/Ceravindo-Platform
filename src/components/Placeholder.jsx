/**
 * A value only the operator can supply, which is still unset.
 *
 * It renders as a visibly flagged token in every environment, including
 * production, and that is deliberate. A legal entity name, ABN or registered
 * address is a factual claim; the failure mode to design against is one of
 * them reaching a live page unnoticed, so the token is meant to be
 * conspicuous rather than tasteful.
 *
 * It replaces a null in the data, never a fabricated value: handing back a
 * neutral-looking sentence here would defeat the purpose.
 */
export default function Placeholder({ children, label }) {
  return (
    <span className="placeholder" title={label ? `${label} - needs to be supplied before launch` : undefined}>
      {children}
    </span>
  )
}
