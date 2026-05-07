import { useLocation } from "wouter";
import { useState } from "react";
import { Layers } from "lucide-react";
import { getPhaseForRoute } from "../../lib/phases";
import { cn } from "../../lib/format";

const variantStyles = {
  ochre: "bg-ochre-50 text-ochre-700 border-ochre-200/50",
  emerald: "bg-emerald-soft text-emerald-deep border-emerald-deep/20",
  sky: "bg-sky-soft text-sky-deep border-sky-deep/20",
  neutral: "bg-paper-card text-ink-soft border-ink/10",
  ink: "bg-ink text-paper border-ink",
};

const dotStyles = {
  ochre: "bg-ochre-500",
  emerald: "bg-emerald-deep",
  sky: "bg-sky-deep",
  neutral: "bg-ink/40",
  ink: "bg-paper",
};

/**
 * Phase Badge — appears in a fixed position on every firm-side page.
 * Communicates how each route maps to the proposal: "existing module in your
 * platform" vs "Phase X work we'd build." Nothing in the demo is delivered code.
 */
export function PhaseBadge() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const phase = getPhaseForRoute(location);

  return (
    <div
      className="fixed bottom-5 right-5 z-40 group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Expanded explanation card */}
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-[320px] card p-4 shadow-paper-md animate-fade-in">
          <div className="flex items-baseline gap-2 mb-2">
            <Layers size={11} strokeWidth={1.8} className="text-ink-muted" />
            <span className="eyebrow">Engagement program</span>
          </div>
          <div className="text-[13.5px] font-medium text-ink mb-1 leading-snug">
            {phase.label}
          </div>
          <p className="text-[11.5px] text-ink-muted leading-relaxed">
            {phase.description}
          </p>
          <div className="mt-3 pt-3 border-t border-ink/8 text-[10.5px] text-ink-faint leading-relaxed">
            Every screen tagged with the proposal phase it represents.
            Hover any badge for details.
          </div>
        </div>
      )}

      {/* Pill */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 border rounded-full text-[11px] font-medium font-mono uppercase tracking-[0.08em] shadow-paper transition-all hover:shadow-paper-md",
          variantStyles[phase.variant]
        )}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[phase.variant])} />
        {phase.shortLabel}
      </button>
    </div>
  );
}
