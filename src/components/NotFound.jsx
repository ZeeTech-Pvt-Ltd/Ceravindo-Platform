import { NOT_FOUND } from '../data/content.js'

export default function NotFound() {
  return (
    <section className="section nf">
      <div className="wrap wrap--narrow nf__inner">
        <p className="eyebrow">404</p>
        <h1 className="nf__title">{NOT_FOUND.title}</h1>
        <p className="lead nf__lead">{NOT_FOUND.body}</p>
        <div className="nf__actions">
          <a className="btn btn--primary" href="/">
            {NOT_FOUND.homeCta}
          </a>
          <a className="btn btn--ghost" href="/contact">
            {NOT_FOUND.contactCta}
          </a>
        </div>
      </div>
    </section>
  )
}
