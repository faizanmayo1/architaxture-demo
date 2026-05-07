import { Link, useLocation } from "wouter";
import { Search, Bell, Calendar, Sparkles, ChevronDown, Command } from "lucide-react";
import { fmtDate } from "../../lib/format";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Firm Overview",
  "/briefing": "Morning Briefing",
  "/clients": "Clients",
  "/clients/60": "Jeffrey Tucker",
  "/clients/60/tax-dashboard": "Tucker · Tax Dashboard",
  "/clients/60/forecast": "Tucker · Forecasts",
  "/clients/60/forecast/household": "Tucker · Household Estimate",
  "/clients/60/tax-planning": "Tucker · Tax Planning",
  "/clients/60/tax-plan-pdf": "Tucker · Tax Plan PDF",
  "/clients/60/strategies/augusta-rule": "Tucker · Augusta Rule Playbook",
  "/clients/60/documents": "Tucker · Documents",
  "/clients/60/engagements": "Tucker · Engagements",
  "/clients/60/communications": "Tucker · Communications",
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
  // Try prefix match
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
      <div className="flex items-center h-[64px] px-7 gap-6">
        {/* Brand block — Aragon wordmark + ArchiTAXture chip */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="leading-none">
            <div className="text-[16px] font-bold tracking-[0.18em] text-ink">ARAGON</div>
            <div className="text-[8px] font-medium tracking-[0.20em] text-ink-muted mt-1">
              ACCOUNTING CORPORATION
            </div>
          </div>
          <div className="h-7 w-px bg-ink/12" />
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-ochre-50 border border-ochre-200/40">
            <Sparkles size={11} strokeWidth={1.8} className="text-ochre-700" />
            <span className="text-[11px] font-medium text-ink leading-none">ArchiTAXture</span>
            <span className="text-[9px] text-ink-muted leading-none tabular ml-1">v2.0</span>
          </div>
        </Link>

        <div className="h-7 w-px bg-ink/8" />

        {/* Current context — breadcrumb-ish */}
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-[11px] text-ink-muted font-mono uppercase tracking-[0.12em] shrink-0">Now viewing</span>
          <span className="text-[14px] font-medium text-ink truncate">{contextLabel}</span>
        </div>

        <div className="flex-1" />

        {/* Date pill */}
        <div className="hidden lg:flex items-center gap-2 text-[12px] text-ink-muted px-3 py-1.5 rounded-md bg-paper-deep">
          <Calendar size={12} strokeWidth={1.6} />
          <span className="tabular tracking-tight">{fmtDate(today, "long")}</span>
        </div>

        {/* Global search */}
        <div className="relative">
          <Search size={13} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Search clients, returns, strategies…"
            className="pl-9 pr-12 py-2 w-72 text-[13px] bg-paper-deep border border-transparent rounded-md focus:outline-none focus:border-ochre-500/40 focus:bg-paper-card focus:shadow-card-rest placeholder:text-ink-faint transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-faint border border-ink/10 rounded px-1 py-0.5 flex items-center gap-0.5">
            <Command size={9} strokeWidth={2} />K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="p-2 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-md transition-colors relative">
          <Bell size={15} strokeWidth={1.6} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-ochre-500" />
        </button>

        {/* User context */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-ink/8">
          <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-[10.5px] font-mono font-medium tracking-tight">
            EB
          </div>
          <div className="leading-tight hidden xl:block">
            <div className="text-[12.5px] font-medium text-ink">Eric Bramwell</div>
            <div className="text-[10.5px] text-ink-muted">POD Alpha · Lead</div>
          </div>
          <ChevronDown size={11} strokeWidth={1.8} className="text-ink-faint" />
        </div>
      </div>
    </header>
  );
}
