// Mock data — Tucker (client_id=60) as the canonical demo client per the brief.
// Plus a small set of named secondary clients for Morning Briefing realism.
// Total firm count surfaces as 235 (the brief's stated portfolio size).

import type {
  Client,
  Entity,
  K1,
  ForecastLine,
  ForecastVersion,
  TaxStrategy,
  PlaybookStep,
  BriefingItem,
  Staff,
} from "./types";

// ────────────────────────────────────────────────────────────
// Staff (per brief: 17 team members, 2 PODs, role-based assignment)
// ────────────────────────────────────────────────────────────

export const STAFF: Staff[] = [
  { id: "s1", name: "Shonna Reyes", initials: "SR", role: "Admin", pod: null },
  { id: "s2", name: "Jhon Kessler", initials: "JK", role: "Admin", pod: null },
  { id: "s3", name: "Eric Bramwell", initials: "EB", role: "POD Lead", pod: "Alpha" },
  { id: "s4", name: "Sarah Lin", initials: "SL", role: "POD Lead", pod: "Beta" },
  { id: "s5", name: "Marcus Tate", initials: "MT", role: "Tax Manager", pod: "Alpha" },
  { id: "s6", name: "Diana Ochoa", initials: "DO", role: "Tax Manager", pod: "Beta" },
  { id: "s7", name: "Priya Raman", initials: "PR", role: "Senior Tax Staff", pod: "Alpha" },
  { id: "s8", name: "Aaron Holt", initials: "AH", role: "Senior Tax Staff", pod: "Beta" },
  { id: "s9", name: "Wendy Cho", initials: "WC", role: "Tax Staff", pod: "Alpha" },
  { id: "s10", name: "Liam Powell", initials: "LP", role: "Tax Staff", pod: "Beta" },
  { id: "s11", name: "Tess Avila", initials: "TA", role: "Bookkeeper", pod: "Alpha" },
  { id: "s12", name: "Rohan Mehta", initials: "RM", role: "Bookkeeper", pod: "Beta" },
];

export const FIRM = {
  name: "Aragon Accounting Corporation",
  short: "Aragon",
  totalClients: 235,
  totalStaff: 17,
  pods: ["Alpha", "Beta"] as const,
  taxYear: 2025,
  filingYear: 2026,
};

// ────────────────────────────────────────────────────────────
// Tucker (client_id=60) — the demo hero
// ────────────────────────────────────────────────────────────

export const TUCKER: Client = {
  id: 60,
  firstName: "Jeffrey",
  lastName: "Tucker",
  filingStatus: "Married Filing Jointly",
  spouse: { firstName: "Marian", lastName: "Tucker" },
  email: "j.tucker@tuckerholdings.us",
  city: "Sarasota",
  state: "FL",
  pod: "Alpha",
  taxManager: "Marcus Tate",
  taxStaff: "Priya Raman",
  bookkeeper: "Tess Avila",
  salesRep: "Eric Bramwell",
  status: "In Progress",
  tier: "Diamond",
  annualRevenue: 38400,
  signedDate: "2022-03-14",
  lastTouch: "2026-05-02T14:22:00Z",
  healthScore: 88,
  hasOpenIRSNotice: false,
  documentsRequested: 14,
  documentsReceived: 13,
};

export const TUCKER_ENTITIES: Entity[] = [
  {
    id: "ent-1",
    clientId: 60,
    name: "Tucker Holdings LLC",
    type: "S Corporation",
    ein: "84-2918***",
    ownership: 100,
    formType: "1120S",
    state: "FL",
    yearFormed: 2018,
  },
  {
    id: "ent-2",
    clientId: 60,
    name: "Tucker Family Real Estate Partnership",
    type: "Partnership",
    ein: "85-7104***",
    ownership: 60,
    formType: "1065",
    state: "FL",
    yearFormed: 2020,
  },
  {
    id: "ent-3",
    clientId: 60,
    name: "Bayshore Property Holdings LLC",
    type: "LLC",
    ein: "—",
    ownership: 100,
    formType: "1040",
    state: "FL",
    yearFormed: 2021,
  },
];

export const TUCKER_K1S: K1[] = [
  {
    partnerName: "Jeffrey L. Tucker",
    ownership: 60,
    ordinaryIncome: 184500,
    guaranteedPayments: 24000,
    rentalIncome: 38400,
    capitalAccountEnd: 412780,
  },
  {
    partnerName: "Robert J. Mendoza",
    ownership: 25,
    ordinaryIncome: 76875,
    rentalIncome: 16000,
    capitalAccountEnd: 178925,
  },
  {
    partnerName: "Eleanor S. Pratt",
    ownership: 15,
    ordinaryIncome: 46125,
    rentalIncome: 9600,
    capitalAccountEnd: 109125,
  },
];

// ────────────────────────────────────────────────────────────
// Tucker's Forecasting — Household Tax Estimate
// Prior year (2024 actuals) vs 2025 projected
// ────────────────────────────────────────────────────────────

