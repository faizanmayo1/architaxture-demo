import { Link } from "wouter";
import { Download, Printer, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { TUCKER, TUCKER_STRATEGIES, FIRM } from "../lib/mock-data";
import { fmtUSD, fmtDate } from "../lib/format";

export function TaxPlanPDF({ clientId }: { clientId: number }) {
  const client = TUCKER;
  const strategies = TUCKER_STRATEGIES;
  const recommended = strategies.filter((s) => s.status === "Recommended" || s.status === "Adopted" || s.status === "Under Review");
  const totalSavings = recommended.reduce((s, st) => s + st.estimatedSavings, 0);

  return (
    <div className="animate-fade-up bg-paper-deep min-h-screen pb-16">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-paper border-b border-ink/8 px-10 py-3 flex items-center justify-between">
        <Link to={`/clients/${client.id}/tax-planning`} className="flex items-center gap-1.5 text-[12.5px] text-ink-muted hover:text-ink transition-colors">
          <ArrowLeft size={12} strokeWidth={1.8} />
          Back to Tax Planning
        </Link>
        <div className="text-[11px] text-ink-muted tabular">
          Tax Plan · {client.firstName} {client.lastName} · TY 2025 · Draft v3
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-ink-muted hover:text-ink hover:bg-paper-deep transition-colors rounded-sm">
            <Printer size={11} strokeWidth={1.8} />
            Print
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
            <Download size={11} strokeWidth={1.8} />
            Export PDF
          </button>
        </div>
      </div>

      {/* PDF page — A4-ish */}
      <div className="max-w-[820px] mx-auto pt-10 px-4">
        <div className="paper-doc shadow-paper-md p-12 font-sans">
          {/* Cover */}
          <div className="text-center mb-12 pb-8 border-b-2 border-ink">
            <div className="eyebrow mb-3">{FIRM.name} · Confidential Tax Plan</div>
            <div className="display text-[42px] text-ink leading-tight" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
              Tax Strategy Plan
            </div>
            <div className="display italic text-[26px] text-ink-soft mt-2" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontWeight: 320 }}>
              Jeffrey L. & Marian R. Tucker
            </div>
            <div className="text-[12.5px] text-ink-muted tabular mt-4">
              Prepared {fmtDate(new Date("2026-05-07"), "long")} · Tax Year 2025
            </div>
            <div className="text-[12.5px] text-ink-muted mt-1">
              Tax Manager: Marcus Tate, CPA · POD Alpha
            </div>
          </div>

          {/* Executive summary */}
          <section className="mb-10">
            <div className="eyebrow mb-2">I. Executive Summary</div>
            <h2 className="display text-[22px] text-ink mb-4 leading-snug" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
              Recommended strategies with quantified savings
            </h2>
            <p className="text-[13px] text-ink-soft leading-relaxed mb-5">
              We've evaluated 18 firm-defined strategies against your 2024 return, entity structure, and projected
              2025 income. The recommendations below are sequenced by leverage and ease of implementation. Adopting
              all flagged strategies would reduce your 2025 federal tax by an estimated{" "}
              <span className="text-ink font-medium num">{fmtUSD(totalSavings)}</span>.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-ochre-50/40 rounded-sm p-4 border-l-2 border-ochre-500">
                <div className="eyebrow text-ochre-700 mb-1">Total potential</div>
                <div className="display tabular text-[28px] text-ink leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
                  {fmtUSD(totalSavings, { compact: true })}
                </div>
                <div className="text-[11px] text-ink-muted mt-1">across {recommended.length} strategies</div>
              </div>
              <div className="bg-emerald-soft/40 rounded-sm p-4 border-l-2 border-emerald-deep">
                <div className="eyebrow text-emerald-deep mb-1">Already adopted</div>
                <div className="display tabular text-[28px] text-ink leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
                  {strategies.filter((s) => s.status === "Adopted").length}
                </div>
                <div className="text-[11px] text-ink-muted mt-1">strategies in flight</div>
              </div>
              <div className="bg-paper-deep rounded-sm p-4 border-l-2 border-ink">
                <div className="eyebrow mb-1">Implementation horizon</div>
                <div className="display tabular text-[28px] text-ink leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
                  6–8<span className="text-[14px] text-ink-muted"> wks</span>
                </div>
                <div className="text-[11px] text-ink-muted mt-1">to full adoption</div>
              </div>
            </div>
          </section>

          {/* Strategy detail */}
          <section className="mb-10">
            <div className="eyebrow mb-2">II. Strategy Detail</div>
            <h2 className="display text-[22px] text-ink mb-5 leading-snug" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
              Recommended actions, ranked by leverage
            </h2>

            {recommended.slice(0, 6).map((s, i) => (
              <div key={s.id} className="mb-6 pb-6 border-b border-ink/8 last:border-0">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="display tabular text-[22px] text-ink-faint" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-[19px] text-ink leading-snug flex-1" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40', fontWeight: 400 }}>
                    {s.name}
                  </h3>
                  <div className="text-right">
                    <div className="eyebrow text-[10px]">Est. savings</div>
                    <div className="num text-[18px] text-ink font-medium">{fmtUSD(s.estimatedSavings)}</div>
                  </div>
                </div>
                <p className="text-[12.5px] text-ink-soft leading-relaxed mb-2">{s.description}</p>
                {s.aiNote && (
                  <div className="mt-3 pl-4 border-l-2 border-ochre-500/30 text-[12px] text-ink-muted italic">
                    {s.aiNote}
                  </div>
                )}
                <div className="mt-3 flex items-center gap-3 text-[11px] tabular">
                  <span className="text-ink-muted">Eligibility:</span>
                  <span className="text-ink">{s.eligibility}</span>
                  <span className="text-ink-muted">·</span>
                  <span className="text-ink-muted">Status:</span>
                  <span className="text-ink">{s.status}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Closing */}
          <section className="mb-8">
            <div className="eyebrow mb-2">III. Next Steps</div>
            <h2 className="display text-[22px] text-ink mb-3 leading-snug" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 400 }}>
              What we'd like you to confirm
            </h2>
            <ol className="space-y-2 text-[13px] text-ink-soft list-decimal list-inside">
              <li>Adopt the Augusta Rule strategy — sign the rental agreement we'll send to the portal this week.</li>
              <li>Approve the Cost Segregation engagement letter (separate $5,800 study fee).</li>
              <li>Schedule a 30-minute call to review S-Corp Reasonable Compensation.</li>
              <li>Marian to confirm SECURE 2.0 Roth catch-up election with employer payroll.</li>
            </ol>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-ink/15 text-[10.5px] text-ink-muted leading-relaxed text-center">
            This Tax Plan is prepared for the named taxpayer based on the most recently filed return and projected
            2025 income. Estimates assume current law and no material change in facts. Implementation requires
            execution of supporting documentation by all parties. Aragon Accounting Corporation does not provide
            legal advice; consult counsel as needed.
          </div>
          <div className="mt-3 text-[10px] text-ink-faint text-center tabular">
            <Sparkles size={9} strokeWidth={1.8} className="inline-block text-ochre-500 mr-1" />
            Generated via @react-pdf/renderer · Reviewed by Marcus Tate, CPA · Document ID 2026-TP-0060-v3
          </div>
        </div>

        <div className="text-center mt-8 text-[11px] text-ink-muted tabular">
          Page 1 of 1 · 8.5″ × 11″ · Letter
        </div>
      </div>
    </div>
  );
}
