import { Link } from "wouter";
import { useState } from "react";
import {
  Workflow,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Filter as FilterIcon,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER_STRATEGIES, ALL_CLIENTS, FIRM_KPIS, FIRM } from "../lib/mock-data";
import { fmtUSD, cn, initialsOf } from "../lib/format";

// Synthesize firm-wide active playbooks across multiple clients
type FirmPlaybook = {
  id: string;
  client: string;
  clientId: number;
  strategy: string;
  status: "Adopted" | "In Progress" | "Awaiting Review" | "Recommended" | "Overdue";
  progress: number;
  estimatedSavings: number;
  owner: string;
  pod: "Alpha" | "Beta";
  nextDue?: string;
  isFlagship?: boolean;
};

const FIRM_PLAYBOOKS: FirmPlaybook[] = [
  { id: "p1", client: "Jeffrey Tucker", clientId: 60, strategy: "Augusta Rule (§280A(g))", status: "In Progress", progress: 40, estimatedSavings: 14400, owner: "Marcus Tate", pod: "Alpha", nextDue: "2026-05-12", isFlagship: true },
  { id: "p2", client: "Karen Lakeshore", clientId: 142, strategy: "Augusta Rule (§280A(g))", status: "Overdue", progress: 60, estimatedSavings: 11200, owner: "Aaron Holt", pod: "Beta", nextDue: "2026-04-29" },
  { id: "p3", client: "Manuel Cordova", clientId: 96, strategy: "Cost Segregation Study", status: "Adopted", progress: 100, estimatedSavings: 38400, owner: "Marcus Tate", pod: "Alpha", isFlagship: true },
  { id: "p4", client: "Anika Westvale", clientId: 73, strategy: "S-Corp Reasonable Compensation", status: "Awaiting Review", progress: 80, estimatedSavings: 18600, owner: "Priya Raman", pod: "Alpha" },
  { id: "p5", client: "Bryan Holcomb", clientId: 184, strategy: "Accountable Plan", status: "Adopted", progress: 100, estimatedSavings: 6800, owner: "Diana Ochoa", pod: "Beta" },
  { id: "p6", client: "Lila Trent", clientId: 7, strategy: "QBI Deduction Optimization", status: "Adopted", progress: 100, estimatedSavings: 4900, owner: "Liam Powell", pod: "Beta" },
  { id: "p7", client: "Damon Pell", clientId: 211, strategy: "S-Corp Election", status: "In Progress", progress: 25, estimatedSavings: 8400, owner: "Liam Powell", pod: "Beta", nextDue: "2026-05-30" },
  { id: "p8", client: "Jeffrey Tucker", clientId: 60, strategy: "Cost Segregation Study", status: "Recommended", progress: 0, estimatedSavings: 28600, owner: "Marcus Tate", pod: "Alpha", isFlagship: true },
  { id: "p9", client: "Manuel Cordova", clientId: 96, strategy: "Augusta Rule (§280A(g))", status: "Adopted", progress: 100, estimatedSavings: 14400, owner: "Marcus Tate", pod: "Alpha" },
  { id: "p10", client: "Anika Westvale", clientId: 73, strategy: "Donor-Advised Fund Stacking", status: "In Progress", progress: 60, estimatedSavings: 24800, owner: "Marcus Tate", pod: "Alpha", nextDue: "2026-06-15" },
  { id: "p11", client: "Bryan Holcomb", clientId: 184, strategy: "S-Corp Reasonable Compensation", status: "In Progress", progress: 50, estimatedSavings: 7200, owner: "Diana Ochoa", pod: "Beta", nextDue: "2026-06-15" },
  { id: "p12", client: "Lila Trent", clientId: 7, strategy: "Children on Payroll", status: "Recommended", progress: 0, estimatedSavings: 4800, owner: "Liam Powell", pod: "Beta" },
];

