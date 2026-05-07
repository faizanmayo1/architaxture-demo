import { Link } from "wouter";
import { useState } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpRight,
  Star,
  AlertOctagon,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { ALL_CLIENTS, FIRM, STAFF } from "../lib/mock-data";
import { fmtUSD, fmtRelativeTime, cn, initialsOf } from "../lib/format";
import type { Client } from "../lib/types";

const tierStyle: Record<Client["tier"], string> = {
  Diamond: "text-ochre-700 font-medium",
  Platinum: "text-ink",
  Gold: "text-ink-soft",
  Silver: "text-ink-muted",
};

export function ClientsList() {
  const [filter, setFilter] = useState<"all" | "alpha" | "beta">("all");
  const [search, setSearch] = useState("");

  const clients = ALL_CLIENTS.filter((c) => {
    if (filter === "alpha" && c.pod !== "Alpha") return false;
    if (filter === "beta" && c.pod !== "Beta") return false;
    if (search && !`${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Sort Tucker first, then by tier
  const sorted = [...clients].sort((a, b) => {
    if (a.id === 60) return -1;
    if (b.id === 60) return 1;
    const tierOrder = { Diamond: 0, Platinum: 1, Gold: 2, Silver: 3 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          eyebrow={`${FIRM.totalClients} active clients · 2 PODs · 17 staff`}
          title={
            <>
              <span className="block">The book.</span>
            </>
          }
          subtitle={`Diamond and Platinum tiers represent ${Math.round((4 / 7) * 100)}% of revenue at ${ALL_CLIENTS.length} of ${FIRM.totalClients} clients shown — full firm view requires Phase 0 stabilization.`}
        />
      </div>

      <div className="px-10 pb-12 max-w-[1280px]">
        {/* Filter strip */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="pl-9 pr-3 py-2 w-full text-[13px] bg-paper-card border border-ink/10 rounded-sm focus:outline-none focus:border-ink/25 placeholder:text-ink-faint"
            />
          </div>
          <div className="flex items-center gap-1 ml-2">
            {[
              { id: "all", label: "All" },
              { id: "alpha", label: "POD Alpha" },
              { id: "beta", label: "POD Beta" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={cn(
                  "px-3 py-1.5 text-[12px] rounded-sm transition-colors",
                  filter === f.id ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-[12px] text-ink-muted hover:text-ink hover:bg-paper-deep transition-colors rounded-sm">
            <SlidersHorizontal size={12} strokeWidth={1.6} />
            More filters
          </button>
        </div>

        {/* Client table */}
        <Card padded={false} className="overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr_1fr_60px] text-[10.5px] eyebrow border-b border-ink/8 px-7 py-3.5 bg-paper-deep/40">
            <div>Client</div>
            <div>Tier</div>
            <div>Engagement Team</div>
            <div>Status</div>
            <div className="text-right">Annual Revenue</div>
            <div className="text-right">Health</div>
            <div></div>
          </div>
          <div>
            {sorted.map((client) => {
              const isTucker = client.id === 60;
              const docCompletion = client.documentsRequested
                ? Math.round((client.documentsReceived! / client.documentsRequested) * 100)
                : 0;
              return (
                <Link
                  key={client.id}
                  to={`/clients/${client.id}`}
                  className={cn(
                    "grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr_1fr_60px] px-7 py-4 border-b border-ink/6 group hover:bg-paper-deep/30 transition-colors items-center",
                    isTucker && "bg-ochre-50/40"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-mono font-medium shrink-0",
                      isTucker ? "bg-ochre-500 text-paper" : "bg-paper-deep text-ink-soft"
                    )}>
                      {initialsOf(`${client.firstName} ${client.lastName}`)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13.5px] font-medium text-ink truncate">
                          {client.firstName} {client.lastName}
                        </span>
                        {isTucker && <Pill variant="ochre">Demo client</Pill>}
                        {client.hasOpenIRSNotice && <AlertOctagon size={11} strokeWidth={1.8} className="text-crimson-deep" />}
                      </div>
                      <div className="text-[11px] text-ink-muted tabular mt-0.5">
                        #{String(client.id).padStart(4, "0")} · {client.city}, {client.state} · POD {client.pod}
                      </div>
                    </div>
                  </div>
                  <div className={cn("text-[12.5px]", tierStyle[client.tier])}>
                    {client.tier === "Diamond" && <Star size={10} strokeWidth={2} className="inline mr-1 text-ochre-500" />}
                    {client.tier}
                  </div>
                  <div className="text-[12px] text-ink-muted truncate">
                    <span className="text-ink-soft">{client.taxManager}</span>
                    {client.taxStaff && <span className="text-ink-faint"> · {client.taxStaff.split(" ").map(p => p[0]).join("")}</span>}
                  </div>
                  <div>
                    <Pill variant={client.status === "Filed" ? "emerald" : client.status === "In Progress" ? "sky" : "neutral"} dot>
                      {client.status}
                    </Pill>
                  </div>
                  <div className="text-right num text-[13.5px] text-ink">
                    {fmtUSD(client.annualRevenue)}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-12 h-1 bg-paper-deep rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all",
                            client.healthScore >= 80 ? "bg-emerald-deep" : client.healthScore >= 65 ? "bg-ochre-500" : "bg-crimson-deep"
                          )}
                          style={{ width: `${client.healthScore}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] tabular text-ink-soft w-7 text-right">{client.healthScore}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <ArrowUpRight size={13} strokeWidth={1.5} className="text-ink-faint group-hover:text-ochre-600 transition-colors inline-block" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Footer note */}
        <div className="mt-6 text-[12px] text-ink-muted px-1">
          Showing {sorted.length} of {FIRM.totalClients} active clients · Demo dataset focused on Tucker (#0060) and engagement-team peers.
        </div>
      </div>
    </div>
  );
}
