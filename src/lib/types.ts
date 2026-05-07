// Shared types — mirrors the data model described in the brief.
// Clients are individuals; entities are businesses linked via client_id.

export type EntityType = "S Corporation" | "C Corporation" | "Partnership" | "LLC" | "Trust" | "Estate";

export type FormType = "1040" | "1120S" | "1065" | "1120" | "1041";

export type StaffRole =
  | "POD Lead"
  | "Tax Manager"
  | "Senior Tax Staff"
  | "Tax Staff"
  | "Bookkeeper"
  | "Sales Rep"
  | "Admin";

export interface Staff {
  id: string;
  name: string;
  initials: string;
  role: StaffRole;
  pod: "Alpha" | "Beta" | null;
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  filingStatus: "Single" | "Married Filing Jointly" | "Married Filing Separately" | "Head of Household";
  spouse?: { firstName: string; lastName: string };
  email: string;
  city: string;
  state: string;
  pod: "Alpha" | "Beta";
  taxManager: string;
  taxStaff?: string;
  bookkeeper?: string;
  salesRep?: string;
  status: "Lead" | "Signed" | "Onboarding" | "In Progress" | "Filed" | "Billed" | "Renewing";
  tier: "Diamond" | "Platinum" | "Gold" | "Silver";
  annualRevenue: number;
  signedDate: string;
  lastTouch: string;
  healthScore: number; // 0–100
  hasOpenIRSNotice?: boolean;
  documentsRequested?: number;
  documentsReceived?: number;
}

export interface Entity {
  id: string;
  clientId: number;
  name: string;
  type: EntityType;
  ein?: string;
  ownership: number; // % owned by client
  formType: FormType;
  state: string;
  yearFormed: number;
}

export interface K1 {
  partnerName: string;
  ownership: number;
  ordinaryIncome: number;
  guaranteedPayments?: number;
  rentalIncome?: number;
  capitalAccountEnd: number;
}

export interface ForecastLine {
  category: string;
  priorYear: number;
  projected: number;
  isHeader?: boolean;
}

export interface ForecastVersion {
  id: string;
  label: string;
  lockedAt: string | null;
  isLocked: boolean;
  totalProjectedTax: number;
  totalProjectedAGI: number;
  effectiveRate: number;
}

export interface TaxStrategy {
  id: string;
  name: string;
  category: "Income Shifting" | "Entity Optimization" | "Retirement" | "Real Estate" | "Compliance" | "Family";
  eligibility: "Eligible" | "Likely Eligible" | "Review Required" | "Not Eligible";
  estimatedSavings: number;
  status: "Recommended" | "Under Review" | "In Progress" | "Adopted" | "Declined";
  flagship?: boolean;
  description: string;
  aiNote?: string;
}

export interface PlaybookStep {
  id: string;
  number: number;
  title: string;
  description: string;
  status: "Not Started" | "In Progress" | "Awaiting Review" | "Complete";
  owner?: string;
  dueDate?: string;
  documents?: { name: string; type: "draft" | "final" | "template" }[];
  aiAssisted: boolean;
}

export interface BriefingItem {
  id: string;
  category: "ready-to-file" | "overdue-step" | "irs-notice" | "planning-opportunity" | "deadline" | "anomaly";
  client: string;
  clientId: number;
  headline: string;
  detail: string;
  detectedAt: string;
  recommendedAction: string;
  estimatedValue?: number;
  owner: string;
  urgency: "high" | "medium" | "low";
  source: string;
}

export type DocumentRecord = {
  id: string;
  name: string;
  client: string;
  clientId: number;
  year: number;
  type: "1040" | "1099" | "W-2" | "K-1" | "1120S" | "1065" | "1120" | "1041" | "Receipt" | "Bank Statement" | "Engagement Letter" | "POA";
  size: string;
  uploadedAt: string;
  source: "Portal" | "Email" | "Internal Upload" | "Direct Sync";
  classifiedBy: "AI" | "Manual";
  confidence: number;
  status: "Processed" | "In Queue" | "Needs Review";
  processedBy?: string;
};

export type WorkItem = {
  id: string;
  title: string;
  client: string;
  clientId: number;
  category: "Tax Return" | "Tax Planning" | "Bookkeeping" | "Advisory" | "IRS Notice" | "Onboarding" | "Quarterly Review" | "Compliance" | "Audit Defense" | "Renewal" | "Special Project";
  status: "Not Started" | "In Progress" | "Awaiting Client" | "Internal Review" | "Complete";
  owner: string;
  due: string;
  fee: number;
  pod: "Alpha" | "Beta";
  isRenewal?: boolean;
};

export type Integration = {
  name: string;
  category: "Practice Management" | "Billing" | "Payments" | "Email" | "Storage" | "Tax Authority" | "Comms" | "AI";
  status: "Live" | "Planned" | "Paused";
  detail: string;
  lastSync?: string;
  invoicesSynced?: number;
};

export type IRSNoticeType =
  | "CP2000" // Underreporter
  | "CP14"   // Balance due
  | "CP501"  // Reminder of unpaid balance
  | "CP504"  // Final notice — intent to levy
  | "CP90"   // Final notice of intent to levy
  | "CP12"   // Math error
  | "CP49"   // Refund applied to balance
  | "Letter 525" // Examination report
  | "Letter 1058"; // Final notice

export type IRSNotice = {
  id: string;
  type: IRSNoticeType;
  client: string;
  clientId: number;
  taxYear: number;
  receivedAt: string;
  responseDue: string;
  proposedAssessment: number;
  status: "New" | "AI Drafted" | "Awaiting Review" | "Sent" | "Resolved";
  owner: string;
  pod: "Alpha" | "Beta";
  summary: string;
  irsTrackingNumber: string;
  source: "IRS e-Services" | "Mailed" | "Client uploaded";
  aiConfidence: number;
  aiDraftReady: boolean;
};
