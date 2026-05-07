import { Link } from "wouter";
import { useState } from "react";
import {
  Lock,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Sparkles,
  ArrowUpRight,
  Building2,
  Layers,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import {
  TUCKER,
  TUCKER_FORECAST,
  TUCKER_FORECAST_VERSIONS,
  TUCKER_K1S,
  TUCKER_ENTITIES,
} from "../lib/mock-data";
import { fmtUSD, fmtDate, fmtPctRaw, cn } from "../lib/format";

export function Forecasting({ clientId }: { clientId: number }) {
  const client = TUCKER;
  const [activeVersionId, setActiveVersionId] = useState(
    TUCKER_FORECAST_VERSIONS.find((v) => !v.isLocked)?.id ?? TUCKER_FORECAST_VERSIONS[0].id
  );
  const activeVersion = TUCKER_FORECAST_VERSIONS.find((v) => v.id === activeVersionId)!;
  const priorVersion = TUCKER_FORECAST_VERSIONS[0]; // 2024 filed

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Forecasting" },
          ]}
          eyebrow="Household Tax Estimate · 2025"
          title={
            <>
              <span className="block">Forecast,</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                quarterly.
              </span>
            </>
          }
          subtitle="Side-by-side prior year vs. projected 2025. Locked snapshots preserve assumptions and line items as JSONB. Accepted strategies auto-adjust the model."
          action={
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <PlusCircle size={13} strokeWidth={1.8} />
                New Version
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Lock size={12} strokeWidth={2} />
                Lock Version
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1280px]">
        {/* Version selector strip */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
          <span className="eyebrow shrink-0 mr-2">Versions</span>
          {TUCKER_FORECAST_VERSIONS.map((v) => {
            const isActive = v.id === activeVersionId;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVersionId(v.id)}
                className={cn(
                  "px-4 py-2 text-[12px] rounded-sm border transition-all shrink-0 flex items-center gap-2",
                  isActive
                    ? "bg-ink text-paper border-ink"
                    : "bg-paper-card border-ink/10 text-ink-soft hover:bg-paper-deep hover:border-ink/20"
                )}
              >
                {v.isLocked ? <Lock size={10} strokeWidth={2} /> : <Sparkles size={10} strokeWidth={2} />}
                <span className="font-medium">{v.label}</span>
                {v.lockedAt && (
                  <span className={cn("text-[10px] tabular", isActive ? "text-paper/60" : "text-ink-faint")}>
                    {fmtDate(v.lockedAt, "short")}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* KPI strip — projected vs prior */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Projected AGI · 2025</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(activeVersion.totalProjectedAGI, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">
              <span className="text-emerald-deep">↑ {fmtUSD(activeVersion.totalProjectedAGI - priorVersion.totalProjectedAGI, { compact: true })}</span> vs. 2024 filed
            </div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Total Federal Tax</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(activeVersion.totalProjectedTax, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">
              <span className={activeVersion.totalProjectedTax < priorVersion.totalProjectedTax ? "text-emerald-deep" : "text-crimson-deep"}>
                {activeVersion.totalProjectedTax < priorVersion.totalProjectedTax ? "↓" : "↑"}{" "}
                {fmtUSD(Math.abs(activeVersion.totalProjectedTax - priorVersion.totalProjectedTax), { compact: true })}
              </span>{" "}
              vs. 2024 filed
            </div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Effective Rate</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtPctRaw(activeVersion.effectiveRate * 100, 1)}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">
              Marginal: <span className="text-ink">37%</span> · LTCG: <span className="text-ink">20%</span>
            </div>
          </div>
          <div className="bg-paper-card p-6 bg-emerald-soft/30">
            <div className="eyebrow text-emerald-deep">Projected Refund</div>
            <div className="display tabular text-[36px] text-emerald-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(37700, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">
              after $216k withholding + estimates
            </div>
          </div>
        </div>

        {/* Strategy adjustment notice (the pulled-forward Forecasting Agent moment) */}
        <div className="mb-10 border border-ochre-200/60 bg-ochre-50/40 rounded-sm p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-ochre-100 flex items-center justify-center shrink-0">
            <Sparkles size={14} strokeWidth={1.8} className="text-ochre-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[14px] font-medium text-ink">Forecasting Adjustment Agent</span>
              <Pill variant="ochre" dot>Proposed · Phase 5</Pill>
            </div>
            <p className="text-[13px] text-ink-soft leading-relaxed">
              QBI Deduction Optimization, HSA Max Funding, and Spousal IRA were marked Adopted in
              Tax Planning. Their estimated savings <span className="text-ink font-medium">($10,260 combined)</span> are reflected in this
              forecast. Augusta Rule and Cost Segregation are pending — adoption would
              reduce projected tax by <span className="text-ink font-medium">${(43000).toLocaleString()}</span>.
            </p>
          </div>
          <Link
            to={`/clients/${client.id}/tax-planning`}
            className="text-[12px] text-ochre-700 hover:text-ochre-800 flex items-center gap-1.5 transition-colors shrink-0 mt-1"
          >
            Open Tax Planning
            <ArrowUpRight size={12} strokeWidth={1.8} />
          </Link>
        </div>

        {/* The big table — household estimate */}
        <Card padded={false} className="mb-10 overflow-hidden">
          <div className="px-7 pt-6 pb-4 flex items-end justify-between border-b border-ink/8">
            <div>
              <div className="eyebrow">Household tax estimate</div>
              <h3 className="display text-[22px] text-ink mt-1" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                Line-by-line · prior year vs projected
              </h3>
            </div>
            <div className="flex items-center gap-6 text-[11px] text-ink-muted tabular">
              <span>Cycling per-entity K-1s ↓</span>
            </div>
          </div>

          <div className="grid grid-cols-[1.6fr_1fr_1fr_0.6fr] text-[11px] eyebrow border-b border-ink/8 px-7 py-3 bg-paper-deep/40">
            <div>Line item</div>
            <div className="text-right">2024 Filed</div>
            <div className="text-right">2025 Projected</div>
            <div className="text-right">Δ</div>
          </div>

          <div>
            {TUCKER_FORECAST.map((line, i) => {
              const delta = line.projected - line.priorYear;
              const isHeader = line.isHeader;
              const isSubtotal = isHeader && line.priorYear !== 0;

              if (isHeader && line.priorYear === 0) {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[1.6fr_1fr_1fr_0.6fr] px-7 py-2.5 border-b border-ink/6 bg-paper-deep/20"
                  >
                    <div className="text-[10px] eyebrow text-ink">{line.category}</div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-[1.6fr_1fr_1fr_0.6fr] px-7 py-3 border-b border-ink/6 group hover:bg-paper-deep/30 transition-colors",
                    isSubtotal && "bg-ink/3 font-medium"
                  )}
                >
                  <div className={cn("text-[13px]", isSubtotal ? "text-ink font-medium" : "text-ink-soft")}>
                    {line.category}
                  </div>
                  <div className={cn("text-right num text-[13px]", isSubtotal ? "text-ink" : "text-ink-soft")}>
                    {fmtUSD(line.priorYear, { sign: line.priorYear < 0 })}
                  </div>
                  <div className={cn("text-right num text-[13px]", isSubtotal ? "text-ink font-medium" : "text-ink")}>
                    {fmtUSD(line.projected, { sign: line.projected < 0 })}
                  </div>
                  <div className={cn(
                    "text-right num text-[12px]",
                    delta === 0 ? "text-ink-faint" : delta > 0 ? "text-ink-muted" : "text-ink-muted"
                  )}>
                    {delta === 0 ? "—" : fmtUSD(delta, { sign: true, compact: true })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* K-1 cards & marginal brackets */}
        <div className="grid grid-cols-3 gap-6">
          {/* K-1 entries */}
          <div className="col-span-2">
            <Card>
              <CardHeader
                eyebrow="K-1 Pass-Through"
                title="Tucker Family Real Estate Partnership"
                description="Form 1065 · 60% Jeffrey · 25% Mendoza · 15% Pratt"
                action={<Pill variant="neutral">2024 K-1</Pill>}
              />
              <div className="grid grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden">
                {TUCKER_K1S.map((k1, i) => (
                  <div key={i} className={cn("bg-paper-card p-5", i === 0 && "bg-ochre-50/40")}>
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="text-[13px] font-medium text-ink truncate pr-2">{k1.partnerName}</div>
                      <div className="display tabular text-[18px] text-ink-soft" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                        {k1.ownership}<span className="text-[11px] text-ink-muted">%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-[12px]">
                      <div className="flex items-baseline justify-between">
                        <span className="text-ink-muted">Ordinary income</span>
                        <span className="num text-ink">{fmtUSD(k1.ordinaryIncome)}</span>
                      </div>
                      {k1.guaranteedPayments && (
                        <div className="flex items-baseline justify-between">
                          <span className="text-ink-muted">Guaranteed pmts</span>
                          <span className="num text-ink">{fmtUSD(k1.guaranteedPayments)}</span>
                        </div>
                      )}
                      {k1.rentalIncome && (
                        <div className="flex items-baseline justify-between">
                          <span className="text-ink-muted">Rental income</span>
                          <span className="num text-ink">{fmtUSD(k1.rentalIncome)}</span>
                        </div>
                      )}
                      <hr className="hairline my-2.5" />
                      <div className="flex items-baseline justify-between">
                        <span className="text-ink-soft font-medium">Capital acct EOY</span>
                        <span className="num text-ink font-medium">{fmtUSD(k1.capitalAccountEnd, { compact: true })}</span>
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="mt-3 pt-3 border-t border-ochre-200/40">
                        <div className="text-[10px] text-ochre-700 eyebrow">Tucker stake</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Marginal brackets visualization */}
          <div>
            <Card>
              <CardHeader
                eyebrow="Marginal Brackets"
                title="2025 ordinary income"
                description="MFJ · current marginal rate"
              />
              <div className="space-y-2 mt-2">
                {[
                  { rate: "10%", min: 0, max: 23200, color: "bg-emerald-soft" },
                  { rate: "12%", min: 23200, max: 94300, color: "bg-emerald-soft/70" },
                  { rate: "22%", min: 94300, max: 201050, color: "bg-paper-deep" },
                  { rate: "24%", min: 201050, max: 383900, color: "bg-paper-deep" },
                  { rate: "32%", min: 383900, max: 487450, color: "bg-ochre-100" },
                  { rate: "35%", min: 487450, max: 731200, color: "bg-ochre-200" },
                  { rate: "37%", min: 731200, max: Infinity, color: "bg-ochre-500/20", current: true },
                ].map((b, i) => (
                  <div key={i} className={cn("flex items-baseline gap-2", b.current && "ring-1 ring-ochre-500 -mx-1.5 px-1.5 py-1 rounded-sm")}>
                    <div className={cn("h-3 rounded-sm", b.color)} style={{ width: `${(i + 1) * 10}px` }} />
                    <span className={cn("text-[11px] tabular", b.current ? "text-ink font-medium" : "text-ink-muted")}>
                      {b.rate}
                    </span>
                    <span className="text-[10.5px] text-ink-faint tabular ml-auto">
                      {b.max === Infinity ? `${fmtUSD(b.min, { compact: true })}+` : `${fmtUSD(b.min, { compact: true })}–${fmtUSD(b.max, { compact: true })}`}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="hairline my-5" />
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between text-[12px]">
                  <span className="text-ink-muted">Top marginal $</span>
                  <span className="num text-ink">{fmtUSD(activeVersion.totalProjectedAGI - 731200, { compact: true })}</span>
                </div>
                <div className="flex items-baseline justify-between text-[12px]">
                  <span className="text-ink-muted">Bracket headroom</span>
                  <span className="num text-ink">— top bracket —</span>
                </div>
                <div className="flex items-baseline justify-between text-[12px]">
                  <span className="text-ink-muted">NIIT threshold (MFJ)</span>
                  <span className="num text-ink">$250k · breached</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
