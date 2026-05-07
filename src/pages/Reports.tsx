import { useState } from "react";
import { Download, Filter, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { FIRM_KPIS, STAFF, FIRM } from "../lib/mock-data";
import { fmtUSD, fmtPctRaw, cn } from "../lib/format";

// Synthetic monthly revenue (Jan–Dec 2026 vs 2025)
const monthlyRevenue = [
  { month: "Jan", current: 84200, prior: 71400 },
  { month: "Feb", current: 168400, prior: 142300 },
  { month: "Mar", current: 312800, prior: 254600 },
  { month: "Apr", current: 406200, prior: 326700 },
  { month: "May", current: 214800, prior: 157200 },
  { month: "Jun", current: 0, prior: 142400 },
  { month: "Jul", current: 0, prior: 98700 },
  { month: "Aug", current: 0, prior: 84200 },
  { month: "Sep", current: 0, prior: 96400 },
  { month: "Oct", current: 0, prior: 124800 },
  { month: "Nov", current: 0, prior: 184200 },
  { month: "Dec", current: 0, prior: 168400 },
];

const revenueByPOD = [
  { pod: "Alpha", revenue: 712840, clients: 128, manager: "Marcus Tate", returns: 51 },
  { pod: "Beta", revenue: 473560, clients: 107, manager: "Diana Ochoa", returns: 36 },
];

const revenueByService = [
  { service: "1040 — Individual", revenue: 482400, count: 142, pct: 0.41 },
  { service: "1120S / 1065 / 1120", revenue: 354800, count: 73, pct: 0.30 },
  { service: "Tax Planning Advisory", revenue: 168400, count: 38, pct: 0.14 },
  { service: "Bookkeeping", revenue: 124200, count: 26, pct: 0.10 },
  { service: "Special Projects", revenue: 56600, count: 12, pct: 0.05 },
];

const staffPerformance = [
  { name: "Marcus Tate", role: "Tax Manager", pod: "Alpha", returns: 28, avgDays: 14.2, revenue: 412800 },
  { name: "Diana Ochoa", role: "Tax Manager", pod: "Beta", returns: 22, avgDays: 17.6, revenue: 326400 },
  { name: "Priya Raman", role: "Senior Tax Staff", pod: "Alpha", returns: 19, avgDays: 16.4, revenue: 184600 },
  { name: "Aaron Holt", role: "Senior Tax Staff", pod: "Beta", returns: 14, avgDays: 22.3, revenue: 142800 },
  { name: "Wendy Cho", role: "Tax Staff", pod: "Alpha", returns: 12, avgDays: 19.4, revenue: 84600 },
  { name: "Liam Powell", role: "Tax Staff", pod: "Beta", returns: 10, avgDays: 20.7, revenue: 73200 },
];

const clientTiers = [
  { tier: "Diamond", count: 28, revenue: 612400, color: "bg-ochre-500" },
  { tier: "Platinum", count: 64, revenue: 384200, color: "bg-ochre-300" },
  { tier: "Gold", count: 92, revenue: 156800, color: "bg-ink-soft" },
  { tier: "Silver", count: 51, revenue: 33000, color: "bg-ink-faint" },
];

export function Reports() {
  const [period, setPeriod] = useState<"ytd" | "month" | "quarter">("ytd");
  const maxMonthly = Math.max(...monthlyRevenue.map((m) => Math.max(m.current, m.prior)));
  const maxPodRev = Math.max(...revenueByPOD.map((p) => p.revenue));

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          eyebrow="Service Reports + Business Intelligence · Phase 7 module"
          title={
            <>
              <span className="block">The numbers</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                behind the firm.
              </span>
            </>
          }
          subtitle="Revenue attribution by Tax Manager, Sales Rep, and POD. Throughput by staff. Client tiers, adoption rate, health scoring. Updated every 4 hours."
          action={
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <Filter size={12} strokeWidth={1.6} />
                {period === "ytd" ? "YTD 2026" : period === "month" ? "This Month" : "This Quarter"}
                <ChevronDown size={11} strokeWidth={1.8} />
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Download size={12} strokeWidth={1.8} />
                Export CSV
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* Top KPIs */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Revenue · YTD</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(FIRM_KPIS.ytdRevenue, { compact: true })}
            </div>
            <div className="text-[11px] text-emerald-deep mt-2 tabular flex items-center gap-1">
              <TrendingUp size={10} strokeWidth={2} />
              +24.6% vs. prior YTD
            </div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Returns Filed</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {FIRM_KPIS.returnsFiledThisYear}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">
              {FIRM_KPIS.returnsInProgress} in progress
            </div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Avg Turnaround</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {FIRM_KPIS.avgTurnaround}<span className="text-[18px] text-ink-muted"> d</span>
            </div>
            <div className="text-[11px] text-emerald-deep mt-2 tabular flex items-center gap-1">
              <TrendingDown size={10} strokeWidth={2} />
              -5.5 d vs. prior year
            </div>
          </div>
          <div className="bg-paper-card p-6 bg-ochre-50/30">
            <div className="eyebrow text-ochre-700">Strategy Adoption</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              26<span className="text-[18px] text-ink-muted">%</span>
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">
              {FIRM_KPIS.strategiesAdopted}/{FIRM_KPIS.activeClients} clients with active strategies
            </div>
          </div>
        </div>

        {/* Monthly revenue chart — editorial column chart */}
        <Card className="mb-8">
          <CardHeader
            eyebrow="Monthly revenue · 2026 vs 2025"
            title="Revenue rhythm"
            description="Filing-season concentration in March/April. Tax planning revenue spreads more evenly across summer and Q4."
          />
          <div className="grid grid-cols-12 gap-3 mt-6 items-end h-[260px]">
            {monthlyRevenue.map((m) => {
              const isCurrent = m.current > 0;
              const currentH = (m.current / maxMonthly) * 100;
              const priorH = (m.prior / maxMonthly) * 100;
              return (
                <div key={m.month} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] text-ink-muted tabular opacity-0 group-hover:opacity-100 transition-opacity">
                    {isCurrent ? fmtUSD(m.current, { compact: true }) : ""}
                  </div>
                  <div className="w-full flex items-end gap-px h-[210px]">
                    <div className="flex-1 bg-ink-faint/30 rounded-t-sm transition-all" style={{ height: `${priorH}%` }} title={`Prior: ${fmtUSD(m.prior)}`} />
                    <div className={cn("flex-1 transition-all rounded-t-sm", isCurrent ? "bg-ink" : "bg-ink/10 border border-dashed border-ink/20")} style={{ height: `${isCurrent ? currentH : 8}%` }} title={`Current: ${fmtUSD(m.current)}`} />
                  </div>
                  <div className={cn("text-[10.5px] tabular", isCurrent ? "text-ink" : "text-ink-faint")}>{m.month}</div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-5 mt-6 pt-5 border-t border-ink/8 text-[11.5px] tabular">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ink-faint/30" />
              <span className="text-ink-muted">2025 actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ink" />
              <span className="text-ink">2026 actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-dashed border-ink/30" />
              <span className="text-ink-muted">2026 projected</span>
            </div>
            <span className="ml-auto text-ink-muted">YoY: {fmtPctRaw(((FIRM_KPIS.ytdRevenue - FIRM_KPIS.priorYTDRevenue) / FIRM_KPIS.priorYTDRevenue) * 100)} growth</span>
          </div>
        </Card>

        {/* POD + Service breakdowns side by side */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader eyebrow="By POD" title="Revenue attribution" />
            <div className="space-y-4 mt-2">
              {revenueByPOD.map((p) => (
                <div key={p.pod}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[14px] font-medium text-ink">POD {p.pod}</span>
                      <span className="text-[11px] text-ink-muted">· {p.manager} · {p.clients} clients · {p.returns} filed</span>
                    </div>
                    <span className="num text-[14px] text-ink">{fmtUSD(p.revenue, { compact: true })}</span>
                  </div>
                  <div className="h-2 bg-paper-deep rounded-sm overflow-hidden">
                    <div className={cn("h-full transition-all", p.pod === "Alpha" ? "bg-ochre-500" : "bg-ink")} style={{ width: `${(p.revenue / maxPodRev) * 100}%` }} />
                  </div>
                </div>
              ))}
              <hr className="hairline" />
              <div className="flex items-baseline justify-between">
                <span className="text-[12.5px] text-ink-muted">Firm total</span>
                <span className="num text-[14px] text-ink font-medium">{fmtUSD(revenueByPOD.reduce((s, p) => s + p.revenue, 0), { compact: true })}</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="By service line" title="Revenue mix" />
            <div className="space-y-2.5 mt-2">
              {revenueByService.map((s, i) => (
                <div key={s.service} className="flex items-baseline justify-between gap-3 group">
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="display tabular text-[14px] text-ink-faint shrink-0" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-ink-soft truncate">{s.service}</span>
                  </div>
                  <div className="flex items-baseline gap-4 shrink-0">
                    <span className="text-[10.5px] text-ink-muted tabular">{s.count} ×</span>
                    <span className="num text-[13px] text-ink">{fmtUSD(s.revenue, { compact: true })}</span>
                    <span className="num text-[11.5px] text-ink-muted w-9 text-right">{fmtPctRaw(s.pct * 100, 0)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Staff performance */}
        <Card padded={false} className="mb-8 overflow-hidden">
          <div className="px-7 pt-6 pb-4">
            <div className="eyebrow mb-1">Staff performance · YTD 2026</div>
            <h3 className="display text-[22px] text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              Throughput by team member
            </h3>
          </div>
          <div className="grid grid-cols-[1.6fr_1fr_0.6fr_0.6fr_0.7fr_0.7fr_0.6fr] text-[10.5px] eyebrow border-b border-ink/8 px-7 py-3 bg-paper-deep/40">
            <div>Team Member</div>
            <div>Role</div>
            <div className="text-right">Returns</div>
            <div className="text-right">Avg Days</div>
            <div className="text-right">Revenue</div>
            <div className="text-right">Per Return</div>
            <div className="text-right">Trend</div>
          </div>
          {staffPerformance.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[1.6fr_1fr_0.6fr_0.6fr_0.7fr_0.7fr_0.6fr] px-7 py-3.5 border-b border-ink/6 last:border-0 hover:bg-paper-deep/30 transition-colors items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-paper-deep flex items-center justify-center text-[10px] font-mono text-ink">
                  {s.name.split(" ").map((p) => p[0]).join("")}
                </div>
                <span className="text-[13px] font-medium text-ink truncate">{s.name}</span>
              </div>
              <div className="text-[12px] text-ink-muted truncate">{s.role} · POD {s.pod}</div>
              <div className="text-right num text-[13px] text-ink">{s.returns}</div>
              <div className={cn("text-right num text-[13px]", s.avgDays < FIRM_KPIS.avgTurnaround ? "text-emerald-deep" : "text-ink-muted")}>
                {s.avgDays.toFixed(1)} d
              </div>
              <div className="text-right num text-[13px] text-ink">{fmtUSD(s.revenue, { compact: true })}</div>
              <div className="text-right num text-[12px] text-ink-muted">{fmtUSD(s.revenue / s.returns, { compact: false })}</div>
              <div className="flex items-center justify-end gap-1.5">
                <TrendingUp size={11} strokeWidth={1.8} className="text-emerald-deep" />
                <span className="text-[11px] tabular text-emerald-deep">+{(8 + Math.random() * 15).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </Card>

        {/* Client tiers */}
        <Card>
          <CardHeader
            eyebrow="Client tiers · Diamond drives 52% of revenue"
            title="Tier composition"
            description="Diamond and Platinum tiers generate 84% of firm revenue at 39% of client count. Concentration risk and elite-tier capacity are tracked here."
          />
          <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mt-2">
            {clientTiers.map((t) => {
              const totalRev = clientTiers.reduce((s, c) => s + c.revenue, 0);
              const pct = (t.revenue / totalRev) * 100;
              return (
                <div key={t.tier} className="bg-paper-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-2.5 h-2.5 rounded-full", t.color)} />
                    <div className="eyebrow">{t.tier}</div>
                  </div>
                  <div className="display tabular text-[28px] text-ink mt-1 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                    {t.count}
                    <span className="text-[12px] text-ink-muted ml-1.5">clients</span>
                  </div>
                  <div className="text-[11.5px] text-ink-muted tabular mt-2">
                    {fmtUSD(t.revenue, { compact: true })} · {fmtPctRaw(pct, 0)} of revenue
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
