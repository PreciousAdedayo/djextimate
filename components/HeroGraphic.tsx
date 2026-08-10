export default function HeroGraphic() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ambient ember glow, top right */}
      <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-ember/25 blur-[140px]" />
      <div className="absolute right-10 top-1/3 h-[320px] w-[320px] rounded-full bg-amber/15 blur-[110px]" />

      <svg
        viewBox="0 0 1000 1000"
        className="absolute right-[-8%] top-1/2 h-[135%] w-[75%] -translate-y-1/2 opacity-90 md:right-[2%] md:w-[58%]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* sunburst rays */}
        <g transform="translate(660,430)" className="animate-floatSlow" style={{ transformOrigin: "660px 430px" }}>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (360 / 20) * i;
            const long = i % 2 === 0;
            return (
              <rect
                key={i}
                x={-3}
                y={long ? -300 : -190}
                width={6}
                height={long ? 130 : 90}
                fill={i % 4 === 0 ? "#FF5A1F" : "#20190F"}
                opacity={i % 4 === 0 ? 0.9 : 0.55}
                transform={`rotate(${angle})`}
              />
            );
          })}
        </g>

        {/* fractured rock / shard cluster, lower left of the burst — echoes the asteroid motif */}
        <g opacity="0.92">
          <polygon points="120,760 210,690 260,780 190,860 100,840" fill="#1A1712" stroke="#FF5A1F" strokeOpacity="0.4" strokeWidth="1.5" />
          <polygon points="230,650 300,600 340,660 290,720 220,700" fill="#12100C" stroke="#FF5A1F" strokeOpacity="0.35" strokeWidth="1.5" />
          <polygon points="60,600 130,560 150,620 90,660" fill="#1A1712" stroke="#F3EEE4" strokeOpacity="0.15" strokeWidth="1" />
        </g>
        <g opacity="0.85">
          <polygon points="800,780 880,740 920,820 850,880 780,850" fill="#1A1712" stroke="#FF5A1F" strokeOpacity="0.35" strokeWidth="1.5" />
          <polygon points="900,620 960,600 970,660 910,680" fill="#12100C" stroke="#F3EEE4" strokeOpacity="0.12" strokeWidth="1" />
        </g>

        {/* vinyl / deck silhouette */}
        <g transform="translate(560,560)">
          <circle r="205" fill="#0A0906" stroke="#2A251C" strokeWidth="2" />
          <circle r="205" fill="none" stroke="#FF5A1F" strokeOpacity="0.5" strokeWidth="1" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} r={40 + i * 26} fill="none" stroke="#1E1912" strokeWidth="1.2" />
          ))}
          <circle r="34" fill="#12100C" stroke="#FF5A1F" strokeWidth="2" />
          <circle r="6" fill="#FF5A1F" />
          <rect x="150" y="-190" width="10" height="150" rx="5" fill="#1E1912" transform="rotate(28)" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent md:from-ink md:via-ink/10" />
    </div>
  );
}
