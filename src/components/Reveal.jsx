/**
 * Wraps content in the scroll-reveal treatment.
 *
 * This only sets the class - the actual hide/reveal lives in index.css and is
 * driven by useReveal(), which flips data-revealed once the element is in
 * view. Splitting it that way keeps the "hidden only when JS is running" rule
 * in one place, so a prerendered page with no script stays fully readable.
 *
 * `delay` staggers items in a grid; it is applied inline because the value
 * varies per instance.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
