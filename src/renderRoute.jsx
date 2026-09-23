import Seo from './components/Seo.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { LegalProvider } from './components/LegalModal.jsx'

import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import TrustStrip from './components/TrustStrip.jsx'
import WhatIs from './components/WhatIs.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ResearchMethod from './components/ResearchMethod.jsx'
import Coverage from './components/Coverage.jsx'
import RiskFirst from './components/RiskFirst.jsx'
import Faq from './components/Faq.jsx'
import Register from './components/Register.jsx'
import FinalCta from './components/FinalCta.jsx'

import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import FaqPage from './components/FaqPage.jsx'
import LegalPage from './components/LegalPage.jsx'
import ThankYou from './components/ThankYou.jsx'
import NotFound from './components/NotFound.jsx'

import { FAQ_TEASER_COUNT } from './data/content.js'

// =========================================================
// The page tree for each route, as plain React elements.
// =========================================================
// This file is the single source of truth for what a route renders. It is
// used twice: by the client (App.jsx picks the route and renders this) and by
// the build-time prerender (scripts/prerender-entry.jsx runs renderToString
// over the same tree). Keeping them identical is what lets the baked HTML
// hydrate without a mismatch - if the two ever diverge, every page load
// starts with React throwing away what the server sent.
//
// Anything that reads the DOM or a browser API during render breaks that
// contract, because the prerender runs in Node. Route-dependent state belongs
// in an effect.
// =========================================================

const Layout = ({ routeName, children }) => (
  <LegalProvider>
    <Seo route={routeName} />
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Header route={routeName} />
    <main id="main">{children}</main>
    <Footer />
  </LegalProvider>
)

const FaqTeaser = () => (
  <section className="section section--surface" id="faq">
    <div className="wrap wrap--narrow">
      <Faq limit={FAQ_TEASER_COUNT} />
    </div>
  </section>
)

export function renderRoute(route) {
  if (route === 'about') {
    return (
      <Layout routeName="about">
        <About />
      </Layout>
    )
  }

  if (route === 'contact') {
    return (
      <Layout routeName="contact">
        <Contact />
      </Layout>
    )
  }

  if (route === 'faq') {
    return (
      <Layout routeName="faq">
        <FaqPage />
      </Layout>
    )
  }

  if (route === 'terms') {
    return (
      <Layout routeName="terms">
        <LegalPage docId="terms" />
      </Layout>
    )
  }

  if (route === 'privacy') {
    return (
      <Layout routeName="privacy">
        <LegalPage docId="privacy" />
      </Layout>
    )
  }

  if (route === 'risk-disclosure') {
    return (
      <Layout routeName="risk-disclosure">
        <LegalPage docId="risk" />
      </Layout>
    )
  }

  if (route === 'thank-you') {
    return (
      <Layout routeName="thank-you">
        <ThankYou />
      </Layout>
    )
  }

  if (route === '404') {
    return (
      <Layout routeName="404">
        <NotFound />
      </Layout>
    )
  }

  // Home. The order below is deliberate: the risk band sits before the form,
  // so a reader meets the downside before being asked for a phone number,
  // and the FAQ sits above the form for the same reason - the questions it
  // answers are the ones someone has immediately before signing up.
  return (
    <Layout routeName="home">
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
    </Layout>
  )
}
