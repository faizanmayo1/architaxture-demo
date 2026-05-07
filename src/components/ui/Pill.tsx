import { cn } from "../../lib/format";

type Variant = "neutral" | "ochre" | "emerald" | "crimson" | "sky" | "ink";

const variantClasses: Record<Variant, string> = {
  neutral: "bg-paper-deep text-ink-soft border-ink/8",
  ochre: "bg-ochre-50 text-ochre-700 border-ochre-200/50",
  emerald: "bg-emerald-soft text-emerald-deep border-emerald-deep/15",
  crimson: "bg-crimson-soft text-crimson-deep border-crimson-deep/15",
  sky: "bg-sky-soft text-sky-deep border-sky-deep/15",
  ink: "bg-ink text-paper border-ink",
};

export function Pill({
  children,
  variant = "neutral",
  dot = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("pill", variantClasses[variant], className)}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "ochre" && "bg-ochre-500",
            variant === "emerald" && "bg-emerald-deep",
            variant === "crimson" && "bg-crimson-deep",
            variant === "sky" && "bg-sky-deep",
            variant === "ink" && "bg-paper",
            variant === "neutral" && "bg-ink/40"
          )}
        />
      )}
      {children}
    </span>
  );
}