export const TUCKER_FORECAST: ForecastLine[] = [
  { category: "Income", priorYear: 0, projected: 0, isHeader: true },
  { category: "W-2 (Marian Tucker)", priorYear: 168000, projected: 174720 },
  { category: "S-Corp K-1 (Tucker Holdings)", priorYear: 312400, projected: 348900 },
  { category: "Partnership K-1 (Tucker Family RE)", priorYear: 184500, projected: 196200 },
  { category: "Rental Income (Bayshore)", priorYear: 42600, projected: 51800 },
  { category: "Interest & Dividends", priorYear: 18420, projected: 21100 },
  { category: "Capital Gains (LTCG)", priorYear: 67800, projected: 12000 },

  { category: "Adjustments", priorYear: 0, projected: 0, isHeader: true },
  { category: "1/2 SE Tax", priorYear: -8420, projected: -9180 },
  { category: "SEP IRA Contribution", priorYear: -69000, projected: -78000 },
  { category: "Self-employed Health", priorYear: -14200, projected: -15600 },

  { category: "Deductions", priorYear: 0, projected: 0, isHeader: true },
  { category: "Itemized Deductions", priorYear: -32100, projected: -34800 },
  { category: "QBI Deduction (estimated)", priorYear: -42600, projected: -48750 },

  { category: "Taxable Income", priorYear: 627400, projected: 619190, isHeader: true },

  { category: "Tax Liability", priorYear: 0, projected: 0, isHeader: true },
  { category: "Federal Income Tax", priorYear: 188220, projected: 184540 },
  { category: "Self-Employment Tax", priorYear: 16840, projected: 18360 },
  { category: "Additional Medicare", priorYear: 4280, projected: 4620 },
  { category: "NIIT", priorYear: 6420, projected: 7180 },

  { category: "Total Federal Tax", priorYear: 215760, projected: 214700, isHeader: true },

  { category: "Payments", priorYear: 0, projected: 0, isHeader: true },
  { category: "Q1 Estimated", priorYear: -52000, projected: -54000 },
  { category: "Q2 Estimated", priorYear: -52000, projected: -54000 },
  { category: "Q3 Estimated", priorYear: -52000, projected: -54000 },
  { category: "Q4 Estimated", priorYear: -52000, projected: -54000 },
  { category: "W-2 Withholding (Marian)", priorYear: -34800, projected: -36400 },

  { category: "Balance Due / (Refund)", priorYear: -27040, projected: -37700, isHeader: true },
];

export const TUCKER_FORECAST_VERSIONS: ForecastVersion[] = [
  {
    id: "v-2024-actual",
    label: "2024 Filed",
    lockedAt: "2025-04-12T16:30:00Z",
    isLocked: true,
    totalProjectedTax: 215760,
    totalProjectedAGI: 779320,
    effectiveRate: 0.276,
  },
  {
    id: "v-2025-q1",
    label: "2025 Q1 Estimate",
    lockedAt: "2025-04-08T11:14:00Z",
    isLocked: true,
    totalProjectedTax: 226400,
    totalProjectedAGI: 798220,
    effectiveRate: 0.284,
  },
  {
    id: "v-2025-q2",
    label: "2025 Q2 Estimate",
    lockedAt: "2025-07-02T09:42:00Z",
    isLocked: true,
    totalProjectedTax: 219800,
    totalProjectedAGI: 803120,
    effectiveRate: 0.274,
  },
  {
    id: "v-2025-q3",
    label: "2025 Q3 Estimate (current)",
    lockedAt: null,
    isLocked: false,
    totalProjectedTax: 214700,
    totalProjectedAGI: 804720,
    effectiveRate: 0.267,
  },
];

// ────────────────────────────────────────────────────────────
// 18 firm-defined tax strategies — Tucker's Strategy Review
// Per the brief's Section 2.6 — Tax Planning Module.
// ────────────────────────────────────────────────────────────

