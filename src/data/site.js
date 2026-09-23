// =========================================================
// Identity constants - the origin, the brand, the contact address.
// =========================================================
// These live here rather than in seo.js because both content.js and legal.js
// need them, and seo.js imports from content.js. Importing back the other way
// would make a cycle, and in a cycle a module can read a binding before it is
// initialised - which fails at build time with a temporal dead zone error
// rather than anything that names the real problem.
//
// A sibling project retyped its origin in three files and one copy had
// already drifted to a domain that was not theirs. Import from here.
// =========================================================

export const BRAND = 'Ceravindo'
export const SITE = 'https://ceravindo-platform.com'
/** The origin without the scheme, for display in copy. */
export const SITE_LABEL = 'ceravindo-platform.com'
export const SUPPORT_EMAIL = 'support@ceravindo-platform.com'
export const OG_IMAGE = `${SITE}/og-image.png`
export const LOCALE_OG = 'en_AU'
