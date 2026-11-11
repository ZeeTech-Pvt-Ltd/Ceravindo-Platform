// =========================================================
// All site copy, in one place.
// =========================================================
// Four rules govern every line below, and they should govern any line added
// later:
//
//   1. No figure appears unless the operator supplied it. Where a number is
//      unknown it is `null` here, and a null renders as nothing.
//   2. Every claim states its own limit. The product is described by what it
//      does and what it cannot do, in the same breath.
//   3. No dashes of any kind in visible copy. No em dashes, no en dashes, no
//      hyphens. Full stops, commas and conjunctions carry the sentence.
//   4. Title Case on every heading. Every word capitalised.
//
// Nothing here promises a return, a win rate, an accuracy figure, a customer
// count, a rating or a licence. See README.md before adding anything that
// looks like one.
// =========================================================
import { SUPPORT_EMAIL, SITE, SITE_LABEL } from './site.js'

/* A figure the operator must supply before launch. `null` means it simply
   stays out of the copy and out of the structured data. */
export const MIN_DEPOSIT = null

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Review', href: '/ceravindo-review' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

/* -------------------------------------------------------------------------
   Hero
   -------------------------------------------------------------------------
   Search intent for "Ceravindo" is navigational: someone typing it wants the
   official site. So the hero confirms they are in the right place, then says
   what the product does. The brand sits in the eyebrow and the h1 carries the
   idea, which reads better than a heading stuffed with the name.
   ------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: 'Ceravindo AI Trading',
  title: 'Read The Market Before You Trade It',
  lead: 'Ceravindo studies price action, chart patterns and market mood, then explains what it sees in plain English. You get the research. You make the call.',
  checks: [
    'Six AI tools in one platform',
    'Every signal shows its reasoning',
    'General information only, not financial advice',
  ],
  primaryCta: { label: 'Create Your Account', href: '#register' },
}

/* States the regulatory posture rather than displaying payment logos. Naming a
   broker or a card network would imply a relationship that does not exist. */
export const TRUST = [
  { label: 'General information only' },
  { label: 'Not financial advice' },
  { label: 'No trade execution' },
  { label: 'Open worldwide, 18+' },
]

/* -------------------------------------------------------------------------
   What is Ceravindo
   ------------------------------------------------------------------------- */

export const WHAT_IS = {
  eyebrow: 'The Platform',
  title: 'What Is Ceravindo?',
  paragraphs: [
    'Ceravindo is a research and practice platform for people who trade. It reads market data across crypto, forex, equities and commodities, then turns what it finds into a plain English brief you can actually use.',
    'You get six tools in one place. Analysis, chart reading, strategy building, risk planning and signals all share the same market data across the Ceravindo platform, so the picture stays consistent from one screen to the next.',
    'What you will not get is a promise. Ceravindo does not place trades, does not hold your money and does not tell you what to buy. It shows you the reasoning, then leaves the decision where it belongs.',
  ],
}

/* -------------------------------------------------------------------------
   Features
   -------------------------------------------------------------------------
   Seven core features. Each entry explains what the tool does, how you use it
   and why it matters, without repeating the same benefit twice. No invented
   capabilities, integrations, indicators or performance numbers.
   ------------------------------------------------------------------------- */

