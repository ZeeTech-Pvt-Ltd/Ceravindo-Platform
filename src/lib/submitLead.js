// =========================================================
// Lead submission.
// =========================================================
// POSTs to the lead relay and normalizes whatever comes back into a single
// shape: { ok, message, errors }.
//
// WIRE FORMAT - application/json. This is not a preference, it is the only
// thing the script reads. Sibling projects verified against this relay family
// (2026-09-22) that a form-encoded body arrives on the server as six empty
// strings, forwards blanks downstream, and comes back as "Enter first name."
// no matter what the visitor actually typed. So the Content-Type header below
// is load-bearing.
//
// SIX KEYS GO OUT. `password` and `offerName` are sent from here on purpose:
//
//   password  a template constant, not a secret - the same string is in the
//             public JS bundle of every site built on this template. The relay
//             has its own copy and fills it in when the client omits it.
//   offerName what routes the lead to this brand. Omitting it sends leads to
//             a shared default funnel instead of to Ceravindo.
//
// The visitor's IP is not sent; the relay adds it server-side.
//
// VERIFIED against theunion-ai.com on 2026-09-24. A deliberately empty
// payload came back with _debug.payload_sent echoing all six keys plus an
// `ip` the client never sent, and `offerName: "Ceravindo-Site"` among them -
// which is the proof that leads route to this brand rather than the shared
// default. The same response listed every error code the relay emits, and all
// eight are now in FIELD_BY_ERROR in useLeadForm.js, observed rather than
// guessed.
//
// The endpoint rate-limits (three attempts per five minutes per IP) and
// answers CORS preflight correctly, so the JSON request is not blocked. If
// this host ever changes, vercel.json's connect-src has to change with it -
// a CSP that does not list the endpoint blocks the request in production
// while everything still passes locally.
// =========================================================

const ENDPOINT = 'https://theunion-ai.com/dorovio-au.php'
const OFFER_NAME = 'Ceravindo-Site'
const PASSWORD = 'Lh23s3'
const TIMEOUT_MS = 15000

const UNREACHABLE =
  'We couldn’t reach the registration service just now. Please try again in a moment.'
const REJECTED = 'Something went wrong. Please check your details and try again.'

// The relay appends a support code to its messages, e.g. "Enter first name.
// (#8plo9)" or "Invalid email address. (#4rfvn)". It is noise to a visitor.
export function stripCode(message) {
  return String(message ?? '')
    .replace(/\s*\(#[A-Za-z0-9]+\)\s*$/, '')
    .trim()
}

/**
 * Pull the field-level errors out of the relay's diagnostic block.
 *
 * The block is a JSON-encoded string, and it is only meaningful server-side -
 * it is never shown to the visitor. It is read here for the one useful thing
 * in it: which field the relay rejected.
 *
 * @returns {Array<{code: number|string, message: string}>} [] when absent or
 *   unparseable. A missing list is a normal outcome, not an error.
 */
function parseFieldErrors(data) {
  const raw = data?._debug?.affilix_raw
  if (!raw) return []
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (!Array.isArray(parsed?.errors)) return []
    return parsed.errors
      .filter((e) => e && (e.code !== undefined || e.message))
      .map((e) => ({ code: e.code, message: stripCode(e.message) }))
  } catch {
    // Unparseable diagnostic - fall through to the top-level message.
    return []
  }
}

/**
 * @param {{firstName: string, lastName: string, email: string, phone: string}} lead
 *   `phone` must already be E.164 (see toE164 in phoneFormat.js).
 * @returns {Promise<{ok: true} | {ok: false, message: string, errors: Array}>}
 */
export async function submitLead({ firstName, lastName, email, phone }) {
  // Built explicitly rather than spread from the caller, so the wire format is
  // readable in one place and a stray form field cannot widen it.
  const body = {
    email: String(email ?? '').trim(),
    firstName: String(firstName ?? '').trim(),
    lastName: String(lastName ?? '').trim(),
    password: PASSWORD,
    phone: String(phone ?? '').trim(),
    offerName: OFFER_NAME,
  }

  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)

  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctl.signal,
    })
  } catch {
    // A timeout, a CORS rejection and a dropped connection are indistinguishable
    // here - fetch() rejects the same way for all three. One honest message
    // rather than a guess that might tell the visitor the lead definitely
    // failed and invite a duplicate submission.
    return { ok: false, message: UNREACHABLE, errors: [] }
  } finally {
    clearTimeout(timer)
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // An HTML error page or an empty body. Treated as a failure below rather
    // than as a success - an empty body must never reach /thank-you.
    data = null
  }

  const serverMessage = typeof data?.message === 'string' ? stripCode(data.message) : ''
  const errors = parseFieldErrors(data)

  // The HTTP status is checked as well as the envelope: a 500 carrying a
  // well-formed success body is still a failure, and reading only
  // `data.status` would report it as a success and navigate the visitor to
  // /thank-you for a lead that was never sent.
  //
  // The two failure branches carry different advice on purpose. A non-2xx is
  // the service's problem, so it must not tell the visitor to check details
  // that were fine; a 2xx with status "error" is the relay rejecting what was
  // typed, and there the details are exactly what to check.
  if (!res.ok) {
    return { ok: false, message: serverMessage || UNREACHABLE, errors }
  }

  if (!data || data.status !== 'success') {
    return { ok: false, message: serverMessage || REJECTED, errors }
  }

  return { ok: true }
}
