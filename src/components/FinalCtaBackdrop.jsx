import { candles, marketRows, flowBars } from '../data/market.js'

/**
 * The backdrop behind a closing call to action.
 *
 * One drawing per page, all in the same frame: the band keeps its design so
 * the end of every page looks like the end of the same site, and only the
 * chart inside changes. Four variants, deliberately four different chart
 * types rather than the same candles recoloured:
 *
 *   candles  the homepage     - the market view
 *   line     About            - a single series, the research view
 *   bars     FAQ              - net flow, the "what the data is" view
 *   grid     Contact          - a network, the "how to reach us" view
 *
 * Purely decorative. None carries labels, an axis, or a figure a reader could
 * take as data, which is why this is the one visual on the site with no
 * illustrative badge. Keep it that way - if a price ever appears next to one,
 * the badge has to come back.
 */
const W = 1440
const H = 460
const PAD = 30

const scale = (values, size = H) => {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  return (v) => PAD + (1 - (v - min) / span) * (size - PAD * 2)
}

function Grid() {
  return (
    <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2={W} y1={PAD + (i * (H - PAD * 2)) / 4} y2={PAD + (i * (H - PAD * 2)) / 4} />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} y1="0" y2={H} x1={(i * W) / 12} x2={(i * W) / 12} />
      ))}
    </g>
  )
}

function Candles() {
  const y = scale(candles.flatMap((c) => [c.high, c.low]))
  const slot = W / candles.length
  const bodyW = Math.max(slot * 0.42, 3)
  const closes = candles.map((c, i) => [i * slot + slot / 2, y(c.close)])
  const trend = closes.map(([x, cy], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${cy.toFixed(1)}`).join(' ')

  return (
    <>
      <g opacity="0.5">
        {candles.map((c, i) => {
          const x = i * slot + slot / 2
          const stroke = c.close >= c.open ? 'var(--chart-up)' : 'var(--chart-down)'
          const top = y(Math.max(c.open, c.close))
          const bottom = y(Math.min(c.open, c.close))
          return (
            <g key={i} stroke={stroke} fill={stroke}>
              <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} strokeWidth="1.2" />
              <rect x={x - bodyW / 2} y={top} width={bodyW} height={Math.max(bottom - top, 1.5)} rx="1" />
            </g>
          )
        })}
      </g>
      <path d={trend} fill="none" stroke="var(--chart-up)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.72" vectorEffect="non-scaling-stroke" />
    </>
  )
}

function Line() {
  // The widest series on the page, so the line spans the full band.
  const series = marketRows[0].series
  const y = scale(series)
  const step = W / (series.length - 1)
  const d = series.map((v, i) => `${i ? 'L' : 'M'} ${(i * step).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${d} L ${W} ${H} L 0 ${H} Z`

  return (
    <>
      <path d={area} fill="var(--chart-up)" opacity="0.12" />
      <path d={d} fill="none" stroke="var(--chart-up)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" opacity="0.6" vectorEffect="non-scaling-stroke" />
    </>
  )
}

function Bars() {
  // The long series, not the 14-bar card one - see the note on flowBars.
  const y = scale(flowBars, H * 2)
  const mid = H / 2
  const slot = W / flowBars.length
  const bodyW = Math.max(slot * 0.52, 3)

  return (
    <g opacity="0.55">
      {flowBars.map((v, i) => {
        const x = i * slot + slot / 2
        const rising = v >= 0
        const h = Math.max(Math.abs(y(v) - mid), 3)
        return (
          <rect
            key={i}
            x={x - bodyW / 2}
            y={rising ? mid - h : mid}
            width={bodyW}
            height={h}
            rx="1.5"
            fill={rising ? 'var(--chart-up)' : 'var(--chart-down)'}
          />
        )
      })}
    </g>
  )
}

function Network() {
  // A simple hub-and-spoke: nodes on two arcs joined to a centre, which reads
  // as reach rather than as a price.
  const cx = W / 2
  const cy = H / 2
  const nodes = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2
    const r = i % 2 === 0 ? 520 : 700
    return [cx + Math.cos(angle) * r * 1.6, cy + Math.sin(angle) * r * 0.42]
  })

  return (
    <g opacity="0.42">
      {nodes.map(([x, y2], i) => (
        <line key={`l${i}`} x1={cx} y1={cy} x2={x} y2={y2} stroke="var(--chart-up)" strokeWidth="1.2" />
      ))}
      {nodes.map(([x, y2], i) => (
        <circle key={`c${i}`} cx={x} cy={y2} r="5" fill="var(--chart-up)" />
      ))}
      <circle cx={cx} cy={cy} r="11" fill="var(--chart-up)" />
    </g>
  )
}

const VARIANTS = { candles: Candles, line: Line, bars: Bars, grid: Network }

export default function FinalCtaBackdrop({ variant = 'candles' }) {
  const Drawing = VARIANTS[variant] ?? Candles

  return (
    <svg
      className="final__backdrop"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Grid />
      <Drawing />
    </svg>
  )
}
