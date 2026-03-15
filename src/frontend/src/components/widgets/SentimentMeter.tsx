interface SentimentMeterProps {
  score: number;
  size?: number;
}

export function SentimentMeter({ score, size = 180 }: SentimentMeterProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const radius = (size / 2) * 0.7;
  const cx = size / 2;
  const cy = size / 2;

  // Arc from -210deg to 30deg (240 degree sweep)
  const startAngle = -210;
  const totalDegrees = 240;
  const endAngle = startAngle + totalDegrees;

  function polarToCartesian(angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  function describeArc(start: number, end: number) {
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  }

  const trackPath = describeArc(startAngle, endAngle);
  const fillEnd = startAngle + (clampedScore / 100) * totalDegrees;
  const fillPath =
    clampedScore > 0
      ? describeArc(startAngle, Math.min(fillEnd, endAngle))
      : "";

  // Needle
  const needleAngle = startAngle + (clampedScore / 100) * totalDegrees;
  const needleTip = polarToCartesian(needleAngle);
  const needleBase1 = {
    x: cx + 6 * Math.cos(((needleAngle + 90) * Math.PI) / 180),
    y: cy + 6 * Math.sin(((needleAngle + 90) * Math.PI) / 180),
  };
  const needleBase2 = {
    x: cx + 6 * Math.cos(((needleAngle - 90) * Math.PI) / 180),
    y: cy + 6 * Math.sin(((needleAngle - 90) * Math.PI) / 180),
  };

  const color =
    clampedScore >= 67 ? "#00ff88" : clampedScore >= 34 ? "#00b4ff" : "#ff3355";

  const label =
    clampedScore >= 67 ? "BULLISH" : clampedScore >= 34 ? "NEUTRAL" : "BEARISH";

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size * 0.75}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Sentiment gauge"
      >
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="#1e2736"
          strokeWidth={8}
          strokeLinecap="round"
        />
        {/* Fill */}
        {fillPath && (
          <path
            d={fillPath}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
        )}
        {/* Needle */}
        <polygon
          points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
          fill={color}
          opacity={0.9}
        />
        <circle cx={cx} cy={cy} r={5} fill={color} />
        {/* Score */}
        <text
          x={cx}
          y={cy + 32}
          textAnchor="middle"
          fill={color}
          fontSize={size * 0.18}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {Math.round(clampedScore)}
        </text>
        <text
          x={cx}
          y={cy + 50}
          textAnchor="middle"
          fill="#6b7280"
          fontSize={size * 0.07}
          fontFamily="monospace"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