export const TUCKER_STRATEGIES: TaxStrategy[] = [
  {
    id: "augusta-rule",
    name: "Augusta Rule (§280A(g))",
    category: "Real Estate",
    eligibility: "Eligible",
    estimatedSavings: 14400,
    status: "Recommended",
    flagship: true,
    description:
      "Rent personal residence to S-Corp for 14 days/year. Tax-free rental income to homeowner; deductible expense to entity.",
    aiNote:
      "Tucker Holdings LLC has an active S-Corp election and Jeffrey owns the Sarasota waterfront residence. Premium-tier event-venue comparables support a $2,800/day fair rental rate. 12 board meetings + 2 strategy retreats over the year supports full §280A(g) limit.",
  },
  {
    id: "accountable-plan",
    name: "Accountable Plan",
    category: "Entity Optimization",
    eligibility: "Eligible",
    estimatedSavings: 9200,
    status: "Recommended",
    flagship: true,
    description:
      "Reimburse owner-employee for business use of home, vehicle, phone — converts personal expenses to deductible business reimbursements.",
    aiNote: "Estimated based on prior expense worksheet and home-office deduction history.",
  },
  {
    id: "scorp-comp",
    name: "S-Corp Reasonable Compensation",
    category: "Entity Optimization",
    eligibility: "Eligible",
    estimatedSavings: 7100,
    status: "Under Review",
    flagship: true,
    description:
      "Right-size wage-vs-distribution split for Tucker Holdings LLC. Current W-2 of $96k against $348k profit sits below the defensible range — exposes audit risk and caps SEP capacity.",
    aiNote: "RCReports market analysis suggests $112k–$128k range for this role and region. Bump to $120k unlocks ~$6k additional SEP IRA headroom and aligns with §1.162-7 reasonable-compensation safe-harbor factors.",
  },
  {
    id: "sep-ira-max",
    name: "SEP IRA Maximization",
    category: "Retirement",
    eligibility: "Likely Eligible",
    estimatedSavings: 5400,
    status: "In Progress",
    description:
      "Increase SEP IRA contribution to 25% of S-Corp wages, capped at $69k for 2025.",
  },
  {
    id: "cost-segregation",
    name: "Cost Segregation Study",
    category: "Real Estate",
    eligibility: "Likely Eligible",
    estimatedSavings: 28600,
    status: "Recommended",
    description:
      "Reclassify components of Bayshore Property to 5/7/15-year MACRS lives. Accelerated depreciation in year of study.",
    aiNote: "Property basis $1.42M, placed in service 2021. Study cost ~$5,800.",
  },
  {
    id: "qbi-optimization",
    name: "QBI Deduction Optimization",
    category: "Entity Optimization",
    eligibility: "Eligible",
    estimatedSavings: 6480,
    status: "Adopted",
    description:
      "Restructure W-2 wages and UBIA to avoid the §199A wage-and-UBIA limitation phase-out.",
  },
  {
    id: "hsa-max",
    name: "HSA Max Funding",
    category: "Retirement",
    eligibility: "Eligible",
    estimatedSavings: 1980,
    status: "Adopted",
    description: "Max HDHP-paired HSA contribution; triple tax advantage.",
  },
  {
    id: "kids-on-payroll",
    name: "Children on Payroll",
    category: "Family",
    eligibility: "Review Required",
    estimatedSavings: 4800,
    status: "Recommended",
    description: "Employ Tucker children at S-Corp for legitimate work; shift income at lower rate.",
    aiNote: "Documentation requirements are substantial — review J&M Tucker minor children's roles before adoption.",
  },
  {
    id: "1031-exchange",
    name: "§1031 Like-Kind Exchange",
    category: "Real Estate",
    eligibility: "Not Eligible",
    estimatedSavings: 0,
    status: "Declined",
    description: "Defer gain on sale of investment real estate. No qualifying disposition planned for 2025.",
  },
  {
    id: "donor-advised-fund",
    name: "Donor-Advised Fund Stacking",
    category: "Income Shifting",
    eligibility: "Eligible",
    estimatedSavings: 8400,
    status: "Recommended",
    description:
      "Bunch 3 years of charitable giving into 2025 to clear standard deduction threshold; itemize this year, take standard next two.",
  },
  {
    id: "solo-401k",
    name: "Solo 401(k) Conversion",
    category: "Retirement",
    eligibility: "Likely Eligible",
    estimatedSavings: 3600,
    status: "Under Review",
    description: "Convert SEP IRA to Solo 401(k) — enables Roth contributions and higher deferral limits.",
  },
  {
    id: "rental-grouping",
    name: "Rental Property Grouping Election",
    category: "Real Estate",
    eligibility: "Eligible",
    estimatedSavings: 4200,
    status: "Recommended",
    description:
      "§469(c)(7) grouping for material participation — net Bayshore losses against Tucker Holdings income.",
  },
  {
    id: "secure-2-roth",
    name: "SECURE 2.0 Roth Catch-Up",
    category: "Retirement",
    eligibility: "Likely Eligible",
    estimatedSavings: 1800,
    status: "Recommended",
    description: "Mandatory Roth treatment for catch-up contributions if wages > $145k (Marian).",
  },
  {
    id: "qsb-stock",
    name: "Qualified Small Business Stock (§1202)",
    category: "Entity Optimization",
    eligibility: "Not Eligible",
    estimatedSavings: 0,
    status: "Declined",
    description: "QSBS exclusion. Tucker Holdings is an S-Corp; not a C-Corp eligible for §1202.",
  },
  {
    id: "magi-management",
    name: "MAGI Management for NIIT",
    category: "Entity Optimization",
    eligibility: "Eligible",
    estimatedSavings: 2100,
    status: "Recommended",
    description: "Time investment income recognition to manage MAGI under §1411 NIIT thresholds.",
  },
  {
    id: "spousal-ira",
    name: "Spousal IRA Contribution",
    category: "Retirement",
    eligibility: "Eligible",
    estimatedSavings: 1800,
    status: "Adopted",
    description: "Contribute to spousal traditional IRA based on Marian's W-2 earnings.",
  },
  {
    id: "qcd-2",
    name: "QCD from IRA",
    category: "Income Shifting",
    eligibility: "Not Eligible",
    estimatedSavings: 0,
    status: "Declined",
    description: "Qualified Charitable Distribution — requires age 70½. Not yet eligible.",
  },
  {
    id: "estate-planning",
    name: "Annual Gift Exclusion (§2503(b))",
    category: "Family",
    eligibility: "Eligible",
    estimatedSavings: 2400,
    status: "Adopted",
    description:
      "Gift up to $19,000 per recipient ($38,000 with spouse splitting) to children — long-term estate optimization.",
  },
];

// ────────────────────────────────────────────────────────────
// Augusta Rule playbook — the demo's Act 2 centerpiece
// ────────────────────────────────────────────────────────────

