import { Link, useLocation } from "wouter";
import {
  Printer,
  Download,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Pill } from "../components/ui/Pill";
import { TUCKER, TUCKER_K1S } from "../lib/mock-data";
import { fmtUSD, fmtPctRaw, cn } from "../lib/format";

// Single-source 2024 numbers feeding the dashboard
const TAX_DATA = {
  filingStatus: "Married Filing Jointly",
  taxYear: 2024,
  agi: 779320,
  taxableIncome: 627400,
  totalTax: 215760,
  effectiveRate: 0.276,
  marginalRate: 0.37,
  refund: 27040,
};

const ORDINARY_BRACKETS_MFJ = [
  { rate: 0.10, lo: 0, hi: 23200 },
  { rate: 0.12, lo: 23200, hi: 94300 },
  { rate: 0.22, lo: 94300, hi: 201050 },
  { rate: 0.24, lo: 201050, hi: 383900 },
  { rate: 0.32, lo: 383900, hi: 487450 },
  { rate: 0.35, lo: 487450, hi: 731200 },
  { rate: 0.37, lo: 731200, hi: Infinity },
];

const LTCG_BRACKETS_MFJ = [
  { rate: 0.0, lo: 0, hi: 94050 },
  { rate: 0.15, lo: 94050, hi: 583750 },
  { rate: 0.20, lo: 583750, hi: Infinity },
];

