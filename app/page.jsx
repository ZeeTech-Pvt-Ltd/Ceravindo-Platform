import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import { FAQ_TEASER_COUNT } from '@/data/content.js'

import Hero from '@/components/Hero.jsx'
import Ticker from '@/components/Ticker.jsx'
import TrustStrip from '@/components/TrustStrip.jsx'
import WhatIs from '@/components/WhatIs.jsx'
import Features from '@/components/Features.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import RiskFirst from '@/components/RiskFirst.jsx'
import Register from '@/components/Register.jsx'
import MarketSnapshot from '@/components/MarketSnapshot.jsx'
import Why from '@/components/Why.jsx'
import Security from '@/components/Security.jsx'
import Reviews from '@/components/Reviews.jsx'
import Faq from '@/components/Faq.jsx'
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
 * Home. The order follows the operator's brief:
 *
 *   Hero, What Is, Features, How It Works, Get Started, Market Snapshot,
 *   Why, Security And Trust, Reviews, FAQs, CTA
 *
 * with one deliberate insertion. The risk band sits immediately before the
 * sign up form, so a reader meets the downside before being asked for a phone
 * number, not after. That rule comes from the standing brief and overrides the
 * section order where the two disagree.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd route="home" />

      <Hero />
      <Ticker />
      <TrustStrip />
      <WhatIs />
      <Features />
      <HowItWorks />
      <RiskFirst />
      <Register />
      <MarketSnapshot />
      <Why />
      <Security />
      <Reviews />
      <FaqTeaser />
      <FinalCta />
    </>
  )
}