export const AUGUSTA_PLAYBOOK_STEPS: PlaybookStep[] = [
  {
    id: "step-1",
    number: 1,
    title: "Establish fair rental valuation",
    description:
      "Pull comparable short-term rental rates for Sarasota residence. Document via 3+ market sources (Airbnb, VRBO, local hospitality data). Required to defend the §280A(g) rental rate.",
    status: "Complete",
    owner: "Priya Raman",
    dueDate: "2026-04-22",
    documents: [
      { name: "Rental Comparable Analysis — Tucker Sarasota", type: "final" },
      { name: "Local Hotel Rate Survey", type: "final" },
    ],
    aiAssisted: true,
  },
  {
    id: "step-2",
    number: 2,
    title: "Execute rental agreement",
    description:
      "AI-drafted rental agreement between Jeffrey & Marian Tucker (lessor) and Tucker Holdings LLC (lessee). 14-day usage limit, fair-rate compensation, business-purpose clause, signature blocks for both parties.",
    status: "Awaiting Review",
    owner: "Marcus Tate",
    dueDate: "2026-05-12",
    documents: [{ name: "Rental Agreement — Augusta Rule 2026", type: "draft" }],
    aiAssisted: true,
  },
  {
    id: "step-3",
    number: 3,
    title: "Generate 14 board minutes",
    description:
      "AI-drafted board meeting minutes for each rental day. Each minute documents business purpose, attendees, agenda, and decisions made. Pre-dated across the tax year with non-overlapping dates and Tucker Holdings business themes.",
    status: "In Progress",
    owner: "Priya Raman",
    dueDate: "2026-05-20",
    documents: [
      { name: "Board Minutes — January Strategic Review", type: "draft" },
      { name: "Board Minutes — February Q1 Planning", type: "draft" },
      { name: "Board Minutes — March Capital Allocation", type: "draft" },
      { name: "Board Minutes — April Q1 Close", type: "draft" },
      { name: "Board Minutes — May Annual Strategy Retreat", type: "draft" },
      { name: "Board Minutes — June H1 Review", type: "draft" },
      { name: "Board Minutes — July Operations Review", type: "draft" },
      { name: "Board Minutes — August Compensation Review", type: "draft" },
      { name: "Board Minutes — September Q3 Planning", type: "draft" },
      { name: "Board Minutes — October Year-End Strategy", type: "draft" },
      { name: "Board Minutes — November Tax Planning Retreat", type: "draft" },
      { name: "Board Minutes — December Year-End Close", type: "draft" },
      { name: "Board Minutes — Mid-Year Investment Review", type: "draft" },
      { name: "Board Minutes — Annual Operating Review", type: "draft" },
    ],
    aiAssisted: true,
  },
  {
    id: "step-4",
    number: 4,
    title: "Draft IRS-compliance memo",
    description:
      "Internal memo citing §280A(g), Sinopoli v. Commissioner, and contemporaneous-documentation requirements. Becomes part of the workpaper file for audit defense.",
    status: "Not Started",
    owner: "Marcus Tate",
    dueDate: "2026-05-24",
    documents: [{ name: "Augusta Rule Compliance Memo — Tucker 2026", type: "template" }],
    aiAssisted: true,
  },
  {
    id: "step-5",
    number: 5,
    title: "Record journal entries",
    description:
      "Book the rental expense at Tucker Holdings ($2,800 × 14 days = $39,200) and corresponding cash distribution to Jeffrey & Marian. QBO journal entry generated; bookkeeper review required before posting.",
    status: "Not Started",
    owner: "Tess Avila",
    dueDate: "2026-06-01",
    documents: [{ name: "Augusta Rule JE — Tucker Holdings", type: "template" }],
    aiAssisted: true,
  },
];

// ────────────────────────────────────────────────────────────
// Morning Briefing items — Act 3
// 4 priority items across 235 clients, dated today (2026-05-07)
// ────────────────────────────────────────────────────────────

