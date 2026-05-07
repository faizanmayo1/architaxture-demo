import { Link, useLocation } from "wouter";
import { MapPin, Mail, ChevronDown, Sparkles, MoreHorizontal } from "lucide-react";
import { TUCKER, TUCKER_FORECAST_VERSIONS, TUCKER_STRATEGIES } from "../../lib/mock-data";
import { fmtUSD, fmtPctRaw, initialsOf, cn } from "../../lib/format";

/**
 * Persistent client context bar — sticky strip with avatar, identity,
 * key stats, and tabs. Wraps every page under /clients/:id/*.
 */
export function ClientShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const client = TUCKER;
  const activeForecast = TUCKER_FORECAST_VERSIONS.find((v) => !v.isLocked) || TUCKER_FORECAST_VERSIONS[0];
  const adopted = TUCKER_STRATEGIES.filter((s) => s.status === "Adopted").length;

  const tabs = [
    { label: "Overview", path: `/clients/${client.id}` },
    { label: "Tax Dashboard", path: `/clients/${client.id}/tax-dashboard` },
    { label: "Forecasts", path: `/clients/${client.id}/forecast` },
    { label: "Tax Planning", path: `/clients/${client.id}/tax-planning` },
    { label: "Documents", path: `/clients/${client.id}/documents` },
    { label: "Engagements", path: `/clients/${client.id}/engagements` },
    { label: "Communications", path: `/clients/${client.id}/communications` },
  ];

  const isActive = (path: string) => {
    if (path === `/clients/${client.id}`) return location === path;
    return location.startsWith(path);
  };

  return (
    <>
      {/* Persistent client context — sticky strip below the topbar (60px) */}
      <div className="sticky top-[60px] z-20 bg-paper/95 backdrop-blur-sm border-b border-ink/8">
        <div className="px-8 pt-5 pb-0">
          <div className="flex items-start justify-between gap-6 max-w-[1400px]">
            {/* Left: identity */}
            <div className="flex items-start gap-4 min-w-0">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ochre-300 to-ochre-500 flex items-center justify-center text-paper text-[14px] font-bold tracking-tight shrink-0 shadow-paper">
                {initialsOf(`${client.firstName} ${client.lastName}`)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-[18px] font-semibold text-ink leading-none tracking-tight">
                    {client.firstName} L. {client.lastName}
                  </h2>
                  <span className="text-[10px] font-mono tabular text-ink-muted">
                    #{String(client.id).padStart(4, "0")}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-ochre-50 border border-ochre-200/40 text-[10.5px] font-medium text-ochre-700">
                    Diamond
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-soft text-[10.5px] font-medium text-emerald-deep">
                    In Progress
                  </span>
                </div>
                <div className="text-[12px] text-ink-muted mt-1.5 flex items-center gap-3 flex-wrap">
                  <span>{client.filingStatus} · w/ {client.spouse?.firstName} {client.spouse?.lastName}</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} strokeWidth={1.6} />
                    {client.city}, {client.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={11} strokeWidth={1.6} />
                    {client.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: key stats inline */}
            <div className="flex items-center gap-7 shrink-0">
              <ContextStat label="2025 Tax" value={fmtUSD(activeForecast.totalProjectedTax, { compact: true })} />
              <ContextStat label="Eff. Rate" value={fmtPctRaw(activeForecast.effectiveRate * 100, 1)} />
              <ContextStat label="Strategies" value={`${adopted}/${TUCKER_STRATEGIES.length}`} />
              <ContextStat label="Health" value="88" accent />
              <button className="ml-2 p-2 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-md transition-colors">
                <MoreHorizontal size={15} strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Tabs row — same strip, below identity */}
          <div className="flex items-end gap-1 mt-5 -mb-px overflow-x-auto">
            {tabs.map((tab) => {
              const active = isActive(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={cn(
                    "px-3.5 py-2.5 text-[13px] tracking-tight transition-colors relative whitespace-nowrap",
                    active ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {tab.label}
                  {active && <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-ochre-500 rounded-t-sm" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page content */}
      {children}
    </>
  );
}

function ContextStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-right">
      <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-ink-faint font-medium">{label}</div>
      <div className={cn("text-[16px] font-semibold leading-none mt-1 tabular tracking-tight", accent ? "text-ochre-700" : "text-ink")}>
        {value}
      </div>
    </div>
  );
}