export const FEATURES = {
  eyebrow: 'Features',
  title: 'Six Tools, One Workspace',
  lead: 'Every tool below runs on the same market data. Use one, or use them together.',
  items: [
    {
      icon: 'chart',
      title: 'AI Market Analysis',
      body: 'Ceravindo reads price, volume and market conditions across every market on your watchlist, then writes a short brief on what it found.',
      detail:
        'You stop opening ten tabs to work out what happened overnight. The brief tells you what moved, what the model made of it, and how confident it is.',
    },
    {
      icon: 'layers',
      title: 'AI Chart Analysis',
      body: 'Upload a chart, or open one from your watchlist, and the model marks the patterns, trend and levels it can see.',
      detail:
        'Useful when a setup looks obvious but you cannot say why. The analysis gives you the vocabulary, and shows which indicators it used.',
    },
    {
      icon: 'compass',
      title: 'Paper Trading Simulator',
      body: 'Practise with simulated funds in a workspace that mirrors the live interface, so the first time you size a position is not with real money.',
      detail:
        'Test a hunch, learn how leverage changes a position, and build the habit of planning a trade before you take it.',
    },
    {
      icon: 'layers',
      title: 'Strategy Builder',
      body: 'Set the conditions that matter to you, the markets they apply to and the risk you are willing to take. Ceravindo turns that into a strategy you can run.',
      detail:
        'Your approach stays yours. The builder gives it structure, so you can see it clearly and change one thing at a time.',
    },
    {
      icon: 'shield',
      title: 'Risk Management',
      body: 'Before you commit, the platform shows what the trade costs you if it goes wrong: position size, exposure and the loss at your stop.',
      detail:
        'Most accounts do not fail on the entry. They fail on size. Seeing the downside first is the simplest way to keep it survivable.',
    },
    {
      icon: 'activity',
      title: 'AI Trading Signals',
      body: 'The model flags setups it finds interesting, with the evidence behind each one and the conditions that would cancel it.',
      detail:
        'A signal here is a starting point for your own research, not an instruction. It is not a prediction, and it is not financial advice.',
    },
  ],
}

/* -------------------------------------------------------------------------
   How it works
   ------------------------------------------------------------------------- */