export const BRIEFING_ITEMS: BriefingItem[] = [
  {
    id: "b-1",
    category: "ready-to-file",
    client: "Jeffrey Tucker",
    clientId: 60,
    headline: "Tucker return now ready to file",
    detail:
      "Final K-1 from Tucker Family Real Estate Partnership received at 02:14 AM. All 14 requested documents on file. Augusta Rule playbook 100% complete. Forecasted refund $37,700.",
    detectedAt: "2026-05-07T02:14:00Z",
    recommendedAction: "Schedule e-file review with client this week",
    estimatedValue: 37700,
    owner: "Marcus Tate",
    urgency: "high",
    source: "Document Request Engine + Strategy Playbook Engine",
  },
  {
    id: "b-2",
    category: "irs-notice",
    client: "Holcomb Imaging Group LLC",
    clientId: 184,
    headline: "IRS Notice CP2000 received",
    detail:
      "Underreporter notice for tax year 2023. Proposed assessment of $4,247. Discrepancy on Form 1099-MISC ($18,200) reported by IRS but not on return. AI first-draft response prepared with cited Treasury Reg.",
    detectedAt: "2026-05-07T06:42:00Z",
    recommendedAction: "Review draft response by Friday — 30-day reply window",
    estimatedValue: -4247,
    owner: "Diana Ochoa",
    urgency: "high",
    source: "IRS e-Services notice feed + Notice Response Agent",
  },
  {
    id: "b-3",
    category: "overdue-step",
    client: "Lakeshore Dental PA",
    clientId: 142,
    headline: "Augusta Rule — March board minutes overdue",
    detail:
      "Step 3 of 5 (Generate board minutes) past due by 8 days. Strategy estimated savings of $11,200 at risk if documentation incomplete by year-end.",
    detectedAt: "2026-05-07T07:00:00Z",
    recommendedAction: "Reassign or extend due date — currently with Aaron Holt",
    estimatedValue: 11200,
    owner: "Aaron Holt",
    urgency: "medium",
    source: "Strategy Playbook Engine",
  },
  {
    id: "b-4",
    category: "planning-opportunity",
    client: "Jeffrey Tucker",
    clientId: 60,
    headline: "New planning opportunity surfaced for Tucker",
    detail:
      "2025 1040 extraction shows W-2 (Marian) + S-Corp K-1 income exceeding $580k. Cost Segregation eligibility on Bayshore Property newly triggered — estimated savings $28,600.",
    detectedAt: "2026-05-07T07:00:00Z",
    recommendedAction: "Schedule planning conversation with client",
    estimatedValue: 28600,
    owner: "Marcus Tate",
    urgency: "medium",
    source: "Tax Plan Generator + Forecasting Module",
  },
  {
    id: "b-5",
    category: "deadline",
    client: "Cordova Construction Inc.",
    clientId: 96,
    headline: "Q2 estimated payment due in 5 weeks",
    detail:
      "$84,200 Q2 estimated payment scheduled for June 16. Cash flow forecast in QBO shows $61,400 available — possible underfunding.",
    detectedAt: "2026-05-07T07:00:00Z",
    recommendedAction: "Bookkeeper to review cash position with client",
    estimatedValue: 84200,
    owner: "Rohan Mehta",
    urgency: "medium",
    source: "QBO sync + Forecasting Module",
  },
  {
    id: "b-6",
    category: "anomaly",
    client: "Westvale Capital Partners",
    clientId: 73,
    headline: "K-1 ordinary income variance flagged",
    detail:
      "2024 K-1 ordinary income up 184% YoY without corresponding revenue change in 2024 1065. May indicate misclassified guaranteed payments. Worth verifying before extension filing.",
    detectedAt: "2026-05-07T07:00:00Z",
    recommendedAction: "Senior Tax Staff to review with partner CFO",
    owner: "Priya Raman",
    urgency: "low",
    source: "Anomaly Detection Agent",
  },
];

// ────────────────────────────────────────────────────────────
// Secondary clients — for the briefing context and clients list
// ────────────────────────────────────────────────────────────

export const SECONDARY_CLIENTS: Client[] = [
  {
    id: 184,
    firstName: "Bryan",
    lastName: "Holcomb",
    filingStatus: "Married Filing Jointly",
    email: "bryan@holcombimaging.com",
    city: "Tampa",
    state: "FL",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    taxStaff: "Aaron Holt",
    salesRep: "Sarah Lin",
    status: "In Progress",
    tier: "Platinum",
    annualRevenue: 24800,
    signedDate: "2023-08-22",
    lastTouch: "2026-05-06T11:30:00Z",
    healthScore: 64,
    hasOpenIRSNotice: true,
    documentsRequested: 22,
    documentsReceived: 18,
  },
  {
    id: 142,
    firstName: "Karen",
    lastName: "Lakeshore",
    filingStatus: "Single",
    email: "karen@lakeshoredental.com",
    city: "Naples",
    state: "FL",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    taxStaff: "Aaron Holt",
    salesRep: "Sarah Lin",
    status: "In Progress",
    tier: "Platinum",
    annualRevenue: 21600,
    signedDate: "2022-11-09",
    lastTouch: "2026-05-04T09:14:00Z",
    healthScore: 71,
    documentsRequested: 18,
    documentsReceived: 14,
  },
  {
    id: 96,
    firstName: "Manuel",
    lastName: "Cordova",
    filingStatus: "Married Filing Jointly",
    email: "m.cordova@cordovaconstruction.com",
    city: "Sarasota",
    state: "FL",
    pod: "Alpha",
    taxManager: "Marcus Tate",
    taxStaff: "Wendy Cho",
    bookkeeper: "Rohan Mehta",
    salesRep: "Eric Bramwell",
    status: "Filed",
    tier: "Diamond",
    annualRevenue: 46200,
    signedDate: "2021-04-30",
    lastTouch: "2026-05-01T16:22:00Z",
    healthScore: 82,
    documentsRequested: 28,
    documentsReceived: 28,
  },
  {
    id: 73,
    firstName: "Anika",
    lastName: "Westvale",
    filingStatus: "Married Filing Jointly",
    email: "anika@westvalecap.com",
    city: "Miami",
    state: "FL",
    pod: "Alpha",
    taxManager: "Marcus Tate",
    taxStaff: "Priya Raman",
    salesRep: "Eric Bramwell",
    status: "In Progress",
    tier: "Diamond",
    annualRevenue: 52800,
    signedDate: "2020-09-15",
    lastTouch: "2026-05-05T13:08:00Z",
    healthScore: 76,
    documentsRequested: 31,
    documentsReceived: 29,
  },
  {
    id: 211,
    firstName: "Damon",
    lastName: "Pell",
    filingStatus: "Single",
    email: "damon@pellconsulting.com",
    city: "Jacksonville",
    state: "FL",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    taxStaff: "Liam Powell",
    salesRep: "Sarah Lin",
    status: "Onboarding",
    tier: "Gold",
    annualRevenue: 14400,
    signedDate: "2026-04-28",
    lastTouch: "2026-05-06T15:45:00Z",
    healthScore: 92,
    documentsRequested: 9,
    documentsReceived: 3,
  },
  {
    id: 7,
    firstName: "Lila",
    lastName: "Trent",
    filingStatus: "Married Filing Jointly",
    email: "lila@trentmedical.com",
    city: "Orlando",
    state: "FL",
    pod: "Beta",
    taxManager: "Diana Ochoa",
    taxStaff: "Liam Powell",
    salesRep: "Sarah Lin",
    status: "In Progress",
    tier: "Platinum",
    annualRevenue: 28200,
    signedDate: "2022-02-14",
    lastTouch: "2026-05-03T10:22:00Z",
    healthScore: 79,
    documentsRequested: 16,
    documentsReceived: 13,
  },
];

