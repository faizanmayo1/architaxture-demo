import { Link } from "wouter";
import { useState } from "react";
import {
  ShieldAlert,
  Sparkles,
  Send,
  Edit3,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowLeft,
  FileText,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { IRS_NOTICES } from "../lib/mock-data";
import { fmtUSD, fmtDate, fmtTime, fmtRelativeTime, cn, initialsOf } from "../lib/format";

export function IRSNoticeDetail({ noticeId }: { noticeId: string }) {
  const notice = IRS_NOTICES.find((n) => n.id === noticeId) ?? IRS_NOTICES[0];
  const today = new Date("2026-05-07");
  const dueDate = new Date(notice.responseDue);
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          breadcrumb={[
            { label: "IRS Notices", to: "/irs-notices" },
            { label: `${notice.type} · ${notice.client}` },
          ]}
          eyebrow={`Notice ${notice.irsTrackingNumber} · TY ${notice.taxYear}`}
          title={`${notice.type} · ${notice.client}`}
          subtitle={notice.summary}
          action={
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <Edit3 size={12} strokeWidth={1.8} />
                Edit draft
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <RefreshCw size={12} strokeWidth={1.8} />
                Re-draft
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Send size={12} strokeWidth={1.8} />
                Approve & Send
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* Status strip */}
        <div className="grid grid-cols-5 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-8">
          <div className="bg-paper-card p-5 col-span-2 bg-crimson-soft/30">
            <div className="eyebrow text-crimson-deep">Proposed assessment</div>
            <div className="display tabular text-[44px] text-crimson-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(Math.abs(notice.proposedAssessment))}
            </div>
            <div className="text-[11.5px] text-ink-muted tabular mt-2">
              tax + interest + accuracy penalty
            </div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Response due</div>
            <div className="display tabular text-[28px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtDate(notice.responseDue, "month-day")}
            </div>
            <div className={cn(
              "text-[11px] mt-2 tabular",
              daysUntilDue <= 14 ? "text-ochre-700 font-medium" : "text-ink-muted"
            )}>
              {daysUntilDue} days remaining
            </div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">AI confidence</div>
            <div className="display tabular text-[28px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {(notice.aiConfidence * 100).toFixed(0)}<span className="text-[14px] text-ink-muted">%</span>
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">recommended response quality</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Status</div>
            <div className="text-[16px] font-medium text-ink mt-2 leading-tight">{notice.status}</div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">Owner · {notice.owner}</div>
          </div>
        </div>

        {/* Two columns: notice metadata + AI draft */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left: notice metadata + timeline */}
          <div className="col-span-4 space-y-6">
            <Card>
              <CardHeader title="Notice details" eyebrow="From IRS e-Services" />
              <div className="space-y-3 text-[13px]">
                {[
                  { label: "Notice type", value: notice.type },
                  { label: "Tax year", value: notice.taxYear.toString() },
                  { label: "IRS tracking", value: notice.irsTrackingNumber },
                  { label: "Source", value: notice.source },
                  { label: "Received", value: `${fmtDate(notice.receivedAt, "long")} at ${fmtTime(notice.receivedAt)}` },
                  { label: "Response due", value: fmtDate(notice.responseDue, "long") },
                  { label: "Client", value: notice.client },
                  { label: "POD", value: notice.pod },
                  { label: "Owner", value: notice.owner },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-3 border-b border-ink/6 pb-2 last:border-0">
                    <span className="text-[11px] eyebrow shrink-0">{row.label}</span>
                    <span className="text-ink text-right text-[12.5px] font-mono truncate">{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="Response timeline" eyebrow="Audit trail" />
              <ol className="space-y-4 text-[12.5px]">
                {[
                  { time: notice.receivedAt, actor: "IRS e-Services", action: "Notice received and auto-matched to client by EIN", complete: true },
                  { time: notice.receivedAt, actor: "AI File Intelligence", action: "Notice classified and stored in client record", complete: true },
                  { time: "2026-05-07T07:14:00Z", actor: "Notice Response Agent", action: "AI drafted preliminary response with cited authority", complete: true },
                  { time: null, actor: "Diana Ochoa", action: "Review draft response and approve or revise", complete: false },
                  { time: null, actor: "Tax Manager", action: "Send final response via IRS e-Services", complete: false },
                  { time: null, actor: "IRS e-Services", action: "Acknowledge receipt of response", complete: false },
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                      step.complete ? "bg-emerald-deep" : "bg-paper-deep border border-ink/15"
                    )}>
                      {step.complete && <CheckCircle2 size={11} strokeWidth={2.4} className="text-paper" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={cn(step.complete ? "text-ink" : "text-ink-muted")}>
                        <span className="font-medium">{step.actor}</span>
                        <span className="text-ink-muted"> — {step.action}</span>
                      </div>
                      {step.time && (
                        <div className="text-[10.5px] text-ink-faint tabular mt-0.5">
                          {fmtRelativeTime(step.time, new Date("2026-05-07T08:00:00Z"))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card>
              <CardHeader title="Cited authority" eyebrow="Treasury Reg + case law" />
              <ul className="space-y-2 text-[12.5px] text-ink-soft">
                <li className="flex gap-2 items-start">
                  <FileText size={11} strokeWidth={1.8} className="text-ink-muted mt-0.5 shrink-0" />
                  <span><span className="font-mono">§6662(a)</span> — accuracy-related penalty</span>
                </li>
                <li className="flex gap-2 items-start">
                  <FileText size={11} strokeWidth={1.8} className="text-ink-muted mt-0.5 shrink-0" />
                  <span><span className="font-mono">§6664(c)</span> — reasonable cause defense</span>
                </li>
                <li className="flex gap-2 items-start">
                  <FileText size={11} strokeWidth={1.8} className="text-ink-muted mt-0.5 shrink-0" />
                  <span><span className="font-mono">Treas. Reg. 1.6664-4</span> — reasonable cause and good faith</span>
                </li>
                <li className="flex gap-2 items-start">
                  <FileText size={11} strokeWidth={1.8} className="text-ink-muted mt-0.5 shrink-0" />
                  <span className="italic">Marrero v. Comm'r, T.C. Memo 2020-181</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Right: AI-drafted response — looks like a real letter */}
          <div className="col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles size={14} strokeWidth={1.8} className="text-ochre-500" />
                <span className="eyebrow">AI-Drafted Response Letter</span>
                <Pill variant="ochre">Draft v2 · 2026-05-07 7:14 AM</Pill>
              </div>
              <button className="text-[12px] text-ink-muted hover:text-ink flex items-center gap-1.5 transition-colors">
                <Download size={11} strokeWidth={1.8} />
                Download PDF
              </button>
            </div>

            <div className="bg-paper-card border border-ink/10 shadow-paper p-10 font-sans">
              {/* Letterhead */}
              <div className="flex items-baseline justify-between mb-8 pb-5 border-b-2 border-ink">
                <div>
                  <div className="display text-[22px] text-ink leading-tight" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
                    Aragon Accounting Corporation
                  </div>
                  <div className="text-[11px] text-ink-muted tabular mt-1">2410 Ringling Boulevard, Suite 200 · Sarasota, FL 34237</div>
                </div>
                <div className="text-right text-[11px] text-ink-muted tabular">
                  <div>{fmtDate(today, "long")}</div>
                  <div className="mt-0.5">Re: Notice {notice.irsTrackingNumber}</div>
                </div>
              </div>

              {/* Recipient */}
              <div className="text-[13px] text-ink-soft mb-8 leading-relaxed">
                <div className="font-medium text-ink">Internal Revenue Service</div>
                <div>Automated Underreporter Operations</div>
                <div>Andover, MA 01810-3206</div>
              </div>

              {/* Salutation */}
              <div className="text-[13px] text-ink-soft mb-5">Dear Sir or Madam:</div>

              {/* Body */}
              <div className="space-y-4 text-[13px] text-ink-soft leading-relaxed">
                <p>
                  We write on behalf of <span className="font-medium text-ink">Bryan Holcomb</span> (SSN ending
                  <span className="font-mono"> -4218</span>) in response to <span className="font-mono">Notice {notice.irsTrackingNumber}</span> dated <span>{fmtDate(notice.receivedAt, "long")}</span>,
                  proposing additional tax of <span className="num">{fmtUSD(notice.proposedAssessment)}</span> for tax year {notice.taxYear}.
                </p>

                <div className="bg-ochre-50/40 px-5 py-4 rounded-sm border-l-2 border-ochre-500 my-4">
                  <div className="eyebrow text-ochre-700 mb-1.5">Disposition Requested</div>
                  <p className="text-[12.5px] text-ink">
                    We <span className="font-medium">disagree</span> with the proposed assessment. The income reflected
                    in the Form 1099-MISC was reported on Schedule E, Line 4, of the 2023 Form 1040 as part of
                    aggregated rental real estate income, not omitted from the return.
                  </p>
                </div>

                <p>
                  <span className="font-medium text-ink">Item 1.</span> The $18,200 reported by the
                  payor on Form 1099-MISC, Box 1, represents <span className="italic">contract services
                  income</span> from Holcomb Imaging Group LLC, properly characterized as Schedule C
                  business income on the 2023 return, Line 1, gross receipts. Reconciliation worksheet
                  attached as Exhibit A demonstrates inclusion.
                </p>

                <p>
                  <span className="font-medium text-ink">Item 2.</span> Pursuant to Treas. Reg. §1.6664-4 and the
                  reasonable cause defense established in <span className="italic">Marrero v. Commissioner</span>, T.C.
                  Memo 2020-181, the taxpayer maintained contemporaneous books and records reflecting all
                  reportable income, retained an enrolled tax professional, and exercised ordinary business
                  care.
                </p>

                <p>
                  <span className="font-medium text-ink">Item 3.</span> If, after review of the attached
                  reconciliation, the Service determines that an adjustment is appropriate, we respectfully
                  request waiver of the §6662(a) accuracy-related penalty under §6664(c)(1) on the grounds of
                  reasonable cause and good-faith reliance on a competent tax professional.
                </p>

                <p>
                  <span className="font-medium text-ink">Enclosures:</span> Form 2848 Power of Attorney; Schedule E
                  reconciliation worksheet (Exhibit A); copy of 2023 Form 1040 with marked references; signed
                  statement from taxpayer.
                </p>
              </div>

              {/* Closing */}
              <div className="text-[13px] text-ink-soft mt-8 leading-relaxed">
                <p>
                  We appreciate the Service's attention to this matter. Please direct all further correspondence
                  to the undersigned at the address above. We may also be reached at (941) 555-0193.
                </p>
                <div className="mt-8">
                  <p className="mb-12">Respectfully submitted,</p>
                  <div className="font-mono italic text-[14px] text-ink">Diana Ochoa, CPA</div>
                  <div className="text-[11px] text-ink-muted tabular mt-1">Tax Manager · POD Beta · Aragon Accounting Corporation</div>
                  <div className="text-[11px] text-ink-muted tabular">PTIN P00184038 · diana.ochoa@aragon</div>
                </div>
              </div>

              {/* AI footer marker */}
              <div className="mt-8 pt-5 border-t border-ink/8 flex items-center justify-between text-[10.5px] text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={9} strokeWidth={1.8} className="text-ochre-500" />
                  AI-drafted from notice content + client context · Trained on 2,400+ historical CP2000 responses
                </span>
                <span className="font-mono">{notice.aiConfidence * 100}% confidence</span>
              </div>
            </div>

            {/* Action footer */}
            <div className="mt-5 flex items-center justify-between bg-paper-deep/30 rounded-sm border border-ink/8 px-5 py-3.5">
              <div className="flex items-center gap-3 text-[12px] text-ink-muted">
                <Sparkles size={11} strokeWidth={1.8} className="text-ochre-500" />
                Drafted by Notice Response Agent · {fmtRelativeTime("2026-05-07T07:14:00Z", new Date("2026-05-07T08:00:00Z"))}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[12px] font-medium text-ink-muted hover:text-ink transition-colors">
                  Mark for revision
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium border border-ink/15 hover:bg-paper-card transition-colors rounded-sm">
                  <Edit3 size={11} strokeWidth={1.8} />
                  Edit
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-emerald-deep text-paper hover:bg-emerald-deep/90 transition-colors rounded-sm">
                  <CheckCircle2 size={11} strokeWidth={2.2} />
                  Approve & Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
