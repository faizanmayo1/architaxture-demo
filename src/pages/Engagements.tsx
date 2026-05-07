import { Link } from "wouter";
import { useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Calendar,
  ArrowUpRight,
  RefreshCw,
  Briefcase,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { WORK_ITEMS, WORK_ITEM_CATEGORIES, FIRM_KPIS } from "../lib/mock-data";
import { fmtUSD, fmtDate, cn } from "../lib/format";
import type { WorkItem } from "../lib/types";

const statusConfig: Record<WorkItem["status"], { variant: "neutral" | "ochre" | "emerald" | "crimson" | "sky"; tone: string }> = {
  "Not Started": { variant: "neutral", tone: "text-ink-muted" },
  "In Progress": { variant: "sky", tone: "text-sky-deep" },
  "Awaiting Client": { variant: "ochre", tone: "text-ochre-700" },
  "Internal Review": { variant: "ochre", tone: "text-ochre-700" },
  Complete: { variant: "emerald", tone: "text-emerald-deep" },
};

export function Engagements() {
  const [view, setView] = useState<"all" | "renewals" | "active">("all");

  const items = WORK_ITEMS.filter((w) => {
    if (view === "renewals") return w.isRenewal;
    if (view === "active") return w.status !== "Complete";
    return true;
  });

  const renewalsThisMonth = WORK_ITEMS.filter((w) => w.isRenewal && new Date(w.due).getMonth() === 4).length;
  const totalFees = items.reduce((s, w) => s + w.fee, 0);
  const activeCount = WORK_ITEMS.filter((w) => w.status !== "Complete" && w.status !== "Not Started").length;

  // Group by category
  const grouped = items.reduce<Record<string, WorkItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          eyebrow="Engagements · Work items by category"
          title={
            <>
              <span className="block">All work,</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                in one column.
              </span>
            </>
          }
          subtitle={`${WORK_ITEM_CATEGORIES.length} categories. Dual client and entity routing. Renewal warnings on engagements expiring within 60 days. Engagement letter status, work item ownership, deadlines.`}
          action={
            <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
              <Briefcase size={12} strokeWidth={1.8} />
              New work item
            </button>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Active engagements</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {activeCount}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across {Object.keys(grouped).length} categories</div>
          </div>
          <div className="bg-paper-card p-6 bg-ochre-50/30">
            <div className="eyebrow text-ochre-700">Renewals · 60 days</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {renewalsThisMonth + 1}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">2026 letter not yet signed</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Fees in this view</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(totalFees, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">contracted scope</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Auto-drafted letters</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              <Sparkles size={22} strokeWidth={1.8} className="inline-block text-ochre-500 -translate-y-1" /> 14
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">via Engagement Letter Agent</div>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 mb-6 pb-5 border-b border-ink/8">
          <span className="eyebrow mr-3">View</span>
          {[
            { id: "all", label: "All", count: WORK_ITEMS.length },
            { id: "active", label: "In flight", count: WORK_ITEMS.filter(w => w.status !== "Complete" && w.status !== "Not Started").length },
            { id: "renewals", label: "Renewals", count: WORK_ITEMS.filter(w => w.isRenewal).length },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setView(f.id as any)}
              className={cn(
                "px-3.5 py-1.5 text-[12px] rounded-sm transition-all flex items-center gap-2",
                view === f.id ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"
              )}
            >
              <span className="font-medium">{f.label}</span>
              <span className={cn("text-[10px] tabular", view === f.id ? "text-paper/60" : "text-ink-faint")}>{f.count}</span>
            </button>
          ))}
        </div>

        {/* Grouped by category */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category}>
              <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-ink/8">
                <div className="flex items-baseline gap-3">
                  <ClipboardList size={14} strokeWidth={1.6} className="text-ink-muted" />
                  <span className="display text-[18px] text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40', fontWeight: 380 }}>
                    {category}
                  </span>
                  <span className="text-[11px] text-ink-muted tabular">{categoryItems.length} {categoryItems.length === 1 ? "item" : "items"}</span>
                </div>
                <span className="text-[12px] text-ink-muted tabular">
                  {fmtUSD(categoryItems.reduce((s, w) => s + w.fee, 0), { compact: true })} fees
                </span>
              </div>
              <div className="space-y-2">
                {categoryItems.map((item) => {
                  const cfg = statusConfig[item.status];
                  const dueDate = new Date(item.due);
                  const today = new Date("2026-05-07");
                  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  const isOverdue = daysUntilDue < 0 && item.status !== "Complete";
                  const isUrgent = daysUntilDue <= 7 && daysUntilDue >= 0 && item.status !== "Complete";

                  return (
                    <Link
                      key={item.id}
                      to={`/clients/${item.clientId}`}
                      className="card flex items-center gap-5 px-5 py-3.5 group hover:shadow-paper transition-all"
                    >
                      <div className="flex-1 min-w-0 grid grid-cols-[2fr_1.2fr_1fr_0.7fr_0.7fr_28px] gap-4 items-center">
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[13.5px] font-medium text-ink truncate">{item.title}</span>
                            {item.isRenewal && <Pill variant="ochre">Renewal</Pill>}
                          </div>
                          <div className="text-[11px] text-ink-muted mt-0.5">{item.client} · POD {item.pod}</div>
                        </div>
                        <div>
                          <Pill variant={cfg.variant} dot>{item.status}</Pill>
                        </div>
                        <div className="text-[12px] text-ink-soft truncate flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-paper-deep flex items-center justify-center text-[9px] font-mono text-ink-soft">
                            {item.owner.split(" ").map(p => p[0]).join("")}
                          </div>
                          {item.owner}
                        </div>
                        <div className={cn(
                          "text-[12px] tabular flex items-center gap-1.5",
                          isOverdue ? "text-crimson-deep" : isUrgent ? "text-ochre-700" : "text-ink-soft"
                        )}>
                          <Calendar size={10} strokeWidth={1.8} />
                          <div>
                            <div>{fmtDate(item.due, "month-day")}</div>
                            {(isOverdue || isUrgent) && (
                              <div className="text-[10px]">{isOverdue ? `${Math.abs(daysUntilDue)}d overdue` : `${daysUntilDue}d left`}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right num text-[13px] text-ink">{fmtUSD(item.fee, { compact: true })}</div>
                        <ArrowUpRight size={13} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
