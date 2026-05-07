import { Link } from "wouter";
import { useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Send,
  Edit3,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Lock,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { TUCKER, TUCKER_ENTITIES, STAFF } from "../lib/mock-data";
import { fmtDate, cn } from "../lib/format";

type FormDef = {
  id: string;
  number: string;
  name: string;
  purpose: string;
  category: "Authorization" | "Election" | "Identity" | "Filing" | "Update";
  status: "Generated" | "Draft" | "Available";
  generatedDate?: string;
  fields: number;
  estTime: string;
};

const FORMS: FormDef[] = [
  {
    id: "2848",
    number: "2848",
    name: "Power of Attorney and Declaration of Representative",
    purpose: "Authorize Aragon to represent Tucker before the IRS for tax matters.",
    category: "Authorization",
    status: "Generated",
    generatedDate: "2026-04-10T14:00:00Z",
    fields: 18,
    estTime: "30 sec",
  },
  {
    id: "2553",
    number: "2553",
    name: "Election by a Small Business Corporation",
    purpose: "S-Corporation election for Tucker Holdings LLC. Pre-filled with entity and officer data.",
    category: "Election",
    status: "Generated",
    generatedDate: "2018-03-22T10:00:00Z",
    fields: 24,
    estTime: "60 sec",
  },
  {
    id: "ss4",
    number: "SS-4",
    name: "Application for Employer Identification Number",
    purpose: "Apply for EIN. Auto-populated from entity formation data in onboarding questionnaire.",
    category: "Identity",
    status: "Available",
    fields: 19,
    estTime: "45 sec",
  },
  {
    id: "8822",
    number: "8822",
    name: "Change of Address",
    purpose: "Update Tucker's address with the IRS following any move. Pulled from client record.",
    category: "Update",
    status: "Available",
    fields: 7,
    estTime: "20 sec",
  },
  {
    id: "8879",
    number: "8879",
    name: "IRS e-file Signature Authorization",
    purpose: "Client signature authorizing electronic filing. Pre-filled with refund/balance from extracted return.",
    category: "Authorization",
    status: "Draft",
    generatedDate: "2026-05-05T09:00:00Z",
    fields: 12,
    estTime: "30 sec",
  },
  {
    id: "8832",
    number: "8832",
    name: "Entity Classification Election",
    purpose: "Elect entity tax classification. Auto-populated with entity ownership structure.",
    category: "Election",
    status: "Available",
    fields: 14,
    estTime: "40 sec",
  },
];

const categoryConfig: Record<FormDef["category"], "ochre" | "emerald" | "sky" | "neutral"> = {
  Authorization: "ochre",
  Election: "sky",
  Identity: "emerald",
  Filing: "neutral",
  Update: "neutral",
};

const statusConfig: Record<FormDef["status"], { variant: "neutral" | "ochre" | "emerald" | "sky"; icon: typeof CheckCircle2 }> = {
  Generated: { variant: "emerald", icon: CheckCircle2 },
  Draft: { variant: "ochre", icon: Edit3 },
  Available: { variant: "neutral", icon: FileText },
};

export function FormGeneration() {
  const [selectedFormId, setSelectedFormId] = useState("2848");
  const selectedForm = FORMS.find((f) => f.id === selectedFormId)!;

  const generated = FORMS.filter((f) => f.status === "Generated").length;

  return (
    <div className="animate-fade-up">
      <div className="px-10 pt-10 max-w-[1380px]">
        <PageHeader
          eyebrow="Automated IRS Form Generation · Phase 4 · Proposed"
          title="Forms, pre-filled."
          subtitle="Standard IRS forms auto-populated from client and entity data. Field-level mapping to ArchiTAXture data model. Staff review before delivery — no field is ever blank or guessed."
          action={
            <button className="flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
              <Sparkles size={12} strokeWidth={1.8} />
              Generate New Form
            </button>
          }
        />
      </div>

      <div className="px-10 pb-12 max-w-[1380px]">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-sm overflow-hidden mb-10">
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Form library</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {FORMS.length}<span className="text-[18px] text-ink-muted"> templates</span>
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">+ growing per Phase 4 build</div>
          </div>
          <div className="bg-paper-card p-6 bg-emerald-soft/30">
            <div className="eyebrow text-emerald-deep">Generated for Tucker</div>
            <div className="display tabular text-[36px] text-emerald-deep mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              {generated}
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">forms in client file</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Avg generation time</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              38<span className="text-[18px] text-ink-muted"> sec</span>
            </div>
            <div className="text-[11px] text-emerald-deep tabular mt-2">vs. 12 min manual</div>
          </div>
          <div className="bg-paper-card p-6">
            <div className="eyebrow">Field accuracy</div>
            <div className="display tabular text-[36px] text-ink mt-1.5 leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
              99.6<span className="text-[18px] text-ink-muted">%</span>
            </div>
            <div className="text-[11px] text-ink-muted tabular mt-2">across 12,400 generated forms</div>
          </div>
        </div>

        {/* Two-column: form library on left, preview on right */}
        <div className="grid grid-cols-12 gap-6">
          {/* Form library */}
          <div className="col-span-5">
            <div className="eyebrow mb-3">Form library · Tucker</div>
            <div className="space-y-2">
              {FORMS.map((f) => {
                const isSelected = f.id === selectedFormId;
                const cfg = statusConfig[f.status];
                const Icon = cfg.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFormId(f.id)}
                    className={cn(
                      "w-full text-left card p-5 transition-all group hover:shadow-paper",
                      isSelected ? "ring-2 ring-ochre-500/50 bg-ochre-50/20" : ""
                    )}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-3">
                        <span className="display tabular text-[18px] text-ink leading-none" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 380 }}>
                          Form {f.number}
                        </span>
                        <Pill variant={categoryConfig[f.category]}>{f.category}</Pill>
                      </div>
                      <Pill variant={cfg.variant} dot>
                        <Icon size={9} strokeWidth={2} />
                        {f.status}
                      </Pill>
                    </div>
                    <div className="text-[13px] font-medium text-ink leading-snug">{f.name}</div>
                    <p className="text-[12px] text-ink-muted mt-1.5 leading-relaxed">{f.purpose}</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted tabular">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={9} strokeWidth={1.8} className="text-ochre-500" />
                        {f.fields} fields auto-mapped
                      </span>
                      <span>~{f.estTime} to generate</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form preview */}
          <div className="col-span-7">
            <div className="sticky top-[80px]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles size={14} strokeWidth={1.8} className="text-ochre-500" />
                  <span className="eyebrow">AI-Populated Preview · Form {selectedForm.number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-ink-muted hover:text-ink hover:bg-paper-deep transition-colors rounded-sm">
                    <RefreshCw size={11} strokeWidth={1.8} />
                    Re-populate
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-ink-muted hover:text-ink hover:bg-paper-deep transition-colors rounded-sm">
                    <Download size={11} strokeWidth={1.8} />
                    Download
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium bg-ink text-paper hover:bg-ink-soft transition-colors rounded-sm">
                    <Send size={11} strokeWidth={1.8} />
                    Send for signature
                  </button>
                </div>
              </div>

              {selectedForm.id === "2848" && <Form2848Preview />}
              {selectedForm.id === "2553" && <Form2553Preview />}
              {selectedForm.id === "ss4" && <FormSS4Preview />}
              {selectedForm.id === "8822" && <Form8822Preview />}
              {selectedForm.id === "8879" && <Form8879Preview />}
              {selectedForm.id === "8832" && <Form8832Preview />}

              {/* Field provenance footer */}
              <div className="mt-4 p-4 bg-paper-deep/40 border border-ink/8 rounded-sm">
                <div className="eyebrow mb-2">Field provenance · how these values were populated</div>
                <div className="grid grid-cols-2 gap-3 text-[11.5px] text-ink-muted">
                  <div>· Client SSN/EIN → <span className="text-ink">clients table</span></div>
                  <div>· Representative info → <span className="text-ink">team_members</span></div>
                  <div>· Entity data → <span className="text-ink">entities table</span></div>
                  <div>· Address/contact → <span className="text-ink">clients.address</span></div>
                  <div>· Refund/balance → <span className="text-ink">tax_return_financials</span></div>
                  <div>· Officer names → <span className="text-ink">entity_officers</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Form previews — IRS-form aesthetic
// ────────────────────────────────────────────────────────────

function FormChrome({ children, formNumber, formName, omb }: { children: React.ReactNode; formNumber: string; formName: string; omb: string }) {
  return (
    <div className="bg-white shadow-paper-md border border-ink/10 font-mono text-[10px] text-gray-700 max-h-[680px] overflow-y-auto">
      <div className="border-b-2 border-black p-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="text-[8px] text-gray-500">Department of the Treasury<br/>Internal Revenue Service</div>
          <div className="text-[8px] text-gray-500 text-right">OMB No. {omb}</div>
        </div>
        <div className="flex items-baseline gap-3">
          <div className="text-[24px] font-bold text-black tracking-tight font-sans">Form {formNumber}</div>
          <div className="text-[14px] text-black font-sans">{formName}</div>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function FieldRow({ label, value, num, ai }: { label: string; value: React.ReactNode; num?: string; ai?: boolean }) {
  return (
    <div className={cn("grid grid-cols-[24px_1fr_1.5fr] gap-3 py-2 border-b border-gray-200", ai && "bg-yellow-50/60")}>
      <span className="text-gray-500">{num}</span>
      <span className="text-gray-700">{label}</span>
      <span className="text-black font-medium border-b border-black pb-0.5 min-h-[16px]">{value}</span>
    </div>
  );
}

function Form2848Preview() {
  return (
    <FormChrome formNumber="2848" formName="Power of Attorney and Declaration of Representative" omb="1545-0150">
      <div className="text-[12px] font-bold text-black mb-3 font-sans border-b border-black pb-1">Part I · Power of Attorney</div>
      <FieldRow num="1" label="Taxpayer name & address" value={
        <span>JEFFREY L &amp; MARIAN R TUCKER · 4218 BAYSHORE BLVD, SARASOTA FL 34243</span>
      } ai />
      <FieldRow num="" label="Taxpayer identification number" value="XXX-XX-2814 · XXX-XX-7401" ai />
      <FieldRow num="" label="Daytime telephone" value="(941) 555-0142" ai />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part II · Representatives</div>
      <FieldRow num="2" label="Representative name & address" value={
        <span>MARCUS TATE, CPA · ARAGON ACCOUNTING CORP · 2410 RINGLING BLVD, SUITE 200, SARASOTA FL 34237</span>
      } ai />
      <FieldRow num="" label="CAF No." value="000-184-038" ai />
      <FieldRow num="" label="PTIN" value="P00184038" ai />
      <FieldRow num="" label="Telephone" value="(941) 555-0193" ai />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part III · Acts Authorized</div>
      <FieldRow num="3" label="Description of matter" value="Income · all years on file" ai />
      <FieldRow num="" label="Tax form numbers" value="1040, 1120S, 1065" ai />
      <FieldRow num="" label="Years or periods" value="2022, 2023, 2024, 2025, 2026" ai />

      <div className="grid grid-cols-2 gap-6 mt-8 pt-5 border-t border-gray-300">
        <div>
          <div className="border-b border-black mb-1 h-6"></div>
          <div className="text-[8px] text-gray-500">Taxpayer signature & date</div>
        </div>
        <div>
          <div className="border-b border-black mb-1 h-6 bg-yellow-50/60"></div>
          <div className="text-[8px] text-gray-500">Representative signature (auto-filled by E-sign)</div>
        </div>
      </div>
    </FormChrome>
  );
}

function Form2553Preview() {
  return (
    <FormChrome formNumber="2553" formName="Election by a Small Business Corporation" omb="1545-0123">
      <div className="text-[12px] font-bold text-black mb-3 font-sans border-b border-black pb-1">Part I · Election Information</div>
      <FieldRow num="A" label="Name of corporation" value="TUCKER HOLDINGS LLC" ai />
      <FieldRow num="B" label="Employer ID Number (EIN)" value="84-2918***" ai />
      <FieldRow num="C" label="State of incorporation" value="FLORIDA" ai />
      <FieldRow num="D" label="Date incorporated" value="03/14/2018" ai />
      <FieldRow num="E" label="Election effective date" value="01/01/2018" ai />
      <FieldRow num="F" label="Tax year" value="Calendar year" ai />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part II · Shareholders</div>
      <FieldRow num="" label="Shareholder name" value="JEFFREY L. TUCKER" ai />
      <FieldRow num="" label="Address" value="4218 BAYSHORE BLVD, SARASOTA FL 34243" ai />
      <FieldRow num="" label="Shares owned" value="100% · 1,000 shares · ordinary common" ai />
      <FieldRow num="" label="SSN" value="XXX-XX-2814" ai />

      <div className="grid grid-cols-2 gap-6 mt-8 pt-5 border-t border-gray-300">
        <div>
          <div className="border-b border-black mb-1 h-6"></div>
          <div className="text-[8px] text-gray-500">Officer signature & date</div>
        </div>
        <div>
          <div className="border-b border-black mb-1 h-6 bg-yellow-50/60"></div>
          <div className="text-[8px] text-gray-500">Officer title: PRESIDENT (auto-filled)</div>
        </div>
      </div>
    </FormChrome>
  );
}

function FormSS4Preview() {
  return (
    <FormChrome formNumber="SS-4" formName="Application for Employer Identification Number" omb="1545-0003">
      <FieldRow num="1" label="Legal name of entity" value="BAYSHORE PROPERTY HOLDINGS LLC" ai />
      <FieldRow num="2" label="Trade name (if different)" value="—" />
      <FieldRow num="3" label="Executor / administrator" value="JEFFREY L. TUCKER, MEMBER" ai />
      <FieldRow num="4a" label="Mailing address" value="4218 BAYSHORE BLVD, SARASOTA FL 34243" ai />
      <FieldRow num="6" label="County / state of business" value="SARASOTA, FLORIDA" ai />
      <FieldRow num="7a" label="Responsible party name" value="JEFFREY L. TUCKER" ai />
      <FieldRow num="7b" label="SSN/ITIN/EIN" value="XXX-XX-2814" ai />
      <FieldRow num="8a" label="LLC?" value="YES" ai />
      <FieldRow num="8b" label="Number of LLC members" value="1 (single-member, disregarded)" ai />
      <FieldRow num="9a" label="Type of entity" value="LIMITED LIABILITY COMPANY" ai />
      <FieldRow num="10" label="Reason for applying" value="STARTED NEW BUSINESS" ai />
      <FieldRow num="11" label="Date business started" value="06/15/2021" ai />
      <FieldRow num="13" label="Highest number of employees" value="0" ai />
      <FieldRow num="16" label="Principal activity" value="REAL ESTATE RENTAL" ai />
    </FormChrome>
  );
}

function Form8822Preview() {
  return (
    <FormChrome formNumber="8822" formName="Change of Address (Individual, Gift, Estate, or Generation-Skipping Transfer Tax Returns)" omb="1545-1163">
      <div className="text-[12px] font-bold text-black mb-3 font-sans border-b border-black pb-1">Section 1 · Individual</div>
      <FieldRow num="1" label="Type of return" value="☒ Form 1040 series · ☐ Form 706 · ☐ Form 709" ai />
      <FieldRow num="3a" label="Your name" value="JEFFREY L. TUCKER" ai />
      <FieldRow num="3b" label="Your SSN" value="XXX-XX-2814" ai />
      <FieldRow num="4a" label="Spouse name" value="MARIAN R. TUCKER" ai />
      <FieldRow num="4b" label="Spouse SSN" value="XXX-XX-7401" ai />
      <FieldRow num="5" label="Prior name (if changed)" value="—" />
      <FieldRow num="6a" label="Old address" value="2241 GULFSTREAM AVE, SARASOTA FL 34236" ai />
      <FieldRow num="7a" label="New address" value="4218 BAYSHORE BLVD, SARASOTA FL 34243" ai />
      <FieldRow num="8" label="Effective date" value="11/01/2024" ai />
    </FormChrome>
  );
}

function Form8879Preview() {
  return (
    <FormChrome formNumber="8879" formName="IRS e-file Signature Authorization" omb="1545-0074">
      <FieldRow num="" label="Tax year" value="2024" ai />
      <FieldRow num="" label="Taxpayer name" value="JEFFREY L. TUCKER" ai />
      <FieldRow num="" label="SSN" value="XXX-XX-2814" ai />
      <FieldRow num="" label="Spouse name" value="MARIAN R. TUCKER" ai />
      <FieldRow num="" label="Spouse SSN" value="XXX-XX-7401" ai />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part I · Tax Return Information</div>
      <FieldRow num="1" label="Adjusted gross income (Form 1040, line 11)" value="$779,320" ai />
      <FieldRow num="2" label="Total tax (Form 1040, line 24)" value="$215,760" ai />
      <FieldRow num="3" label="Federal income tax withheld" value="$34,800" ai />
      <FieldRow num="4" label="Refund (Form 1040, line 35a)" value="$27,040" ai />
      <FieldRow num="5" label="Amount you owe (Form 1040, line 37)" value="—" />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part II · Taxpayer Declaration & Signature</div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <div className="border-b border-black mb-1 h-6"></div>
          <div className="text-[8px] text-gray-500">Taxpayer's PIN: enter 5 digits</div>
        </div>
        <div>
          <div className="border-b border-black mb-1 h-6"></div>
          <div className="text-[8px] text-gray-500">Spouse's PIN: enter 5 digits</div>
        </div>
      </div>
    </FormChrome>
  );
}

function Form8832Preview() {
  return (
    <FormChrome formNumber="8832" formName="Entity Classification Election" omb="1545-1516">
      <FieldRow num="" label="Name of entity" value="BAYSHORE PROPERTY HOLDINGS LLC" ai />
      <FieldRow num="" label="EIN" value="—" />
      <FieldRow num="" label="Address" value="4218 BAYSHORE BLVD, SARASOTA FL 34243" ai />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part I · Election Information</div>
      <FieldRow num="1" label="Type of election" value="☒ Initial classification · ☐ Change in classification" ai />
      <FieldRow num="6" label="Type of entity" value="☒ Domestic eligible entity electing to be classified as association" ai />
      <FieldRow num="8" label="Effective date" value="01/01/2025" ai />

      <div className="text-[12px] font-bold text-black mt-5 mb-3 font-sans border-b border-black pb-1">Part II · Late Election Relief</div>
      <FieldRow num="11" label="Late election?" value="☐ NO" ai />
    </FormChrome>
  );
}
