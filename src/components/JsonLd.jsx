import { seo } from '@/data/seo.js'

/**
 * Emits a route's structured data straight into the prerendered HTML.
 *
 * Google reads JSON-LD from the document body, so this replaces the runtime
 * injection <Seo/> used to do in the SPA. The schema itself still comes from
 * src/data/seo.js, so the Organisation, WebSite, Service and FAQPage blocks
 * are built once and cannot drift from the pages that display them.
 *
 * `data-seo-jsonld` is deliberately not set - that marker existed so the old
 * runtime writer could find and replace its own tags. Next renders the body
 * once at build time, so there is nothing to replace.
 */
export default function JsonLd({ route }) {
  const schema = seo[route]?.schema || []
  return schema.map((data, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ))
}
