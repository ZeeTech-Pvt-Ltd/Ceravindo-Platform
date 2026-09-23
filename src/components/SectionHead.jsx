/**
 * The eyebrow + heading + lead block that opens most sections. Kept as one
 * component so the vertical rhythm is identical everywhere rather than
 * re-tuned per section.
 */
export default function SectionHead({ eyebrow, title, lead, center = false, id }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}
