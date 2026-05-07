import { Link } from "wouter";
import { useState } from "react";
import {
  UserPlus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Calendar,
  ScanLine,
  FileText,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { STAFF } from "../lib/mock-data";
import { fmtUSD, fmtDate, fmtRelativeTime, cn, initialsOf } from "../lib/format";

type OnboardingStatus = "Intake Started" | "Awaiting Documents" | "Questionnaire Sent" | "Internal Setup" | "Welcome Call Scheduled" | "Ready to Activate";

type OnboardingClient = {
  id: number;
  name: string;
  type: "Individual" | "S-Corp" | "C-Corp" | "Partnership" | "Bookkeeping";
  pod: "Alpha" | "Beta" | "—";
  taxManager: string;
  signedDate: string;
  status: OnboardingStatus;
  questionnaireProgress: number; // 0-100
  documentsCollected: { received: number; required: number };
  estAnnualFee: number;
  blockingItem: string | null;
  daysInQueue: number;
};

const QUEUE: OnboardingClient[] = [
  {
    id: 211,
    name: "Damon Pell",
    type: "Individual",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    signedDate: "2026-04-28",
    status: "Awaiting Documents",
    questionnaireProgress: 100,
    documentsCollected: { received: 3, required: 9 },
    estAnnualFee: 14400,
    blockingItem: "Prior year W-2 + 1099-DIV",
    daysInQueue: 9,
  },
  {
    id: 234,
    name: "Bethany Marlowe",
    type: "S-Corp",
    pod: "Alpha",
    taxManager: "Marcus Tate",
    signedDate: "2026-05-02",
    status: "Questionnaire Sent",
    questionnaireProgress: 64,
    documentsCollected: { received: 2, required: 11 },
    estAnnualFee: 28400,
    blockingItem: "Owner basis statements; payroll setup details",
    daysInQueue: 5,
  },
  {
    id: 235,
    name: "Aldon Group LLC",
    type: "Partnership",
    pod: "Alpha",
    taxManager: "Marcus Tate",
    signedDate: "2026-05-04",
    status: "Internal Setup",
    questionnaireProgress: 100,
    documentsCollected: { received: 9, required: 12 },
    estAnnualFee: 19800,
    blockingItem: null,
    daysInQueue: 3,
  },
  {
    id: 236,
    name: "Iris Voss",
    type: "Individual",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    signedDate: "2026-05-05",
    status: "Welcome Call Scheduled",
    questionnaireProgress: 100,
    documentsCollected: { received: 8, required: 8 },
    estAnnualFee: 9600,
    blockingItem: null,
    daysInQueue: 2,
  },
  {
    id: 237,
    name: "Penngrove Capital LLC",
    type: "C-Corp",
    pod: "Alpha",
    taxManager: "Marcus Tate",
    signedDate: "2026-05-06",
    status: "Intake Started",
    questionnaireProgress: 22,
    documentsCollected: { received: 0, required: 14 },
    estAnnualFee: 42000,
    blockingItem: "Driver's license; entity formation docs; prior return",
    daysInQueue: 1,
  },
  {
    id: 238,
    name: "Ramirez Bookkeeping Co.",
    type: "Bookkeeping",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    signedDate: "2026-05-06",
    status: "Ready to Activate",
    questionnaireProgress: 100,
    documentsCollected: { received: 5, required: 5 },
    estAnnualFee: 12600,
    blockingItem: null,
    daysInQueue: 1,
  },
];

const statusConfig: Record<OnboardingStatus, { variant: "neutral" | "ochre" | "emerald" | "crimson" | "sky"; tone: string }> = {
  "Intake Started": { variant: "neutral", tone: "text-ink-muted" },
  "Awaiting Documents": { variant: "ochre", tone: "text-ochre-700" },
  "Questionnaire Sent": { variant: "sky", tone: "text-sky-deep" },
  "Internal Setup": { variant: "sky", tone: "text-sky-deep" },
  "Welcome Call Scheduled": { variant: "ochre", tone: "text-ochre-700" },
  "Ready to Activate": { variant: "emerald", tone: "text-emerald-deep" },
};

export function OnboardingQueue() {
  const [filter, setFilter] = useState<"all" | "blocked" | "ready">("all");

  const filtered = QUEUE.filter((c) => {
    if (filter === "all") return true;
    if (filter === "blocked") return c.blockingItem !== null;
    if (filter === "ready") return c.status === "Ready to Activate";
    return true;
  });

  const totalEstFees = QUEUE.reduce((s, c) => s + c.estAnnualFee, 0);
  const blockedCount = QUEUE.filter((c) => c.blockingItem !== null).length;
  const readyCount = QUEUE.filter((c) => c.status === "Ready to Activate").length;
  const avgDays = (QUEUE.reduce((s, c) => s + c.daysInQueue, 0) / QUEUE.length).toFixed(1);

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          breadcrumb={[
            { label: "Operations" },
            { label: "Onboarding Queue" },
          ]}
          eyebrow="Onboarding Queue · Operations · Per brief 2.8"
          title={
            <>
              <span className="block">In the</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                pipeline.
              </span>
            </>
          }
          subtitle="Every signed client between proposal and activation. Inline staff assignment, questionnaire completion status, document collection progress, and blocking items surfaced as action items in the Morning Briefing."
          action={
            <Link
              to="/onboarding"
              className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm"
            >
              <UserPlus size={12} strokeWidth={1.8} />
              New Client Wizard
            </Link>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">In queue</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {QUEUE.length}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">signed clients · awaiting activation</div>
          </div>
          <div className="bg-paper-card p-6 bg-ochre-50/40">
            <div className="eyebrow text-ochre-700">Blocked</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {blockedCount}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">awaiting client deliverables</div>
          </div>
          <div className="bg-paper-card p-6 bg-emerald-soft/30">
            <div className="eyebrow text-emerald-deep">Ready to activate</div>
            <div className="display tabular text-[36px] text-emerald-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {readyCount}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">all setup steps complete</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Avg days in queue</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {avgDays}<span className="text-[18px] text-ink-muted"> d</span>
            </div>
            <div className="text-[11px] text-emerald-deep tabular mt-2">↓ 8.4 d vs. prior period</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 mb-6 pb-5 border-b border-ink/8">
          <span className="eyebrow mr-3">View</span>
          {[
            { id: "all", label: "All", count: QUEUE.length },
            { id: "blocked", label: "Blocked", count: blockedCount },
            { id: "ready", label: "Ready to activate", count: readyCount },
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
          <div className="ml-auto text-[12px] text-ink-muted">
            {fmtUSD(totalEstFees, { compact: true })} aggregate annual fees in queue
          </div>
        </div>

        {/* Queue list */}
        <div className="space-y-2">
          {filtered.map((c) => {
            const cfg = statusConfig[c.status];
            const docPct = (c.documentsCollected.received / c.documentsCollected.required) * 100;
            return (
              <div key={c.id} className="card flex items-start gap-5 p-5 group">
                <div className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-mono shrink-0",
                  c.status === "Ready to Activate" ? "bg-emerald-soft/60 text-emerald-deep" : "bg-paper-deep text-ink"
                )}>
                  {initialsOf(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap mb-1">
                    <span className="text-[14.5px] font-medium text-ink">{c.name}</span>
                    <Pill variant="neutral">{c.type}</Pill>
                    <Pill variant={cfg.variant} dot>{c.status}</Pill>
                    <span className="text-[10.5px] text-ink-faint tabular">
                      Signed {fmtDate(c.signedDate, "month-day")} · POD {c.pod} · {c.daysInQueue}d in queue
                    </span>
                  </div>

                  {/* Progress strips */}
                  <div className="grid grid-cols-2 gap-6 mt-3">
                    <div>
                      <div className="flex items-baseline justify-between text-[11.5px] mb-1.5">
                        <span className="eyebrow">Questionnaire</span>
                        <span className="num text-ink tabular">{c.questionnaireProgress}%</span>
                      </div>
                      <div className="h-1 bg-paper-deep rounded-full overflow-hidden">
                        <div
                          className={cn("h-full transition-all", c.questionnaireProgress === 100 ? "bg-emerald-deep" : "bg-ochre-500")}
                          style={{ width: `${c.questionnaireProgress}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between text-[11.5px] mb-1.5">
                        <span className="eyebrow">Documents</span>
                        <span className="num text-ink tabular">{c.documentsCollected.received}/{c.documentsCollected.required}</span>
                      </div>
                      <div className="h-1 bg-paper-deep rounded-full overflow-hidden">
                        <div
                          className={cn("h-full transition-all", docPct === 100 ? "bg-emerald-deep" : "bg-ochre-500")}
                          style={{ width: `${docPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {c.blockingItem && (
                    <div className="mt-3 flex items-baseline gap-2 text-[12px] text-ochre-700">
                      <AlertCircle size={11} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                      <span>Blocking: <span className="text-ink">{c.blockingItem}</span></span>
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="eyebrow text-[10px]">Est. annual fee</div>
                  <div className="display tabular text-[22px] text-ink leading-none mt-1" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                    {fmtUSD(c.estAnnualFee, { compact: true })}
                  </div>
                  <div className="text-[10.5px] text-ink-muted tabular mt-1">{c.taxManager.split(" ").map(p => p[0]).join("")} · Tax Mgr</div>
                  {c.status === "Ready to Activate" && (
                    <button className="mt-2 px-3 py-1.5 text-[11.5px] font-medium bg-emerald-deep text-paper hover:bg-emerald-deep/90 transition-colors rounded-sm flex items-center gap-1.5">
                      <CheckCircle2 size={10} strokeWidth={2.2} />
                      Activate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
