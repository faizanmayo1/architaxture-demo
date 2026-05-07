import { Link } from "wouter";
import {
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Clock,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  FileText,
  Activity,
  Zap,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Pill } from "../components/ui/Pill";
import { Stat } from "../components/ui/Stat";
import { BRIEFING_ITEMS, FIRM, FIRM_KPIS } from "../lib/mock-data";
import { fmtUSD, fmtTime, fmtRelativeTime, fmtDate } from "../lib/format";
import type { BriefingItem } from "../lib/types";

const categoryConfig: Record<
  BriefingItem["category"],
  { label: string; icon: typeof Sparkles; pill: "ochre" | "emerald" | "crimson" | "sky" | "neutral"; tone: string }
> = {
  "ready-to-file": { label: "Ready to File", icon: CheckCircle2, pill: "emerald", tone: "text-emerald-deep" },
  "irs-notice": { label: "IRS Notice", icon: AlertOctagon, pill: "crimson", tone: "text-crimson-deep" },
  "overdue-step": { label: "Overdue Step", icon: Clock, pill: "ochre", tone: "text-ochre-700" },
  "planning-opportunity": { label: "Planning Opportunity", icon: TrendingUp, pill: "ochre", tone: "text-ochre-700" },
  deadline: { label: "Deadline Watch", icon: Calendar, pill: "sky", tone: "text-sky-deep" },
  anomaly: { label: "Anomaly Flag", icon: Activity, pill: "neutral", tone: "text-ink-soft" },
};

