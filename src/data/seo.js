// =========================================================
// Per-route SEO configuration - the single source of truth for <title>,
// meta description, canonical URLs, robots rules, Open Graph, Twitter cards
// and JSON-LD structured data.
// =========================================================
// Consumed twice, and the two consumers must agree: <Seo/> writes these
// values into document.head at runtime, and scripts/build.mjs bakes the same
// values into each prerendered HTML file. One place to change, so they cannot
// drift.
//
// SITE is exported and imported everywhere an absolute URL is needed. A
// sibling project retyped this origin in three files and one copy had already
// drifted to a domain that was not theirs - so do not retype it. The sitemap,
// robots.txt and the JSON-LD @id values all derive from it.
// =========================================================
import { FAQ, MIN_DEPOSIT_AUD } from './content.js'

// Imported for use here, and re-exported so the files that already import
// these from seo.js keep working - site.js stays the one place the values are
// written. `export ... from` on its own would re-export without binding them
// locally, which is a reference error the moment one is used below.
import { SITE, BRAND, OG_IMAGE, SUPPORT_EMAIL, LOCALE_OG } from './site.js'
export { SITE, BRAND, OG_IMAGE, SUPPORT_EMAIL, LOCALE_OG }

const INDEX = 'index, follow, max-image-preview:large, max-snippet:-1'
const NOINDEX = 'noindex, nofollow'

// ---------- JSON-LD builders ----------
//
// Everything below reflects content that is actually on the site. Two fields
// a sibling project ships are deliberately absent here:
//
//   address    - it hardcodes a Melbourne PostalAddress. A postal address in
//                structured data is a factual claim surfaced directly in
//                search results, so it ships only when the operator supplies
//                a real one. TODO(owner): add when confirmed.
//   telephone  - same reason.
//
// An `offers` block is emitted only when MIN_DEPOSIT_AUD is a real number.
// An invented price there is the single most damaging thing this file could
// publish, so it is conditional rather than a placeholder.

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: BRAND,
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  description:
    'Ceravindo is an AI-assisted market research platform for Australian investors - structured crypto and multi-market analysis, published with its sources and its limits.',
  email: SUPPORT_EMAIL,
  inLanguage: 'en-AU',
  areaServed: 'Australia',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: SUPPORT_EMAIL,
    availableLanguage: 'en',
  },
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: BRAND,
  url: SITE,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-AU',
}

function webPage(name, url, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    url,
    description,
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#organization` },
  }
}

function breadcrumbs(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  }
}

function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/#service`,
    name: 'Ceravindo Market Research Platform',
    serviceType: 'Market research platform',
    description:
      'AI-assisted market research across crypto, foreign exchange, equities and commodities, published as written briefs with their sources and their confidence.',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: 'Australia',
    audience: { '@type': 'Audience', audienceType: 'Australian investors and traders' },
    // Only when a real figure exists. See the note above.
    ...(typeof MIN_DEPOSIT_AUD === 'number'
      ? {
          offers: {
            '@type': 'Offer',
            name: 'Ceravindo research account',
            price: String(MIN_DEPOSIT_AUD),
            priceCurrency: 'AUD',
            description:
              'Minimum deposit to open a Ceravindo research account. No subscription or registration fees.',
          },
        }
      : {}),
  }
}

/**
 * FAQPage generated from the same array the accordion renders, so the
 * structured text and the visible text cannot disagree.
 */
export function buildFaqPage(items = FAQ) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

// ---------- Per-route configuration ----------
//
// The keys here are the route names App.jsx resolves and the keys
// scripts/build.mjs writes files for. They must stay in step with
// scripts/prerender-entry.jsx ROUTES.

