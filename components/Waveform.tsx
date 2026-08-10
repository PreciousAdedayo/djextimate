export default function Waveform({
  bars = 40,
  active = false,
  className = "",
  color = "currentColor",
}: {
  bars?: number;
  active?: boolean;
  className?: string;
  color?: string;
}) {
  const heights = Array.from({ length: bars }, (_, i) => {
    // deterministic pseudo-random pattern so server & client render identically
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const frac = seed - Math.floor(seed);
    return 4 + Math.round(frac * 18);
  });

  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={active ? "animate-pulseBar" : ""}
          style={{
            display: "inline-block",
            width: 2,
            height: h,
            borderRadius: 2,
            backgroundColor: color,
            opacity: active ? 1 : 0.45,
            animationDelay: `${(i % 7) * 0.09}s`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}
