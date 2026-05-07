import { Link } from "wouter";
import { useState } from "react";
import {
  ShieldAlert,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Calendar,
  Search,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { IRS_NOTICES } from "../lib/mock-data";
import { fmtUSD, fmtDate, fmtRelativeTime, cn } from "../lib/format";
import type { IRSNotice } from "../lib/types";

const statusConfig: Record<IRSNotice["status"], { variant: "neutral" | "ochre" | "emerald" | "crimson" | "sky"; tone: string }> = {
  New: { variant: "crimson", tone: "text-crimson-deep" },
  "AI Drafted": { variant: "ochre", tone: "text-ochre-700" },
  "Awaiting Review": { variant: "sky", tone: "text-sky-deep" },
  Sent: { variant: "neutral", tone: "text-ink-soft" },
  Resolved: { variant: "emerald", tone: "text-emerald-deep" },
};

const noticeColors: Record<IRSNotice["type"], string> = {
  CP2000: "bg-crimson-soft text-crimson-deep",
  CP14: "bg-ochre-100 text-ochre-700",
  CP501: "bg-ochre-50 text-ochre-700",
  CP504: "bg-crimson-soft text-crimson-deep",
  CP90: "bg-crimson-soft text-crimson-deep",
  CP12: "bg-emerald-soft text-emerald-deep",
  CP49: "bg-emerald-soft text-emerald-deep",
  "Letter 525": "bg-crimson-soft text-crimson-deep",
  "Letter 1058": "bg-crimson-soft text-crimson-deep",
};

export function IRSNotices() {
  const [filter, setFilter] = useState<"all" | "open" | "drafted" | "resolved">("all");

  const today = new Date("2026-05-07");
  const filtered = IRS_NOTICES.filter((n) => {
    if (filter === "all") return true;
    if (filter === "open") return n.status !== "Resolved" && n.status !== "Sent";
    if (filter === "drafted") return n.status === "AI Drafted";
    if (filter === "resolved") return n.status === "Resolved" || n.status === "Sent";
    return true;
  });

  const openCount = IRS_NOTICES.filter((n) => n.status !== "Resolved" && n.status !== "Sent").length;
  const draftReady = IRS_NOTICES.filter((n) => n.aiDraftReady && n.status === "AI Drafted").length;
  const totalExposure = IRS_NOTICES.filter((n) => n.status !== "Resolved" && n.proposedAssessment > 0)
    .reduce((s, n) => s + n.proposedAssessment, 0);

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          eyebrow="IRS e-Services Feed · Phase 3 · Proposed"
          title="Every notice, matched and drafted."
          subtitle="Real-time pull from IRS e-Services. Notices auto-matched to client by EIN/SSN. AI drafts first response with cited Treasury Reg and case law. Staff reviews and sends — full audit trail."
          action={
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
              <Sparkles size={12} strokeWidth={1.8} />
              Re-scan IRS feed
            </button>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Open notices</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {openCount}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">requiring response</div>
          </div>
          <div className="bg-paper-card p-6 bg-ochre-50/40">
            <div className="eyebrow text-ochre-700">AI drafts ready</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {draftReady}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">awaiting staff review</div>
          </div>
          <div className="bg-paper-card p-6 bg-crimson-soft/30">
            <div className="eyebrow text-crimson-deep">Aggregate exposure</div>
            <div className="display tabular text-[36px] text-crimson-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(totalExposure, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across open notices</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Avg response time</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              4.2<span className="text-[18px] text-ink-muted"> d</span>
            </div>
            <div className="text-[11px] text-emerald-deep mt-2 tabular">↓ 12.4 d vs. industry avg</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 mb-6 pb-5 border-b border-ink/8">
          <span className="eyebrow mr-3">View</span>
          {[
            { id: "all", label: "All", count: IRS_NOTICES.length },
            { id: "open", label: "Open", count: openCount },
            { id: "drafted", label: "AI drafted", count: draftReady },
            { id: "resolved", label: "Resolved / sent", count: IRS_NOTICES.filter(n => n.status === "Resolved" || n.status === "Sent").length },
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

        {/* Notice list */}
        <div className="space-y-2">
          {filtered.map((notice) => {
            const cfg = statusConfig[notice.status];
            const dueDate = new Date(notice.responseDue === "—" ? "2099-12-31" : notice.responseDue);
            const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isUrgent = daysUntilDue <= 14 && daysUntilDue >= 0 && notice.status !== "Resolved" && notice.status !== "Sent";
            const isOverdue = daysUntilDue < 0 && notice.status !== "Resolved" && notice.status !== "Sent";

            return (
              <Link
                key={notice.id}
                to={`/irs-notices/${notice.id}`}
                className="card flex items-start gap-5 p-5 group hover:shadow-paper transition-all"
              >
                {/* Notice type tile */}
                <div className={cn("w-14 h-14 rounded-sm flex flex-col items-center justify-center shrink-0", noticeColors[notice.type])}>
                  <ShieldAlert size={14} strokeWidth={1.8} />
                  <span className="text-[10.5px] font-mono font-medium tracking-tight mt-0.5">{notice.type}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap mb-1">
                    <span className="text-[14.5px] font-medium text-ink">{notice.client}</span>
                    <span className="text-[11px] eyebrow">TY {notice.taxYear}</span>
                    <Pill variant={cfg.variant} dot>{notice.status}</Pill>
                    {notice.aiDraftReady && notice.status === "AI Drafted" && (
                      <Pill variant="ochre">
                        <Sparkles size={9} strokeWidth={1.8} />
                        Draft ready
                      </Pill>
                    )}
                  </div>
                  <p className="text-[12.5px] text-ink-muted leading-relaxed line-clamp-2">{notice.summary}</p>
                  <div className="flex items-center gap-5 mt-3 text-[11px] text-ink-muted tabular">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} strokeWidth={1.8} />
                      Received {fmtRelativeTime(notice.receivedAt, today)}
                    </span>
                    <span className="font-mono">{notice.irsTrackingNumber}</span>
                    <span>via {notice.source}</span>
                    <span>Owner · {notice.owner}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {notice.proposedAssessment !== 0 && (
                    <>
                      <div className="eyebrow">{notice.proposedAssessment > 0 ? "Proposed assessment" : "Refund"}</div>
                      <div className={cn("display tabular text-[24px] leading-none mt-1", notice.proposedAssessment > 0 ? "text-crimson-deep" : "text-emerald-deep")} style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                        {fmtUSD(Math.abs(notice.proposedAssessment))}
                      </div>
                    </>
                  )}
                  {notice.responseDue !== "—" && (
                    <div className={cn(
                      "text-[11px] mt-2 tabular",
                      isOverdue ? "text-crimson-deep font-medium" : isUrgent ? "text-ochre-700 font-medium" : "text-ink-muted"
                    )}>
                      {isOverdue ? `${Math.abs(daysUntilDue)}d overdue` : `Due in ${daysUntilDue}d`}
                    </div>
                  )}
                </div>
                <ArrowUpRight size={14} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors mt-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