export const seo = {
  home: {
    title: `${BRAND} | AI Market Research for Australian Investors`,
    description:
      'Ceravindo is an AI-assisted market research platform for Australia - structured crypto and multi-market analysis, published with its sources and limits.',
    keywords:
      'AI market research australia, market research platform, crypto research Australia, Ceravindo, market briefs',
    robots: INDEX,
    canonical: `${SITE}/`,
    ogImageAlt: 'Ceravindo - AI-assisted market research for Australian investors',
    type: 'website',
    schema: [organization, website, serviceSchema(), buildFaqPage()],
  },

  about: {
    title: `About ${BRAND} | How Our Research Is Produced`,
    description:
      'How Ceravindo produces AI-assisted market research - our editorial standards, our data sources, and the limits of what our analysis can tell you.',
    robots: INDEX,
    canonical: `${SITE}/about`,
    ogImageAlt: `About ${BRAND} - how our market research is produced`,
    type: 'website',
    schema: [
      organization,
      webPage(
        `About ${BRAND}`,
        `${SITE}/about`,
        'How Ceravindo produces AI-assisted market research, and the limits of that research.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  },

  contact: {
    title: `Contact ${BRAND} | Support for Australian Users`,
    description:
      'Contact the Ceravindo team with a question about our market research platform. Send a message from the form or email support - we answer around the clock.',
    robots: INDEX,
    canonical: `${SITE}/contact`,
    ogImageAlt: `Contact ${BRAND}`,
    type: 'website',
    schema: [
      organization,
      webPage(
        `Contact ${BRAND}`,
        `${SITE}/contact`,
        'How to reach the Ceravindo team with a question about the research platform.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  },

  faq: {
    title: `${BRAND} FAQ | AI Market Research Questions`,
    description:
      'Answers to common questions about Ceravindo - how the research is produced, what the platform does and does not do, data sources, and how to contact us.',
    robots: INDEX,
    canonical: `${SITE}/faq`,
    ogImageAlt: `${BRAND} frequently asked questions`,
    type: 'website',
    schema: [
      webPage(
        `${BRAND} FAQ`,
        `${SITE}/faq`,
        'Common questions about how Ceravindo produces and publishes market research.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
      buildFaqPage(),
    ],
  },

  terms: {
    title: `Terms of Use | ${BRAND} Market Research Platform`,
    description:
      'The terms that govern your use of the Ceravindo website and research platform, including eligibility, acceptable use, and the limits of our liability.',
    robots: INDEX,
    canonical: `${SITE}/terms`,
    ogImageAlt: `${BRAND} terms of use`,
    type: 'website',
    schema: [
      webPage(
        `Terms of Use | ${BRAND}`,
        `${SITE}/terms`,
        'The terms governing use of the Ceravindo website and research platform.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Terms of Use', path: '/terms' },
      ]),
    ],
  },

  privacy: {
    title: `Privacy Policy | ${BRAND}`,
    description:
      'How Ceravindo collects, uses, stores and protects your personal information, in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth).',
    robots: INDEX,
    canonical: `${SITE}/privacy`,
    ogImageAlt: `${BRAND} privacy policy`,
    type: 'website',
    schema: [
      webPage(
        `Privacy Policy | ${BRAND}`,
        `${SITE}/privacy`,
        'How Ceravindo handles personal information collected through this website.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' },
      ]),
    ],
  },

  'risk-disclosure': {
    title: `Risk Disclosure | ${BRAND}`,
    description:
      'Important information about the risks of trading and investing in crypto and other markets, and the limits of general market research like ours.',
    robots: INDEX,
    canonical: `${SITE}/risk-disclosure`,
    ogImageAlt: `${BRAND} risk disclosure`,
    type: 'website',
    schema: [
      webPage(
        `Risk Disclosure | ${BRAND}`,
        `${SITE}/risk-disclosure`,
        'The risks of trading and investing, and the limits of general market research.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Risk Disclosure', path: '/risk-disclosure' },
      ]),
    ],
  },

  // No canonical and noindex on purpose: the two tags send contradictory
  // signals, and a confirmation page has nothing to consolidate anyway.
  'thank-you': {
    title: `Thank You | ${BRAND}`,
    description:
      'Your details have been received. Our team will be in touch about your Ceravindo research account.',
    robots: NOINDEX,
    canonical: null,
    ogImageAlt: `Thank you from ${BRAND}`,
    type: 'website',
    schema: [],
  },

  404: {
    title: `Page Not Found | ${BRAND}`,
    description:
      "The page you're looking for doesn't exist or has moved. Return to the Ceravindo homepage or contact our team.",
    robots: NOINDEX,
    canonical: null,
    ogImageAlt: `Page not found - ${BRAND}`,
    type: 'website',
    schema: [],
  },
}
