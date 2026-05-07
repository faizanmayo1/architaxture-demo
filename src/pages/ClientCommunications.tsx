import { Link } from "wouter";
import {
  MessageSquare,
  Mail,
  Phone,
  Video,
  FileText,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER } from "../lib/mock-data";
import { fmtRelativeTime, fmtDate, fmtTime, cn, initialsOf } from "../lib/format";

type CommType = "email" | "meeting" | "sms" | "portal";

const COMMS = [
  {
    id: "c1",
    type: "email" as CommType,
    direction: "outbound",
    subject: "Final K-1 received — return ready to file",
    preview: "Jeffrey, your Tucker Family RE K-1 came in this morning at 2 AM and we've now completed all extraction. Augusta Rule playbook is at 40% and we'll have the rental agreement…",
    when: "2026-05-07T08:14:00Z",
    from: "Marcus Tate",
    aiActionItems: ["Schedule e-file review", "Send rental agreement for signature"],
  },
  {
    id: "c2",
    type: "meeting" as CommType,
    direction: "internal",
    subject: "Q2 Strategy Review · 60 min",
    preview: "Discussed Augusta Rule progress, Cost Segregation timeline, MAGI thresholds for NIIT. Action items extracted from Fathom transcript. Marian unable to attend, follow-up scheduled.",
    when: "2026-04-28T14:00:00Z",
    from: "Fathom · Auto-transcribed",
    aiActionItems: ["Confirm Cost Segregation engagement letter — Marcus", "Send MAGI projection — Priya"],
  },
  {
    id: "c3",
    type: "portal" as CommType,
    direction: "inbound",
    subject: "Tucker uploaded: 2024_K1_TuckerFamilyRE.pdf",
    preview: "Document classified by AI as K-1 (Form 1065). Routed to /clients/60/2024/k1/. Cross-referenced against open document request — request item auto-marked received.",
    when: "2026-05-07T02:14:00Z",
    from: "Client portal",
  },
  {
    id: "c4",
    type: "email" as CommType,
    direction: "outbound",
    subject: "Q1 estimated tax payment confirmation request",
    preview: "Hi Jeffrey, can you forward the wire confirmation for the Q1 2026 estimated tax payment ($54,000)? We have everything else for the return…",
    when: "2026-05-04T10:22:00Z",
    from: "Priya Raman",
  },
  {
    id: "c5",
    type: "sms" as CommType,
    direction: "outbound",
    subject: "Reminder: rental agreement signature due Wed",
    preview: "Jeffrey — quick heads up that the Augusta Rule rental agreement we drafted needs your e-signature by Wed 5/12 to keep the strategy on track. Link in your portal.",
    when: "2026-05-06T11:00:00Z",
    from: "Marcus Tate",
  },
  {
    id: "c6",
    type: "meeting" as CommType,
    direction: "internal",
    subject: "Tax planning conversation · 45 min",
    preview: "Reviewed 18-strategy plan. Augusta Rule, Cost Segregation, S-Corp comp adjustment recommended. Donor-Advised Fund stacking discussed and deferred to Q4 2026.",
    when: "2026-04-12T16:30:00Z",
    from: "Fathom · Auto-transcribed",
    aiActionItems: ["Initiate Augusta Rule playbook — Marcus", "Get RCReports analysis for S-Corp comp — Priya"],
  },
];

const typeConfig: Record<CommType, { icon: typeof MessageSquare; color: string; label: string }> = {
  email: { icon: Mail, color: "text-sky-deep bg-sky-soft", label: "Email" },
  meeting: { icon: Video, color: "text-ochre-700 bg-ochre-50", label: "Meeting" },
  sms: { icon: MessageSquare, color: "text-emerald-deep bg-emerald-soft", label: "SMS" },
  portal: { icon: FileText, color: "text-ink-soft bg-paper-deep", label: "Portal" },
};

export function ClientCommunications({ clientId }: { clientId: number }) {
  const client = TUCKER;


  const sortedComms = [...COMMS].sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime());

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Communications" },
          ]}
          eyebrow="Unified communication record · 6 touchpoints in last 30 days"
          title="Every conversation."
          subtitle="Email threads (per-staff Gmail sync), meeting transcripts (Fathom), portal messages, SMS (Twilio). AI extracts action items from every touchpoint and routes them to the right owner."
          action={
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
              <Mail size={12} strokeWidth={1.8} />
              New email
            </button>
          }
        />
      </div>

      <div className="px-10 py-10 max-w-[1280px]">
        {/* Phase 8 banner */}
        <div className="mb-8 border border-sky-deep/20 bg-sky-soft/30 rounded-sm p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-sky-soft flex items-center justify-center shrink-0">
            <Sparkles size={14} strokeWidth={1.8} className="text-sky-deep" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-[14px] font-medium text-ink">Communication Integrations</span>
              <Pill variant="sky">Phase 8 · pgvector RAG</Pill>
            </div>
            <p className="text-[13px] text-ink-soft leading-relaxed">
              Fathom transcripts, Gmail per-staff sync, and Twilio SMS deliver a unified communication
              record. Vector-indexed via pgvector — AI can reason across every interaction with this
              client when planning. Phase 8 build (4–6 weeks).
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {sortedComms.map((comm) => {
            const cfg = typeConfig[comm.type];
            const Icon = cfg.icon;
            return (
              <Card key={comm.id} className="hover:shadow-paper transition-all">
                <div className="flex items-start gap-5">
                  <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center shrink-0", cfg.color)}>
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap mb-1">
                      <span className="eyebrow text-[10px]">{cfg.label} · {comm.direction}</span>
                      <span className="text-[10.5px] text-ink-faint tabular">{fmtDate(comm.when, "month-day")} · {fmtTime(comm.when)}</span>
                      {comm.aiActionItems && (
                        <Pill variant="ochre">
                          <Sparkles size={9} strokeWidth={1.8} />
                          {comm.aiActionItems.length} action items
                        </Pill>
                      )}
                    </div>
                    <h3 className="text-[14.5px] font-medium text-ink leading-snug">{comm.subject}</h3>
                    <p className="text-[12.5px] text-ink-muted mt-2 leading-relaxed line-clamp-2">{comm.preview}</p>
                    <div className="text-[11.5px] text-ink-faint mt-2 tabular">via {comm.from}</div>

                    {comm.aiActionItems && (
                      <div className="mt-3 pt-3 border-t border-ink/6">
                        <div className="eyebrow text-[10px] mb-2">AI-extracted action items</div>
                        <ul className="space-y-1.5">
                          {comm.aiActionItems.map((a, i) => (
                            <li key={i} className="text-[12px] text-ink-soft flex items-start gap-2">
                              <CheckCircle2 size={11} strokeWidth={1.8} className="text-emerald-deep mt-0.5 shrink-0" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
