// =========================================================
// All site copy, in one place.
// =========================================================
// Two rules governed every line below, and they should govern any line added
// later:
//
//   1. No figure appears unless the operator supplied it. Where a number is
//      still unknown it is `null` here and rendered through <Placeholder/>,
//      which is visible in development and neutral in production. An invented
//      statistic on a financial site is not a placeholder - it is a claim.
//
//   2. Every claim states its own limit. The product is described by what it
//      does and what it cannot do, in the same breath. That is the honest
//      version and it is also the one that survives scrutiny.
//
// Nothing here promises a return, a win rate, an accuracy figure, a customer
// count, a rating or a licence. See README.md before adding anything that
// looks like one.
// =========================================================
import { SUPPORT_EMAIL, SITE, SITE_LABEL } from './site.js'

/* A figure the operator must supply before launch. `null` means "not yet
   provided" and renders as a flagged token, never as a guess. Support hours
   was the other one and is now known - it lives on the contact card, where it
   is displayed. */
export const MIN_DEPOSIT_AUD = null

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const HERO = {
  eyebrow: 'AI market research · Australia',
  title: 'Read the market before you trade it.',
  lead: 'Ceravindo scans crypto, forex, equities and commodities around the clock, then publishes a plain-English brief on each: the finding, the evidence behind it, and how confident the model is.',
  checks: [
    'Live-style coverage of 4 markets in one view',
    'Every signal shown with its evidence and its confidence',
    'General information only, never personal advice',
  ],
  primaryCta: { label: 'Create your research account', href: '#register' },
}

/* The method is a homepage section in its own right now (see METHOD below),
   rather than the hero's right-hand panel - the panel is the market view,
   which is what makes the page read as a trading product at a glance. */

/* Replaces the payment-logo strip the sibling sites carry. Naming a broker or
   a card network would imply a relationship that does not exist, so the strip
   states the regulatory posture instead - which is the information a reader
   actually needs before handing over a phone number. */
export const TRUST = [
  { label: 'General information only' },
  { label: 'Not personal financial advice' },
  { label: 'No trade execution' },
  { label: 'Australian residents, 18+' },
]

export const WHAT_IS = {
  eyebrow: 'The platform',
  title: 'What is Ceravindo?',
  paragraphs: [
    'Ceravindo is a market research platform. You choose the markets you want to follow, and the platform gathers the data that moves them - price action, network activity, positioning, and the economic calendar - into a single written brief for each one.',
    'A brief is not a recommendation. It sets out what the data shows, what the model made of it, how confident that reading is, and where it could be wrong. You keep the decision, and you keep it in whatever account you already use.',
    'Ceravindo does not hold your money, does not connect to a broker, and does not place trades. It is a reading tool, not an execution tool.',
  ],
}

export const HOW_IT_WORKS = {
  eyebrow: 'How it works',
  title: 'Three steps, and only the first one is ours',
  steps: [
    {
      n: '01',
      title: 'Build a watchlist',
      body: 'Choose from crypto, foreign exchange, equities and commodities. Add a market and Ceravindo starts reading it. Remove it and the research stops.',
    },
    {
      n: '02',
      title: 'Read the research',
      body: 'Each brief opens with the finding, then the evidence behind it, then the model confidence, then the conditions that would invalidate it. Sources are shown alongside the claim they support.',
    },
    {
      n: '03',
      title: 'Decide for yourself',
      body: 'Nothing in Ceravindo tells you to buy or sell. What you do with a brief is your decision, made with whatever advice and account you already trust.',
    },
  ],
}

/* The four inputs, each paired with its own limit. The "cannot" line is the
   point of the section, not a disclaimer bolted onto it. */