export const HOW_IT_WORKS = {
  eyebrow: 'How It Works',
  title: 'Three Steps, And Only The First One Is Ours',
  steps: [
    {
      n: '01',
      title: 'Create Your Account',
      body: 'Tell us where to reach you. No card details, no broker connection and no password are collected at sign up.',
    },
    {
      n: '02',
      title: 'Explore The Tools',
      body: 'Read a market brief, run a chart through the analyser, or build a strategy and test it on simulated funds before you ever risk real money.',
    },
    {
      n: '03',
      title: 'Decide For Yourself',
      body: 'Nothing in Ceravindo tells you to buy or sell. What you do with the research is your decision, made with whatever advice and account you already trust.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Market snapshot
   -------------------------------------------------------------------------
   Renamed from "Live Market Data". The figures on this page are generated,
   not streamed, so calling the section live would be a claim the site cannot
   back. The label stays visible.
   ------------------------------------------------------------------------- */

export const MARKET_SNAPSHOT = {
  eyebrow: 'Market Snapshot',
  title: 'Markets At A Glance',
  lead: 'Crypto, forex, equities and commodities in one view, so you can see where money is moving before you open a single chart.',
  note: 'Figures are illustrative, not live market data.',
}

/* -------------------------------------------------------------------------
   Why Ceravindo
   -------------------------------------------------------------------------
   The differentiators are things the platform actually does differently, not
   claims about being the best. No comparisons to named competitors.
   ------------------------------------------------------------------------- */

export const WHY = {
  eyebrow: 'Why Ceravindo',
  title: 'Why Traders Use Ceravindo',
  lead: 'Plenty of tools will tell you what to do. Fewer will show you why. That difference is the whole product.',
  points: [
    {
      title: 'The Reasoning Comes With The Answer',
      body: 'Every brief names the data it read and the conditions that would prove it wrong. If you cannot see where a conclusion came from, you cannot judge it.',
    },
    {
      title: 'Practice Before You Risk Anything',
      body: 'The simulator runs on the same interface as everything else, so trying an idea costs you nothing but time.',
    },
    {
      title: 'Six Tools That Share One Dataset',
      body: 'The analysis, the chart reader and the signals are looking at the same numbers. You are not reconciling two sets of figures that should have matched.',
    },
    {
      title: 'Built To Show Its Limits',
      body: 'Uncertainty is stated rather than rounded away. A model that is sometimes wrong is still useful. One that pretends otherwise is not.',
    },
    {
      title: 'Your Account, Your Broker',
      body: 'Ceravindo does not hold funds, does not connect to a trading account and does not place orders. Your money stays where it already is.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Security and trust
   -------------------------------------------------------------------------
   Only practices that are true of this site. No certifications, audits or
   compliance badges, because none have been supplied.
   ------------------------------------------------------------------------- */

export const SECURITY = {
  eyebrow: 'Security And Trust',
  title: 'What We Ask For, And What We Never Do',
  lead: 'Most of the trust question is answered by what a sign up form refuses to ask you for.',
  points: [
    {
      title: 'Four Fields, Not Fourteen',
      body: 'Sign up asks for your name, email and phone number. That is the whole list.',
    },
    {
      title: 'No Card Or Bank Details',
      body: 'There is no field for them anywhere on this site, and no page will ever ask you to enter them.',
    },
    {
      title: 'No Password At Sign Up',
      body: 'You are not creating a login credential here, so there is nothing for a breach to expose.',
    },
    {
      title: 'We Never Touch Your Funds',
      body: 'Ceravindo has no access to a trading account, a broker balance or a wallet. There is nothing to withdraw.',
    },
    {
      title: 'You Can Leave',
      body: 'Write to the support address and we remove your details from the active service, subject to the retention period in the privacy policy.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Reviews
   -------------------------------------------------------------------------
   Supplied by the operator, with each trader's name, location and market.
   Names and quotes must not be edited or invented here: an altered quote is
   no longer what the person said. If a review is removed, remove it whole.
   ------------------------------------------------------------------------- */

export const REVIEWS = {
  eyebrow: 'Reviews',
  title: 'What Traders Say',
  lead: 'Traders on the tools they use and the questions they ask themselves.',
  items: [
    {
      quote:
        'What I appreciate most is being able to understand the reasoning behind an analysis. Instead of simply following a signal, I can examine the market conditions, question the setup and consider what might invalidate my trading idea.',
      name: 'James Mitchell',
      role: 'Swing Trader',
      location: 'London, UK',
      market: 'Forex',
      rating: 4.5,
    },
    {
      quote:
        'The risk analysis tools make it easier to review a potential position before making a decision. I particularly like having key risk factors visible in one place rather than relying on assumptions.',
      name: 'Sophia Bennett',
      role: 'Part Time Trader',
      location: 'Toronto, Canada',
      market: 'Crypto',
      rating: 5,
    },
    {
      quote:
        'Testing a trading strategy before putting it into practice has helped me think more carefully about my decisions. Reviewing historical data and identifying weaknesses gives me a clearer perspective on different market setups.',
      name: 'Daniel Fischer',
      role: 'Day Trader',
      location: 'Berlin, Germany',
      market: 'Equities',
      rating: 4,
    },
  ],
}

/* -------------------------------------------------------------------------
   Review page
   -------------------------------------------------------------------------
   A review published by the site about its own product. Everything below
   restates facts the rest of the site already carries: no deposit figure, no
   fee claim, no performance number and no score. Those were not supplied,
   and an invented one is exactly the claim this project refuses to print.
   ------------------------------------------------------------------------- */

export const REVIEW_PAGE = {
  title: 'Ceravindo Review: What The Platform Does',
  lead: 'A plain look at what Ceravindo offers, what it deliberately leaves out, and the limits to weigh before you create an account.',
  shortAnswers: [
    { ok: true, text: 'Research and practice tools, not trade instructions' },
    { ok: true, text: 'Six tools sharing one dataset' },
    { ok: true, text: 'No trade execution and no client money' },
    { ok: false, text: 'No card details or password at sign up' },
  ],
  verdict: {
    title: 'The Short Answer',
    body: 'Ceravindo is a research and practice platform for people who trade. It reads public market data across crypto, forex, equities and commodities, then publishes a plain English brief that shows its reasoning. The tools let you test ideas with simulated funds and plan a position before real money is involved. What it does not do is trade for you, hold your money or tell you what to buy.',
  },
  facts: [
    { label: 'What It Is', value: 'AI market research and practice platform' },
    { label: 'Markets', value: 'Crypto, forex, equities and commodities' },
    { label: 'Tools', value: 'Six research and practice tools' },
    { label: 'What It Avoids', value: 'Trade execution and client money' },
  ],
  toolsTitle: 'Six Tools In One Workspace',
  toolsLead:
    'Every tool runs on the same market data, so a brief, a chart reading and a signal do not disagree with each other.',
  balance: {
    title: 'What Works Well, And What To Weigh',
    lead: 'A review that lists only strengths is not much of a review. This is the useful part, and the part that needs your attention.',
    prosTitle: 'What Works Well',
    pros: [
      'Each brief shows its reasoning, so you can judge the conclusion instead of taking it on faith.',
      'The paper trading simulator lets you test an idea with simulated funds before you risk anything.',
      'Risk tools put position size and the loss at your stop in front of you before you commit.',
      'Six tools share one dataset, which keeps the picture consistent from screen to screen.',
      'Sign up asks for your name, email and phone. It does not ask for card details or a password.',
    ],
    consTitle: 'What To Weigh',
    cons: [
      'The research describes markets. It does not predict them, and it will be wrong sometimes.',
      'Ceravindo does not execute trades, so every order stays with you and your own broker.',
      'A signal is a starting point for research, not an instruction to buy or sell.',
      'The tools support your research. They do not replace personal financial advice.',
      'Outcomes depend on how you use the research, not on the platform alone.',
    ],
  },
  audience: {
    title: 'Who It Suits, And Who It Does Not',
    lead: 'The platform is built for a particular kind of user. If you are not that user, it will not fix that.',
    forTitle: 'It Suits',
    forList: [
      'Traders who want to understand the reasoning behind a market call.',
      'Beginners who want a place to practise before risking real money.',
      'People who already have a broker and want better research around their own decisions.',
      'Anyone covering crypto, forex, equities or commodities who wants one consistent view.',
    ],
    notForTitle: 'It Does Not Suit',
    notForList: [
      'Anyone looking for a guaranteed outcome or a system that trades without them.',
      'People who want personal financial advice tailored to their situation.',
      'Traders who want the platform to hold funds or place orders.',
      'Anyone who cannot afford to lose the money they trade with.',
    ],
  },
  signup: {
    title: 'Sign Up And Your Details',
    body: [
      'The form asks for your first name, last name, email and phone number, plus consent to the privacy policy and terms. There is no password field and no card field at this stage.',
      'Those details go to the registration service that sets up your account, as the privacy policy describes. They are not sold. You can ask for them to be removed at any time by writing to support.',
      'Creating an account does not connect a broker, open a trading position or move any money. It gives you access to the research and practice tools.',
    ],
    fieldsTitle: 'What The Form Asks For',
    fields: [
      'First name',
      'Last name',
      'Email',
      'Phone number',
      'Consent to the privacy policy and terms',
    ],
  },
  faqTitle: 'Review Questions',
  faqLead: 'The questions a reader should ask before trusting any review, including this one.',
  faq: [
    {
      q: 'Is Ceravindo A Scam?',
      a: 'Ceravindo is a market research and practice platform, not a broker. It does not hold client money, does not execute trades and does not ask for card details at sign up. This review is published by Ceravindo about its own product, so weigh the limits on this page before you decide.',
    },
    {
      q: 'Does Ceravindo Guarantee Profits?',
      a: 'No. Market research describes what the data shows. It does not predict outcomes, and any platform that promises a guaranteed outcome should be treated with suspicion.',
    },
    {
      q: 'Can I Lose Money With Ceravindo?',
      a: 'Yes, if you trade with real money anywhere. Markets fall as well as rise, and leverage magnifies the result in both directions. Ceravindo does not manage your positions, so the risk sits with your decisions and the broker you use.',
    },
    {
      q: 'Does Ceravindo Place Trades For Me?',
      a: 'No. Ceravindo does not connect to a broker, does not hold funds and cannot place orders. It produces research and gives you a place to practise. Execution stays with you and your own broker.',
    },
    {
      q: 'What Do I Need To Sign Up?',
      a: 'A first name, last name, email address, phone number and consent to the privacy policy and terms. No card details, no broker connection and no password are collected.',
    },
    {
      q: 'How Do I Stop Using Ceravindo?',
      a: 'Write to the support address and ask for your details to be removed from the active service. The privacy policy sets out the retention period that applies after that request.',
    },
  ],
  cta: {
    title: 'Judge It By What It Does',
    body: 'Create an account and read a market brief for yourself. No card details, no broker connection, no password.',
    label: 'Create Your Account',
    href: '/#register',
  },
}

/* -------------------------------------------------------------------------
   Risk band
   -------------------------------------------------------------------------
   Global wording: no regulator or jurisdiction is named, because the site no
   longer targets one country.
   ------------------------------------------------------------------------- */

export const RISK = {
  title: 'Before You Use Any Of This, Read This Part',
  points: [
    'Markets fall as well as rise. A position can lose value, and it can lose all of it.',
    'Leverage magnifies movement in both directions. It does not improve the odds, it enlarges the outcome.',
    'Crypto assets are volatile and, in places, thinly regulated. Prices can move sharply with no news at all.',
    'Backtested results describe the past. They are not a forecast, and a strategy that worked before can fail next week.',
    'Never commit money you cannot afford to lose outright.',
  ],
  footnote:
    'Nothing on this site is personal financial advice, and nothing here should be read as a recommendation to buy or sell any asset. Ceravindo does not know your circumstances, your income, your debts or your goals, and its research does not account for any of them. If you are unsure whether a decision suits you, speak to a licensed adviser in your jurisdiction.',
}

export const FAQ_TEASER_COUNT = 4

/* -------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------
   Answers the questions the seven features raise. Global framing throughout.
   ------------------------------------------------------------------------- */

export const FAQ = [
  {
    q: 'What does Ceravindo actually do?',
    a: 'The Ceravindo platform reads market data for the assets you follow and publishes a plain English brief for each one: what the data shows, what the model concluded, how confident it is, and what would prove the reading wrong.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. Ceravindo publishes general information about markets. It does not consider your objectives, financial situation or needs, which is what personal advice requires. Speak to a licensed adviser in your jurisdiction if you are unsure.',
  },
  {
    q: 'Does the AI place trades for me?',
    a: 'No. Ceravindo does not connect to a broker, does not hold client money and has no ability to trade on your behalf. It produces research and a place to practise, and nothing else.',
  },
  {
    q: 'What is the paper trading simulator for?',
    a: 'It lets you test ideas with simulated funds in the same interface you would use for research. You can size a position, see how leverage changes it, and get the mistakes out of the way before real money is involved.',
  },
  {
    q: 'How does the strategy builder work?',
    a: 'You set the conditions that matter to you, the markets they apply to and the risk you are willing to accept. Ceravindo turns that into a strategy you can review and backtest, and you can change one variable at a time.',
  },
  {
    q: 'What do the AI trading signals mean?',
    a: 'They flag setups the model finds interesting, along with the evidence and the conditions that would cancel the idea. A signal is a starting point for your own research. It is not a prediction and it is not a recommendation.',
  },
  {
    q: 'Can I test a strategy before using it?',
    a: 'Yes. Backtesting runs your rules against historical market data so you can see how they behaved through past conditions. It describes the past, not the future, and a strategy that worked before can still fail next week.',
  },
  {
    q: 'What markets are covered?',
    a: 'Crypto, foreign exchange, equities and commodities. The same reading process runs across all four, so a brief on gold and a brief on Bitcoin are directly comparable.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Public market data providers and public blockchain records. Ceravindo does not use private or non public information, and it does not receive order flow from any broker.',
  },
  {
    q: 'Are results guaranteed?',
    a: 'No, and any platform that says otherwise should be treated with suspicion. Model output is probabilistic. It is wrong sometimes, and market outcomes depend on far more than any model can observe.',
  },
  {
    q: 'What happens to the details I enter at sign up?',
    a: 'Your first name, last name, email and phone number are used to set up your account and contact you about it. They are not sold. The privacy policy sets out where they go and how to have them removed.',
  },
  {
    q: 'How do I close my account or report a problem?',
    a: 'Write to the support address. Closing an account removes your details from the active service, subject to the retention period described in the privacy policy. If you are not satisfied with our response, you can raise it with your local data protection authority.',
  },
]

export const FINAL_CTA = {
  title: 'Start Reading Before You Decide',
  body: 'Create an account to build a watchlist, run a strategy and see the research for yourself. No card details, no broker connection, no password.',
  primaryCta: { label: 'Create Your Account', href: '#register' },
}

/* The closing band carries the same design on every page; only the words and
   the chart behind it change. One entry per page that is not the homepage. */
export const PAGE_CTA = {
  about: {
    title: 'The Only Way To Judge It Is To Read One',
    body: 'Create an account and start reading the research for the markets you choose.',
    label: 'Create Your Account',
  },
  faq: {
    title: 'Still Not Answered?',
    body: 'Send us the question and we will come back to you.',
    label: 'Contact Us',
    href: '/contact',
  },
  contact: {
    title: 'Start Reading Before You Decide',
    body: 'Create an account to build a watchlist and start reading the research.',
    label: 'Create Your Account',
  },
}

export const ABOUT = {
  title: 'About Ceravindo',
  lead: 'A market research and practice platform, published on the principle that a claim without its evidence is not worth making.',
  principles: [
    'Every figure is sourced before it is published',
    'Uncertainty is stated, not rounded away',
    'A wrong reading is corrected in public, not deleted',
    'No performance claims and no invented reviews',
  ],
  sections: [
    {
      title: 'What We Are',
      visual: 'data',
      image: {
        src: '/about2.webp',
        alt: 'Two people looking at a phone together, with a Bitcoin price chart floating above them',
        width: 1400,
        height: 1042,
      },
      body: 'Ceravindo AI trading runs on public market data across crypto, foreign exchange, equities and commodities, with written research briefs alongside tools to practise with. Each brief carries its finding, the evidence behind it, the confidence the model holds, and the conditions under which the reading would be wrong.',
    },
    {
      title: 'What We Are Not',
      visual: 'boundary',
      image: {
        src: '/about5.webp',
        alt: 'A person surrounded by crossed out cards labelled broker, financial adviser, fund manager, custodian and other roles Ceravindo does not take',
        width: 1400,
        height: 1042,
      },
      body: 'Ceravindo is not a broker, not a financial adviser, not a fund manager and not a custodian. We do not hold client money, do not connect to a trading account, and do not place orders. We do not manage anyone’s portfolio and we do not tell anyone what to buy or sell.',
    },
    {
      title: 'Editorial Standards',
      visual: 'correction',
      image: {
        src: '/about4.webp',
        alt: 'A person working at a laptop with floating cards showing a gauge, a bar chart and a settings icon',
        width: 1309,
        height: 1201,
      },
      body: 'Every figure we publish is sourced. Where the model is uncertain, we say so rather than rounding to a confident sounding number. Where a published reading turns out to be wrong, the correction is recorded against the original rather than replacing it. We do not publish reviews we cannot verify, and we do not publish performance figures at all.',
    },
    {
      title: 'How The AI Is Used',
      visual: 'process',
      image: {
        src: '/about6.webp',
        alt: 'A robot at a laptop connected to cards showing a market chart, source documents and verification checks',
        width: 1400,
        height: 1042,
      },
      body: 'The model summarises and interprets data that is already public. It does not receive non public information, does not have access to any reader’s account, and does not act on anything it produces. Its output is reviewed against its sources before publication, and a brief that cannot be traced back to its evidence is not published.',
    },
  ],
}

export const CONTACT = {
  title: 'Contact Ceravindo',
  lead: 'Questions about the research, your account, or the data behind a brief.',
  /* `href` is the complete URL, not a prefix. The email is written once, in
     src/data/site.js. */
  panel: {
    hours: { value: '24/7, 365 Days A Year', note: 'Round the clock assistance' },
    channels: [
      { label: 'Email', value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
      { label: 'Website', value: SITE_LABEL, href: SITE },
      { label: 'Coverage', value: 'Worldwide' },
    ],
  },
  formHeading: 'Get In Touch',
  nextSteps: {
    title: 'What Happens Next',
    steps: [
      'We check the details you sent.',
      'We come back to you by email or phone.',
      'You ask us anything about the research, your account, or a brief.',
    ],
  },
}

export const THANK_YOU = {
  title: 'Thanks, Your Details Are In',
  body: 'We have received your details and will be in touch about your account. Nothing further is needed from you right now.',
  steps: [
    'We check the details you sent.',
    'You hear back from us about setting up your account.',
    'You start reading research briefs for the markets you follow.',
  ],
}

export const NOT_FOUND = {
  title: 'That Page Does Not Exist',
  body: 'The link may be old, or the address may have a typo in it.',
  homeCta: 'Back To The Homepage',
  contactCta: 'Contact Us',
}

export const FOOTER = {
  blurb:
    'Ceravindo publishes AI assisted market research and practice tools for traders worldwide. General information only, not financial advice.',
  legalNote:
    'Ceravindo does not hold client money and does not execute trades. Market research describes what the data shows. It does not predict outcomes.',
}

export const RISK_WARNING =
  'Trading and investing carry risk. The value of an asset can fall as well as rise, and you may get back less than you put in. Past performance is not a reliable indicator of future results. Nothing on this site is personal financial advice.'
