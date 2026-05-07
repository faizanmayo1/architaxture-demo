import { useState } from "react";
import { Link } from "wouter";
import {
  CheckCircle2,
  Upload,
  FileText,
  Sparkles,
  ArrowUpRight,
  Calendar,
  MessageSquare,
  HelpCircle,
  LogOut,
  ShieldCheck,
  Mail,
  Bell,
  ChevronRight,
  Lock,
} from "lucide-react";
import { TUCKER, TUCKER_ENTITIES } from "../lib/mock-data";
import { fmtDate, fmtRelativeTime, cn, initialsOf } from "../lib/format";

const REQUEST_CHECKLIST = [
  { name: "2024 W-2 (Marian Tucker)", category: "Income", status: "received" as const, receivedAt: "2026-04-12T10:22:00Z" },
  { name: "Schwab 1099 — Brokerage", category: "Income", status: "received" as const, receivedAt: "2026-04-14T16:18:00Z" },
  { name: "Tucker Holdings 1120S K-1", category: "Pass-through", status: "received" as const, receivedAt: "2026-04-22T09:14:00Z" },
  { name: "Tucker Family RE Partnership K-1", category: "Pass-through", status: "received" as const, receivedAt: "2026-05-07T02:14:00Z" },
  { name: "Bayshore rental statements", category: "Real Estate", status: "received" as const, receivedAt: "2026-04-28T14:00:00Z" },
  { name: "SEP IRA contribution receipt", category: "Retirement", status: "received" as const, receivedAt: "2026-04-15T11:30:00Z" },
  { name: "Charitable giving statements", category: "Deductions", status: "received" as const, receivedAt: "2026-04-26T09:42:00Z" },
  { name: "Mortgage Form 1098", category: "Deductions", status: "received" as const, receivedAt: "2026-04-18T13:08:00Z" },
  { name: "Property tax receipts", category: "Deductions", status: "received" as const, receivedAt: "2026-04-18T13:09:00Z" },
  { name: "Property insurance binder · Bayshore", category: "Real Estate", status: "received" as const, receivedAt: "2026-04-30T10:00:00Z" },
  { name: "Solo HSA contribution statements", category: "Retirement", status: "received" as const, receivedAt: "2026-04-21T15:14:00Z" },
  { name: "2023 estimated tax confirmations", category: "Payments", status: "received" as const, receivedAt: "2026-04-08T08:00:00Z" },
  { name: "Marian's W-2 corrected (W-2c)", category: "Income", status: "received" as const, receivedAt: "2026-04-19T11:11:00Z" },
  { name: "2026 Q1 estimated tax wire confirmation", category: "Payments", status: "outstanding" as const },
];

const RETURN_MILESTONES = [
  { label: "Documents received", date: "2026-05-07", complete: true },
  { label: "Return drafted", date: "2026-05-09", complete: true, current: true },
  { label: "Internal review", date: "2026-05-12", complete: false },
  { label: "Your review & sign-off", date: "2026-05-15", complete: false },
  { label: "E-filed", date: "2026-05-17", complete: false },
];