export const METHOD = {
  eyebrow: 'The method',
  title: 'What the research reads, and what it cannot tell you',
  /* Moved out of the hero when the hero became a market view. It answers the
     question the hero now raises - what do I actually get - so it sits at the
     top of the method section rather than being dropped. */
  /* The pipeline, shown as a horizontal strip above the input cards. `limit`
     marks the step that is a boundary rather than a stage - it renders on the
     olive fill instead of the paper one, because "we go this far and no
     further" is the most useful thing the section says. */
  pipeline: {
    steps: [
      { n: '01', label: 'Read', detail: 'Four public data families, per market' },
      { n: '02', label: 'Weigh', detail: 'Each reading scored against its own history' },
      { n: '03', label: 'Publish', detail: 'Finding, evidence and confidence' },
      { n: '04', label: 'Stop', detail: 'No buy or sell instruction', limit: true },
    ],
  },
  /* `visual` picks the small chart each card renders - see InputVisual.jsx.
     The visual is a real chart of the same data the card describes, not a
     decorative shape, which is why each card carries the illustrative note. */
  inputs: [
    {
      title: 'Price and volume',
      icon: 'chart',
      visual: 'chart',
      can: 'Describe market structure, trend and momentum as they are actually printed.',
      cannot: 'Explain why a move happened. Price records the result, never the reason.',
    },
    {
      title: 'On-chain activity',
      icon: 'layers',
      visual: 'flows',
      can: 'Show network-level flows, wallet concentration and settlement activity for crypto assets.',
      cannot: 'Value an asset. Activity is not worth, and a busy network is not a cheap one.',
    },
    {
      title: 'Market sentiment',
      icon: 'compass',
      visual: 'sentiment',
      can: 'Show how crowded a position has become and where the market is leaning.',
      cannot: 'Forecast a reversal. Crowding can persist far longer than a model expects.',
    },
    {
      title: 'Macro and scheduled events',
      icon: 'clock',
      visual: 'events',
      can: 'Provide context for the sessions and windows where volatility is most likely.',
      cannot: 'Time an entry. Knowing that a day matters is not knowing what it will do.',
    },
  ],
}

export const COVERAGE = {
  eyebrow: 'Coverage',
  title: 'Four markets, one reading process',
  lead: 'Each market is read with the same method and published in the same format, so a brief on gold and a brief on Bitcoin are directly comparable.',
  /* `seriesKey` picks a series out of src/data/market.js so each card carries
     a real chart rather than an icon - the four markets are the four data
     families, and showing them as lines is what makes that concrete. The
     figures are generated, hence the illustrative note under the heading. */
  items: [
    {
      title: 'Crypto',
      seriesKey: 'btc',
      body: 'Major pairs and established networks, read alongside their on-chain activity.',
    },
    {
      title: 'Foreign exchange',
      seriesKey: 'aud',
      body: 'Major and minor pairs, with the rate decisions and data releases that move them.',
    },
    {
      title: 'Equities',
      seriesKey: 'asx',
      body: 'Large-cap names and index exposure, framed around earnings and sector rotation.',
    },
    {
      title: 'Commodities',
      seriesKey: 'xau',
      body: 'Metals and energy, where supply, inventory and the dollar all pull at once.',
    },
  ],
}

export const RISK = {
  title: 'Before you use any of this, read this part',
  points: [
    'Markets fall as well as rise. A position can lose value, and it can lose all of it.',
    'Leverage magnifies movement in both directions. It does not improve the odds, it enlarges the outcome.',
    'Crypto assets are volatile and, in places, thinly regulated. Prices can move sharply with no news at all.',
    'Never commit money you cannot afford to lose outright.',
  ],
  footnote:
    'Nothing on this site is personal financial advice, and nothing here should be read as a recommendation to buy or sell any asset. Ceravindo does not know your circumstances, your income, your debts or your goals, and its research does not account for any of them. If you are unsure whether a decision suits you, speak to a licensed financial adviser.',
}

export const FAQ_TEASER_COUNT = 4

