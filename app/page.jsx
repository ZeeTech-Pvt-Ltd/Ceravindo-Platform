import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import { FAQ_TEASER_COUNT } from '@/data/content.js'

import Hero from '@/components/Hero.jsx'
import Ticker from '@/components/Ticker.jsx'
import TrustStrip from '@/components/TrustStrip.jsx'
import WhatIs from '@/components/WhatIs.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import ResearchMethod from '@/components/ResearchMethod.jsx'
import Coverage from '@/components/Coverage.jsx'
import RiskFirst from '@/components/RiskFirst.jsx'
import Faq from '@/components/Faq.jsx'
import Register from '@/components/Register.jsx'
import FinalCta from '@/components/FinalCta.jsx'

export const metadata = pageMetadata('home')

/* The homepage teaser. The full list lives on /faq; both read the same FAQ
   array, which is also what buildFaqPage() turns into JSON-LD. */
function FaqTeaser() {
  return (
    <section className="section section--surface" id="faq">
      <div className="wrap wrap--narrow">
        <Faq limit={FAQ_TEASER_COUNT} />
      </div>
    </section>
  )
}

/**
 * Home. The order is deliberate: the risk band sits before the form, so a
 * reader meets the downside before being asked for a phone number, and the
 * FAQ sits above the form for the same reason - the questions it answers are
 * the ones someone has immediately before signing up.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd route="home" />

      <Hero />
      <Ticker />
      <TrustStrip />
      <WhatIs />
      <HowItWorks />
      <ResearchMethod />
      <Coverage />
      <RiskFirst />
      <FaqTeaser />
      <Register />
      <FinalCta />
    </>
  )
}
