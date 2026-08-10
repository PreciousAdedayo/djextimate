export default function ShardDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative h-16 md:h-24 w-full overflow-hidden ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg
        viewBox="0 0 1400 100"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <polygon points="0,100 0,40 220,90 460,10 760,80 1060,20 1400,70 1400,100" fill="#12100C" />
        <polygon points="220,90 460,10 520,32" fill="#FF5A1F" opacity="0.9" />
        <polygon points="1060,20 1400,70 1400,40" fill="#FF5A1F" opacity="0.35" />
      </svg>
    </div>
  );
}