export const FAQ = [
  {
    q: 'What does Ceravindo actually do?',
    a: 'It gathers market data for the assets you follow and publishes a written brief for each one - what the data shows, what the model concluded, how confident it is, and what would prove the reading wrong.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. Ceravindo publishes general information about markets. It does not consider your objectives, financial situation or needs, which is what personal advice requires. You should consider whether any information here is appropriate for you, and seek licensed advice if you are unsure.',
  },
  {
    q: 'Does the AI place trades for me?',
    a: 'No. Ceravindo does not connect to a broker, does not hold client money, and has no ability to trade on your behalf. It produces research and nothing else.',
  },
  {
    q: 'What data does the research use?',
    a: 'Four families of public data: price and volume, on-chain activity for crypto assets, market sentiment and positioning, and the scheduled economic calendar. Each brief names the sources behind the finding it presents.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Public market data providers and public blockchain records. Ceravindo does not use private or non-public information, and it does not receive order flow from any broker.',
  },
  {
    q: 'How often is the research published?',
    a: 'Each market you follow is re-read on a rolling basis rather than on a fixed signal schedule, and a brief is republished when the reading materially changes. Quiet markets produce fewer updates on purpose.',
  },
  {
    q: 'Are results guaranteed?',
    a: 'No, and any platform that says otherwise should be treated with suspicion. Model output is probabilistic. It is wrong sometimes, and market outcomes depend on far more than any model can observe.',
  },
  {
    q: 'Do you show when you get it wrong?',
    a: 'Yes. A revised brief states what changed and why. A record that only contains the calls that worked is marketing, not research.',
  },
  {
    q: 'What happens to the details I enter at sign-up?',
    a: 'Your first name, last name, email and phone number are used to set up your account and contact you about it. They are not sold. The privacy policy sets out exactly where they go and how to have them removed.',
  },
  {
    q: 'Can I close my account?',
    a: 'Yes, at any time, by writing to the support address. Closing an account removes your details from the active service, subject to the retention period described in the privacy policy.',
  },
  {
    q: 'How do I know a Ceravindo page is genuine?',
    a: 'Everything first-party is served from ceravindo-platform.com. Ceravindo does not run paid signal groups, does not message people first on social platforms, and never asks for card details, bank details or a password at sign-up.',
  },
  {
    q: 'How do I report a problem or make a complaint?',
    a: 'Write to the support address with what happened. Privacy complaints can also be taken to the Office of the Australian Information Commissioner if you are not satisfied with the response.',
  },
]

export const FINAL_CTA = {
  title: 'Start reading before you decide',
  body: 'Create an account to build a watchlist and start receiving research briefs. No card details, no broker connection, no password.',
  primaryCta: { label: 'Create your research account', href: '#register' },
}

/* The closing band carries the same design on every page; only the words and
   the chart behind it change. One entry per page that is not the homepage. */
export const PAGE_CTA = {
  about: {
    title: 'The only way to judge it is to read one',
    body: 'Create an account and start receiving briefs for the markets you choose.',
    label: 'Create your research account',
  },
  faq: {
    title: 'Still not answered?',
    body: 'Send us the question and we will come back to you - support runs around the clock.',
    label: 'Contact us',
    href: '/contact',
  },
  contact: {
    title: 'Start reading before you decide',
    body: 'Create an account to build a watchlist and start receiving research briefs.',
    label: 'Create your research account',
  },
}