export const ALL_CLIENTS = [TUCKER, ...SECONDARY_CLIENTS];

// ────────────────────────────────────────────────────────────
// Firm-level KPIs for dashboards
// ────────────────────────────────────────────────────────────

export const FIRM_KPIS = {
  activeClients: 235,
  returnsInProgress: 142,
  returnsFiledThisYear: 87,
  documentsOutstanding: 318,
  irsNoticesOpen: 11,
  strategiesAdopted: 62,
  strategiesEstimatedSavings: 1284600,
  ytdRevenue: 1186400,
  priorYTDRevenue: 952200,
  avgTurnaround: 18.2,
  priorAvgTurnaround: 23.7,
};

// ────────────────────────────────────────────────────────────
// Documents — recent uploads across the firm
// ────────────────────────────────────────────────────────────

import type { DocumentRecord, WorkItem, Integration, IRSNotice } from "./types";

export const RECENT_DOCUMENTS: DocumentRecord[] = [
  {
    id: "d1", name: "2024_K1_TuckerFamilyRE_Tucker.pdf", client: "Jeffrey Tucker", clientId: 60, year: 2024, type: "K-1",
    size: "2.4 MB", uploadedAt: "2026-05-07T02:14:00Z", source: "Portal", classifiedBy: "AI", confidence: 0.99, status: "Processed", processedBy: "Priya Raman",
  },
  {
    id: "d2", name: "2024_1099-DIV_Schwab_Holcomb.pdf", client: "Bryan Holcomb", clientId: 184, year: 2024, type: "1099",
    size: "0.8 MB", uploadedAt: "2026-05-07T01:02:00Z", source: "Portal", classifiedBy: "AI", confidence: 0.98, status: "Processed",
  },
  {
    id: "d3", name: "CP2000_Notice_HolcombImaging.pdf", client: "Bryan Holcomb", clientId: 184, year: 2023, type: "1099",
    size: "1.2 MB", uploadedAt: "2026-05-07T06:42:00Z", source: "Direct Sync", classifiedBy: "AI", confidence: 0.94, status: "Needs Review", processedBy: "Diana Ochoa",
  },
  {
    id: "d4", name: "2024_W2_TrentMedical_LilaTrent.pdf", client: "Lila Trent", clientId: 7, year: 2024, type: "W-2",
    size: "0.4 MB", uploadedAt: "2026-05-06T15:22:00Z", source: "Portal", classifiedBy: "AI", confidence: 1.0, status: "Processed",
  },
  {
    id: "d5", name: "2024_1120S_TuckerHoldings.pdf", client: "Jeffrey Tucker", clientId: 60, year: 2024, type: "1120S",
    size: "8.6 MB", uploadedAt: "2026-05-02T14:22:00Z", source: "Internal Upload", classifiedBy: "AI", confidence: 0.97, status: "Processed", processedBy: "Priya Raman",
  },
  {
    id: "d6", name: "Engagement_2026_CordovaConstruction.pdf", client: "Manuel Cordova", clientId: 96, year: 2026, type: "Engagement Letter",
    size: "0.3 MB", uploadedAt: "2026-05-01T10:00:00Z", source: "Direct Sync", classifiedBy: "AI", confidence: 1.0, status: "Processed",
  },
  {
    id: "d7", name: "BankStmt_TruistBusiness_Apr_Westvale.pdf", client: "Anika Westvale", clientId: 73, year: 2026, type: "Bank Statement",
    size: "2.1 MB", uploadedAt: "2026-05-05T08:14:00Z", source: "Portal", classifiedBy: "AI", confidence: 0.96, status: "Processed",
  },
  {
    id: "d8", name: "Form2848_POA_Pell.pdf", client: "Damon Pell", clientId: 211, year: 2026, type: "POA",
    size: "0.5 MB", uploadedAt: "2026-05-04T16:00:00Z", source: "Internal Upload", classifiedBy: "AI", confidence: 1.0, status: "Processed",
  },
  {
    id: "d9", name: "2024_1040_Tucker_v2.pdf", client: "Jeffrey Tucker", clientId: 60, year: 2024, type: "1040",
    size: "12.4 MB", uploadedAt: "2026-05-02T13:48:00Z", source: "Internal Upload", classifiedBy: "AI", confidence: 0.99, status: "Processed", processedBy: "Priya Raman",
  },
  {
    id: "d10", name: "2024_K1_LakeshoreDental.pdf", client: "Karen Lakeshore", clientId: 142, year: 2024, type: "K-1",
    size: "1.8 MB", uploadedAt: "2026-05-06T11:30:00Z", source: "Portal", classifiedBy: "AI", confidence: 0.93, status: "Needs Review",
  },
  {
    id: "d11", name: "2024_1099-MISC_Westvale_Q4.pdf", client: "Anika Westvale", clientId: 73, year: 2024, type: "1099",
    size: "0.6 MB", uploadedAt: "2026-05-03T13:08:00Z", source: "Email", classifiedBy: "AI", confidence: 0.91, status: "In Queue",
  },
  {
    id: "d12", name: "Receipt_OfficeSupplies_Mar_Cordova.pdf", client: "Manuel Cordova", clientId: 96, year: 2026, type: "Receipt",
    size: "0.2 MB", uploadedAt: "2026-05-04T16:22:00Z", source: "Portal", classifiedBy: "AI", confidence: 0.88, status: "Processed",
  },
];

