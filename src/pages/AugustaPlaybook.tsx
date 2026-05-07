import { Link } from "wouter";
import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Sparkles,
  FileText,
  Download,
  ChevronRight,
  Check,
  ArrowUpRight,
  User,
  Calendar,
  Lock,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER, AUGUSTA_PLAYBOOK_STEPS, TUCKER_STRATEGIES, STAFF } from "../lib/mock-data";
import { fmtUSD, fmtDate, cn, initialsOf } from "../lib/format";
import type { PlaybookStep } from "../lib/types";

const stepStatusIcon: Record<PlaybookStep["status"], typeof CheckCircle2> = {
  Complete: CheckCircle2,
  "In Progress": Clock,
  "Awaiting Review": AlertCircle,
  "Not Started": Circle,
};

const stepStatusStyles: Record<PlaybookStep["status"], { iconColor: string; bg: string; ring: string; label: string }> = {
  Complete: {
    iconColor: "text-emerald-deep",
    bg: "bg-emerald-soft/40",
    ring: "ring-emerald-deep/20",
    label: "text-emerald-deep",
  },
  "Awaiting Review": {
    iconColor: "text-ochre-600",
    bg: "bg-ochre-50",
    ring: "ring-ochre-500/30",
    label: "text-ochre-700",
  },
  "In Progress": {
    iconColor: "text-sky-deep",
    bg: "bg-sky-soft/40",
    ring: "ring-sky-deep/20",
    label: "text-sky-deep",
  },
  "Not Started": {
    iconColor: "text-ink-faint",
    bg: "bg-paper-card",
    ring: "ring-ink/10",
    label: "text-ink-faint",
  },
};