export const ABOUT = {
  title: 'About Ceravindo',
  lead: 'A market research platform built for Australian readers, published on the principle that a claim without its evidence is not worth making.',
  /* Shown as a strip under the hero. These used to be the hero's panel; they
     moved here when the hero took the market dashboard, because four
     statements in a list were the wrong thing to put beside a chart. */
  principles: [
    'Every figure is sourced before it is published',
    'Uncertainty is stated, not rounded away',
    'A wrong reading is corrected in public, not deleted',
    'No performance claims and no testimonials',
  ],
  /* `visual` picks the panel beside the section - see AboutVisuals.jsx. Each
     section makes a different claim, so each gets a different drawing rather
     than the same chart four times. */
  /* A section renders `image` if it has one, and its `visual` panel otherwise.
     The two that carry photographs do so because they are the two claims a
     picture supports better than a diagram: who this is for, and how it is
     produced. "What we are not" and "How the AI is used" are about limits, and
     a limit is clearer drawn than photographed. */
  sections: [
    {
      title: 'What we are',
      visual: 'data',
      image: {
        src: '/about2.webp',
        alt: 'Two people looking at a phone together, with a Bitcoin price chart floating above them',
        width: 1400,
        height: 1042,
      },
      body: 'Ceravindo gathers public market data across crypto, foreign exchange, equities and commodities, and publishes written research briefs. Each brief carries its finding, the evidence behind it, the confidence the model holds, and the conditions under which the reading would be wrong.',
    },
    {
      title: 'What we are not',
      visual: 'boundary',
      body: 'Ceravindo is not a broker, not a financial adviser, not a fund manager and not a custodian. We do not hold client money, do not connect to a trading account, and do not place orders. We do not manage anyone’s portfolio and we do not tell anyone what to buy or sell.',
    },
    {
      title: 'Editorial standards',
      visual: 'correction',
      image: {
        src: '/about4.webp',
        alt: 'A person working at a laptop with floating cards showing a gauge, a bar chart and a settings icon',
        width: 1309,
        height: 1201,
      },
      body: 'Every figure we publish is sourced. Where the model is uncertain, we say so rather than rounding to a confident-sounding number. Where a published reading turns out to be wrong, the correction is recorded against the original rather than replacing it. We do not publish testimonials we cannot verify, and we do not publish performance figures at all.',
    },
    {
      title: 'How the AI is used',
      visual: 'process',
      body: 'The model summarises and interprets data that is already public. It does not receive non-public information, does not have access to any reader’s account, and does not act on anything it produces. Its output is reviewed against its sources before publication, and a brief that cannot be traced back to its evidence is not published.',
    },
  ],
}

export const CONTACT = {
  title: 'Contact Ceravindo',
  lead: 'Questions about the research, your account, or the data behind a brief.',
  /* `href` is the complete URL, not a prefix - the email address is only
     known once, in src/data/site.js, and building the mailto here is what
     keeps it from being typed twice. */
  cards: [
    { label: 'Email us', value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
    { label: 'Website', value: SITE_LABEL, href: SITE },
    { label: 'Based in', value: 'Australia' },
    {
      label: 'Support hours',
      value: '24/7, 365 days a year',
      note: 'Round-the-clock assistance',
    },
  ],
  formHeading: 'Send us a message',
  formNote:
    'Send a message and we will come back to you. Support runs around the clock. No card details, bank details or passwords are collected anywhere on this site.',
}

export const THANK_YOU = {
  title: 'Thanks - your details are in',
  body: 'We have received your details and will be in touch about your research account. Nothing further is needed from you right now.',
  steps: [
    'We check the details you sent.',
    'You hear back from us about setting up your watchlist.',
    'You start receiving research briefs for the markets you follow.',
  ],
}

export const NOT_FOUND = {
  title: 'That page does not exist',
  body: 'The link may be old, or the address may have a typo in it.',
  homeCta: 'Back to the homepage',
  contactCta: 'Contact us',
}

export const FOOTER = {
  blurb:
    'Ceravindo publishes AI-assisted market research for Australian readers. General information only, not personal financial advice.',
  legalNote:
    'Ceravindo does not hold client money and does not execute trades. Market research describes what the data shows; it does not predict outcomes.',
}

export const RISK_WARNING =
  'Trading and investing carry risk. The value of an asset can fall as well as rise, and you may get back less than you put in. Past performance is not a reliable indicator of future results. Nothing on this site is personal financial advice.'