export function MorningBriefing() {
  const today = new Date("2026-05-07T07:00:00");
  const items = BRIEFING_ITEMS;
  const highCount = items.filter((i) => i.urgency === "high").length;
  const totalValue = items.reduce((sum, i) => sum + Math.abs(i.estimatedValue ?? 0), 0);

  return (
    <div className="animate-fade-up">
      {/* Editorial-feel masthead */}
      <div className="px-10 pt-12 pb-8 max-w-[1280px]">
        <div className="flex items-baseline justify-between mb-7">
          <div className="eyebrow flex items-center gap-2.5">
            <Sparkles size={11} strokeWidth={1.8} className="text-ochre-500" />
            <span>The Firm Brain · 7:00 AM digest</span>
          </div>
          <div className="text-[12px] text-ink-muted tabular">
            Scanned overnight · {FIRM.totalClients} clients · {items.length} items surfaced
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-8">
            <div className="display text-[68px] leading-[0.92] text-ink text-balance" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 360 }}>
              <span className="block">Thursday's</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                Briefing.
              </span>
            </div>
            <p className="text-[15px] text-ink-muted mt-5 max-w-xl leading-relaxed">
              Six items need a partner's eyes today. Ranked by urgency, then by potential value to the
              client. Drafted responses, recommended actions, and ownership inferred from the engagement model.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-4 pb-2">
            <div className="border-l-2 border-ochre-500 pl-4">
              <div className="eyebrow">Needs attention</div>
              <div className="display tabular text-[40px] leading-none mt-1.5 text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                {items.length}
              </div>
              <div className="text-[11px] text-ink-muted tabular mt-1">
                <span className="text-crimson-deep font-medium">{highCount} high</span> · {items.length - highCount} medium/low
              </div>
            </div>
            <div className="border-l-2 border-ink/15 pl-4">
              <div className="eyebrow">In play</div>
              <div className="display tabular text-[40px] leading-none mt-1.5 text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                {fmtUSD(totalValue, { compact: true }).replace("$", "$")}
              </div>
              <div className="text-[11px] text-ink-muted mt-1">aggregate value at stake</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="hairline mx-10 max-w-[1280px]" />

      {/* The items — presented as editorial entries, not generic cards */}
      <div className="px-10 py-10 max-w-[1280px]">
        <div className="space-y-px">
          {items.map((item, index) => {
            const cfg = categoryConfig[item.category];
            const Icon = cfg.icon;
            const isPositive = (item.estimatedValue ?? 0) > 0;
            return (
              <article
                key={item.id}
                className="bg-paper-card border-t border-ink/8 first:border-t-0 last:border-b border-b border-ink/8 group hover:bg-paper-deep/30 transition-colors"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="grid grid-cols-12 gap-8 px-2 py-7">
                  {/* Left rail: index, category, owner */}
                  <div className="col-span-2 pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="display tabular text-[40px] text-ink leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 360 }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <Icon size={11} strokeWidth={1.8} className={cfg.tone} />
                      <span className={`text-[10.5px] font-mono uppercase tracking-[0.12em] ${cfg.tone}`}>
                        {cfg.label}
                      </span>
                    </div>
                    {item.urgency === "high" && (
                      <Pill variant="crimson" className="mt-3" dot>
                        High urgency
                      </Pill>
                    )}
                  </div>

                  {/* Center: headline + detail */}
                  <div className="col-span-7">
                    <div className="text-[11px] text-ink-faint mb-1.5 tabular">
                      Detected {fmtTime(item.detectedAt)} · via {item.source}
                    </div>
                    <h3 className="display text-[27px] leading-[1.05] text-ink text-balance" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40', fontWeight: 380 }}>
                      {item.headline}
                    </h3>
                    <p className="text-[14px] text-ink-soft mt-3 leading-relaxed">{item.detail}</p>

                    <div className="mt-5 flex items-baseline gap-2 text-[12.5px]">
                      <span className="eyebrow">Recommended</span>
                      <span className="text-ink-soft">→</span>
                      <span className="text-ink font-medium">{item.recommendedAction}</span>
                    </div>
                  </div>

                  {/* Right rail: value + action */}
                  <div className="col-span-3 flex flex-col items-end justify-between gap-4">
                    {item.estimatedValue !== undefined && item.estimatedValue !== 0 && (
                      <div className="text-right">
                        <div className="eyebrow text-[10px]">{isPositive ? "Estimated value" : "Estimated exposure"}</div>
                        <div className={`display tabular text-[36px] leading-none mt-1 ${isPositive ? "text-emerald-deep" : "text-crimson-deep"}`} style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                          {fmtUSD(Math.abs(item.estimatedValue), { compact: true })}
                        </div>
                        <div className="text-[11px] text-ink-muted mt-2 tabular">Owner · {item.owner}</div>
                      </div>
                    )}

                    {item.estimatedValue === undefined && (
                      <div className="text-right">
                        <div className="text-[11px] text-ink-muted">Owner</div>
                        <div className="text-[14px] font-medium text-ink mt-1">{item.owner}</div>
                      </div>
                    )}

                    <Link
                      to={
                        item.category === "irs-notice"
                          ? `/irs-notices/n-001`
                          : item.category === "ready-to-file"
                          ? `/clients/${item.clientId}`
                          : item.category === "planning-opportunity"
                          ? `/clients/${item.clientId}/tax-planning`
                          : item.category === "overdue-step"
                          ? `/clients/${item.clientId}/strategies/augusta-rule`
                          : `/clients/${item.clientId}`
                      }
                      className="text-[12.5px] flex items-center gap-1.5 text-ink hover:text-ochre-600 transition-colors group/link"
                    >
                      {item.category === "irs-notice" ? "Open notice" : `Open ${item.client}`}
                      <ArrowUpRight size={13} strokeWidth={1.8} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Below-the-fold context */}
        <div className="mt-12 pt-10 border-t border-ink/8 grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="eyebrow mb-3">How the brain reasoned this morning</div>
            <h4 className="display text-[22px] leading-tight text-ink mb-4" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60', fontWeight: 380 }}>
              What's running underneath
            </h4>
            <p className="text-[13px] text-ink-muted leading-relaxed">
              The 7am digest aggregates outputs from the document request engine, IRS notice feed,
              strategy playbook engine, anomaly detector, and tax plan generator. Items are ranked by
              urgency × estimated value, deduplicated by client, and routed to the responsible
              engagement team member.
            </p>
          </div>
          <div className="col-span-8 grid grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden">
            {[
              { label: "Documents Outstanding", value: FIRM_KPIS.documentsOutstanding, sub: "across all clients" },
              { label: "Open IRS Notices", value: FIRM_KPIS.irsNoticesOpen, sub: "11 awaiting response" },
              { label: "Strategies in flight", value: FIRM_KPIS.strategiesAdopted, sub: `${fmtUSD(FIRM_KPIS.strategiesEstimatedSavings, { compact: true })} aggregate savings` },
            ].map((k) => (
              <div key={k.label} className="bg-paper-card p-6">
                <div className="eyebrow text-[10px]">{k.label}</div>
                <div className="display tabular text-[34px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                  {k.value}
                </div>
                <div className="text-[11px] text-ink-muted mt-1.5 tabular">{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
