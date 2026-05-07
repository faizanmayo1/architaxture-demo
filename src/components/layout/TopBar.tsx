import { useLocation } from "wouter";
import { Search, Bell, Calendar, ChevronDown, Command } from "lucide-react";
import { fmtDate } from "../../lib/format";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Firm Overview",
  "/briefing": "Morning Briefing",
  "/clients": "Clients",
  "/clients/60": "Jeffrey Tucker · Overview",
  "/clients/60/tax-dashboard": "Jeffrey Tucker · Tax Dashboard",
  "/clients/60/forecast": "Jeffrey Tucker · Forecasts",
  "/clients/60/forecast/household": "Jeffrey Tucker · Household Estimate",
  "/clients/60/tax-planning": "Jeffrey Tucker · Tax Planning",
  "/clients/60/tax-plan-pdf": "Jeffrey Tucker · Tax Plan PDF",
  "/clients/60/strategies/augusta-rule": "Jeffrey Tucker · Augusta Rule Playbook",
  "/clients/60/documents": "Jeffrey Tucker · Documents",
  "/clients/60/engagements": "Jeffrey Tucker · Engagements",
  "/clients/60/communications": "Jeffrey Tucker · Communications",
  "/review-queue": "Review Queue",
  "/irs-notices": "IRS Notices",
  "/strategies": "Strategy Engine",
  "/forms": "Form Generation",
  "/documents": "Documents",
  "/engagements": "Engagements",
  "/onboarding": "New Client Wizard",
  "/operations/onboarding": "Onboarding Queue",
  "/reports": "Reports",
  "/settings": "Settings",
};

function getContextLabel(path: string): string {
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
  const sortedKeys = Object.keys(ROUTE_LABELS).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (path.startsWith(key) && key !== "/") return ROUTE_LABELS[key];
  }
  if (path.startsWith("/irs-notices/")) return "IRS Notice Detail";
  return "ArchiTAXture";
}

export function TopBar() {
  const [location] = useLocation();
  const today = new Date("2026-05-07T07:00:00");
  const contextLabel = getContextLabel(location);

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-ink/8">
      <div className="flex items-center h-[60px] px-7 gap-5">
        {/* Current page context */}
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-ink-faint font-medium shrink-0">
            Page
          </span>
          <span className="text-[15px] font-semibold text-ink truncate tracking-crisp">{contextLabel}</span>
        </div>

        <div className="flex-1" />

        {/* Date pill */}
        <div className="hidden xl:flex items-center gap-2 text-[12px] text-ink-muted px-3 py-1.5 rounded-lg bg-paper-deep">
          <Calendar size={12} strokeWidth={1.6} />
          <span className="tabular tracking-tight">{fmtDate(today, "long")}</span>
        </div>

        {/* Global search */}
        <div className="relative">
          <Search size={13} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Search clients, returns…"
            className="pl-9 pr-12 py-2 w-72 text-[13px] bg-paper-deep border border-transparent rounded-lg focus:outline-none focus:border-aragon-navy/30 focus:bg-paper-card focus:shadow-glow-sky placeholder:text-ink-faint transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-faint border border-ink/10 rounded px-1 py-0.5 flex items-center gap-0.5">
            <Command size={9} strokeWidth={2} />K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="p-2 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-lg transition-colors relative">
          <Bell size={15} strokeWidth={1.6} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-aragon-navy" />
        </button>
      </div>
    </header>
  );
}
