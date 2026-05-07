import { Link } from "wouter";
import { useState } from "react";
import {
  Sparkles,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Star,
  FileText,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER, TUCKER_STRATEGIES } from "../lib/mock-data";
import { fmtUSD, cn } from "../lib/format";
import type { TaxStrategy } from "../lib/types";

const statusConfig: Record<
  TaxStrategy["status"],
  { variant: "neutral" | "ochre" | "emerald" | "crimson" | "sky"; icon: typeof CheckCircle2 }
> = {
  Recommended: { variant: "ochre", icon: Star },
  "Under Review": { variant: "sky", icon: Clock },
  "In Progress": { variant: "sky", icon: Clock },
  Adopted: { variant: "emerald", icon: CheckCircle2 },
  Declined: { variant: "neutral", icon: XCircle },
};

const eligibilityConfig: Record<TaxStrategy["eligibility"], { dotColor: string; tone: string }> = {
  Eligible: { dotColor: "bg-emerald-deep", tone: "text-emerald-deep" },
  "Likely Eligible": { dotColor: "bg-ochre-500", tone: "text-ochre-700" },
  "Review Required": { dotColor: "bg-sky-deep", tone: "text-sky-deep" },
  "Not Eligible": { dotColor: "bg-ink-faint", tone: "text-ink-faint" },
};

