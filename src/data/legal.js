// =========================================================
// Legal documents - the single source for both the in-form quick-view modal
// and the full legal pages.
// =========================================================
// One object, two renderers. The modal and /privacy cannot drift apart
// because there is only one copy of the text.
//
// GLOBAL FRAMING. The site used to target Australia and this copy named the
// Privacy Act, the OAIC, the Australian Consumer Law and the courts of New
// South Wales. It targets a worldwide audience now, so those references are
// gone. What replaced them is deliberately general: "applicable data
// protection law", "your local supervisory authority", and consumer rights
// that cannot lawfully be excluded. No jurisdiction is invented, because the
// operator has not supplied one.
//
// REVIEW_REQUIRED. The flags below mark text that makes a legal assertion.
// They are deliberately cautious, but they are still assertions, and a
// qualified lawyer in the operator's own jurisdiction should confirm them
// before launch.
// =========================================================

import { SUPPORT_EMAIL } from './site.js'

export const LEGAL_LINKS = [
  { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
  { id: 'terms', label: 'Terms Of Use', path: '/terms' },
  { id: 'risk', label: 'Risk Disclosure', path: '/risk-disclosure' },
]

const UPDATED = 'November 2026'

export const LEGAL_DOCS = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    updated: UPDATED,
    intro:
      'This policy explains what personal information Ceravindo collects through this website, why it is collected, where it goes, and how you can have it corrected or removed. It is written to align with applicable data protection law in the countries where we operate.',
    sections: [
      {
        heading: 'What We Collect',
        body: [
          'When you submit the account form, we collect four pieces of information: your first name, your last name, your email address and your phone number.',
          'We do not collect card details, bank account details, government identifiers or passwords. There is no field for them anywhere on this site, and the sign up form does not ask you to create a password.',
          'Our servers may also record standard technical information that any web server receives, such as the request time and the page requested, for security and troubleshooting.',
        ],
      },
      {
        heading: 'Why We Collect It',
        body: [
          'To set up your account, to contact you about it, and to provide the research you have asked for.',
          'We do not use your details for automated decision making, we do not build advertising profiles, and we do not sell your information to anyone.',
        ],
      },
      {
        heading: 'Where It Goes',
        body: [
          'Form submissions are sent to our registration service, which forwards them to the operator of the Ceravindo platform. That service processes the information on our instructions and for the purpose described above.',
          'We do not disclose your information to any other party unless we are required to by law, or you have asked us to.',
        ],
      },
      {
        heading: 'Analytics And Third Party Requests',
        body: [
          'We use Google Analytics to understand how this site is used. It records things like the pages you view, how long you stay, how you arrived here, and your device type, and it sends that information to Google, which can include your IP address. Google processes that data under its own terms, and we do not use it to identify you personally or to build advertising profiles.',
          'We do not run advertising pixels, and we do not sell or share your personal information with third parties.',
          'Fonts are served from this domain rather than from a font CDN, and the country selector in the phone field is set from your browser timezone. Neither makes a network request to determine who you are.',
        ],
      },
      {
        heading: 'How Long We Keep It',
        body: [
          'We keep your details for as long as your account is active. If you ask us to close your account, we remove your details from the active service and retain only what we are required to keep for legal or accounting purposes.',
        ],
      },
      {
        heading: 'Access, Correction And Removal',
        body: [
          `You can ask to see the information we hold about you, ask us to correct it, or ask us to delete it. Write to ${SUPPORT_EMAIL} and we will respond within a reasonable period.`,
          'If you believe we have handled your information improperly and you are not satisfied with our response, you can raise the matter with the data protection authority in your country.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'Information is transmitted over an encrypted connection and stored on access controlled systems. No method of transmission or storage is completely secure, and we cannot guarantee absolute security, but we take reasonable steps to protect what you send us.',
        ],
      },
      {
        heading: 'Who To Contact',
        body: [`Privacy questions go to ${SUPPORT_EMAIL}.`],
      },
    ],
  },

  terms: {
    id: 'terms',
    title: 'Terms Of Use',
    updated: UPDATED,
    intro:
      'These terms govern your use of the Ceravindo website and platform. By using the site you accept them. If you do not accept them, please do not use the site.',
    sections: [
      {
        heading: 'Eligibility',
        body: [
          'You must be at least 18 years old to create an account. By submitting the form you confirm that you are.',
        ],
      },
      {
        heading: 'What This Service Provides',
        body: [
          'Ceravindo publishes general market research and provides tools to practise with. It is not a broker, dealer, financial adviser, fund manager or custodian. It does not hold client money, does not connect to a trading account, and does not place orders on anyone’s behalf.',
          'Nothing published on this site is personal financial advice. We do not consider your objectives, financial situation or needs, and the research is produced for a broad audience rather than for you individually.',
        ],
        reviewRequired: true,
      },
      {
        heading: 'Your Responsibilities',
        body: [
          'You are responsible for any decision you make after reading our research, and for assessing whether it is appropriate for your circumstances.',
          'You agree not to scrape, republish or resell the research, not to attempt to access accounts that are not yours, and not to use the site in a way that interferes with other users.',
        ],
      },
      {
        heading: 'Availability And Changes',
        body: [
          'We aim to keep the site available, but we do not guarantee uninterrupted access and we may change, suspend or withdraw any part of it. Research is published when it is ready, not on a guaranteed schedule.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'The research, the written briefs and the design of this site belong to the operator. You may read and use them for your own purposes. You may not republish them commercially without written permission.',
        ],
      },
      {
        heading: 'Limits Of Our Liability',
        body: [
          'To the extent permitted by law, we are not liable for any loss arising from your use of this site or from reliance on anything published here, including trading losses.',
          'Nothing in these terms excludes or limits any right you have under consumer law in your country that cannot lawfully be excluded.',
        ],
        reviewRequired: true,
      },
      {
        heading: 'Governing Law',
        body: [
          'These terms are governed by the laws applicable where the operator is established, and any dispute will be handled by the courts with jurisdiction over the operator.',
        ],
        reviewRequired: true,
      },
      {
        heading: 'Contact',
        body: [`Questions about these terms go to ${SUPPORT_EMAIL}.`],
      },
    ],
  },

  risk: {
    id: 'risk',
    title: 'Risk Disclosure',
    updated: UPDATED,
    intro:
      'This notice sets out the risks of trading and investing, and the limits of what general market research can do for you. Please read it before acting on anything published on this site.',
    sections: [
      {
        heading: 'Markets Move Both Ways',
        body: [
          'The value of any asset can fall as well as rise, and you may get back less than you put in. A position can lose its entire value. Past performance is not a reliable indicator of future results, and no research method changes that.',
        ],
      },
      {
        heading: 'Leverage',
        body: [
          'Leveraged products magnify the effect of a price movement on your position. That cuts both ways: a small adverse move can wipe out a large proportion of the money you committed, and can in some products create a liability beyond your deposit.',
        ],
      },
      {
        heading: 'Crypto Assets',
        body: [
          'Crypto assets are volatile and can move sharply with no news at all. Some markets are thinly traded, which can make it difficult to exit a position at the price you expected. Regulation varies between countries and is still developing, which means reduced protections in some places.',
        ],
      },
      {
        heading: 'Backtesting And Simulated Results',
        body: [
          'A backtest describes how a set of rules would have behaved on past data. It is not a forecast. Historical data can flatter a strategy that would fail in live conditions, and simulated results carry none of the costs, slippage or emotion of a real position.',
        ],
      },
      {
        heading: 'Signals Are Not Predictions',
        body: [
          'Where the platform flags a setup, it is showing you what the model found interesting and why. It is not telling you the market will move that way, and it is not financial advice.',
        ],
      },
      {
        heading: 'What This Research Is, And Is Not',
        body: [
          'Ceravindo publishes general information about markets. It is not personal financial advice, it does not take your circumstances into account, and it is not a recommendation to buy or sell anything.',
          'Model output is probabilistic. It is sometimes wrong. Where a published reading turns out to be wrong we record the correction, but a correction does not undo a loss you have already taken.',
        ],
      },
      {
        heading: 'You Keep The Decision',
        body: [
          'Ceravindo does not hold your money, does not connect to a broker, and does not place trades. Nothing published here is an offer or invitation to trade.',
        ],
      },
      {
        heading: 'Illustrations Are Not Forecasts',
        body: [
          'Any chart, example or scenario shown on this site is illustrative of the interface or the method. It is not a projection, and it is not a representation of what will happen.',
        ],
      },
      {
        heading: 'Seek Advice If You Are Unsure',
        body: [
          'If you are uncertain whether any course of action suits your circumstances, speak to a licensed adviser in your jurisdiction before acting. Never commit money you cannot afford to lose.',
        ],
      },
    ],
  },
}

/** True when any legal section is still awaiting professional review. */
export const REVIEW_REQUIRED = Object.values(LEGAL_DOCS).some((doc) =>
  doc.sections.some((s) => s.reviewRequired),
)

// Surface the outstanding review during development so it is not forgotten
// between now and launch. Production and the build stay silent - this is a
// note to whoever is working on the site, not a message to a visitor.
if (import.meta.env?.DEV && REVIEW_REQUIRED) {
  console.warn(
    '[Ceravindo] Legal review outstanding: the Terms of Use contain statements about the ' +
      'operator’s regulatory status and governing law that a qualified lawyer should confirm ' +
      'before launch. See src/data/legal.js REVIEW_REQUIRED.',
  )
}
