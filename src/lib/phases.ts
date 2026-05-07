// Phase mapping per the proposal — every route is tagged so Eric can orient:
// "this represents your existing module" vs "this represents Phase X work we'd build."
//
// Important framing: NOTHING in this demo has been shipped or delivered. The badge
// labels distinguish between (a) concepts that mirror Aragon's existing platform
// per the brief (so we'd integrate, not rebuild) and (b) new phases CodeUpscale
// would build under the proposal.

export type PhaseId =
  | "existing"  // mirrors a module in Aragon's current platform per brief Section 2
  | "phase-0"
  | "phase-1"
  | "phase-2"
  | "phase-3"
  | "phase-4"
  | "phase-5"
  | "phase-6"
  | "phase-7"
  | "phase-8"
  | "phase-9"
  | "cross"; // cross-cutting / chrome

export type PhaseTag = {
  id: PhaseId;
  label: string;
  shortLabel: string;
  description: string;
  variant: "neutral" | "ochre" | "emerald" | "sky" | "ink";
};

export const PHASE_TAGS: Record<PhaseId, PhaseTag> = {
  existing: {
    id: "existing",
    label: "Existing module · per brief §2",
    shortLabel: "Existing",
    description: "Mirrors a module already in Aragon's production platform per Section 2 of the brief. Shown in this demo for context — we'd integrate with this, not rebuild it.",
    variant: "emerald",
  },
  "phase-0": {
    id: "phase-0",
    label: "Phase 0 · Proposed build",
    shortLabel: "Phase 0",
    description: "Stabilization scope — GitHub migration, 1120 fixes, entity tab, production hardening. Not yet built; proposed.",
    variant: "neutral",
  },
  "phase-1": {
    id: "phase-1",
    label: "Phase 1 · Proposed build",
    shortLabel: "Phase 1",
    description: "Client Portal — magic-link auth, document checklist, S3 intake, organizer questionnaire. Not yet built; proposed.",
    variant: "ochre",
  },
  "phase-2": {
    id: "phase-2",
    label: "Phase 2 · Proposed build",
    shortLabel: "Phase 2",
    description: "Onboarding wizard + AI File Intelligence — structured intake, document classification, routing, dedup. Not yet built; proposed.",
    variant: "ochre",
  },
  "phase-3": {
    id: "phase-3",
    label: "Phase 3 · Proposed build",
    shortLabel: "Phase 3",
    description: "IRS Integration — e-Services notice feed, transcripts, AI first-draft responses. Not yet built; proposed.",
    variant: "ochre",
  },
  "phase-4": {
    id: "phase-4",
    label: "Phase 4 · Proposed build",
    shortLabel: "Phase 4",
    description: "IRS Form Generation — auto-populated 2848, 2553, SS-4, 8822, 8879, 8832. Not yet built; proposed.",
    variant: "ochre",
  },
  "phase-5": {
    id: "phase-5",
    label: "Phase 5 · Proposed build",
    shortLabel: "Phase 5",
    description: "Strategy Execution Engine — playbooks with completion gates, AI-drafted client deliverables. Not yet built; proposed.",
    variant: "ochre",
  },
  "phase-6": {
    id: "phase-6",
    label: "Phase 6 · Proposed build",
    shortLabel: "Phase 6",
    description: "Agentic AI Layer — reactive + proactive agents, morning briefing, forecasting adjustment. Not yet built; proposed.",
    variant: "ochre",
  },
  "phase-7": {
    id: "phase-7",
    label: "Phase 7 · Proposed build",
    shortLabel: "Phase 7",
    description: "Service Reports + BI — staff performance, revenue attribution, client tier composition. Not yet built; proposed.",
    variant: "sky",
  },
  "phase-8": {
    id: "phase-8",
    label: "Phase 8 · Proposed build",
    shortLabel: "Phase 8",
    description: "Communication Integrations — Fathom, Gmail, Twilio, pgvector RAG. Not yet built; proposed.",
    variant: "sky",
  },
  "phase-9": {
    id: "phase-9",
    label: "Phase 9 · Proposed build (optional)",
    shortLabel: "Phase 9",
    description: "Advanced C-Corp — 1125-E, M-1/M-2, Form 4562, Form 3800, multi-tier ownership. Optional/parallel track.",
    variant: "neutral",
  },
  cross: {
    id: "cross",
    label: "Cross-cutting · demo context",
    shortLabel: "Cross",
    description: "Chrome / navigation surface. Demo concept showing how the platform stitches together — not a deliverable in any specific phase.",
    variant: "neutral",
  },
};

// Match a path to its phase. Order matters — most specific first.
const ROUTE_PHASE_RULES: { match: (p: string) => boolean; phase: PhaseId }[] = [
  { match: (p) => p === "/portal" || p.startsWith("/portal/"), phase: "phase-1" },
  { match: (p) => p === "/onboarding", phase: "phase-2" },
  { match: (p) => p === "/forms" || p.startsWith("/forms/") || /\/clients\/[^/]+\/forms/.test(p), phase: "phase-4" },
  { match: (p) => /\/clients\/[^/]+\/strategies/.test(p), phase: "phase-5" },
  { match: (p) => p === "/strategies" || p.startsWith("/strategies/"), phase: "phase-5" },
  { match: (p) => p === "/briefing", phase: "phase-6" },
  { match: (p) => p === "/irs-notices" || p.startsWith("/irs-notices/"), phase: "phase-3" },
  { match: (p) => p === "/documents", phase: "phase-2" },
  { match: (p) => /\/clients\/[^/]+\/documents/.test(p), phase: "phase-1" },
  { match: (p) => /\/clients\/[^/]+\/communications/.test(p), phase: "phase-8" },
  { match: (p) => /\/clients\/[^/]+\/engagements/.test(p), phase: "phase-6" },
  { match: (p) => /\/clients\/[^/]+\/forecast/.test(p), phase: "existing" },
  { match: (p) => /\/clients\/[^/]+\/tax-planning/.test(p), phase: "existing" },
  { match: (p) => /\/clients\/[^/]+$/.test(p), phase: "existing" },
  { match: (p) => p === "/clients", phase: "existing" },
  { match: (p) => p === "/review-queue", phase: "existing" },
  { match: (p) => p === "/reports", phase: "phase-7" },
  { match: (p) => p === "/engagements", phase: "phase-6" },
  { match: (p) => p === "/settings", phase: "cross" },
  { match: (p) => p === "/", phase: "cross" },
];

export function getPhaseForRoute(path: string): PhaseTag {
  for (const rule of ROUTE_PHASE_RULES) {
    if (rule.match(path)) return PHASE_TAGS[rule.phase];
  }
  return PHASE_TAGS.cross;
}
