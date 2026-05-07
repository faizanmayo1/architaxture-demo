/**
 * Aragon Accounting Corporation — circular monogram mark.
 * Recreated from the brand asset: gray ring + sky-blue accent + stylized "A".
 */
export function AragonMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Aragon Accounting"
    >
      {/* Sky blue accent — right half of the ring */}
      <path
        d="M 32 4 A 28 28 0 0 1 32 60 L 32 4 Z"
        fill="#9DD6F2"
      />
      {/* Gray ring overlay */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="#888A91" strokeWidth="3" />
      {/* Inner background — clean separation */}
      <circle cx="32" cy="32" r="24" fill="#FFFFFF" />
      {/* Sky accent reappears inside on right */}
      <path
        d="M 32 8 A 24 24 0 0 1 32 56 L 32 8 Z"
        fill="#9DD6F2"
      />
      {/* Letter "A" — stylized */}
      <g transform="translate(32, 32)">
        <path
          d="M -10 14 L 0 -14 L 10 14 L 5 14 L 2.5 7 L -2.5 7 L -5 14 Z"
          fill="#2D2E33"
        />
        {/* Crossbar */}
        <rect x="-5" y="3" width="10" height="2" fill="#2D2E33" />
      </g>
    </svg>
  );
}

/**
 * Full Aragon wordmark — monogram + ARAGON / Accounting Corporation.
 */
export function AragonLogo({ markSize = 32 }: { markSize?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <AragonMark size={markSize} />
      <div className="leading-none">
        <div className="text-[15px] font-bold tracking-[0.18em] text-ink">ARAGON</div>
        <div className="text-[7.5px] font-medium tracking-[0.20em] text-ink-muted mt-0.5">
          ACCOUNTING CORPORATION
        </div>
      </div>
    </div>
  );
}
