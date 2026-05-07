import { Link } from "wouter";
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Users,
  FileBarChart2,
  CheckCircle2,
  AlertOctagon,
  Clock,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { FIRM, FIRM_KPIS, BRIEFING_ITEMS, ALL_CLIENTS, STAFF } from "../lib/mock-data";
import { fmtUSD, fmtTime, fmtRelativeTime, fmtPctRaw, cn } from "../lib/format";

export function FirmOverview() {
  const today = new Date("2026-05-07T07:00:00");
  const topBriefingItems = BRIEFING_ITEMS.slice(0, 3);
  const yoyGrowth = ((FIRM_KPIS.ytdRevenue - FIRM_KPIS.priorYTDRevenue) / FIRM_KPIS.priorYTDRevenue) * 100;
  const turnaroundDelta = FIRM_KPIS.priorAvgTurnaround - FIRM_KPIS.avgTurnaround;

  return (
    <div className="animate-fade-up">
      {/* Editorial header */}
      <div className="px-10 pt-12 pb-8 max-w-[1280px]">
        <div className="flex items-baseline justify-between mb-7">
          <div className="eyebrow flex items-center gap-2.5">
            <span>Firm Overview · {FIRM.name}</span>
          </div>
          <div className="text-[12px] text-ink-muted tabular">
            {FIRM_KPIS.activeClients} active clients · {FIRM.totalStaff} team · 2 PODs
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-7">
            <div className="display text-[64px] leading-[0.94] text-ink text-balance" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 360 }}>
              <span className="block">Good morning,</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                Eric.
              </span>
            </div>
            <p className="text-[15px] text-ink-muted mt-5 max-w-xl leading-relaxed">
              The firm brain reasoned across <span className="text-ink">235 clients</span> overnight.
              Six items need attention today, headlined by Tucker's return — now ready to file —
              and a CP2000 for Holcomb Imaging.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link
                to="/briefing"
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm"
              >
                <Sparkles size={13} strokeWidth={1.8} />
                Open Morning Briefing
                <ArrowUpRight size={12} strokeWidth={1.8} />
              </Link>
              <Link
                to="/clients/60"
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors rounded-sm"
              >
                Jump to Tucker
                <ArrowUpRight size={12} strokeWidth={1.8} />
              </Link>
            </div>
          </div>

          <div className="col-span-5 grid grid-cols-2 gap-px bg-ink/8 border border-ink/8 rounded-sm self-end">
            <div className="bg-paper-card p-5">
              <div className="eyebrow text-[10px]">YTD Revenue</div>
              <div className="display tabular text-[28px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                {fmtUSD(FIRM_KPIS.ytdRevenue, { compact: true })}
              </div>
              <div className="text-[10.5px] text-emerald-deep mt-1.5 tabular">
                ↑ {fmtPctRaw(yoyGrowth)} vs. prior YTD
              </div>
            </div>
            <div className="bg-paper-card p-5">
              <div className="eyebrow text-[10px]">Returns YTD</div>
              <div className="display tabular text-[28px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                {FIRM_KPIS.returnsFiledThisYear}
                <span className="text-[16px] text-ink-muted">/{FIRM_KPIS.returnsInProgress + FIRM_KPIS.returnsFiledThisYear}</span>
              </div>
              <div className="text-[10.5px] text-ink-muted mt-1.5">filed of in-progress</div>
            </div>
            <div className="bg-paper-card p-5">
              <div className="eyebrow text-[10px]">Avg turnaround</div>
              <div className="display tabular text-[28px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                {FIRM_KPIS.avgTurnaround}<span className="text-[14px] text-ink-muted"> days</span>
              </div>
              <div className="text-[10.5px] text-emerald-deep mt-1.5 tabular">
                ↓ {turnaroundDelta.toFixed(1)} d vs. prior year
              </div>
            </div>
            <div className="bg-paper-card p-5">
              <div className="eyebrow text-[10px]">Aggregate strategy savings</div>
              <div className="display tabular text-[28px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                {fmtUSD(FIRM_KPIS.strategiesEstimatedSavings, { compact: true })}
              </div>
              <div className="text-[10.5px] text-ink-muted mt-1.5 tabular">{FIRM_KPIS.strategiesAdopted} adopted</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="hairline mx-10 max-w-[1280px]" />

      <div className="px-10 py-10 max-w-[1280px] grid grid-cols-12 gap-8">
        {/* Today's focus — top 3 from briefing */}
        <div className="col-span-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="eyebrow mb-1">Today's focus</div>
              <h2 className="display text-[26px] text-ink leading-tight" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                Top 3 of {BRIEFING_ITEMS.length} from this morning's briefing
              </h2>
            </div>
            <Link to="/briefing" className="text-[12.5px] text-ink-muted hover:text-ink flex items-center gap-1.5 transition-colors">
              See full briefing
              <ArrowUpRight size={12} strokeWidth={1.8} />
            </Link>
          </div>

          <div className="space-y-3">
            {topBriefingItems.map((item, i) => (
              <Link
                key={item.id}
                to={`/clients/${item.clientId}`}
                className="card p-5 group hover:shadow-paper-md transition-all flex items-start gap-5"
              >
                <div className="display tabular text-[36px] text-ink-faint leading-none shrink-0" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-[10.5px] eyebrow">{item.client}</span>
                    {item.urgency === "high" && <Pill variant="crimson" dot>High</Pill>}
                  </div>
                  <h3 className="text-[15px] font-medium text-ink leading-snug">{item.headline}</h3>
                  <p className="text-[12.5px] text-ink-muted mt-1.5 leading-relaxed line-clamp-2">{item.detail}</p>
                </div>
                {item.estimatedValue !== undefined && item.estimatedValue !== 0 && (
                  <div className="text-right shrink-0">
                    <div className="eyebrow text-[10px]">{item.estimatedValue > 0 ? "Value" : "Exposure"}</div>
                    <div className={cn(
                      "display tabular text-[24px] leading-none mt-1",
                      item.estimatedValue > 0 ? "text-emerald-deep" : "text-crimson-deep"
                    )} style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                      {fmtUSD(Math.abs(item.estimatedValue), { compact: true })}
                    </div>
                  </div>
                )}
                <ArrowUpRight size={14} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right rail */}
        <div className="col-span-4 space-y-6">
          <Card>
            <CardHeader title="The brain · Stage 1 of 4" eyebrow="Where we are" />
            <ol className="space-y-3 text-[13px]">
              {[
                { stage: 1, name: "AI-Assisted", desc: "User-triggered Claude calls", current: true },
                { stage: 2, name: "Supervised Agentic", desc: "Multi-step agents with approval gates" },
                { stage: 3, name: "Autonomous Agentic", desc: "Cron-triggered, exception-only oversight" },
                { stage: 4, name: "Firm Intelligence Layer", desc: "Cross-client predictive reasoning" },
              ].map((s) => (
                <li key={s.stage} className={cn("flex items-baseline gap-3", s.current ? "text-ink" : "text-ink-faint")}>
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0",
                    s.current ? "bg-ochre-500 text-paper" : "bg-paper-deep text-ink-muted"
                  )}>
                    {s.stage}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium leading-tight">{s.name}</div>
                    <div className={cn("text-[11px] mt-0.5 leading-snug", s.current ? "text-ink-muted" : "text-ink-faint")}>{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <CardHeader title="Health pulse" eyebrow="Across 235 clients" />
            <div className="space-y-3">
              {[
                { label: "Documents outstanding", value: FIRM_KPIS.documentsOutstanding, tone: "ochre" as const },
                { label: "Open IRS notices", value: FIRM_KPIS.irsNoticesOpen, tone: "crimson" as const },
                { label: "Strategies adopted", value: FIRM_KPIS.strategiesAdopted, tone: "emerald" as const },
                { label: "Returns in progress", value: FIRM_KPIS.returnsInProgress, tone: "neutral" as const },
              ].map((k) => (
                <div key={k.label} className="flex items-baseline justify-between border-b border-ink/6 pb-2.5 last:border-0">
                  <span className="text-[12.5px] text-ink-soft">{k.label}</span>
                  <Pill variant={k.tone}>{k.value}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