export function TaxPlanning({ clientId }: { clientId: number }) {
  const client = TUCKER;
  const [filter, setFilter] = useState<"all" | "recommended" | "adopted" | "in-progress">("all");

  const strategies = TUCKER_STRATEGIES;
  const filteredStrategies = strategies.filter((s) => {
    if (filter === "all") return true;
    if (filter === "recommended") return s.status === "Recommended";
    if (filter === "adopted") return s.status === "Adopted";
    if (filter === "in-progress") return s.status === "In Progress" || s.status === "Under Review";
    return true;
  });

  const totalEstSavings = strategies.reduce((sum, s) => sum + s.estimatedSavings, 0);
  const adoptedCount = strategies.filter((s) => s.status === "Adopted").length;
  const adoptedSavings = strategies.filter((s) => s.status === "Adopted").reduce((sum, s) => sum + s.estimatedSavings, 0);
  const recommendedCount = strategies.filter((s) => s.status === "Recommended").length;
  const recommendedSavings = strategies.filter((s) => s.status === "Recommended").reduce((sum, s) => sum + s.estimatedSavings, 0);

  const flagshipStrategies = strategies.filter((s) => s.flagship);

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Tax Planning" },
          ]}
          eyebrow={`Strategy Review · ${strategies.length} firm-defined strategies`}
          title={
            <>
              <span className="block">Where the savings</span>
              <span className="italic">
                actually live.
              </span>
            </>
          }
          subtitle="AI-generated recommendations with first-pass savings estimates. Staff override on each. Adopted strategies feed the Forecasting model in real time."
          action={
            <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
              <Sparkles size={13} strokeWidth={1.8} />
              Regenerate Tax Plan
            </button>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1280px]">
        {/* Top stats */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Total potential</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none">
              {fmtUSD(totalEstSavings, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted mt-2">across {strategies.length} strategies, all eligibilities</div>
          </div>
          <div className="bg-emerald-soft/30 p-6">
            <div className="eyebrow text-emerald-deep">Adopted savings</div>
            <div className="display tabular text-[36px] text-emerald-deep mt-1.5 leading-none">
              {fmtUSD(adoptedSavings, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">{adoptedCount} strategies live in 2025 forecast</div>
          </div>
          <div className="bg-ochre-50/40 p-6">
            <div className="eyebrow text-ochre-700">Recommended (next)</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none">
              {fmtUSD(recommendedSavings, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">{recommendedCount} strategies awaiting adoption</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Adoption rate</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none">
              {Math.round((adoptedCount / strategies.length) * 100)}<span className="text-[20px] text-ink-muted">%</span>
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">peer benchmark · 28%</div>
          </div>
        </div>

        {/* Flagship strategies — magazine-cover treatment */}
        <div className="mb-10">
          <div className="flex items-baseline justify-between mb-5">
            <div className="flex items-baseline gap-3">
              <span className="eyebrow">Flagship strategies</span>
              <span className="text-[12px] text-ink-muted">— highest leverage for Tucker, AI-prioritized</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {flagshipStrategies.map((s) => {
              const cfg = statusConfig[s.status];
              const Icon = cfg.icon;
              const isAugusta = s.id === "augusta-rule";
              return (
                <Link
                  key={s.id}
                  to={isAugusta ? `/clients/${client.id}/strategies/augusta-rule` : `/clients/${client.id}/tax-planning`}
                  className={cn(
                    "card p-6 group hover:shadow-paper-md transition-all relative overflow-hidden",
                    isAugusta && "ring-1 ring-ochre-500/40"
                  )}
                >
                  {isAugusta && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-ochre-500 text-paper text-[10px] font-mono uppercase tracking-[0.12em]">
                      Phase 5 · Proposed Playbook
                    </div>
                  )}
                  <div className="flex items-baseline justify-between mb-3">
                    <Pill variant={cfg.variant} dot>
                      <Icon size={10} strokeWidth={2} />
                      {s.status}
                    </Pill>
                    <span className={cn("text-[10.5px] tabular", eligibilityConfig[s.eligibility].tone)}>
                      ● {s.eligibility}
                    </span>
                  </div>
                  <h3 className="display text-[24px] leading-[1.05] text-ink mt-2 text-balance">
                    {s.name}
                  </h3>
                  <p className="text-[12.5px] text-ink-soft mt-3 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                  {s.aiNote && (
                    <div className="mt-4 pt-4 border-t border-ink/6">
                      <div className="flex items-start gap-2">
                        <Sparkles size={11} strokeWidth={1.8} className="text-ochre-500 shrink-0 mt-0.5" />
                        <p className="text-[11.5px] text-ink-muted italic leading-relaxed line-clamp-3">
                          {s.aiNote}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <div className="eyebrow">Est. savings</div>
                      <div className="display tabular text-[28px] text-ink leading-none mt-1">
                        {fmtUSD(s.estimatedSavings, { compact: true })}
                      </div>
                    </div>
                    <ArrowUpRight size={14} strokeWidth={1.6} className="text-ink-faint group-hover:text-ochre-600 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Filter strip */}
        <div className="flex items-center gap-2 mb-6 pb-5 border-b border-ink/8">
          <span className="eyebrow mr-2">View</span>
          {[
            { id: "all", label: "All", count: strategies.length },
            { id: "recommended", label: "Recommended", count: recommendedCount },
            { id: "in-progress", label: "In Progress", count: strategies.filter(s => s.status === "In Progress" || s.status === "Under Review").length },
            { id: "adopted", label: "Adopted", count: adoptedCount },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={cn(
                "px-3.5 py-1.5 text-[12px] rounded-sm border transition-all flex items-center gap-2",
                filter === f.id
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink-soft border-transparent hover:bg-paper-deep hover:text-ink"
              )}
            >
              <span className="font-medium">{f.label}</span>
              <span className={cn("text-[10px] tabular", filter === f.id ? "text-paper/60" : "text-ink-faint")}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Full strategy table */}
        <Card padded={false} className="overflow-hidden">
          <div className="grid grid-cols-[2fr_0.8fr_0.8fr_1fr_60px] text-[10.5px] eyebrow border-b border-ink/8 px-7 py-3.5 bg-paper-deep/40">
            <div>Strategy</div>
            <div>Eligibility</div>
            <div>Status</div>
            <div className="text-right">Est. Savings</div>
            <div></div>
          </div>
          <div>
            {filteredStrategies.map((s) => {
              const cfg = statusConfig[s.status];
              const Icon = cfg.icon;
              const elig = eligibilityConfig[s.eligibility];
              const isAugusta = s.id === "augusta-rule";

              return (
                <Link
                  key={s.id}
                  to={isAugusta ? `/clients/${client.id}/strategies/augusta-rule` : `/clients/${client.id}/tax-planning`}
                  className="grid grid-cols-[2fr_0.8fr_0.8fr_1fr_60px] px-7 py-4 border-b border-ink/6 group hover:bg-paper-deep/30 transition-colors items-center"
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-[13.5px] font-medium text-ink truncate">{s.name}</span>
                      {s.flagship && <Star size={10} strokeWidth={2} className="text-ochre-500 shrink-0" />}
                    </div>
                    <div className="text-[11.5px] text-ink-muted tabular">{s.category}</div>
                  </div>
                  <div className={cn("text-[12px] flex items-center gap-1.5", elig.tone)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", elig.dotColor)} />
                    <span>{s.eligibility}</span>
                  </div>
                  <div>
                    <Pill variant={cfg.variant}>
                      <Icon size={10} strokeWidth={2} />
                      {s.status}
                    </Pill>
                  </div>
                  <div className="text-right num text-[14px] text-ink">
                    {s.estimatedSavings === 0 ? (
                      <span className="text-ink-faint">—</span>
                    ) : (
                      fmtUSD(s.estimatedSavings)
                    )}
                  </div>
                  <div className="text-right">
                    <ArrowUpRight size={13} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors inline-block" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Footer note */}
        <div className="mt-10 pt-8 border-t border-ink/8 grid grid-cols-12 gap-8">
          <div className="col-span-5">
            <div className="eyebrow mb-3">How this is generated</div>
            <h4 className="display text-[20px] leading-snug text-ink mb-3">
              AI first-pass, staff override, audit trail
            </h4>
          </div>
          <div className="col-span-7 text-[13px] text-ink-muted leading-relaxed space-y-3">
            <p>
              Tax Plan generation runs against the latest filed return, household forecast, entity
              ownership chart, and prior-year strategy adoption history. Each strategy receives a
              first-pass savings estimate citing the underlying assumptions.
            </p>
            <p>
              Staff override the estimated savings, eligibility flag, or recommendation rationale
              per strategy. Every override is logged on <code className="text-[12px] bg-paper-deep px-1 rounded">strategy_report_items</code> with the
              actor and timestamp — full audit trail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
