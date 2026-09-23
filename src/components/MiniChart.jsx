/**
 * Dependency-free SVG area chart.
 *
 * Takes a numeric series and draws it into a fixed viewBox, so it scales with
 * its container without any measurement or resize handling. The path is
 * smoothed with a Catmull-Rom to bezier conversion, which keeps the curve
 * passing through the actual points rather than cutting corners off the peaks.
 *
 * Purely decorative: the same numbers are printed as text beside it, so the
 * svg carries aria-hidden and no title.
 */
export default function MiniChart({
  series,
  width = 320,
  height = 96,
  stroke = 'var(--chart-line)',
  fill = 'var(--chart-fill)',
  className = '',
  showBaseline = false,
}) {
  if (!series || series.length < 2) return null

  const min = Math.min(...series)
  const max = Math.max(...series)
  const span = max - min || 1
  const padY = 6
  const stepX = width / (series.length - 1)

  const points = series.map((v, i) => [
    i * stepX,
    padY + (1 - (v - min) / span) * (height - padY * 2),
  ])

  // Catmull-Rom control points -> cubic bezier segments. Tension 6 keeps the
  // curve close to the data; higher values overshoot the extremes.
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }

  const area = `${d} L ${width} ${height} L 0 ${height} Z`
  const last = points[points.length - 1]

  return (
    <svg
      className={`chart ${className}`.trim()}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`mf-${stroke.replace(/\W/g, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.34" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>

      {showBaseline && (
        <line
          x1="0"
          y1={height - padY}
          x2={width}
          y2={height - padY}
          stroke="var(--chart-grid)"
          strokeWidth="1"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
      )}

      <path d={area} fill={`url(#mf-${stroke.replace(/\W/g, '')})`} />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill={stroke} className="chart__dot" />
    </svg>
  )
}