// ────────────────────────────────────────────────────────────
// Engagements / Work items (per brief Section 2.8 — 11 categories)
// ────────────────────────────────────────────────────────────

export const WORK_ITEMS: WorkItem[] = [
  { id: "w1", title: "1040 + 1120S Filing 2024", client: "Jeffrey Tucker", clientId: 60, category: "Tax Return", status: "Internal Review", owner: "Marcus Tate", due: "2026-05-15", fee: 12400, pod: "Alpha" },
  { id: "w2", title: "CP2000 Response", client: "Bryan Holcomb", clientId: 184, category: "IRS Notice", status: "In Progress", owner: "Diana Ochoa", due: "2026-06-06", fee: 1800, pod: "Beta" },
  { id: "w3", title: "Augusta Rule Implementation", client: "Karen Lakeshore", clientId: 142, category: "Tax Planning", status: "In Progress", owner: "Aaron Holt", due: "2026-05-30", fee: 4200, pod: "Beta" },
  { id: "w4", title: "Q1 Bookkeeping Close", client: "Manuel Cordova", clientId: 96, category: "Bookkeeping", status: "Complete", owner: "Rohan Mehta", due: "2026-04-30", fee: 3600, pod: "Alpha" },
  { id: "w5", title: "Q2 Advisory Meeting Prep", client: "Anika Westvale", clientId: 73, category: "Advisory", status: "Awaiting Client", owner: "Marcus Tate", due: "2026-05-22", fee: 2800, pod: "Alpha" },
  { id: "w6", title: "New Client Setup", client: "Damon Pell", clientId: 211, category: "Onboarding", status: "In Progress", owner: "Liam Powell", due: "2026-05-10", fee: 1200, pod: "Beta" },
  { id: "w7", title: "2026 Engagement Renewal", client: "Lila Trent", clientId: 7, category: "Renewal", status: "Awaiting Client", owner: "Sarah Lin", due: "2026-05-25", fee: 8400, pod: "Beta", isRenewal: true },
  { id: "w8", title: "Cost Segregation Study Coordination", client: "Jeffrey Tucker", clientId: 60, category: "Special Project", status: "Not Started", owner: "Priya Raman", due: "2026-06-30", fee: 5800, pod: "Alpha" },
  { id: "w9", title: "Quarterly Tax Estimate Review", client: "Manuel Cordova", clientId: 96, category: "Quarterly Review", status: "Not Started", owner: "Wendy Cho", due: "2026-06-10", fee: 1400, pod: "Alpha" },
  { id: "w10", title: "S-Corp Reasonable Comp Analysis", client: "Bryan Holcomb", clientId: 184, category: "Tax Planning", status: "In Progress", owner: "Diana Ochoa", due: "2026-06-15", fee: 3200, pod: "Beta" },
  { id: "w11", title: "2026 Engagement Renewal — Annual", client: "Anika Westvale", clientId: 73, category: "Renewal", status: "Not Started", owner: "Eric Bramwell", due: "2026-05-20", fee: 12800, pod: "Alpha", isRenewal: true },
  { id: "w12", title: "FBAR Compliance Filing", client: "Anika Westvale", clientId: 73, category: "Compliance", status: "In Progress", owner: "Priya Raman", due: "2026-06-30", fee: 1600, pod: "Alpha" },
];

export const WORK_ITEM_CATEGORIES = [
  "Tax Return", "Tax Planning", "Bookkeeping", "Advisory", "IRS Notice",
  "Onboarding", "Quarterly Review", "Compliance", "Audit Defense", "Renewal", "Special Project",
] as const;

// ────────────────────────────────────────────────────────────
// Integrations (per brief Section 1.4)
// ────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────
// IRS Notices (per brief Section 1.2 — IRS Integration)
// ────────────────────────────────────────────────────────────

