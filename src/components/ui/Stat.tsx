import { cn } from "../../lib/format";

export function Stat({
  label,
  value,
  sub,
  trend,
  size = "md",
  align = "left",
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  trend?: { value: string; direction: "up" | "down" | "flat"; positive?: boolean };
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right" | "center";
  className?: string;
}) {
  const valueSize = {
    sm: "text-[22px]",
    md: "text-[30px]",
    lg: "text-[40px]",
    xl: "text-[56px]",
  }[size];

  const labelSize = size === "xl" || size === "lg" ? "text-[11px]" : "text-[10.5px]";

  return (
    <div className={cn("flex flex-col", align === "right" && "items-end", align === "center" && "items-center", className)}>
      <div className={cn("eyebrow", labelSize)}>{label}</div>
      <div className={cn("display tabular text-ink mt-2 tracking-crisp leading-none", valueSize)}>
        {value}
      </div>
      {sub && <div className="text-[12px] text-ink-muted mt-2 tabular">{sub}</div>}
      {trend && (
        <div className={cn(
          "text-[11.5px] mt-2 tabular flex items-center gap-1 font-medium",
          trend.positive ? "text-emerald-deep" : "text-crimson-deep"
        )}>
          <span>{trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