export function ClientPortal() {
  const [section, setSection] = useState<"home" | "documents" | "messages" | "deliverables">("home");
  const client = TUCKER;
  const today = new Date("2026-05-07");
  const received = REQUEST_CHECKLIST.filter((r) => r.status === "received").length;
  const total = REQUEST_CHECKLIST.length;
  const outstanding = REQUEST_CHECKLIST.filter((r) => r.status === "outstanding");

  return (
    <div className="min-h-screen bg-paper-deep">
      {/* Portal-specific top bar — different from firm chrome */}
      <header className="sticky top-0 z-30 bg-paper border-b border-ink/8">
        <div className="max-w-[1100px] mx-auto px-8 h-[64px] flex items-center justify-between">
          <Link to="/portal" className="flex items-center gap-3">
            <div className="display text-[20px] leading-none text-ink">
              Archi<span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 300 }}>TAX</span>ture
            </div>
            <div className="h-4 w-px bg-ink/15" />
            <span className="text-[11px] eyebrow text-ink-muted">Client Portal</span>
          </Link>
          <div className="flex items-center gap-5">
            <button className="text-[12.5px] text-ink-muted hover:text-ink flex items-center gap-1.5 transition-colors">
              <HelpCircle size={13} strokeWidth={1.6} />
              Help
            </button>
            <button className="p-1.5 text-ink-muted hover:text-ink transition-colors relative">
              <Bell size={15} strokeWidth={1.6} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ochre-500" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-ink/10">
              <div className="w-7 h-7 rounded-full bg-ink text-paper flex items-center justify-center text-[10px] font-mono">
                {initialsOf(`${client.firstName} ${client.lastName}`)}
              </div>
              <span className="text-[12.5px] text-ink">{client.firstName}</span>
              <Link to="/" className="text-ink-faint hover:text-ink transition-colors">
                <LogOut size={13} strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-8 py-12 animate-fade-up">
        {/* Hero greeting */}
        <div className="mb-12">
          <div className="eyebrow mb-3 flex items-center gap-2">
            <ShieldCheck size={11} strokeWidth={1.8} className="text-emerald-deep" />
            <span>Signed in via magic link · {fmtDate(today, "long")}</span>
          </div>
          <h1 className="display text-[56px] leading-[0.96] text-ink text-balance mb-3" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 360 }}>
            <span className="block">Welcome back,</span>
            <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
              Jeffrey.
            </span>
          </h1>
          <p className="text-[15px] text-ink-muted max-w-xl leading-relaxed">
            Your 2024 return is currently in review. Marcus and his team have everything they need
            except one final item — the wire confirmation for your Q1 2026 estimated tax payment.
          </p>
        </div>

        {/* Return status card — the most important thing */}
        <section className="mb-10 card p-8">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="eyebrow mb-1.5">Your 2024 return</div>
              <h2 className="display text-[28px] text-ink leading-tight" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                In review · expected to file <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 360 }}>May 17</span>
              </h2>
            </div>
            <div className="text-right">
              <div className="eyebrow text-[10px]">Projected refund</div>
              <div className="display tabular text-[36px] text-emerald-deep mt-0.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                $37,700
              </div>
            </div>
          </div>

          {/* Milestone tracker */}
          <div className="relative mt-8">
            <div className="absolute top-3 left-3 right-3 h-px bg-ink/10" />
            <div className="grid grid-cols-5 gap-4 relative">
              {RETURN_MILESTONES.map((m, i) => {
                const isLast = i === RETURN_MILESTONES.length - 1;
                return (
                  <div key={m.label} className="text-center">
                    <div className={cn(
                      "w-6 h-6 rounded-full mx-auto flex items-center justify-center relative z-10 transition-all",
                      m.complete
                        ? "bg-emerald-deep text-paper"
                        : m.current
                        ? "bg-ochre-500 text-paper ring-4 ring-ochre-100"
                        : "bg-paper-deep border-2 border-ink/15"
                    )}>
                      {m.complete && <CheckCircle2 size={13} strokeWidth={2.4} />}
                      {m.current && !m.complete && <span className="text-[10px] font-mono font-bold">{i + 1}</span>}
                      {!m.complete && !m.current && <span className="text-[10px] font-mono text-ink-faint">{i + 1}</span>}
                    </div>
                    <div className={cn(
                      "text-[11.5px] mt-2.5 leading-snug font-medium",
                      m.complete ? "text-ink" : m.current ? "text-ochre-700" : "text-ink-muted"
                    )}>
                      {m.label}
                    </div>
                    <div className={cn("text-[10.5px] tabular mt-1", m.complete || m.current ? "text-ink-soft" : "text-ink-faint")}>
                      {fmtDate(m.date, "month-day")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Two-column body */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left col: Document checklist (centerpiece) */}
          <div className="col-span-2">
            <div className="card overflow-hidden">
              <div className="px-7 py-5 border-b border-ink/8 flex items-baseline justify-between">
                <div>
                  <div className="eyebrow mb-1">Document Checklist</div>
                  <h3 className="display text-[20px] text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                    {received} of {total} items received
                  </h3>
                </div>
                <div className="text-right">
                  <div className="display tabular text-[24px] text-emerald-deep leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                    {Math.round((received / total) * 100)}<span className="text-[14px] text-ink-muted">%</span>
                  </div>
                  <div className="text-[10.5px] eyebrow mt-1">complete</div>
                </div>
              </div>

              {/* Outstanding items — surfaced first */}
              {outstanding.length > 0 && (
                <div className="bg-ochre-50/40 border-b border-ink/8 px-7 py-5">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="eyebrow text-ochre-700">Action needed · {outstanding.length} item</span>
                  </div>
                  {outstanding.map((item, i) => (
                    <div key={i} className="bg-paper-card border border-ink/10 rounded-sm p-4 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-ochre-100 flex items-center justify-center shrink-0">
                        <FileText size={15} strokeWidth={1.6} className="text-ochre-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13.5px] font-medium text-ink">{item.name}</div>
                        <div className="text-[11.5px] text-ink-muted mt-0.5">{item.category} · Marcus needs this to finalize your return</div>
                      </div>
                      <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                        <Upload size={11} strokeWidth={1.8} />
                        Upload
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Received items — collapsible feel */}
              <div className="px-7 py-5">
                <div className="text-[11px] eyebrow mb-3 text-emerald-deep">
                  ✓ Received · {received} items
                </div>
                <div className="space-y-1.5">
                  {REQUEST_CHECKLIST.filter(r => r.status === "received").slice(0, 8).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-ink/6 last:border-0">
                      <CheckCircle2 size={13} strokeWidth={2} className="text-emerald-deep shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] text-ink-soft truncate">{item.name}</div>
                      </div>
                      <span className="text-[10.5px] text-ink-faint tabular shrink-0">
                        {fmtDate(item.receivedAt!, "month-day")}
                      </span>
                    </div>
                  ))}
                  <button className="text-[12px] text-ink-muted hover:text-ink transition-colors mt-2 flex items-center gap-1">
                    See all {received} received items
                    <ChevronRight size={11} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>

            {/* Engagement letter / sign */}
            <div className="card p-6 mt-6 ring-1 ring-ochre-500/30 bg-ochre-50/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-ochre-100 flex items-center justify-center shrink-0">
                  <FileText size={16} strokeWidth={1.5} className="text-ochre-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-[14px] font-medium text-ink">Augusta Rule rental agreement</span>
                    <span className="text-[10.5px] eyebrow text-ochre-700">Signature requested</span>
                  </div>
                  <p className="text-[12.5px] text-ink-soft leading-relaxed mb-4">
                    Marcus's team prepared the rental agreement between you and Tucker Holdings
                    LLC for the Augusta Rule strategy ($14,400 estimated tax savings). Review the
                    14-day rental terms and add your e-signature.
                  </p>
                  <div className="flex items-center gap-2.5">
                    <button className="px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm flex items-center gap-1.5">
                      <FileText size={11} strokeWidth={1.8} />
                      Review and sign
                    </button>
                    <button className="px-3.5 py-2 text-[12.5px] font-medium text-ink-muted hover:text-ink transition-colors">
                      Open Q&A first
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right col: support & messaging */}
          <div className="col-span-1 space-y-6">
            {/* Your team */}
            <div className="card p-6">
              <div className="eyebrow mb-3">Your Aragon team</div>
              <div className="space-y-3">
                {[
                  { name: "Marcus Tate", role: "Tax Manager", lead: true },
                  { name: "Priya Raman", role: "Senior Tax Staff" },
                  { name: "Tess Avila", role: "Bookkeeper" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-paper-deep text-ink flex items-center justify-center text-[10px] font-mono font-medium">
                      {initialsOf(m.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-ink truncate">{m.name}</div>
                      <div className="text-[11px] text-ink-muted">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full px-3 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors rounded-sm flex items-center justify-center gap-1.5">
                <MessageSquare size={11} strokeWidth={1.8} />
                Send message
              </button>
            </div>

            {/* Recent messages */}
            <div className="card p-6">
              <div className="eyebrow mb-3">Recent messages</div>
              <div className="space-y-3">
                {[
                  {
                    from: "Marcus Tate",
                    when: "2026-05-04T10:22:00Z",
                    preview: "Hi Jeffrey, can you forward the wire confirmation for the Q1 estimated tax payment ($54k)? We have everything else.",
                    unread: true,
                  },
                  {
                    from: "Priya Raman",
                    when: "2026-04-22T09:14:00Z",
                    preview: "Your Tucker Holdings K-1 came in clean — no follow-up needed from your end. We'll loop you in on the rental agreement next week.",
                    unread: false,
                  },
                ].map((msg, i) => (
                  <div key={i} className={cn("p-3 rounded-sm border cursor-pointer", msg.unread ? "border-ochre-500/30 bg-ochre-50/30" : "border-ink/8")}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[12.5px] font-medium text-ink">{msg.from}</span>
                      <span className="text-[10.5px] text-ink-faint tabular">{fmtRelativeTime(msg.when, today)}</span>
                    </div>
                    <p className="text-[12px] text-ink-soft leading-snug line-clamp-2">{msg.preview}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Your entities */}
            <div className="card p-6">
              <div className="eyebrow mb-3">Your entities</div>
              <div className="space-y-2.5">
                {TUCKER_ENTITIES.map((entity) => (
                  <div key={entity.id} className="flex items-center justify-between text-[12.5px] py-1.5 border-b border-ink/6 last:border-0">
                    <div className="min-w-0 pr-2">
                      <div className="text-ink truncate">{entity.name}</div>
                      <div className="text-[10.5px] text-ink-muted tabular">{entity.type}</div>
                    </div>
                    <div className="text-ink-soft num text-[12px] shrink-0">{entity.ownership}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo footer — link back to admin */}
        <div className="mt-16 pt-8 border-t border-ink/8 flex items-center justify-between text-[11.5px] text-ink-muted">
          <div className="flex items-center gap-2">
            <Lock size={11} strokeWidth={1.6} />
            <span>portal.aragonaccounting.com · Magic-link authentication · Per-client access</span>
          </div>
          <Link to="/" className="text-ink-muted hover:text-ink flex items-center gap-1.5 transition-colors">
            ← Back to firm view
          </Link>
        </div>
      </div>
    </div>
  );
}
