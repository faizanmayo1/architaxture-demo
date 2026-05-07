import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Save,
  Maximize2,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { fmtUSD, cn } from "../lib/format";

const EXTRACTION_TABS = [
  { id: "1040", label: "Form 1040", count: 23 },
  { id: "carryforwards", label: "Carryforwards", count: 17 },
  { id: "k1s", label: "K-1s", count: 3 },
  { id: "7203", label: "Form 7203", count: 8 },
  { id: "scheduled", label: "Schedule D", count: 12 },
  { id: "warnings", label: "Confidence Flags", count: 0 },
];

export function ReviewQueue() {
  const [activeTab, setActiveTab] = useState("1040");
  const [page, setPage] = useState(3);
  const totalPages = 32;

  return (
    <div className="animate-fade-up h-[calc(100vh-56px)] flex flex-col">
      {/* Header */}
      <div className="px-10 pt-8 pb-5 border-b border-ink/8">
        <PageHeader
          eyebrow="Review Queue · Tucker · 1040 (2024)"
          title={
            <span>
              The extraction <span className="italic">credibility</span> moment
            </span>
          }
          subtitle="Hybrid text + vision pipeline. PDF on the left, structured data on the right. Inline editing with PATCH-allowlist guard. Null-preserving COALESCE upsert protects prior corrections."
          action={
            <div className="flex items-center gap-2.5">
              <Pill variant="emerald" dot>
                <CheckCircle2 size={11} strokeWidth={2} />
                Extraction Complete
              </Pill>
              <button className="flex items-center gap-1.5 px-4 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Save size={12} strokeWidth={1.8} />
                Save & Approve
              </button>
            </div>
          }
        />
      </div>

      {/* Split body */}
      <div className="flex-1 grid grid-cols-2 min-h-0">
        {/* LEFT — PDF viewer */}
        <div className="bg-paper-deep/50 border-r border-ink/8 flex flex-col min-h-0">
          {/* PDF toolbar */}
          <div className="px-5 py-2.5 bg-paper border-b border-ink/8 flex items-center gap-3">
            <FileText size={14} strokeWidth={1.6} className="text-ink-soft" />
            <div className="text-[12.5px] font-medium text-ink truncate">
              2024_1040_TuckerJefferyL_v2.pdf
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-sm transition-colors disabled:opacity-30" disabled={page === 1}>
                <ChevronLeft size={13} strokeWidth={1.8} />
              </button>
              <div className="text-[11.5px] tabular text-ink-soft px-2 min-w-[60px] text-center">
                {page} / {totalPages}
              </div>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-sm transition-colors disabled:opacity-30" disabled={page === totalPages}>
                <ChevronRight size={13} strokeWidth={1.8} />
              </button>
            </div>
            <div className="flex items-center gap-1 border-l border-ink/8 pl-3">
              <button className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-sm transition-colors">
                <ZoomOut size={13} strokeWidth={1.8} />
              </button>
              <span className="text-[11px] tabular text-ink-muted px-1">100%</span>
              <button className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-sm transition-colors">
                <ZoomIn size={13} strokeWidth={1.8} />
              </button>
              <button className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper-deep rounded-sm transition-colors ml-1">
                <Maximize2 size={12} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* PDF canvas */}
          <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center">
            <div className="bg-white shadow-paper-md w-full max-w-[520px] aspect-[8.5/11] relative">
              {/* Top of form */}
              <div className="p-6 font-mono text-[10px] text-gray-700">
                <div className="border-b-2 border-black mb-3 pb-2">
                  <div className="text-[12px] font-bold text-black tracking-tight">Form 1040 — U.S. Individual Income Tax Return</div>
                  <div className="text-[9px] text-gray-500 mt-1">Department of the Treasury · Internal Revenue Service · 2024</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-[9px]">
                  <div>
                    <div className="text-gray-500">Your first name and middle initial</div>
                    <div className="border-b border-black h-5 flex items-end">JEFFREY L</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last name</div>
                    <div className="border-b border-black h-5 flex items-end">TUCKER</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-[9px]">
                  <div>
                    <div className="text-gray-500">Spouse's first name</div>
                    <div className="border-b border-black h-5 flex items-end">MARIAN R</div>
                  </div>
                  <div>
                    <div className="text-gray-500">SSN</div>
                    <div className="border-b border-black h-5 flex items-end">XXX-XX-2814</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[8px] text-gray-500">Filing status</div>
                  <div className="text-[10px] font-bold mt-1">☒ Married filing jointly</div>
                </div>

                <div className="border-t-2 border-black pt-3 mt-4">
                  <div className="text-[10px] font-bold mb-2">Income</div>
                  <div className="space-y-1.5">
                    {[
                      { line: "1a", label: "Total amount from Form(s) W-2", val: "168,000.", highlight: true },
                      { line: "2b", label: "Taxable interest", val: "8,420." },
                      { line: "3b", label: "Ordinary dividends", val: "10,000." },
                      { line: "5b", label: "Pensions and annuities", val: "—" },
                      { line: "7", label: "Capital gain or (loss)", val: "67,800.", highlight: true },
                      { line: "8", label: "Other income from Schedule 1", val: "496,900.", highlight: true },
                      { line: "9", label: "Total income", val: "751,120." },
                    ].map((row, i) => (
                      <div key={i} className={cn("grid grid-cols-[30px_1fr_90px] gap-2 py-1 border-b border-gray-200", row.highlight && "bg-yellow-50/80")}>
                        <span className="text-gray-500">{row.line}</span>
                        <span className="text-gray-700 truncate">{row.label}</span>
                        <span className="text-right tabular text-black font-medium">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vision overlay annotation */}
              <div className="absolute top-[35%] right-2 bg-ochre-500 text-paper text-[9px] font-mono px-2 py-1 rounded-sm shadow-md flex items-center gap-1 animate-fade-in">
                <Sparkles size={9} strokeWidth={2} />
                Vision pass · K-1 detected
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Extracted data */}
        <div className="flex flex-col min-h-0 bg-paper">
          {/* Tab strip */}
          <div className="px-5 border-b border-ink/8 overflow-x-auto">
            <div className="flex gap-1">
              {EXTRACTION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-3 text-[12.5px] tracking-tight transition-colors relative whitespace-nowrap flex items-center gap-1.5",
                    activeTab === tab.id ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {tab.label}
                  <span className={cn("text-[10px] tabular px-1.5 py-0.5 rounded-full", activeTab === tab.id ? "bg-paper-deep text-ink" : "text-ink-faint")}>
                    {tab.count}
                  </span>
                  {tab.id === "warnings" && tab.count === 0 && <CheckCircle2 size={10} strokeWidth={2} className="text-emerald-deep" />}
                  {activeTab === tab.id && <span className="absolute left-0 right-0 bottom-0 h-px bg-ochre-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tab body */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "1040" && <Tab1040 />}
            {activeTab === "carryforwards" && <TabCarryforwards />}
            {activeTab === "k1s" && <TabK1s />}
            {activeTab === "7203" && <Tab7203 />}
            {activeTab === "scheduled" && <TabScheduleD />}
            {activeTab === "warnings" && <TabWarnings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExtractedSection({
  title,
  rows,
  collapsed = false,
}: {
  title: string;
  rows: { label: string; value: string | number; confidence?: number; edited?: boolean }[];
  collapsed?: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2 px-1">
        <div className="eyebrow">{title}</div>
        <div className="text-[10.5px] text-emerald-deep flex items-center gap-1">
          <CheckCircle2 size={9} strokeWidth={2.2} />
          {rows.length} fields verified
        </div>
      </div>
      <div className="card p-0">
        {rows.map((row, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[1.6fr_1fr_60px] gap-3 px-4 py-2.5 border-b border-ink/6 last:border-b-0 group hover:bg-paper-deep/30",
              row.edited && "bg-ochre-50/40"
            )}
          >
            <div className="text-[12.5px] text-ink-soft">{row.label}</div>
            <div className="text-right text-[13px] num text-ink">{row.value}</div>
            <div className="text-right">
              {row.confidence !== undefined && (
                <span className={cn(
                  "text-[10px] tabular",
                  row.confidence >= 0.95 ? "text-emerald-deep" : row.confidence >= 0.85 ? "text-ochre-700" : "text-crimson-deep"
                )}>
                  {(row.confidence * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tab1040() {
  return (
    <>
      <div className="mb-4 px-4 py-3 bg-emerald-soft/40 border border-emerald-deep/15 rounded-sm flex items-start gap-3">
        <Sparkles size={14} strokeWidth={1.8} className="text-emerald-deep mt-0.5 shrink-0" />
        <div className="text-[12.5px] text-emerald-deep leading-relaxed">
          <span className="font-medium">Extraction complete · 23 / 23 fields populated.</span>{" "}
          Hybrid text + vision passes ran in 14.2s. 2 fields (Form 7203 lines 6 + 11) escalated to vision after low text-extraction confidence — both resolved at 99% confidence.
        </div>
      </div>

      <ExtractedSection
        title="Filing & Identity"
        rows={[
          { label: "Filing status", value: "MFJ", confidence: 1.0 },
          { label: "Primary taxpayer", value: "Jeffrey L. Tucker", confidence: 1.0 },
          { label: "Spouse", value: "Marian R. Tucker", confidence: 1.0 },
          { label: "Dependents", value: 2, confidence: 1.0 },
        ]}
      />

      <ExtractedSection
        title="Income"
        rows={[
          { label: "Wages (Line 1a)", value: fmtUSD(168000), confidence: 1.0 },
          { label: "Taxable interest", value: fmtUSD(8420), confidence: 1.0 },
          { label: "Qualified dividends", value: fmtUSD(8200), confidence: 0.99 },
          { label: "Capital gains (Line 7)", value: fmtUSD(67800), confidence: 0.98 },
          { label: "Schedule 1 — Other income", value: fmtUSD(496900), confidence: 0.96, edited: true },
          { label: "Total income (Line 9)", value: fmtUSD(751120), confidence: 1.0 },
        ]}
      />

      <ExtractedSection
        title="Adjustments & Deductions"
        rows={[
          { label: "1/2 SE tax", value: fmtUSD(-8420), confidence: 0.97 },
          { label: "SEP IRA contribution", value: fmtUSD(-69000), confidence: 1.0 },
          { label: "Itemized deductions", value: fmtUSD(-32100), confidence: 0.98 },
          { label: "QBI deduction", value: fmtUSD(-42600), confidence: 0.94 },
        ]}
      />

      <ExtractedSection
        title="Tax & Payments"
        rows={[
          { label: "Federal income tax", value: fmtUSD(188220), confidence: 1.0 },
          { label: "Self-employment tax", value: fmtUSD(16840), confidence: 0.99 },
          { label: "Additional Medicare", value: fmtUSD(4280), confidence: 1.0 },
          { label: "NIIT (§1411)", value: fmtUSD(6420), confidence: 0.98 },
        ]}
      />
    </>
  );
}

function TabCarryforwards() {
  return (
    <>
      <div className="mb-4 px-4 py-3 bg-ochre-50/60 border border-ochre-200/60 rounded-sm flex items-start gap-3">
        <Sparkles size={14} strokeWidth={1.8} className="text-ochre-700 mt-0.5 shrink-0" />
        <div className="text-[12.5px] text-ochre-800 leading-relaxed">
          <span className="font-medium">17 carryforward fields detected and preserved across all 5 form types.</span>{" "}
          Null-preserving COALESCE upsert ensures reprocessing never wipes corrections.
        </div>
      </div>

      <ExtractedSection
        title="Capital Loss Carryforwards"
        rows={[
          { label: "ST loss carry · 2023", value: fmtUSD(-12400), confidence: 1.0 },
          { label: "LT loss carry · 2022", value: fmtUSD(-31800), confidence: 1.0 },
          { label: "LT loss carry · 2023", value: fmtUSD(-8200), confidence: 1.0 },
        ]}
      />

      <ExtractedSection
        title="NOL Carryforwards"
        rows={[
          { label: "Federal NOL · 2021", value: fmtUSD(-22600), confidence: 0.97 },
          { label: "State NOL · 2021", value: fmtUSD(-19400), confidence: 0.97 },
        ]}
      />

      <ExtractedSection
        title="§179 / Bonus Depreciation"
        rows={[
          { label: "§179 disallowed · 2023", value: fmtUSD(-8400), confidence: 1.0 },
          { label: "Passive loss · Bayshore", value: fmtUSD(-14200), confidence: 0.96 },
          { label: "AMT credit carry", value: fmtUSD(2100), confidence: 0.99 },
        ]}
      />
    </>
  );
}

function TabK1s() {
  return (
    <>
      <div className="mb-4 px-4 py-3 bg-paper-deep border border-ink/8 rounded-sm flex items-start gap-3">
        <Sparkles size={14} strokeWidth={1.8} className="text-ochre-500 mt-0.5 shrink-0" />
        <div className="text-[12.5px] text-ink-soft leading-relaxed">
          1065 K-1 vision pass ran on first 12 + last 12 pages, deduplicated. Tucker's stake
          extracted from Schedule K-1, line 1.
        </div>
      </div>
      <ExtractedSection
        title="Tucker Family Real Estate Partnership · Schedule K-1"
        rows={[
          { label: "Partner: Jeffrey L. Tucker", value: "60%", confidence: 1.0 },
          { label: "Ordinary income (Box 1)", value: fmtUSD(184500), confidence: 1.0 },
          { label: "Guaranteed payments (Box 4)", value: fmtUSD(24000), confidence: 1.0 },
          { label: "Net rental real estate (Box 2)", value: fmtUSD(38400), confidence: 0.98 },
          { label: "Capital account ending", value: fmtUSD(412780), confidence: 1.0 },
        ]}
      />
    </>
  );
}

function Tab7203() {
  return (
    <>
      <ExtractedSection
        title="Form 7203 · S-Corp Shareholder Stock Basis"
        rows={[
          { label: "Stock basis BOY", value: fmtUSD(184200), confidence: 1.0 },
          { label: "Capital contributions", value: fmtUSD(0), confidence: 1.0 },
          { label: "Income items", value: fmtUSD(348900), confidence: 0.99 },
          { label: "Distributions", value: fmtUSD(-280000), confidence: 1.0 },
          { label: "Stock basis EOY", value: fmtUSD(253100), confidence: 1.0 },
          { label: "Allowable loss", value: fmtUSD(0), confidence: 1.0 },
          { label: "Suspended loss carryover", value: fmtUSD(0), confidence: 1.0 },
        ]}
      />
    </>
  );
}

function TabScheduleD() {
  return <div className="text-[13px] text-ink-muted italic">Schedule D + Form 8949 — 12 fields verified.</div>;
}

function TabWarnings() {
  return (
    <div className="text-center py-12">
      <CheckCircle2 size={32} strokeWidth={1.4} className="text-emerald-deep mx-auto mb-3" />
      <div className="display text-[22px] text-ink mb-1.5">
        No confidence flags
      </div>
      <div className="text-[13px] text-ink-muted max-w-sm mx-auto">
        2 vision-pass escalations were resolved during initial extraction. Reviewed by Priya Raman on 2026-05-02.
      </div>
    </div>
  );
}