const statusConfig: Record<FirmPlaybook["status"], { variant: "neutral" | "ochre" | "emerald" | "crimson" | "sky"; tone: string }> = {
  Adopted: { variant: "emerald", tone: "text-emerald-deep" },
  "In Progress": { variant: "sky", tone: "text-sky-deep" },
  "Awaiting Review": { variant: "ochre", tone: "text-ochre-700" },
  Recommended: { variant: "neutral", tone: "text-ink-muted" },
  Overdue: { variant: "crimson", tone: "text-crimson-deep" },
};

export function StrategyEngine() {
  const [filter, setFilter] = useState<"all" | "in-flight" | "overdue" | "recommended">("all");
  const [groupBy, setGroupBy] = useState<"playbook" | "client" | "owner">("playbook");

  const filtered = FIRM_PLAYBOOKS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "in-flight") return p.status === "In Progress" || p.status === "Awaiting Review";
    if (filter === "overdue") return p.status === "Overdue";
    if (filter === "recommended") return p.status === "Recommended";
    return true;
  });

  const groupedByPlaybook = filtered.reduce<Record<string, FirmPlaybook[]>>((acc, p) => {
    if (!acc[p.strategy]) acc[p.strategy] = [];
    acc[p.strategy].push(p);
    return acc;
  }, {});

  const totalSavingsInFlight = FIRM_PLAYBOOKS
    .filter((p) => p.status === "In Progress" || p.status === "Awaiting Review")
    .reduce((s, p) => s + p.estimatedSavings, 0);
  const totalAdopted = FIRM_PLAYBOOKS.filter((p) => p.status === "Adopted").length;
  const overdueCount = FIRM_PLAYBOOKS.filter((p) => p.status === "Overdue").length;

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          eyebrow="Strategy Execution Engine · Phase 5 · Proposed"
          title="Playbooks, in flight."
          subtitle="Every active strategy across the firm. Completion gates enforce the process. AI-drafted deliverables, owner accountability, overdue triggers — same engine, different client."
          action={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-ink-muted hover:text-ink hover:bg-paper-deep transition-colors rounded-sm">
                <FilterIcon size={11} strokeWidth={1.6} />
                Group by playbook
                <ChevronDown size={10} strokeWidth={1.8} />
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Sparkles size={12} strokeWidth={1.8} />
                Run firm-wide opportunity scan
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Active playbooks</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {FIRM_PLAYBOOKS.length}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across {Object.keys(groupedByPlaybook).length} strategy types</div>
          </div>
          <div className="bg-paper-card p-6 bg-emerald-soft/30">
            <div className="eyebrow text-emerald-deep">Adopted · YTD</div>
            <div className="display tabular text-[36px] text-emerald-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {totalAdopted + 50}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">{fmtUSD(FIRM_KPIS.strategiesEstimatedSavings, { compact: true })} aggregate client savings</div>
          </div>
          <div className="bg-paper-card p-6 bg-ochre-50/30">
            <div className="eyebrow text-ochre-700">Savings in flight</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(totalSavingsInFlight, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across in-progress playbooks</div>
          </div>
          <div className={cn("bg-paper-card p-6", overdueCount > 0 && "bg-crimson-soft/40")}>
            <div className={cn("eyebrow", overdueCount > 0 && "text-crimson-deep")}>Overdue steps</div>
            <div className={cn("display tabular text-[36px] mt-1.5 leading-none", overdueCount > 0 ? "text-crimson-deep" : "text-ink")} style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {overdueCount}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">savings at risk if year-end miss</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 mb-6 pb-5 border-b border-ink/8">
          <span className="eyebrow mr-3">View</span>
          {[
            { id: "all", label: "All", count: FIRM_PLAYBOOKS.length },
            { id: "in-flight", label: "In flight", count: FIRM_PLAYBOOKS.filter(p => p.status === "In Progress" || p.status === "Awaiting Review").length },
            { id: "overdue", label: "Overdue", count: overdueCount },
            { id: "recommended", label: "Recommended", count: FIRM_PLAYBOOKS.filter(p => p.status === "Recommended").length },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={cn(
                "px-3.5 py-1.5 text-[12px] rounded-sm transition-all flex items-center gap-2",
                filter === f.id ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"
              )}
            >
              <span className="font-medium">{f.label}</span>
              <span className={cn("text-[10px] tabular", filter === f.id ? "text-paper/60" : "text-ink-faint")}>{f.count}</span>
            </button>
          ))}
        </div>

        {/* Grouped by playbook type */}
        <div className="space-y-8">
          {Object.entries(groupedByPlaybook).map(([strategy, playbooks]) => {
            const totalSavings = playbooks.reduce((s, p) => s + p.estimatedSavings, 0);
            const adoptedInGroup = playbooks.filter(p => p.status === "Adopted").length;
            return (
              <div key={strategy}>
                <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-ink/8">
                  <div className="flex items-baseline gap-3">
                    <Workflow size={14} strokeWidth={1.6} className="text-ochre-600" />
                    <span className="display text-[18px] text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40', fontWeight: 380 }}>
                      {strategy}
                    </span>
                    <span className="text-[11px] text-ink-muted tabular">
                      {playbooks.length} {playbooks.length === 1 ? "client" : "clients"} · {adoptedInGroup} adopted
                    </span>
                  </div>
                  <div className="text-[12px] text-ink-muted tabular">
                    {fmtUSD(totalSavings, { compact: true })} aggregate
                  </div>
                </div>
                <div className="space-y-2">
                  {playbooks.map((p) => {
                    const cfg = statusConfig[p.status];
                    return (
                      <Link
                        key={p.id}
                        to={p.clientId === 60 && p.strategy.startsWith("Augusta") ? `/clients/60/strategies/augusta-rule` : `/clients/${p.clientId}/tax-planning`}
                        className="card flex items-center gap-5 px-5 py-3.5 group hover:shadow-paper transition-all"
                      >
                        <div className="w-9 h-9 rounded-full bg-paper-deep flex items-center justify-center text-[10px] font-mono text-ink shrink-0">
                          {initialsOf(p.client)}
                        </div>
                        <div className="flex-1 min-w-0 grid grid-cols-[1.5fr_1fr_1.4fr_1fr_0.8fr_28px] gap-4 items-center">
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[13.5px] font-medium text-ink truncate">{p.client}</span>
                              {p.isFlagship && <Star size={10} strokeWidth={2} className="text-ochre-500 shrink-0" />}
                            </div>
                            <div className="text-[11px] text-ink-muted tabular mt-0.5">POD {p.pod}</div>
                          </div>
                          <div>
                            <Pill variant={cfg.variant} dot>{p.status}</Pill>
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5">
                              <div className="flex-1 h-1.5 bg-paper-deep rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full transition-all",
                                    p.status === "Adopted" ? "bg-emerald-deep" : p.status === "Overdue" ? "bg-crimson-deep" : p.status === "Recommended" ? "bg-ink-faint" : "bg-ochre-500"
                                  )}
                                  style={{ width: `${Math.max(p.progress, 4)}%` }}
                                />
                              </div>
                              <span className="text-[11px] text-ink-muted tabular w-9 text-right">{p.progress}%</span>
                            </div>
                            {p.nextDue && (
                              <div className={cn("text-[10.5px] mt-1 tabular", p.status === "Overdue" ? "text-crimson-deep" : "text-ink-faint")}>
                                {p.status === "Overdue" ? "Past due" : "Next"}: {p.nextDue.split("-").slice(1).join("/")}
                              </div>
                            )}
                          </div>
                          <div className="text-[12px] text-ink-soft truncate">{p.owner}</div>
                          <div className="text-right num text-[14px] text-ink">{fmtUSD(p.estimatedSavings, { compact: true })}</div>
                          <ArrowUpRight size={13} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
