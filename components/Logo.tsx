import Link from "next/link";

const BAR_COUNT = 12;

export function Mark({ size = 34, animated = true }: { size?: number; animated?: boolean }) {
  const bars = Array.from({ length: BAR_COUNT });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className="shrink-0"
      role="img"
      aria-label="Extimate mark"
    >
      <g transform="translate(20,20)">
        {bars.map((_, i) => {
          const angle = (360 / BAR_COUNT) * i;
          const long = i % 3 === 0;
          return (
            <rect
              key={i}
              x={-1.1}
              y={long ? -19 : -14}
              width={2.2}
              height={long ? 9 : 6}
              rx={1.1}
              fill={i % 3 === 0 ? "#FF5A1F" : "#F3EEE4"}
              transform={`rotate(${angle})`}
              className={animated ? "origin-[1.1px_18.5px] animate-pulseBar" : ""}
              style={
                animated
                  ? { animationDelay: `${(i % 6) * 0.11}s`, transformOrigin: "1.1px 18.5px" }
                  : undefined
              }
            />
          );
        })}
        <circle r="4.5" fill="#0A0906" stroke="#FF5A1F" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[22px] tracking-wide ${className}`}>
      EXT<span className="text-ember">!</span>MATE
    </span>
  );
}

export default function Logo({
  href = "/",
  animated = true,
}: {
  href?: string;
  animated?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group" aria-label="Extimate home">
      <Mark size={30} animated={animated} />
      <Wordmark className="text-bone group-hover:text-ember transition-colors duration-300" />
    </Link>
  );
}
