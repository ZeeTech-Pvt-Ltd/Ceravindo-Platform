import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import ReviewPage from '@/components/ReviewPage.jsx'

export const metadata = pageMetadata('ceravindo-review')

export default function CeravindoReviewRoute() {
  return (
    <>
      <JsonLd route="ceravindo-review" />
      <ReviewPage />
    </>
  )
}
