import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import LegalPage from '@/components/LegalPage.jsx'

export const metadata = pageMetadata('risk-disclosure')

export default function RiskDisclosurePage() {
  return (
    <>
      <JsonLd route="risk-disclosure" />
      {/* The route key and the document id differ: the URL has a hyphen, the
          key in legal.js is 'risk'. */}
      <LegalPage docId="risk" />
    </>
  )
}
