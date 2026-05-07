import { Link, useLocation } from "wouter";
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER, RECENT_DOCUMENTS } from "../lib/mock-data";
import { fmtDate, fmtTime, fmtRelativeTime, cn } from "../lib/format";

const REQUEST_CHECKLIST = [
  { name: "2024 W-2 (Marian Tucker)", status: "received", category: "Income", receivedAt: "2026-04-12T10:22:00Z" },
  { name: "Schwab 1099 — Brokerage", status: "received", category: "Income", receivedAt: "2026-04-14T16:18:00Z" },
  { name: "Tucker Holdings 1120S K-1", status: "received", category: "Pass-through", receivedAt: "2026-04-22T09:14:00Z" },
  { name: "Tucker Family RE Partnership K-1", status: "received", category: "Pass-through", receivedAt: "2026-05-07T02:14:00Z" },
  { name: "Bayshore rental statements", status: "received", category: "Real Estate", receivedAt: "2026-04-28T14:00:00Z" },
  { name: "SEP IRA contribution receipt", status: "received", category: "Retirement", receivedAt: "2026-04-15T11:30:00Z" },
  { name: "Charitable giving statements", status: "received", category: "Deductions", receivedAt: "2026-04-26T09:42:00Z" },
  { name: "Mortgage Form 1098", status: "received", category: "Deductions", receivedAt: "2026-04-18T13:08:00Z" },
  { name: "Property tax receipts", status: "received", category: "Deductions", receivedAt: "2026-04-18T13:09:00Z" },
  { name: "Property insurance binder · Bayshore", status: "received", category: "Real Estate", receivedAt: "2026-04-30T10:00:00Z" },
  { name: "Solo HSA contribution statements", status: "received", category: "Retirement", receivedAt: "2026-04-21T15:14:00Z" },
  { name: "2023 estimated tax confirmations", status: "received", category: "Payments", receivedAt: "2026-04-08T08:00:00Z" },
  { name: "Marian's W-2 corrected (W-2c)", status: "received", category: "Income", receivedAt: "2026-04-19T11:11:00Z" },
  { name: "2026 Q1 estimated tax wire confirmation", status: "outstanding", category: "Payments" },
];

const tuckerDocs = RECENT_DOCUMENTS.filter((d) => d.clientId === 60);

