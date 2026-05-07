import { cn } from "../../lib/format";

type Variant = "neutral" | "ochre" | "emerald" | "crimson" | "sky" | "ink";

const variantClasses: Record<Variant, string> = {
  neutral: "bg-paper-deep text-ink-soft ring-1 ring-inset ring-ink/8",
  ochre: "bg-ochre-50 text-ochre-700 ring-1 ring-inset ring-ochre-200/60",
  emerald: "bg-emerald-soft text-emerald-deep ring-1 ring-inset ring-emerald-deep/15",
  crimson: "bg-crimson-soft text-crimson-deep ring-1 ring-inset ring-crimson-deep/15",
  sky: "bg-sky-soft text-sky-deep ring-1 ring-inset ring-sky-deep/15",
  ink: "bg-ink text-paper ring-1 ring-inset ring-ink",
};

const dotStyles: Record<Variant, string> = {
  neutral: "bg-ink/40",
  ochre: "bg-ochre-600",
  emerald: "bg-emerald-deep",
  crimson: "bg-crimson-deep",
  sky: "bg-sky-deep",
  ink: "bg-paper",
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
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[variant])} />}
      {children}
    </span>
  );
}
