import { useState } from "react";
import {
  Search,
  FileText,
  Upload,
  Download,
  Filter as FilterIcon,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { RECENT_DOCUMENTS, FIRM_KPIS } from "../lib/mock-data";
import { fmtRelativeTime, fmtDate, fmtTime, cn } from "../lib/format";
import type { DocumentRecord } from "../lib/types";

const statusConfig: Record<DocumentRecord["status"], { variant: "neutral" | "ochre" | "emerald" | "crimson" | "sky"; icon: typeof CheckCircle2 }> = {
  Processed: { variant: "emerald", icon: CheckCircle2 },
  "In Queue": { variant: "sky", icon: Clock },
  "Needs Review": { variant: "ochre", icon: AlertCircle },
};

const sourceColors: Record<DocumentRecord["source"], string> = {
  Portal: "text-emerald-deep",
  Email: "text-sky-deep",
  "Internal Upload": "text-ink-soft",
  "Direct Sync": "text-ochre-700",
};

export function Documents() {
  const [filter, setFilter] = useState<"all" | "needs-review" | "this-week">("all");
  const [search, setSearch] = useState("");

  const filtered = RECENT_DOCUMENTS.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.client.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "needs-review" && d.status !== "Needs Review") return false;
    return true;
  });

  // Group by date
  const grouped = filtered.reduce<Record<string, DocumentRecord[]>>((acc, doc) => {
    const date = fmtDate(doc.uploadedAt, "long");
    if (!acc[date]) acc[date] = [];
    acc[date].push(doc);
    return acc;
  }, {});

  const totalSize = filtered.reduce((sum, d) => sum + parseFloat(d.size), 0).toFixed(1);
  const aiClassified = filtered.filter((d) => d.classifiedBy === "AI").length;
  const needsReview = RECENT_DOCUMENTS.filter((d) => d.status === "Needs Review").length;

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          eyebrow="Document Intelligence · Phase 2 module"
          title={
            <>
              <span className="block">Every paper,</span>
              <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
                sorted automatically.
              </span>
            </>
          }
          subtitle="AI auto-classifies, names, and routes every document on arrival. Cross-references against open document requests, deduplicates, surfaces low-confidence flags. Paper chase ends here."
          action={
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <Download size={12} strokeWidth={1.8} />
                Export
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Upload size={12} strokeWidth={1.8} />
                Upload
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Documents · 30 days</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {RECENT_DOCUMENTS.length * 23}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across {FIRM_KPIS.activeClients} clients</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Auto-classified</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              94<span className="text-[18px] text-ink-muted">%</span>
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">avg confidence 0.96</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Outstanding requests</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {FIRM_KPIS.documentsOutstanding}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across all clients · agent chasing</div>
          </div>
          <div className="bg-ochre-50/40 p-5">
            <div className="eyebrow text-ochre-700">Needs review</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {needsReview}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">low-confidence flags</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={13} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename or client…"
              className="pl-9 pr-3 py-2 w-full text-[13px] bg-paper-card border border-ink/10 rounded-sm focus:outline-none focus:border-ink/25"
            />
          </div>
          <div className="flex items-center gap-1">
            {[
              { id: "all", label: "All", count: RECENT_DOCUMENTS.length },
              { id: "needs-review", label: "Needs review", count: needsReview },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={cn(
                  "px-3 py-1.5 text-[12px] rounded-sm transition-colors flex items-center gap-2",
                  filter === f.id ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"
                )}
              >
                <span>{f.label}</span>
                <span className={cn("text-[10px] tabular", filter === f.id ? "text-paper/60" : "text-ink-faint")}>{f.count}</span>
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-[12px] text-ink-muted hover:text-ink hover:bg-paper-deep transition-colors rounded-sm ml-auto">
            <FilterIcon size={12} strokeWidth={1.6} />
            Year · Type · Client
            <ChevronDown size={11} strokeWidth={1.8} />
          </button>
        </div>

        {/* Document list — grouped by date */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, docs]) => (
            <div key={date}>
              <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-ink/8">
                <span className="text-[12.5px] font-medium text-ink">{date}</span>
                <span className="text-[11px] text-ink-muted tabular">{docs.length} {docs.length === 1 ? "document" : "documents"}</span>
              </div>
              <div className="space-y-1.5">
                {docs.map((doc) => {
                  const cfg = statusConfig[doc.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <div
                      key={doc.id}
                      className="card flex items-center gap-5 px-5 py-3.5 group hover:shadow-paper transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-sm bg-paper-deep flex items-center justify-center shrink-0">
                        <FileText size={15} strokeWidth={1.5} className="text-ink-soft" />
                      </div>
                      <div className="flex-1 min-w-0 grid grid-cols-[2.2fr_1.2fr_0.7fr_0.7fr_0.6fr_28px] gap-4 items-center">
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-mono text-ink truncate">{doc.name}</div>
                          <div className="text-[11px] text-ink-muted tabular mt-0.5 flex items-center gap-2">
                            <span>{fmtTime(doc.uploadedAt)}</span>
                            <span>·</span>
                            <span>{doc.size}</span>
                            <span>·</span>
                            <span className={sourceColors[doc.source]}>{doc.source}</span>
                          </div>
                        </div>
                        <div className="text-[12.5px] text-ink truncate">{doc.client}</div>
                        <div className="text-[12px] text-ink-muted tabular">{doc.year} · {doc.type}</div>
                        <div>
                          <Pill variant={cfg.variant} dot>
                            <StatusIcon size={10} strokeWidth={2} />
                            {doc.status}
                          </Pill>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Sparkles size={10} strokeWidth={1.8} className="text-ochre-500" />
                          <span className={cn(
                            "text-[11px] tabular",
                            doc.confidence >= 0.95 ? "text-emerald-deep" : doc.confidence >= 0.85 ? "text-ochre-700" : "text-crimson-deep"
                          )}>
                            {(doc.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <ArrowUpRight size={13} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-ink/8 grid grid-cols-12 gap-8 text-[12.5px] text-ink-muted leading-relaxed">
          <div className="col-span-4">
            <div className="eyebrow mb-2">Naming convention</div>
            <p>
              <code className="text-[11px] bg-paper-deep px-1 py-0.5 rounded">YEAR_DOCTYPE_SOURCE_CLIENT.pdf</code>
              <br />Applied automatically on arrival to <code className="text-[11px] bg-paper-deep px-1 py-0.5 rounded">/clients/&#123;id&#125;/&#123;year&#125;/&#123;doc-type&#125;/</code> in S3.
            </p>
          </div>
          <div className="col-span-4">
            <div className="eyebrow mb-2">Cross-reference</div>
            <p>Every uploaded doc is checked against open document requests. Matched docs auto-mark the request item received and notify the assigned staff in real time.</p>
          </div>
          <div className="col-span-4">
            <div className="eyebrow mb-2">Confidence flagging</div>
            <p>Low-confidence classifications (&lt; 0.85) surface in the Review Queue with a flag. Never silent misfiling — staff sees what AI was unsure about.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
