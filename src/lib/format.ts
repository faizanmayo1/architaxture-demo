// Formatting helpers — currency, percentage, dates, etc.
// Tabular figure friendly, financial-product polished.

export const fmtUSD = (n: number, opts: { compact?: boolean; sign?: boolean; cents?: boolean } = {}) => {
  const { compact = false, sign = false, cents = false } = opts;
  if (compact && Math.abs(n) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
      signDisplay: sign ? "exceptZero" : "auto",
    }).format(n);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
    signDisplay: sign ? "exceptZero" : "auto",
  }).format(n);
};

export const fmtNum = (n: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

export const fmtPct = (n: number, decimals = 1) =>
  `${(n * 100).toFixed(decimals)}%`;

export const fmtPctRaw = (n: number, decimals = 1) =>
  `${n.toFixed(decimals)}%`;

export const fmtDate = (d: Date | string, format: "short" | "medium" | "long" | "month-day" = "medium") => {
  const date = typeof d === "string" ? new Date(d) : d;
  switch (format) {
    case "short":
      return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" });
    case "long":
      return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    case "month-day":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    default:
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
};

export const fmtTime = (d: Date | string) => {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

export const fmtRelativeTime = (d: Date | string, now: Date = new Date()) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return fmtDate(date, "short");
};

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");

export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");
