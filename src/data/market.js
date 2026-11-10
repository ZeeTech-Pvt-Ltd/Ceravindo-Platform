// =========================================================
// Illustrative market data for the hero visual and the ticker.
// =========================================================
// THIS IS NOT LIVE DATA. Every figure below is generated from a seeded
// pseudo-random walk so the charts are stable between reloads rather than
// jumping on each render. The UI labels it "Illustrative" wherever it appears,
// and it must stay labelled - a plausible-looking number presented as real is
// the one thing a page like this cannot do.
//
// Nothing here is fetched, and no API key or third-party call is involved.
//
// Replacing this with a real feed? The shape to keep is:
//   { symbol, name, market, price, change, series }
// and the "Illustrative" label in HeroVisual.jsx / Ticker.jsx should come off
// at the same time, because a real feed carrying a sample-data disclaimer is
// just as misleading in the other direction.
// =========================================================

// Park-Miller LCG. Same generator the sibling projects use - deterministic,
// so a chart looks the same on every load.
function seeded(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const seedFrom = (str) => {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 2147483647
  return h || 7
}

/** A random walk with a gentle drift, ending near `endValue`. */
function walk(key, points, start, end) {
  const rnd = seeded(seedFrom(key))
  const out = [start]
  for (let i = 1; i < points; i++) {
    const progress = i / (points - 1)
    // Pull toward the target so the series actually finishes where the
    // displayed price says it does.
    const pull = (end - out[i - 1]) * 0.12 * progress
    const noise = (rnd() - 0.5) * start * 0.028
    out.push(Math.max(out[i - 1] + pull + noise, start * 0.55))
  }
  out[out.length - 1] = end
  return out
}

/**
 * Global instruments, quoted in USD.
 *
 * The site was Australia facing when these were AUD pairs and the ASX 200.
 * It is global now, so the watchlist has to read as a world market rather
 * than a local one: majors in crypto and forex, metals and energy, and the
 * two US indices most people watch.
 *
 * [key, symbol, name, market, price, changePct]
 */
const ROWS = [
  ['btc', 'BTC/USD', 'Bitcoin', 'Crypto', 96420.8, 2.41],
  ['eth', 'ETH/USD', 'Ethereum', 'Crypto', 3412.55, 1.18],
  ['xau', 'XAU/USD', 'Gold', 'Commodities', 2684.3, -0.34],
  ['spx', 'S&P 500', 'S&P 500', 'Equities', 6021.4, 0.52],
  ['ndx', 'NDX', 'Nasdaq 100', 'Equities', 21480.5, 0.74],
  ['eur', 'EUR/USD', 'Euro', 'Forex', 1.0584, -0.21],
  ['gbp', 'GBP/USD', 'British Pound', 'Forex', 1.2712, 0.14],
  ['jpy', 'USD/JPY', 'Japanese Yen', 'Forex', 154.32, 0.38],
  ['wti', 'WTI', 'Crude Oil', 'Commodities', 71.42, -0.88],
  ['sol', 'SOL/USD', 'Solana', 'Crypto', 212.9, 3.16],
  ['xag', 'XAG/USD', 'Silver', 'Commodities', 31.18, 0.62],
  ['xrp', 'XRP/USD', 'XRP', 'Crypto', 2.31, -1.12],
]

export const marketRows = ROWS.map(([key, symbol, name, market, price, change]) => ({
  key,
  symbol,
  name,
  market,
  price,
  change,
  // 48 points reads as an intraday series at the size the hero renders it.
  series: walk(key, 48, price / (1 + change / 100), price),
}))

/** The row the hero panel features. */
export const featuredMarket = marketRows[0]

export const TIMEFRAMES = ['1H', '1D', '1W', '1M']

/** '$142,380.20' - grouped, two decimals, no currency symbol guessing. */
export function formatPrice(value) {
  return value.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/** '+2.41%' / '-0.34%' */
export function formatChange(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

// ---------------------------------------------------------------------------
// Illustrative readings for the four research inputs on the method section.
// Same rule as everything above: generated, never fetched, and labelled.
// ---------------------------------------------------------------------------

/** Net exchange flow per hour, in millions. Negative is outflow.
    Centred on zero, so the chart shows inflow and outflow rather than mostly
    one direction - which is the whole point of drawing it around a baseline. */
export const onChainFlows = (() => {
  const rnd = seeded(seedFrom('onchain-flows'))
  return Array.from({ length: 14 }, () => Math.round((rnd() - 0.5) * 180))
})()

/** Where the market is leaning, as a 0-100 reading. */
export const sentiment = {
  value: 62,
  leftLabel: 'Short',
  rightLabel: 'Long',
  caption: 'Net long positioning, majors',
}

/** The scheduled events that move a session. Times are UTC, since the
    audience is global rather than in one timezone. */
export const macroEvents = [
  { when: 'Wed 19:00', label: 'US Federal Reserve decision', impact: 'High' },
  { when: 'Thu 13:30', label: 'US CPI, monthly', impact: 'High' },
  { when: 'Fri 07:00', label: 'UK GDP, quarterly', impact: 'Medium' },
]

/**
 * A peak-to-trough decline, for the risk section.
 *
 * Deliberately a losing chart. The risk band is the one place on the page
 * where the visual has to argue against the product, and a rising line there
 * would undercut every sentence beside it.
 *
 * Built as an explicit rise-then-fall rather than a random walk, so the peak
 * and the trough land where the labels say they do. Peak and trough indices
 * are computed from the array, so the annotation cannot drift from the curve
 * if the shape is ever retuned.
 */
export const drawdownSeries = (() => {
  const rnd = seeded(seedFrom('drawdown'))
  const points = []
  const RISE = 26
  const FALL = 30

  // Climb to a high on a mild uptrend.
  for (let i = 0; i < RISE; i++) {
    const t = i / (RISE - 1)
    points.push(100 + t * 30 + (rnd() - 0.5) * 2.4)
  }
  // Then give most of it back, faster than it was made.
  const peakValue = points[points.length - 1]
  for (let i = 1; i <= FALL; i++) {
    const t = i / FALL
    // Ease-out so the worst of the fall happens early, which is how a
    // leveraged position actually unwinds.
    const eased = 1 - Math.pow(1 - t, 1.8)
    points.push(peakValue - eased * 43 + (rnd() - 0.5) * 2.2)
  }

  let peakIndex = 0
  let troughIndex = 0
  points.forEach((v, i) => {
    if (v > points[peakIndex]) peakIndex = i
    if (v < points[troughIndex]) troughIndex = i
  })

  return { points, peakIndex, troughIndex }
})()

/** Peak-to-trough, as a percentage. Always negative. */
export const drawdownPct = (() => {
  const { points, peakIndex, troughIndex } = drawdownSeries
  return ((points[troughIndex] - points[peakIndex]) / points[peakIndex]) * 100
})()

/**
 * A candlestick series for the closing CTA's backdrops.
 *
 * Purely decorative and drawn at low opacity behind the text, so it carries
 * no figures a reader could take as data - which is why it is the one chart
 * on the site without an illustrative badge. Do not put numbers near it.
 */
export const candles = (() => {
  const rnd = seeded(seedFrom('final-candles'))
  let price = 100
  return Array.from({ length: 52 }, () => {
    const open = price
    const close = open + (rnd() - 0.44) * 6.5
    const high = Math.max(open, close) + rnd() * 3.4
    const low = Math.min(open, close) - rnd() * 3.4
    price = close
    return { open, close, high, low }
  })
})()