export function AugustaPlaybook({ clientId }: { clientId: number }) {
  const client = TUCKER;
  const strategy = TUCKER_STRATEGIES.find((s) => s.id === "augusta-rule")!;
  const steps = AUGUSTA_PLAYBOOK_STEPS;
  const completedCount = steps.filter((s) => s.status === "Complete").length;
  const progress = (completedCount / steps.length) * 100;

  // Default to the "Awaiting Review" step (rental agreement draft) — that's the demo moment
  const [selectedStepId, setSelectedStepId] = useState(steps.find((s) => s.status === "Awaiting Review")?.id ?? steps[0].id);
  const selectedStep = steps.find((s) => s.id === selectedStepId)!;

  const totalDocs = steps.reduce((sum, s) => sum + (s.documents?.length ?? 0), 0);
  const aiDraftedDocs = steps.flatMap((s) => s.documents ?? []).filter((d) => d.type === "draft").length;

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Tax Planning", to: `/clients/${client.id}/tax-planning` },
            { label: "Augusta Rule" },
          ]}
          eyebrow={`Strategy Playbook · §280A(g) · Phase 5 Proposed`}
          title={
            <>
              <span className="block">The Augusta</span>
              <span className="italic">
                Rule.
              </span>
            </>
          }
          subtitle="Rent personal residence to S-Corp for ≤14 days/year. Tax-free to homeowner; deductible to entity. AI-drafted rental agreement, 14 board minutes, and IRS guidance memo. Completion gates enforce process."
          action={
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <RefreshCw size={12} strokeWidth={1.8} />
                Re-run AI
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Check size={12} strokeWidth={2.2} />
                Mark Strategy Adopted
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* Top stats strip */}
        <div className="grid grid-cols-5 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-5 col-span-2 bg-ochre-50/40">
            <div className="eyebrow text-ochre-700">Estimated savings · 2025</div>
            <div className="display tabular text-[44px] text-ochre-700 mt-1.5 leading-none">
              {fmtUSD(strategy.estimatedSavings, { compact: false })}
            </div>
            <div className="text-[11.5px] text-ink-muted mt-2 tabular">
              14 days · $2,800/day fair rental · top marginal bracket × 37%
            </div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Progress</div>
            <div className="display tabular text-[28px] text-ink mt-1.5 leading-none">
              {completedCount}<span className="text-ink-muted text-[20px]">/{steps.length}</span>
            </div>
            <div className="mt-2.5 h-1 bg-paper-deep rounded-full overflow-hidden">
              <div className="h-full bg-emerald-deep transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">AI-drafted docs</div>
            <div className="display tabular text-[28px] text-ink mt-1.5 leading-none">
              {aiDraftedDocs}<span className="text-ink-muted text-[20px]">/{totalDocs}</span>
            </div>
            <div className="text-[11.5px] text-ink-muted mt-2 tabular">awaiting staff review</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Compliance citations</div>
            <div className="text-[14px] font-medium text-ink mt-2 leading-snug">
              §280A(g)<br />
              <span className="text-ink-muted text-[12.5px]">Sinopoli v. Comm'r</span>
            </div>
          </div>
        </div>

        {/* Two-column body: steps + document preview */}
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT — Steps timeline */}
          <div className="col-span-7">
            <div className="flex items-baseline justify-between mb-5">
              <div className="eyebrow">Playbook · 5 steps with completion gates</div>
              <div className="text-[11px] text-ink-muted tabular">
                Cannot mark Adopted until all complete
              </div>
            </div>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-[18px] top-3 bottom-3 w-px bg-ink/10" />

              <div className="space-y-4">
                {steps.map((step) => {
                  const Icon = stepStatusIcon[step.status];
                  const styles = stepStatusStyles[step.status];
                  const isSelected = step.id === selectedStepId;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStepId(step.id)}
                      className={cn(
                        "w-full text-left flex gap-4 group cursor-pointer transition-all relative",
                        isSelected ? "" : "hover:translate-x-0.5"
                      )}
                    >
                      {/* Status icon */}
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-4 ring-paper transition-all relative z-10",
                        styles.bg
                      )}>
                        <Icon size={16} strokeWidth={1.8} className={styles.iconColor} />
                      </div>

                      {/* Card */}
                      <div className={cn(
                        "flex-1 min-w-0 card p-5 transition-all",
                        isSelected ? "ring-2 ring-ochre-500/50 shadow-paper-md" : "ring-0 hover:shadow-paper",
                      )}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-baseline gap-3 min-w-0">
                            <span className="display tabular text-[18px] text-ink-faint">
                              {String(step.number).padStart(2, "0")}
                            </span>
                            <h3 className="text-[15px] font-medium text-ink leading-snug">
                              {step.title}
                            </h3>
                          </div>
                          <span className={cn("text-[10.5px] font-mono uppercase tracking-[0.1em] shrink-0", styles.label)}>
                            {step.status}
                          </span>
                        </div>

                        <p className="text-[12.5px] text-ink-muted leading-relaxed mb-3">
                          {step.description}
                        </p>

                        <div className="flex items-center gap-5 text-[11.5px] text-ink-muted tabular">
                          {step.owner && (
                            <span className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-paper-deep flex items-center justify-center text-[9px] font-mono text-ink">
                                {initialsOf(step.owner)}
                              </div>
                              {step.owner}
                            </span>
                          )}
                          {step.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar size={10} strokeWidth={1.8} />
                              Due {fmtDate(step.dueDate, "month-day")}
                            </span>
                          )}
                          {step.documents && step.documents.length > 0 && (
                            <span className="flex items-center gap-1">
                              <FileText size={10} strokeWidth={1.8} />
                              {step.documents.length} {step.documents.length === 1 ? "doc" : "docs"}
                            </span>
                          )}
                          {step.aiAssisted && (
                            <span className="flex items-center gap-1 text-ochre-700">
                              <Sparkles size={10} strokeWidth={1.8} />
                              AI-assisted
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Citations footer */}
            <div className="mt-8 p-5 border border-ink/8 rounded-sm bg-paper-deep/30">
              <div className="eyebrow mb-2">Audit defense — citations baked into the playbook</div>
              <p className="text-[12.5px] text-ink-muted leading-relaxed">
                §280A(g) (de minimis rental); §183 (hobby loss safe-harbor); Treasury Reg
                §1.280A-3(d)(3); <span className="italic">Sinopoli v. Commissioner</span>, T.C.
                Memo 2023-105 (contemporaneous-documentation requirement).
              </p>
            </div>
          </div>

          {/* RIGHT — Selected document preview pane */}
          <div className="col-span-5">
            <div className="sticky top-[80px]">
              <Card padded={false} className="overflow-hidden">
                {/* Pane header */}
                <div className="px-5 py-4 border-b border-ink/8 flex items-center justify-between">
                  <div>
                    <div className="eyebrow text-[10px]">Step {selectedStep.number} · {selectedStep.documents?.[0]?.type === "draft" ? "AI Draft" : selectedStep.documents?.[0]?.type === "final" ? "Final" : "Template"}</div>
                    <div className="text-[13px] font-medium text-ink mt-0.5 truncate">
                      {selectedStep.documents?.[0]?.name ?? selectedStep.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-paper-deep rounded-sm text-ink-muted hover:text-ink transition-colors">
                      <Download size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>

                {/* Preview body */}
                <div className="bg-paper-deep/40 p-6 max-h-[700px] overflow-y-auto">
                  {selectedStep.id === "step-1" && <PreviewRentalValuation />}
                  {selectedStep.id === "step-2" && <PreviewRentalAgreement client={client} />}
                  {selectedStep.id === "step-3" && <PreviewBoardMinutes documents={selectedStep.documents ?? []} />}
                  {selectedStep.id === "step-4" && <PreviewComplianceMemo />}
                  {selectedStep.id === "step-5" && <PreviewJournalEntry />}
                </div>

                {/* Pane actions */}
                <div className="px-5 py-3.5 border-t border-ink/8 bg-paper-card flex items-center justify-between">
                  <div className="text-[11px] text-ink-muted">
                    {selectedStep.aiAssisted && (
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={10} strokeWidth={1.8} className="text-ochre-500" />
                        AI-drafted · pending staff review
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedStep.status === "Awaiting Review" && (
                      <>
                        <button className="px-3 py-1.5 text-[12px] font-medium text-ink-muted hover:text-ink transition-colors">
                          Edit
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-emerald-deep text-paper hover:bg-emerald-deep/90 transition-colors rounded-sm">
                          <Check size={11} strokeWidth={2.2} />
                          Approve
                        </button>
                      </>
                    )}
                    {selectedStep.status === "Complete" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors rounded-sm">
                        <Lock size={11} strokeWidth={1.8} />
                        Locked
                      </button>
                    )}
                    {selectedStep.status === "In Progress" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                        Continue drafting
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Preview panes — feel like real documents, not generic mocks
// ────────────────────────────────────────────────────────────

function DocumentChrome({ children, fileTitle }: { children: React.ReactNode; fileTitle: string }) {
  return (
    <div className="paper-doc shadow-paper-md p-7 font-sans relative rounded-sm">
      <div className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-[0.12em] text-ink-faint">
        {fileTitle}
      </div>
      {children}
    </div>
  );
}

function PreviewRentalAgreement({ client }: { client: typeof TUCKER }) {
  return (
    <DocumentChrome fileTitle="Draft · v3 · 2026-05-04">
      <div className="text-center mb-5 pb-4 border-b-2 border-ink">
        <div className="eyebrow text-[10px]">Residential Rental Agreement</div>
        <h4 className="display text-[20px] text-ink mt-2 leading-tight">
          Tucker Residence · §280A(g) Use
        </h4>
        <div className="text-[11px] text-ink-muted mt-1 tabular">Calendar Year 2026</div>
      </div>

      <div className="space-y-3 text-[12px] text-ink-soft leading-relaxed">
        <p>
          This Agreement is entered into by{" "}
          <span className="font-medium text-ink">Jeffrey L. Tucker and Marian R. Tucker</span>{" "}
          (collectively, "Lessor"), and{" "}
          <span className="font-medium text-ink">Tucker Holdings LLC</span>, a Florida S-Corporation
          (the "Lessee"), with respect to the residence located at 4218 Bayshore Boulevard,
          Sarasota, FL 34243 (the "Premises").
        </p>

        <div className="bg-paper-deep/60 px-4 py-3 rounded-sm border-l-2 border-ochre-500 my-4">
          <div className="eyebrow mb-1.5">Section 2 — Rental Terms</div>
          <ul className="text-[12px] space-y-1 text-ink">
            <li>· Term: 14 days (non-consecutive), within calendar year 2026</li>
            <li>· Rate: <span className="num">$2,800.00</span>/day, supported by §280A(g) comparables</li>
            <li>· Total: <span className="num">$39,200.00</span></li>
            <li>· Use: bona fide business meetings, training retreats, strategy sessions</li>
          </ul>
        </div>

        <p>
          Lessor warrants that the Premises shall not be available for personal use during periods
          rented to Lessee. Lessee shall maintain contemporaneous records of attendees, agenda, and
          business purpose for each rental day, supporting the business-purpose requirement under
          §162.
        </p>

        <p className="text-ink-muted italic">
          <Sparkles size={10} strokeWidth={1.8} className="inline-block text-ochre-500 mr-1" />
          AI-generated from playbook template, populated with client and entity data extracted from
          the engagement file. Defensible language reviewed against current §280A case law.
        </p>

        <div className="grid grid-cols-2 gap-6 pt-5 mt-5 border-t border-ink/10">
          <div>
            <div className="border-b border-ink mb-1 h-7" />
            <div className="text-[10px] text-ink-muted">Jeffrey L. Tucker · Lessor</div>
          </div>
          <div>
            <div className="border-b border-ink mb-1 h-7" />
            <div className="text-[10px] text-ink-muted">Marcus Tate · Tucker Holdings LLC</div>
          </div>
        </div>
      </div>
    </DocumentChrome>
  );
}

function PreviewRentalValuation() {
  return (
    <DocumentChrome fileTitle="Final · Reviewed Apr 22">
      <div className="mb-4 pb-3 border-b border-ink/15">
        <div className="eyebrow">Comparable Rental Analysis</div>
        <h4 className="display text-[18px] text-ink mt-1.5">
          Tucker Sarasota Residence
        </h4>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-[10px] eyebrow border-b border-ink/15">
            <th className="text-left pb-2">Source</th>
            <th className="text-right pb-2">Daily Rate</th>
            <th className="text-right pb-2">Capacity</th>
          </tr>
        </thead>
        <tbody className="text-ink-soft">
          {[
            { src: "Airbnb · 4-BR Sarasota waterfront", rate: "$2,640", beds: "4 BR" },
            { src: "VRBO · Premium Bayfront estate", rate: "$2,890", beds: "5 BR" },
            { src: "Ritz-Carlton Sarasota · Event suite", rate: "$3,400", beds: "Event" },
            { src: "Hyatt Regency · Conference floor", rate: "$2,950", beds: "Event" },
            { src: "Sarasota Hospitality Market", rate: "$2,720", beds: "—" },
          ].map((r, i) => (
            <tr key={i} className="border-b border-ink/6">
              <td className="py-2">{r.src}</td>
              <td className="py-2 text-right num">{r.rate}</td>
              <td className="py-2 text-right num text-ink-faint">{r.beds}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-emerald-soft/40">
            <td className="pt-2.5 pb-2.5 px-1 font-medium text-ink">Defensible rate (median)</td>
            <td className="pt-2.5 pb-2.5 px-1 text-right font-medium num text-ink">$2,800</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="mt-4 text-[11px] text-ink-muted leading-relaxed">
        Methodology: 5-source median, conservative within ±10% range. Defensible under
        §280A(g) on the basis of contemporaneous market data.
      </div>
    </DocumentChrome>
  );
}

function PreviewBoardMinutes({ documents }: { documents: { name: string; type: string }[] }) {
  return (
    <div className="space-y-2">
      <div className="text-[11.5px] text-ink-muted px-1 mb-2">
        14 minutes drafted · one per rental day · pre-dated across the tax year, no overlapping dates,
        Tucker Holdings business themes
      </div>
      {documents.slice(0, 6).map((doc, i) => (
        <div key={i} className="bg-paper-card border border-ink/10 px-4 py-3 flex items-center justify-between group hover:border-ink/20 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <FileText size={13} strokeWidth={1.6} className="text-ochre-600 shrink-0" />
            <span className="text-[12.5px] text-ink-soft truncate">{doc.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Pill variant="ochre">Draft</Pill>
            <ChevronRight size={12} strokeWidth={1.5} className="text-ink-faint group-hover:text-ink transition-colors" />
          </div>
        </div>
      ))}
      <div className="text-[11.5px] text-ink-muted text-center pt-2 italic">
        + {documents.length - 6} more drafts...
      </div>
    </div>
  );
}

function PreviewComplianceMemo() {
  return (
    <DocumentChrome fileTitle="Template · 2026-05-07">
      <div className="text-center mb-4">
        <div className="eyebrow text-[10px]">Internal Tax Memorandum</div>
        <h4 className="display text-[18px] text-ink mt-2">
          Augusta Rule · Compliance Defense
        </h4>
        <div className="text-[10.5px] text-ink-muted mt-1 tabular">RE: Tucker · TY 2026</div>
      </div>
      <div className="text-[12px] text-ink-soft leading-relaxed space-y-3">
        <p className="italic text-ink-muted">
          Template auto-populates with client, entity, and engagement-team facts on draft generation.
        </p>
        <div>
          <div className="text-[10.5px] eyebrow mb-1">I. Statutory Basis</div>
          <p>
            §280A(g) excludes from gross income rental of dwelling unit used as a residence,
            provided rental period does not exceed 14 days during the taxable year...
          </p>
        </div>
        <div>
          <div className="text-[10.5px] eyebrow mb-1">II. Substantiation</div>
          <p>
            Per Sinopoli v. Comm'r, T.C. Memo 2023-105, the taxpayer must maintain
            contemporaneous documentation of business purpose, attendance, and fair market value...
          </p>
        </div>
      </div>
    </DocumentChrome>
  );
}

function PreviewJournalEntry() {
  return (
    <DocumentChrome fileTitle="QBO · Pending review">
      <div className="mb-4 pb-3 border-b border-ink/15">
        <div className="eyebrow">QuickBooks Journal Entry</div>
        <h4 className="display text-[18px] text-ink mt-1.5">
          Tucker Holdings LLC · 12/31/2026
        </h4>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-[10px] eyebrow border-b border-ink/15">
            <th className="text-left pb-2">Account</th>
            <th className="text-right pb-2">Debit</th>
            <th className="text-right pb-2">Credit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink/8"><td className="py-2.5 pl-1">Rent Expense — Augusta Rule</td><td className="py-2.5 text-right num">$39,200</td><td></td></tr>
          <tr className="border-b border-ink/8"><td className="py-2.5 pl-5 text-ink-muted">Cash · Distribution to J. Tucker</td><td></td><td className="py-2.5 text-right num">$39,200</td></tr>
        </tbody>
      </table>
      <div className="mt-4 text-[11px] text-ink-muted leading-relaxed">
        Memo: 14 days × $2,800/day per executed Augusta Rule rental agreement. Bookkeeper review required before posting.
      </div>
    </DocumentChrome>
  );
}