export function TaxDashboard({ clientId }: { clientId: number }) {
  const [location] = useLocation();
  const client = TUCKER;


  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="px-10 pt-10 max-w-[1280px]">
        <PageHeader
          breadcrumb={[
            { label: "Clients", to: "/clients" },
            { label: `${client.firstName} ${client.lastName}`, to: `/clients/${client.id}` },
            { label: "Tax Dashboard" },
          ]}
          eyebrow={`Tax Dashboard · TY ${TAX_DATA.taxYear} · ${TAX_DATA.filingStatus} · 15 sections`}
          title="The full tax picture."
          subtitle="Built from extracted 2024 return data. Marginal brackets, Schedule D, K-1 pass-through, MAGI thresholds, payments vs liability — everything a Tax Manager looks at, in one place."
          action={
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium border border-ink/15 hover:bg-paper-deep transition-colors text-ink rounded-sm">
                <Printer size={12} strokeWidth={1.8} />
                Print mode
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                <Download size={12} strokeWidth={1.8} />
                Export Tax Report PDF
              </button>
            </div>
          }
        />
      </div>

      <div className="px-10 py-10 max-w-[1280px]">
        {/* Top header strip — 4 anchor stats */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">AGI · 2024</div>
            <div className="display tabular text-[34px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(TAX_DATA.agi, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">Form 1040 line 11</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Total Federal Tax</div>
            <div className="display tabular text-[34px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(TAX_DATA.totalTax, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">incl. SE + NIIT + Add'l Medicare</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Effective Rate</div>
            <div className="display tabular text-[34px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtPctRaw(TAX_DATA.effectiveRate * 100, 1)}
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">Marginal: {fmtPctRaw(TAX_DATA.marginalRate * 100, 0)}</div>
          </div>
          <div className="bg-emerald-soft/40 p-6">
            <div className="eyebrow text-emerald-deep">Refund · 2024</div>
            <div className="display tabular text-[34px] text-emerald-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {fmtUSD(TAX_DATA.refund, { compact: true })}
            </div>
            <div className="text-[11px] text-ink-muted mt-2 tabular">overpaid via Q1–Q4 estimates</div>
          </div>
        </div>

        {/* The 15 sections — grid of focused panels */}
        <div className="grid grid-cols-12 gap-6">
          {/* Section 1 — Ordinary income brackets */}
          <Section number={1} title="Ordinary income · marginal brackets" subtitle="MFJ · 2024" colSpan={6}>
            <BracketTable brackets={ORDINARY_BRACKETS_MFJ} taxableIncome={TAX_DATA.taxableIncome} />
          </Section>

          {/* Section 2 — LTCG brackets */}
          <Section number={2} title="LTCG / Qualified Dividends" subtitle="MFJ · 2024" colSpan={6}>
            <BracketTable brackets={LTCG_BRACKETS_MFJ} taxableIncome={TAX_DATA.taxableIncome} />
          </Section>

          {/* Section 3 — W-2 income */}
          <Section number={3} title="W-2 wages" subtitle="Marian Tucker · Trent Medical Group" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="Box 1 — Wages" value={fmtUSD(168000)} />
              <Row label="Box 2 — Federal w/h" value={fmtUSD(34800)} />
              <Row label="Box 3 — SS wages" value={fmtUSD(168000)} />
              <Row label="Box 5 — Medicare" value={fmtUSD(168000)} />
              <Row label="Box 12 — 401(k)" value={fmtUSD(23000)} />
            </div>
          </Section>

          {/* Section 4 — Schedule D */}
          <Section number={4} title="Schedule D · Capital gains" subtitle="Net LT + ST gain/loss" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="ST gain (loss)" value={fmtUSD(-4200, { sign: true })} />
              <Row label="LT gain" value={fmtUSD(72000, { sign: true })} />
              <Row label="LT loss carryover" value={fmtUSD(-8200, { sign: true })} />
              <Row label="LT gain (net)" value={fmtUSD(63800)} bold />
              <Row label="Net capital gain" value={fmtUSD(67800)} bold />
            </div>
          </Section>

          {/* Section 5 — K-1 pass-through */}
          <Section number={5} title="K-1 pass-through" subtitle="3 entities · Tucker stake only" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              {TUCKER_K1S.slice(0, 1).map((k) => (
                <Row key={k.partnerName} label={`${k.partnerName.split(" ")[0]} · TFREP`} value={fmtUSD(k.ordinaryIncome)} />
              ))}
              <Row label="Tucker Holdings (S-Corp)" value={fmtUSD(184500)} />
              <Row label="Bayshore (LLC, disregarded)" value={fmtUSD(38400)} />
              <Row label="Total K-1 income" value={fmtUSD(407400)} bold />
            </div>
          </Section>

          {/* Section 6 — SE tax */}
          <Section number={6} title="Self-employment tax" subtitle="Schedule SE" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="Net SE earnings" value={fmtUSD(108620)} />
              <Row label="SS portion (12.4%, capped)" value={fmtUSD(11424)} />
              <Row label="Medicare (2.9%)" value={fmtUSD(3150)} />
              <Row label="Add'l Medicare (0.9%)" value={fmtUSD(2266)} />
              <Row label="Total SE tax" value={fmtUSD(16840)} bold />
              <Row label="½ SE deduction" value={fmtUSD(-8420, { sign: true })} />
            </div>
          </Section>

          {/* Section 7 — Deductions */}
          <Section number={7} title="Deductions" subtitle="Itemized · Schedule A + above-the-line" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="State + property tax (SALT cap)" value={fmtUSD(10000)} />
              <Row label="Mortgage interest" value={fmtUSD(14800)} />
              <Row label="Charitable contributions" value={fmtUSD(7300)} />
              <Row label="Itemized total" value={fmtUSD(32100)} bold />
              <hr className="hairline" />
              <Row label="SEP IRA" value={fmtUSD(-69000, { sign: true })} />
              <Row label="QBI deduction" value={fmtUSD(-42600, { sign: true })} />
            </div>
          </Section>

          {/* Section 8 — Credits */}
          <Section number={8} title="Credits applied" subtitle="Non-refundable + refundable" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="Child Tax Credit (2 kids)" value={fmtUSD(4000)} />
              <Row label="Foreign Tax Credit" value={fmtUSD(380)} />
              <Row label="Total credits" value={fmtUSD(4380)} bold />
              <hr className="hairline" />
              <div className="text-[11.5px] text-ink-muted leading-relaxed">
                AMT credit carryforward: <span className="text-ink num">{fmtUSD(2100)}</span>
              </div>
            </div>
          </Section>

          {/* Section 9 — MAGI analysis */}
          <Section number={9} title="MAGI analysis" subtitle="§1411 NIIT · §36B premium · IRMAA" colSpan={6}>
            <div className="space-y-2.5 text-[13px]">
              <ThresholdRow label="MAGI" value={779320} threshold={250000} thresholdLabel="NIIT (MFJ)" />
              <ThresholdRow label="MAGI" value={779320} threshold={485460} thresholdLabel="Add'l Medicare 0.9%" />
              <ThresholdRow label="MAGI" value={779320} threshold={750000} thresholdLabel="IRMAA Tier 4 (Medicare Part B/D)" />
              <ThresholdRow label="MAGI" value={779320} threshold={206000} thresholdLabel="QBI phase-in (MFJ)" />
            </div>
            <div className="mt-4 pt-3 border-t border-ink/6 text-[11.5px] text-ink-muted leading-relaxed">
              <Sparkles size={10} strokeWidth={1.8} className="inline-block text-ochre-500 mr-1" />
              Tucker exceeds NIIT threshold by $529k → $7,180 NIIT applied. Strategy: time investment income recognition.
            </div>
          </Section>

          {/* Section 10 — Estimated payments vs liability */}
          <Section number={10} title="Payments vs liability" subtitle="2024 · safe-harbor analysis" colSpan={6}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-[13px]">
                <Row label="Q1 paid · 04/15" value={fmtUSD(52000)} />
                <Row label="Q2 paid · 06/15" value={fmtUSD(52000)} />
                <Row label="Q3 paid · 09/15" value={fmtUSD(52000)} />
                <Row label="Q4 paid · 01/15/25" value={fmtUSD(52000)} />
                <Row label="W-2 withholding" value={fmtUSD(34800)} />
                <Row label="Total paid" value={fmtUSD(242800)} bold />
              </div>
              <div className="space-y-2 text-[13px] pl-5 border-l border-ink/6">
                <Row label="Total tax owed" value={fmtUSD(215760)} />
                <Row label="(Refund)" value={fmtUSD(27040)} bold />
                <hr className="hairline my-2" />
                <div className="text-[11px] text-ink-muted leading-relaxed">
                  Safe harbor met: 110% prior year liability. No underpayment penalty.
                </div>
                <Pill variant="emerald" dot>Safe harbor cleared</Pill>
              </div>
            </div>
          </Section>

          {/* Section 11 — Form 7203 stock basis */}
          <Section number={11} title="Form 7203 · S-Corp basis" subtitle="Tucker Holdings LLC · 100% owner" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="Stock basis BOY" value={fmtUSD(184200)} />
              <Row label="+ Income items" value={fmtUSD(348900)} />
              <Row label="− Distributions" value={fmtUSD(-280000, { sign: true })} />
              <Row label="Stock basis EOY" value={fmtUSD(253100)} bold />
              <Row label="Suspended losses" value={fmtUSD(0)} />
            </div>
          </Section>

          {/* Section 12 — Carryforwards */}
          <Section number={12} title="Carryforwards" subtitle="Across all 5 form types · 17 fields" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="LT capital loss · 2022" value={fmtUSD(-31800, { sign: true })} />
              <Row label="LT capital loss · 2023" value={fmtUSD(-8200, { sign: true })} />
              <Row label="Federal NOL · 2021" value={fmtUSD(-22600, { sign: true })} />
              <Row label="§179 disallowed" value={fmtUSD(-8400, { sign: true })} />
              <Row label="Passive loss · Bayshore" value={fmtUSD(-14200, { sign: true })} />
              <Row label="AMT credit" value={fmtUSD(2100)} />
            </div>
          </Section>

          {/* Section 13 — AMT analysis */}
          <Section number={13} title="AMT analysis" subtitle="Alternative Minimum Tax exposure" colSpan={4}>
            <div className="space-y-2 text-[13px]">
              <Row label="AMTI" value={fmtUSD(721400)} />
              <Row label="AMT exemption (MFJ)" value={fmtUSD(-133300, { sign: true })} />
              <Row label="AMTI taxable" value={fmtUSD(588100)} />
              <Row label="Tentative AMT" value={fmtUSD(164668)} />
              <Row label="Regular tax (line 16)" value={fmtUSD(188220)} />
              <hr className="hairline" />
              <Row label="AMT owed" value={fmtUSD(0)} bold />
              <div className="text-[11px] text-ink-muted">Regular tax exceeds AMT — no AMT triggered.</div>
            </div>
          </Section>

          {/* Section 14 — Year-over-year */}
          <Section number={14} title="Year-over-year" subtitle="2022 → 2023 → 2024" colSpan={6}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-ink/8">
                  <th className="text-left py-2 eyebrow text-[10px]">Metric</th>
                  <th className="text-right py-2 eyebrow text-[10px]">2022</th>
                  <th className="text-right py-2 eyebrow text-[10px]">2023</th>
                  <th className="text-right py-2 eyebrow text-[10px]">2024</th>
                  <th className="text-right py-2 eyebrow text-[10px]">2y Δ</th>
                </tr>
              </thead>
              <tbody className="text-ink-soft">
                {[
                  { label: "AGI", v: [612400, 698800, 779320] },
                  { label: "Taxable income", v: [488200, 558100, 627400] },
                  { label: "Total tax", v: [161200, 188400, 215760] },
                  { label: "Effective rate", v: [26.3, 27.0, 27.6], pct: true },
                ].map((r) => (
                  <tr key={r.label} className="border-b border-ink/6">
                    <td className="py-2 text-ink">{r.label}</td>
                    <td className="py-2 text-right num">{r.pct ? `${r.v[0]}%` : fmtUSD(r.v[0], { compact: true })}</td>
                    <td className="py-2 text-right num">{r.pct ? `${r.v[1]}%` : fmtUSD(r.v[1], { compact: true })}</td>
                    <td className="py-2 text-right num text-ink font-medium">{r.pct ? `${r.v[2]}%` : fmtUSD(r.v[2], { compact: true })}</td>
                    <td className="py-2 text-right num text-emerald-deep">
                      {r.pct ? `+${(r.v[2] - r.v[0]).toFixed(1)}pt` : fmtUSD(r.v[2] - r.v[0], { compact: true, sign: true })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Section 15 — AI insights */}
          <Section number={15} title="AI surfaced insights" subtitle="From this dashboard" colSpan={6} accent>
            <ul className="space-y-3 text-[13px] text-ink-soft">
              {[
                { icon: TrendingUp, text: "AGI up 27% over 2 years — top marginal bracket persists. Augusta Rule + Cost Segregation could reduce 2025 tax by $43k." },
                { icon: AlertCircle, text: "MAGI breaches NIIT threshold by $529k. Time bond interest recognition to Q1 2026 to manage." },
                { icon: CheckCircle2, text: "Safe harbor met for Q1–Q4 2024. Q1 2025 estimate of $54k recommended (110% rule)." },
                { icon: Sparkles, text: "S-Corp distribution-to-wage ratio appears low. RCReports market check recommends $112–128k W-2 range." },
              ].map((i, idx) => {
                const Icon = i.icon;
                return (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <Icon size={11} strokeWidth={1.8} className="text-ochre-700 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{i.text}</span>
                  </li>
                );
              })}
            </ul>
            <Link
              to={`/clients/${client.id}/tax-planning`}
              className="mt-4 text-[12.5px] text-ochre-700 hover:text-ochre-800 flex items-center gap-1.5"
            >
              Open Tax Planning to act
              <ArrowUpRight size={12} strokeWidth={1.8} />
            </Link>
          </Section>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────

function Section({
  number,
  title,
  subtitle,
  children,
  colSpan = 4,
  accent = false,
}: {
  number: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  colSpan?: 3 | 4 | 6 | 8 | 12;
  accent?: boolean;
}) {
  return (
    <div className={cn(
      "card p-6",
      accent && "ring-1 ring-ochre-500/30 bg-ochre-50/30",
      colSpan === 12 && "col-span-12",
      colSpan === 8 && "col-span-8",
      colSpan === 6 && "col-span-6",
      colSpan === 4 && "col-span-4",
      colSpan === 3 && "col-span-3"
    )}>
      <div className="flex items-baseline gap-3 mb-3 pb-3 border-b border-ink/6">
        <span className="display tabular text-[16px] text-ink-faint shrink-0" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
          {String(number).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-ink leading-snug">{title}</div>
          {subtitle && <div className="text-[10.5px] eyebrow mt-0.5">{subtitle}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn(
      "flex items-baseline justify-between gap-3 py-1",
      bold && "border-t border-ink/8 pt-2 font-medium"
    )}>
      <span className={cn("text-[12.5px]", bold ? "text-ink" : "text-ink-muted")}>{label}</span>
      <span className={cn("num text-[13px]", bold ? "text-ink" : "text-ink-soft")}>{value}</span>
    </div>
  );
}

function BracketTable({ brackets, taxableIncome }: { brackets: { rate: number; lo: number; hi: number }[]; taxableIncome: number }) {
  return (
    <div className="space-y-1.5">
      {brackets.map((b, i) => {
        const inBracket = taxableIncome >= b.lo && taxableIncome < b.hi;
        const passed = taxableIncome >= b.hi;
        return (
          <div
            key={i}
            className={cn(
              "flex items-baseline gap-2 px-2 py-1.5 rounded-sm transition-colors",
              inBracket && "bg-ochre-50/60 ring-1 ring-ochre-500/30"
            )}
          >
            <div
              className={cn(
                "h-3 rounded-sm shrink-0",
                inBracket ? "bg-ochre-500" : passed ? "bg-ochre-200" : "bg-paper-deep"
              )}
              style={{ width: `${(i + 1) * 8}px` }}
            />
            <span className={cn("text-[12px] num", inBracket ? "text-ink font-medium" : "text-ink-muted")}>
              {fmtPctRaw(b.rate * 100, 0)}
            </span>
            <span className="text-[10.5px] text-ink-faint num ml-auto">
              {fmtUSD(b.lo, { compact: true })}
              {b.hi === Infinity ? "+" : ` – ${fmtUSD(b.hi, { compact: true })}`}
            </span>
          </div>
        );
      })}
      <div className="mt-3 pt-2 border-t border-ink/8 flex items-baseline justify-between text-[11.5px] tabular">
        <span className="text-ink-muted">Taxable income</span>
        <span className="text-ink num font-medium">{fmtUSD(taxableIncome)}</span>
      </div>
    </div>
  );
}

function ThresholdRow({ label, value, threshold, thresholdLabel }: { label: string; value: number; threshold: number; thresholdLabel: string }) {
  const pct = Math.min((value / threshold) * 100, 100);
  const breached = value > threshold;
  return (
    <div>
      <div className="flex items-baseline justify-between text-[12px] mb-1.5">
        <span className="text-ink-muted">{thresholdLabel}</span>
        <span className={cn("num text-[12px]", breached ? "text-crimson-deep font-medium" : "text-emerald-deep")}>
          {breached ? `↑ ${fmtUSD(value - threshold, { compact: true })} over` : `${fmtUSD(threshold - value, { compact: true })} below`}
        </span>
      </div>
      <div className="h-1.5 bg-paper-deep rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all", breached ? "bg-crimson-deep" : "bg-emerald-deep")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-baseline justify-between text-[10.5px] tabular text-ink-faint mt-1">
        <span>{fmtUSD(value, { compact: true })}</span>
        <span>threshold {fmtUSD(threshold, { compact: true })}</span>
      </div>
    </div>
  );
}
