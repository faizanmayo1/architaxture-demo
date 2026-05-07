import {
  CheckCircle2,
  Clock,
  Sparkles,
  Database,
  Mail,
  CreditCard,
  Briefcase,
  HardDrive,
  FileBarChart2,
  Phone,
  Settings as SettingsIcon,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { INTEGRATIONS, FIRM, STAFF } from "../lib/mock-data";
import { fmtRelativeTime, cn } from "../lib/format";
import type { Integration } from "../lib/types";

const categoryIcons: Record<Integration["category"], typeof Briefcase> = {
  "Practice Management": Briefcase,
  Billing: FileBarChart2,
  Payments: CreditCard,
  Email: Mail,
  Storage: HardDrive,
  "Tax Authority": Database,
  Comms: Phone,
  AI: Sparkles,
};

const stageInfo = [
  { stage: 1, name: "AI-Assisted", model: "Claude API triggered by user action", role: "Reviews and acts on every output", current: true },
  { stage: 2, name: "Supervised Agentic", model: "Multi-step agents with approval gates", role: "Approves before agents act" },
  { stage: 3, name: "Autonomous Agentic", model: "Agents run on cron triggers, take actions", role: "Exception-based oversight only" },
  { stage: 4, name: "Firm Intelligence Layer", model: "Cross-client reasoning and predictive modeling", role: "Strategic decisions only" },
];

export function Settings() {
  const liveCount = INTEGRATIONS.filter((i) => i.status === "Live").length;
  const plannedCount = INTEGRATIONS.filter((i) => i.status === "Planned").length;

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          eyebrow="Settings · Integrations · AI controls"
          title="The plumbing."
          subtitle="External systems wired to ArchiTAXture, the AI evolution stage, and firm preferences. The brief's Section 1.4 is the source of truth."
        />
      </div>

      <div className="px-10 pb-12 max-w-[1280px] space-y-10">
        {/* AI Stage controls */}
        <Card>
          <CardHeader
            eyebrow="AI Evolution · Section 1.1"
            title="Where the firm brain is today"
            description="Stage controls govern how autonomously agents act. Stage advancement is gated by client comfort and audit-trail review. You can downgrade at any time."
          />

          <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mt-4">
            {stageInfo.map((s) => (
              <div key={s.stage} className={cn("p-5 transition-colors", s.current ? "bg-ochre-50/40" : "bg-paper-card")}>
                <div className="flex items-baseline gap-2 mb-2.5">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-mono font-medium",
                    s.current ? "bg-ochre-500 text-paper" : "bg-paper-deep text-ink-muted"
                  )}>
                    {s.stage}
                  </div>
                  {s.current && <Pill variant="ochre" dot>Current</Pill>}
                </div>
                <div className={cn("text-[14px] font-medium", s.current ? "text-ink" : "text-ink-soft")}>{s.name}</div>
                <div className="text-[11.5px] text-ink-muted leading-snug mt-1.5">{s.model}</div>
                <hr className="hairline my-3" />
                <div className="text-[10.5px] eyebrow mb-1">Human role</div>
                <div className="text-[11.5px] text-ink-soft">{s.role}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between p-4 bg-paper-deep rounded-sm">
            <div className="text-[12.5px] text-ink-soft">
              Stage 2 readiness: <span className="text-ink font-medium">28% of agents have ≥30 supervised runs</span>. Recommend continuing Stage 1 for 6–8 weeks.
            </div>
            <button className="text-[12px] text-ink-muted hover:text-ink transition-colors">View readiness report →</button>
          </div>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader
            eyebrow={`${liveCount} live · ${plannedCount} planned`}
            title="External integrations"
            description="The wiring that makes ArchiTAXture useful. Live integrations sync continuously; planned integrations land in the indicated phase."
            action={
              <button className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <RefreshCw size={11} strokeWidth={1.8} />
                Re-sync all
              </button>
            }
          />
          <div className="space-y-1.5 mt-2">
            {INTEGRATIONS.map((int) => {
              const Icon = categoryIcons[int.category];
              const isLive = int.status === "Live";
              return (
                <div
                  key={int.name}
                  className={cn(
                    "flex items-center gap-5 px-5 py-4 rounded-sm border transition-all",
                    isLive ? "bg-paper-card border-ink/8" : "bg-paper-deep/30 border-ink/6 border-dashed"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-sm flex items-center justify-center shrink-0",
                    isLive ? "bg-emerald-soft" : "bg-paper-deep"
                  )}>
                    <Icon size={16} strokeWidth={1.5} className={isLive ? "text-emerald-deep" : "text-ink-faint"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[14px] font-medium text-ink">{int.name}</span>
                      <span className="text-[11px] eyebrow">{int.category}</span>
                      {isLive ? (
                        <Pill variant="emerald" dot>
                          <CheckCircle2 size={9} strokeWidth={2.2} />
                          Live
                        </Pill>
                      ) : (
                        <Pill variant="neutral" dot>
                          <Clock size={9} strokeWidth={2.2} />
                          Planned
                        </Pill>
                      )}
                    </div>
                    <p className="text-[12.5px] text-ink-muted mt-1 leading-relaxed">{int.detail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {int.lastSync && (
                      <>
                        <div className="text-[10.5px] eyebrow">Last sync</div>
                        <div className="text-[12px] text-ink-soft tabular mt-0.5">{fmtRelativeTime(int.lastSync, new Date("2026-05-07T12:00:00Z"))}</div>
                      </>
                    )}
                    {int.invoicesSynced && (
                      <div className="text-[10.5px] text-ink-muted tabular mt-1">{int.invoicesSynced.toLocaleString()} invoices</div>
                    )}
                    {!int.lastSync && (
                      <div className="text-[11px] text-ink-faint italic">Not connected</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Team & PODs */}
        <Card>
          <CardHeader
            eyebrow="Engagement model"
            title={`${FIRM.totalStaff} team members · 2 PODs`}
            description="Staff assignment is at client level (POD, Tax Manager, Senior Tax Staff, Bookkeeper). Sales Rep at engagement level. Admin roles never appear in client dropdowns."
          />
          <div className="grid grid-cols-2 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mt-4">
            {(["Alpha", "Beta"] as const).map((pod) => {
              const podStaff = STAFF.filter((s) => s.pod === pod);
              return (
                <div key={pod} className="bg-paper-card p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="display text-[20px] text-ink" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40', fontWeight: 380 }}>
                      POD {pod}
                    </div>
                    <span className="text-[11px] text-ink-muted tabular">{podStaff.length} members</span>
                  </div>
                  <div className="space-y-2">
                    {podStaff.map((s) => (
                      <div key={s.id} className="flex items-center gap-3 py-1.5 border-b border-ink/6 last:border-0">
                        <div className="w-7 h-7 rounded-full bg-paper-deep flex items-center justify-center text-[10px] font-mono text-ink shrink-0">
                          {s.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12.5px] font-medium text-ink">{s.name}</div>
                          <div className="text-[10.5px] text-ink-muted">{s.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tech stack reference */}
        <Card>
          <CardHeader title="Tech stack" eyebrow="Per the brief, Section 1.3" />
          <div className="grid grid-cols-3 gap-y-3 gap-x-8 text-[13px]">
            {[
              { label: "Frontend", value: "React / TypeScript" },
              { label: "Backend", value: "Node.js / Express" },
              { label: "Database", value: "PostgreSQL on Neon" },
              { label: "ORM", value: "Drizzle" },
              { label: "Hosting", value: "Replit · archi-ta-xture.replit.app" },
              { label: "Doc Storage", value: "AWS S3" },
              { label: "AI Engine", value: "Anthropic Claude (sonnet-4-6)" },
              { label: "Email", value: "SendGrid" },
              { label: "Payments", value: "Stripe (live mode)" },
              { label: "Cron", value: "node-cron" },
              { label: "Routing", value: "Wouter" },
              { label: "Vector (planned)", value: "pgvector on Neon" },
            ].map((t) => (
              <div key={t.label} className="flex items-baseline justify-between border-b border-ink/6 pb-2 gap-3">
                <span className="text-[11px] eyebrow shrink-0">{t.label}</span>
                <span className="text-ink text-right">{t.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