export const IRS_NOTICES: IRSNotice[] = [
  {
    id: "n-001",
    type: "CP2000",
    client: "Bryan Holcomb",
    clientId: 184,
    taxYear: 2023,
    receivedAt: "2026-05-07T06:42:00Z",
    responseDue: "2026-06-06",
    proposedAssessment: 4247,
    status: "AI Drafted",
    owner: "Diana Ochoa",
    pod: "Beta",
    summary: "Underreporter notice — IRS records show $18,200 of 1099-MISC income from Holcomb Imaging Group LLC not reported on the 2023 1040. Proposed assessment includes tax + interest + accuracy penalty.",
    irsTrackingNumber: "CP2000-23-049281",
    source: "IRS e-Services",
    aiConfidence: 0.92,
    aiDraftReady: true,
  },
  {
    id: "n-002",
    type: "CP14",
    client: "Manuel Cordova",
    clientId: 96,
    taxYear: 2024,
    receivedAt: "2026-05-04T14:20:00Z",
    responseDue: "2026-06-03",
    proposedAssessment: 18420,
    status: "Awaiting Review",
    owner: "Marcus Tate",
    pod: "Alpha",
    summary: "Balance due notice — 2024 return shows tax of $186,420 with payments of $168,000. Balance due plus initial late payment penalty.",
    irsTrackingNumber: "CP14-24-118402",
    source: "IRS e-Services",
    aiConfidence: 0.98,
    aiDraftReady: true,
  },
  {
    id: "n-003",
    type: "CP12",
    client: "Lila Trent",
    clientId: 7,
    taxYear: 2024,
    receivedAt: "2026-04-28T09:14:00Z",
    responseDue: "2026-05-28",
    proposedAssessment: -2840,
    status: "Sent",
    owner: "Liam Powell",
    pod: "Beta",
    summary: "Math error correction — IRS adjusted Schedule A medical deduction calculation. Refund increased by $2,840.",
    irsTrackingNumber: "CP12-24-209384",
    source: "IRS e-Services",
    aiConfidence: 1.0,
    aiDraftReady: true,
  },
  {
    id: "n-004",
    type: "Letter 525",
    client: "Anika Westvale",
    clientId: 73,
    taxYear: 2022,
    receivedAt: "2026-04-15T11:30:00Z",
    responseDue: "2026-05-15",
    proposedAssessment: 24600,
    status: "Awaiting Review",
    owner: "Marcus Tate",
    pod: "Alpha",
    summary: "Examination report — IRS proposes adjustments on 2022 partnership K-1 guaranteed payments and §199A QBI calculation. Requires CDP rights election.",
    irsTrackingNumber: "L525-22-038420",
    source: "Mailed",
    aiConfidence: 0.84,
    aiDraftReady: true,
  },
  {
    id: "n-005",
    type: "CP501",
    client: "Karen Lakeshore",
    clientId: 142,
    taxYear: 2023,
    receivedAt: "2026-05-01T10:05:00Z",
    responseDue: "2026-05-31",
    proposedAssessment: 6200,
    status: "AI Drafted",
    owner: "Aaron Holt",
    pod: "Beta",
    summary: "First reminder of unpaid balance — 2023 estimated payment shortfall plus accrued interest. Installment agreement option recommended.",
    irsTrackingNumber: "CP501-23-184038",
    source: "IRS e-Services",
    aiConfidence: 0.95,
    aiDraftReady: true,
  },
  {
    id: "n-006",
    type: "CP49",
    client: "Damon Pell",
    clientId: 211,
    taxYear: 2024,
    receivedAt: "2026-04-22T13:18:00Z",
    responseDue: "—",
    proposedAssessment: 0,
    status: "Resolved",
    owner: "Liam Powell",
    pod: "Beta",
    summary: "Notice of refund offset — 2024 refund applied to prior tax year balance. No action required.",
    irsTrackingNumber: "CP49-24-091284",
    source: "IRS e-Services",
    aiConfidence: 1.0,
    aiDraftReady: false,
  },
];

// ────────────────────────────────────────────────────────────
// Integrations (per brief Section 1.4)
// ────────────────────────────────────────────────────────────

export const INTEGRATIONS: Integration[] = [
  { name: "Karbon", category: "Practice Management", status: "Live", detail: "Daily auto-sync at 2am Pacific. v3 API keys stored in DB.", lastSync: "2026-05-07T09:00:00Z" },
  { name: "Ignition", category: "Billing", status: "Live", detail: "Incremental sync, 2.3 min runtime. 3,902 invoices synced (2022–2026).", lastSync: "2026-05-07T07:14:00Z", invoicesSynced: 3902 },
  { name: "Stripe", category: "Payments", status: "Live", detail: "Live mode. First-payment collection during sales calls. sk_live key.", lastSync: "2026-05-06T18:42:00Z" },
  { name: "SendGrid", category: "Email", status: "Live", detail: "Transactional email delivery for portal magic links and notifications.", lastSync: "2026-05-07T09:01:00Z" },
  { name: "AWS S3", category: "Storage", status: "Live", detail: "Document storage. /clients/{id}/{year}/{doc-type}/ namespace.", lastSync: "2026-05-07T09:00:00Z" },
  { name: "Anthropic Claude", category: "AI", status: "Live", detail: "claude-sonnet-4-6. Extraction pipeline + tax plan generator.", lastSync: "2026-05-07T08:58:00Z" },
  { name: "IRS e-Services", category: "Tax Authority", status: "Planned", detail: "Phase 3 — TDS transcripts, real-time CP/CR notice feed." },
  { name: "Fathom", category: "Comms", status: "Planned", detail: "Phase 8 — meeting transcripts and AI-extracted action items." },
  { name: "Twilio", category: "Comms", status: "Planned", detail: "Phase 8 — two-way SMS for document confirmation and deadlines." },
  { name: "Gmail", category: "Comms", status: "Planned", detail: "Phase 8 — per-staff thread sync to client records." },
];
