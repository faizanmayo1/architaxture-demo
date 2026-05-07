import { Link, useLocation } from "wouter";
import {
  ArrowUpRight,
  Building2,
  TrendingUp,
  FileText,
  Sparkles,
  Calendar,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { Stat } from "../components/ui/Stat";
import {
  TUCKER,
  TUCKER_ENTITIES,
  TUCKER_STRATEGIES,
  TUCKER_FORECAST_VERSIONS,
  STAFF,
} from "../lib/mock-data";
import { fmtUSD, fmtDate, fmtRelativeTime, initialsOf, fmtPctRaw } from "../lib/format";

interface ClientHubProps {
  clientId?: number;
}

export function ClientHub({ clientId = 60 }: ClientHubProps) {
  const [location] = useLocation();
  const client = TUCKER; // demo only handles Tucker
  const entities = TUCKER_ENTITIES;
  const strategies = TUCKER_STRATEGIES;
  const adoptedStrategies = strategies.filter((s) => s.status === "Adopted");
  const recommendedStrategies = strategies.filter((s) => s.status === "Recommended");
  const totalRecommendedSavings = recommendedStrategies.reduce((sum, s) => sum + s.estimatedSavings, 0);

  const activeForecast = TUCKER_FORECAST_VERSIONS.find((v) => !v.isLocked) || TUCKER_FORECAST_VERSIONS[0];


  return (
    <div className="animate-fade-up">
      <div className="px-8 py-8 max-w-[1400px]">
        {/* Anchor stats */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <Stat
              label="2025 Forecast"
              value={fmtUSD(activeForecast.totalProjectedTax, { compact: true })}
              sub={`Est. liability · v${TUCKER_FORECAST_VERSIONS.length}`}
              size="md"
            />
          </div>
          <div className="bg-paper-card p-6">
            <Stat
              label="Effective Rate"
              value={fmtPctRaw(activeForecast.effectiveRate * 100, 1)}
              sub={`AGI ${fmtUSD(activeForecast.totalProjectedAGI, { compact: true })}`}
              size="md"
            />
          </div>
          <div className="bg-paper-card p-6">
            <Stat
              label="Strategies"
              value={
                <span>
                  {adoptedStrategies.length}<span className="text-ink-muted text-[26px]">/{strategies.length}</span>
                </span>
              }
              sub={`+${fmtUSD(totalRecommendedSavings, { compact: true })} potential`}
              size="md"
            />
          </div>
          <div className="bg-paper-card p-6">
            <Stat
              label="Documents"
              value={
                <span>
                  {client.documentsReceived}<span className="text-ink-muted text-[26px]">/{client.documentsRequested}</span>
                </span>
              }
              sub="Outstanding · 1"
              size="md"
            />
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left col — entity ownership + activity */}
          <div className="col-span-2 space-y-6">
            {/* Entity ownership */}
            <Card>
              <CardHeader
                eyebrow="Ownership Chart"
                title="Entities and stakes"
                description={`${entities.length} entities — only Jeffrey's stake shown. Co-owners excluded per data model.`}
                action={
                  <button className="text-[12px] text-ink-muted hover:text-ink flex items-center gap-1.5 transition-colors">
                    Detailed view
                    <ArrowUpRight size={12} strokeWidth={1.6} />
                  </button>
                }
              />
              <div className="space-y-px bg-ink/6 rounded-sm overflow-hidden">
                {entities.map((entity) => (
                  <div
                    key={entity.id}
                    className="bg-paper-card p-5 flex items-center gap-5 hover:bg-paper-deep/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-sm bg-ink/5 flex items-center justify-center text-ink shrink-0">
                      <Building2 size={17} strokeWidth={1.4} />
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-[1.6fr_1fr_0.7fr_0.6fr] gap-4 items-center">
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium text-ink truncate">{entity.name}</div>
                        <div className="text-[11px] text-ink-muted mt-0.5 tabular">EIN {entity.ein} · Formed {entity.yearFormed} · {entity.state}</div>
                      </div>
                      <div>
                        <Pill variant="neutral">{entity.type}</Pill>
                      </div>
                      <div className="text-[11px] text-ink-muted tabular">Form {entity.formType}</div>
                      <div className="text-right">
                        <div className="display tabular text-[22px] text-ink leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                          {entity.ownership}<span className="text-[14px] text-ink-muted">%</span>
                        </div>
                        <div className="eyebrow mt-1 text-[9px]">Owned</div>
                      </div>
                    </div>
                    <ArrowUpRight size={14} strokeWidth={1.5} className="text-ink-faint group-hover:text-ink transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Activity Timeline */}
            <Card>
              <CardHeader
                eyebrow="Recent Activity · AI-surfaced"
                title="What the firm brain has been doing"
              />
              <div className="space-y-0">
                {[
                  {
                    icon: Sparkles,
                    when: "2026-05-07T07:00:00Z",
                    title: "Cost Segregation strategy newly eligible",
                    detail: "Bayshore Property Holdings basis $1.42M, in service since 2021. Estimated savings $28,600.",
                    source: "Tax Plan Generator",
                    pill: "ochre",
                  },
                  {
                    icon: CheckCircle2,
                    when: "2026-05-07T02:14:00Z",
                    title: "Tucker Family RE Partnership K-1 received",
                    detail: "Auto-classified, named (2024_K1_TuckerFamilyRE), routed to /clients/60/2024/k1/. Cross-referenced against open document request — marked received.",
                    source: "AI File Intelligence",
                    pill: "emerald",
                  },
                  {
                    icon: TrendingUp,
                    when: "2026-05-04T16:32:00Z",
                    title: "Q3 forecast version locked",
                    detail: "Effective rate revised down to 26.7%. Snapshot saved to household_forecast_versions.",
                    source: "Forecasting Module",
                    pill: "neutral",
                  },
                  {
                    icon: FileText,
                    when: "2026-05-02T14:22:00Z",
                    title: "2024 1040 extraction complete",
                    detail: "17 carryforward fields populated. Form 7203 detected. Schedule M-2 reconciled. 2 confidence flags resolved by Priya R.",
                    source: "Extraction Pipeline",
                    pill: "neutral",
                  },
                ].map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <div key={i} className="flex gap-4 py-4 border-b border-ink/6 last:border-0 group">
                      <div className="w-7 h-7 rounded-full bg-paper-deep flex items-center justify-center shrink-0">
                        <Icon size={13} strokeWidth={1.6} className="text-ink-soft" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="text-[13.5px] font-medium text-ink leading-snug">{act.title}</div>
                          <div className="text-[11px] text-ink-faint tabular shrink-0">{fmtRelativeTime(act.when, new Date("2026-05-07T08:00:00Z"))}</div>
                        </div>
                        <div className="text-[12.5px] text-ink-muted mt-1 leading-relaxed">{act.detail}</div>
                        <div className="text-[10px] mt-1.5 eyebrow">via {act.source}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right col — team + quick actions */}
          <div className="col-span-1 space-y-6">
            {/* Team */}
            <Card>
              <CardHeader title="Engagement team" eyebrow="POD Alpha" />
              <div className="space-y-3">
                {[
                  { name: client.taxManager, role: "Tax Manager", lead: true },
                  { name: client.taxStaff, role: "Senior Tax Staff" },
                  { name: client.bookkeeper, role: "Bookkeeper" },
                  { name: client.salesRep, role: "Sales Rep" },
                ].filter((m) => m.name).map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ink/8 text-ink flex items-center justify-center text-[10.5px] font-mono font-medium tracking-tight">
                      {initialsOf(m.name!)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-ink truncate">{m.name}</div>
                      <div className="text-[11px] text-ink-muted">{m.role}</div>
                    </div>
                    {m.lead && <Pill variant="ochre">Lead</Pill>}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick navigation */}
            <Card>
              <CardHeader title="Jump to" eyebrow="Working surfaces" />
              <div className="space-y-px bg-ink/6 -mx-6 -mb-6 mt-2">
                {[
                  { label: "Forecasting & Household Estimate", to: `/clients/${client.id}/forecast`, icon: TrendingUp, hot: true },
                  { label: "Tax Planning · 18 strategies", to: `/clients/${client.id}/tax-planning`, icon: Sparkles, hot: true },
                  { label: "Augusta Rule Playbook", to: `/clients/${client.id}/strategies/augusta-rule`, icon: FileText, hot: true },
                  { label: "Document Review Queue", to: `/review-queue`, icon: FileText },
                ].map((q) => {
                  const Icon = q.icon;
                  return (
                    <Link
                      key={q.to}
                      to={q.to}
                      className="bg-paper-card hover:bg-paper-deep transition-colors flex items-center gap-3 px-6 py-3 group"
                    >
                      <Icon size={14} strokeWidth={1.5} className="text-ink-muted group-hover:text-ink transition-colors shrink-0" />
                      <span className="text-[13px] text-ink-soft group-hover:text-ink flex-1 transition-colors">{q.label}</span>
                      {q.hot && <span className="w-1.5 h-1.5 rounded-full bg-ochre-500" />}
                      <ArrowUpRight size={12} strokeWidth={1.6} className="text-ink-faint group-hover:text-ink transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Next deadlines */}
            <Card>
              <CardHeader title="On the clock" eyebrow="Next 30 days" />
              <div className="space-y-3">
                {[
                  { date: "2026-05-12", label: "Augusta Rule rental agreement review", urgent: true },
                  { date: "2026-05-20", label: "12 board minutes due (Augusta Rule)", urgent: false },
                  { date: "2026-06-16", label: "Q2 estimated payment", urgent: false },
                  { date: "2026-06-30", label: "Cost Segregation study decision", urgent: false },
                ].map((d, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <div className="w-12 shrink-0">
                      <div className="display text-[14px] text-ink leading-none tabular" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                        {fmtDate(d.date, "month-day").split(" ")[1]}
                      </div>
                      <div className="text-[10px] eyebrow mt-0.5">{fmtDate(d.date, "month-day").split(" ")[0]}</div>
                    </div>
                    <div className={`text-[12.5px] flex-1 leading-snug ${d.urgent ? "text-ink" : "text-ink-soft"}`}>
                      {d.label}
                    </div>
                    {d.urgent && <AlertCircle size={12} strokeWidth={1.8} className="text-ochre-500 shrink-0" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