export function ClientDocuments({ clientId }: { clientId: number }) {
  const [location] = useLocation();
  const client = TUCKER;
  const received = REQUEST_CHECKLIST.filter((r) => r.status === "received").length;
  const total = REQUEST_CHECKLIST.length;
  const completion = (received / total) * 100;

  const tabs = [
    { label: "Overview", path: `/clients/${client.id}` },
    { label: "Forecasts", path: `/clients/${client.id}/forecast` },
    { label: "Tax Planning", path: `/clients/${client.id}/tax-planning` },
    { label: "Documents", path: `/clients/${client.id}/documents`, active: true },
    { label: "Engagements", path: `/clients/${client.id}/engagements` },
    { label: "Communications", path: `/clients/${client.id}/communications` },
  ];

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Documents" },
          ]}
          eyebrow={`Document Request · TY 2024 · ${received}/${total} received`}
          title={
            <>
              <span className="block">Tucker's</span>
              <span className="italic">
                paper trail.
              </span>
            </>
          }
          subtitle="Document request checklist with portal upload, AI auto-classification, and source-document storage. Per-client view of the firm-wide document intelligence."
          action={
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
              <Upload size={12} strokeWidth={1.8} />
              Upload document
            </button>
          }
        />
      </div>

      {/* Tabs */}
      <div className="px-10 border-b border-ink/8 sticky top-0 z-20 bg-paper">
        <div className="flex items-end gap-1 max-w-[1280px]">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                "px-4 py-3 text-[13px] tracking-tight transition-colors relative",
                tab.active ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {tab.label}
              {tab.active && <span className="absolute left-0 right-0 bottom-0 h-px bg-ochre-500" />}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-10 py-10 max-w-[1280px]">
        {/* Progress strip */}
        <div className="mb-8 grid grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden">
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Received</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none">
              {received}<span className="text-[18px] text-ink-muted">/{total}</span>
            </div>
            <div className="mt-3 h-1.5 bg-paper-deep rounded-full overflow-hidden">
              <div className="h-full bg-emerald-deep transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Outstanding</div>
            <div className="display tabular text-[36px] text-ochre-700 mt-1.5 leading-none">
              1
            </div>
            <div className="text-[11.5px] text-ink-muted tabular mt-2">Q1 estimated tax wire confirmation</div>
          </div>
          <div className="bg-paper-card p-5">
            <div className="eyebrow">Last upload</div>
            <div className="display text-[20px] text-ink mt-1.5 leading-tight">
              Tucker Family RE K-1
            </div>
            <div className="text-[11.5px] text-ink-muted tabular mt-2">Today, 2:14 AM via Portal</div>
          </div>
        </div>

        {/* Two columns: checklist + recent uploads */}
        <div className="grid grid-cols-3 gap-6">
          {/* Checklist */}
          <div className="col-span-2">
            <Card padded={false} className="overflow-hidden">
              <div className="px-6 py-5 border-b border-ink/8 flex items-baseline justify-between">
                <div>
                  <div className="eyebrow">Document Request Checklist · TY 2024</div>
                  <h3 className="display text-[20px] text-ink mt-1">
                    Auto-generated from prior-year return + Tucker's intake
                  </h3>
                </div>
              </div>
              <div>
                {REQUEST_CHECKLIST.map((item, i) => {
                  const isReceived = item.status === "received";
                  return (
                    <div
                      key={i}
                      className={cn(
                        "px-6 py-3 border-b border-ink/6 last:border-0 flex items-center gap-4 group hover:bg-paper-deep/30 transition-colors",
                        isReceived && "opacity-90"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                        isReceived ? "bg-emerald-deep border-emerald-deep" : "border-ink/20"
                      )}>
                        {isReceived && <CheckCircle2 size={11} strokeWidth={2.4} className="text-paper" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={cn("text-[13px]", isReceived ? "text-ink-soft line-through decoration-ink/20" : "text-ink font-medium")}>
                          {item.name}
                        </div>
                        <div className="text-[11px] text-ink-muted mt-0.5 tabular">
                          {item.category}
                          {isReceived && item.receivedAt && (
                            <span> · received {fmtRelativeTime(item.receivedAt, new Date("2026-05-07T08:00:00Z"))}</span>
                          )}
                        </div>
                      </div>
                      {isReceived ? (
                        <Pill variant="emerald">Received</Pill>
                      ) : (
                        <button className="text-[11.5px] text-ochre-700 hover:text-ochre-800 transition-colors flex items-center gap-1">
                          <Sparkles size={10} strokeWidth={1.8} />
                          AI follow-up draft
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Recent uploads */}
          <div className="col-span-1">
            <Card>
              <CardHeader title="Recent uploads" eyebrow="Tucker · last 7 days" />
              <div className="space-y-2 mt-2">
                {tuckerDocs.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3 py-2.5 border-b border-ink/6 last:border-0 group cursor-pointer">
                    <FileText size={14} strokeWidth={1.5} className="text-ink-muted mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-mono text-ink truncate">{doc.name}</div>
                      <div className="text-[10.5px] text-ink-muted tabular mt-0.5 flex items-center gap-1.5">
                        <span>{fmtDate(doc.uploadedAt, "month-day")}</span>
                        <span>·</span>
                        <span>{doc.size}</span>
                        <Sparkles size={9} strokeWidth={1.8} className="text-ochre-500 ml-auto" />
                        <span className="text-emerald-deep">{(doc.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mt-6">
              <CardHeader title="Portal status" eyebrow="Magic-link auth" />
              <div className="text-[12.5px] space-y-2.5 mt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-ink-muted">Portal access</span>
                  <Pill variant="emerald" dot>Active</Pill>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-ink-muted">Last login</span>
                  <span className="text-ink tabular">Today, 2:13 AM</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-ink-muted">Subdomain</span>
                  <span className="text-ink tabular text-[11px]">portal.aragon</span>
                </div>
              </div>
              <Link
                to="/portal"
                className="mt-4 w-full px-3 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors rounded-sm flex items-center justify-center gap-1.5"
              >
                View as Jeffrey
                <ArrowUpRight size={11} strokeWidth={1.8} />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
