import { Link, useLocation } from "wouter";
import { Briefcase, FileText, Calendar, ArrowUpRight, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER, WORK_ITEMS, TUCKER_ENTITIES } from "../lib/mock-data";
import { fmtUSD, fmtDate, cn } from "../lib/format";

const TUCKER_ENGAGEMENTS = [
  {
    id: "e1",
    name: "2026 Tax Compliance & Advisory",
    scope: "1040 + 1120S (Tucker Holdings) + 1065 (Tucker Family RE)",
    status: "active" as const,
    fee: 12400,
    period: "Calendar Year 2026",
    signed: "2026-01-22",
    expires: "2027-01-31",
    aiDrafted: false,
  },
  {
    id: "e2",
    name: "Tax Strategy Implementation Retainer",
    scope: "Augusta Rule + Cost Segregation Coordination + Quarterly Strategy Review",
    status: "active" as const,
    fee: 8400,
    period: "Calendar Year 2026",
    signed: "2026-02-08",
    expires: "2027-02-08",
    aiDrafted: false,
  },
  {
    id: "e3",
    name: "Bayshore Property Bookkeeping",
    scope: "Monthly bookkeeping for Bayshore Property Holdings LLC (real estate)",
    status: "active" as const,
    fee: 4800,
    period: "Calendar Year 2026",
    signed: "2026-01-15",
    expires: "2027-01-15",
    aiDrafted: false,
  },
];

export function ClientEngagements({ clientId }: { clientId: number }) {
  const client = TUCKER;
  const tuckerWork = WORK_ITEMS.filter((w) => w.clientId === 60);
  const totalFee = TUCKER_ENGAGEMENTS.reduce((s, e) => s + e.fee, 0);

  const tabs = [
    { label: "Overview", path: `/clients/${client.id}` },
    { label: "Forecasts", path: `/clients/${client.id}/forecast` },
    { label: "Tax Planning", path: `/clients/${client.id}/tax-planning` },
    { label: "Documents", path: `/clients/${client.id}/documents` },
    { label: "Engagements", path: `/clients/${client.id}/engagements`, active: true },
    { label: "Communications", path: `/clients/${client.id}/communications` },
  ];

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Engagements" },
          ]}
          eyebrow={`${TUCKER_ENGAGEMENTS.length} active engagements · ${tuckerWork.length} work items in flight`}
          title={
            <>
              <span className="block">The book</span>
              <span className="italic">
                of work.
              </span>
            </>
          }
          subtitle="Engagement letters, work items, fees by entity, renewal status."
        />
      </div>

      {/* Tabs */}
      <div className="px-10 border-b border-ink/8 sticky top-0 z-20 bg-paper">
        <div className="flex items-end gap-1 max-w-[1280px]">
          {tabs.map((tab) => (
            <Link key={tab.path} to={tab.path} className={cn("px-4 py-3 text-[13px] tracking-tight transition-colors relative", tab.active ? "text-ink" : "text-ink-muted hover:text-ink")}>
              {tab.label}
              {tab.active && <span className="absolute left-0 right-0 bottom-0 h-px bg-ochre-500" />}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-10 py-10 max-w-[1280px]">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Active engagements</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none">
              {TUCKER_ENGAGEMENTS.length}
            </div>
            <div className="text-[11.5px] text-ink-muted tabular mt-2">across 3 entities</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Annual contracted fees</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none">
              {fmtUSD(totalFee, { compact: true })}
            </div>
            <div className="text-[11.5px] text-emerald-deep tabular mt-2">+12.7% vs. 2025</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Renewal window</div>
            <div className="display text-[20px] text-ink mt-1.5 leading-tight">
              Jan – Feb 2027
            </div>
            <div className="text-[11.5px] text-ink-muted tabular mt-2">All 3 letters expire same window</div>
          </div>
        </div>

        {/* Engagements */}
        <div className="mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <div className="eyebrow">Engagement letters</div>
            <button className="flex items-center gap-1.5 text-[12px] text-ochre-700 hover:text-ochre-800 transition-colors">
              <Sparkles size={11} strokeWidth={1.8} />
              Draft renewal · Engagement Letter Agent
            </button>
          </div>
          <div className="space-y-3">
            {TUCKER_ENGAGEMENTS.map((e) => (
              <Card key={e.id} className="group hover:shadow-paper transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-sm bg-paper-deep flex items-center justify-center shrink-0">
                    <Briefcase size={17} strokeWidth={1.5} className="text-ink-soft" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-[15px] font-medium text-ink">{e.name}</span>
                      <Pill variant="emerald" dot>Active</Pill>
                    </div>
                    <p className="text-[12.5px] text-ink-muted mb-3">{e.scope}</p>
                    <div className="flex items-baseline gap-6 text-[11.5px] tabular">
                      <span className="text-ink-muted">Period · <span className="text-ink">{e.period}</span></span>
                      <span className="text-ink-muted">Signed · <span className="text-ink">{fmtDate(e.signed, "short")}</span></span>
                      <span className="text-ink-muted">Expires · <span className="text-ink">{fmtDate(e.expires, "short")}</span></span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="eyebrow">Annual fee</div>
                    <div className="display tabular text-[24px] text-ink mt-0.5 leading-none">
                      {fmtUSD(e.fee, { compact: true })}
                    </div>
                  </div>
                  <button className="text-ink-faint hover:text-ink transition-colors mt-1">
                    <FileText size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Work items */}
        <Card padded={false} className="overflow-hidden">
          <div className="px-7 pt-6 pb-4 border-b border-ink/8">
            <div className="eyebrow">Active work items</div>
            <h3 className="display text-[20px] text-ink mt-1">
              What's in flight for Tucker
            </h3>
          </div>
          {tuckerWork.map((w) => (
            <div key={w.id} className="grid grid-cols-[2fr_1fr_1fr_0.7fr_0.7fr] px-7 py-3.5 border-b border-ink/6 last:border-0 hover:bg-paper-deep/30 transition-colors items-center">
              <div>
                <div className="text-[13.5px] font-medium text-ink">{w.title}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">{w.category}</div>
              </div>
              <div><Pill variant={w.status === "Internal Review" ? "ochre" : w.status === "Not Started" ? "neutral" : "sky"} dot>{w.status}</Pill></div>
              <div className="text-[12.5px] text-ink-soft">{w.owner}</div>
              <div className="text-[12px] text-ink-muted tabular flex items-center gap-1.5">
                <Calendar size={10} strokeWidth={1.8} />
                {fmtDate(w.due, "month-day")}
              </div>
              <div className="text-right num text-[13px] text-ink">{fmtUSD(w.fee, { compact: true })}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
