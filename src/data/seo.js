// =========================================================
// Per-route SEO configuration - the single source of truth for <title>,
// meta description, canonical URLs, robots rules, Open Graph, Twitter cards
// and JSON-LD structured data.
// =========================================================
// Consumed twice, and the two consumers must agree: src/lib/metadata.js maps
// this onto Next's Metadata API at build time, and every page reads its entry
// through pageMetadata(). One place to change, so they cannot drift.
//
// SEARCH INTENT. The primary keyword is the brand, "Ceravindo", which is a
// navigational search: someone typing it wants the official site. The
// secondary keywords are "Ceravindo AI trading" and "Ceravindo platform".
// That shapes the copy: the brand is confirmed in the title tag and the hero
// eyebrow, then the page gets on with saying what the product does. Stuffing
// "Ceravindo" into every heading would read badly and would not help a
// navigational query anyway.
//
// Meta limits, enforced by the operator's brief: titles under 60 characters,
// descriptions under 155 and ending in a call to action.
//
// SITE is exported and imported everywhere an absolute URL is needed. A
// sibling project retyped this origin in three files and one copy had already
// drifted to a domain that was not theirs, so do not retype it.
// =========================================================
import { FAQ, MIN_DEPOSIT } from './content.js'

// Imported for use here, and re-exported so the files that already import
// these from seo.js keep working - site.js stays the one place the values are
// written.
import { SITE, BRAND, OG_IMAGE, SUPPORT_EMAIL, LOCALE_OG } from './site.js'
export { SITE, BRAND, OG_IMAGE, SUPPORT_EMAIL, LOCALE_OG }

const INDEX = 'index, follow, max-image-preview:large, max-snippet:-1'
const NOINDEX = 'noindex, nofollow'

// ---------- JSON-LD builders ----------
//
// Everything below reflects content that is actually on the site. `address`
// and `telephone` are deliberately absent: a postal address in structured data
// is a factual claim surfaced directly in search results, so it ships only
// when the operator supplies a real one. TODO(owner): add when confirmed.
//
// An `offers` block is emitted only when MIN_DEPOSIT is a real number. An
// invented price there is the single most damaging thing this file could
// publish.

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: BRAND,
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  description:
    'Ceravindo is an AI trading platform offering market analysis, AI chart reading, a paper trading simulator, strategy building, risk tools and backtesting.',
  email: SUPPORT_EMAIL,
  inLanguage: 'en',
  areaServed: 'Worldwide',
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
  inLanguage: 'en',
}

function webPage(name, url, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    url,
    description,
    inLanguage: 'en',
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
    name: 'Ceravindo AI Trading Platform',
    serviceType: 'AI trading research and practice platform',
    description:
      'AI market analysis, chart analysis, a paper trading simulator, a strategy builder, risk management tools, trading signals and strategy backtesting in one platform.',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: 'Worldwide',
    audience: { '@type': 'Audience', audienceType: 'Traders worldwide' },
    // Only when a real figure exists. See the note above.
    ...(typeof MIN_DEPOSIT === 'number'
      ? {
          offers: {
            '@type': 'Offer',
            name: 'Ceravindo trading account',
            price: String(MIN_DEPOSIT),
            priceCurrency: 'USD',
            description:
              'Minimum deposit to open a Ceravindo account. No subscription or registration fees.',
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
// The keys here are the route names src/lib/metadata.js is asked for and the
// keys src/data/content.js is written against.

export const seo = {
  home: {
    title: `${BRAND} | AI Trading Platform For Global Markets`,
    description:
      'Ceravindo is an AI trading platform with market analysis, chart reading, a paper trading simulator and backtesting. Create your account today.',
    keywords:
      'Ceravindo, Ceravindo AI trading, Ceravindo platform, AI trading platform, AI chart analysis, paper trading simulator, strategy builder, backtesting',
    robots: INDEX,
    canonical: `${SITE}/`,
    ogImageAlt: 'Ceravindo, an AI trading platform for global markets',
    type: 'website',
    schema: [organization, website, serviceSchema(), buildFaqPage()],
  },

  about: {
    title: `About ${BRAND} | AI Trading Research Platform`,
    description:
      'See how Ceravindo builds its AI trading research, what the model can and cannot do, and the limits we publish with every brief. Read more.',
    robots: INDEX,
    canonical: `${SITE}/about`,
    ogImageAlt: `About ${BRAND}, an AI trading research platform`,
    type: 'website',
    schema: [
      organization,
      webPage(
        `About ${BRAND}`,
        `${SITE}/about`,
        'How Ceravindo produces AI trading research, and the limits of that research.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  },

  contact: {
    title: `Contact ${BRAND} | Support And Enquiries`,
    description:
      'Questions about Ceravindo AI trading research or your account? Send a message or email support and we will get back to you. Contact us.',
    robots: INDEX,
    canonical: `${SITE}/contact`,
    ogImageAlt: `Contact ${BRAND}`,
    type: 'website',
    schema: [
      organization,
      webPage(
        `Contact ${BRAND}`,
        `${SITE}/contact`,
        'How to reach the Ceravindo team with a question about the platform.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  },

  faq: {
    title: `${BRAND} FAQ | AI Trading Questions Answered`,
    description:
      'Answers about Ceravindo AI trading tools, signals, backtesting, paper trading and your data. Find what you need and get started.',
    robots: INDEX,
    canonical: `${SITE}/faq`,
    ogImageAlt: `${BRAND} frequently asked questions`,
    type: 'website',
    schema: [
      webPage(
        `${BRAND} FAQ`,
        `${SITE}/faq`,
        'Common questions about the Ceravindo AI trading platform and how it works.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
      buildFaqPage(),
    ],
  },

  terms: {
    title: `Terms Of Use | ${BRAND} AI Trading Platform`,
    description:
      'The terms that govern your use of the Ceravindo AI trading platform, including eligibility, acceptable use and liability. Read the terms.',
    robots: INDEX,
    canonical: `${SITE}/terms`,
    ogImageAlt: `${BRAND} terms of use`,
    type: 'website',
    schema: [
      webPage(
        `Terms Of Use | ${BRAND}`,
        `${SITE}/terms`,
        'The terms governing use of the Ceravindo AI trading platform.',
      ),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Terms Of Use', path: '/terms' },
      ]),
    ],
  },

  privacy: {
    title: `Privacy Policy | ${BRAND}`,
    description:
      'How Ceravindo collects, uses and protects your personal information, and how to have it corrected or removed. Read the policy.',
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
      'Trading carries risk. Read what Ceravindo research can and cannot tell you before you act on any of it. Read the disclosure.',
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
      'Your details have been received. We will be in touch about your Ceravindo account. Back to the homepage.',
    robots: NOINDEX,
    canonical: null,
    ogImageAlt: `Thank you from ${BRAND}`,
    type: 'website',
    schema: [],
  },

  404: {
    title: `Page Not Found | ${BRAND}`,
    description:
      'That page does not exist. Head back to the Ceravindo homepage or contact our team. Return home.',
    robots: NOINDEX,
    canonical: null,
    ogImageAlt: `Page not found on ${BRAND}`,
    type: 'website',
    schema: [],
  },
}
