import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import {
  Search,
  ArrowRight,
  Sparkles,
  Users,
  FolderOpen,
  ShieldAlert,
  FileSignature,
  TrendingUp,
  Inbox,
  Workflow,
  FileBarChart2,
  ClipboardList,
  UserPlus,
  LayoutGrid,
  Settings as SettingsIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/format";

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Clients" | "Actions" | "Operations";
  icon: LucideIcon;
  hint?: string;
  to: string;
};

const COMMANDS: Command[] = [
  // Navigate
  { id: "n-firm", label: "Firm Overview", group: "Navigate", icon: LayoutGrid, to: "/" },
  { id: "n-briefing", label: "Morning Briefing", group: "Navigate", icon: Sparkles, hint: "7am digest", to: "/briefing" },
  { id: "n-reports", label: "Reports + BI", group: "Navigate", icon: FileBarChart2, to: "/reports" },
  { id: "n-strategies", label: "Strategy Engine", group: "Navigate", icon: Workflow, to: "/strategies" },
  { id: "n-irs", label: "IRS Notices", group: "Navigate", icon: ShieldAlert, to: "/irs-notices" },
  { id: "n-forms", label: "Form Generation", group: "Navigate", icon: FileSignature, to: "/forms" },
  { id: "n-review", label: "Review Queue", group: "Navigate", icon: Inbox, to: "/review-queue" },
  { id: "n-docs", label: "Documents", group: "Navigate", icon: FolderOpen, to: "/documents" },
  { id: "n-eng", label: "Engagements", group: "Navigate", icon: ClipboardList, to: "/engagements" },
  { id: "n-clients", label: "All Clients", group: "Navigate", icon: Users, to: "/clients" },
  // Operations
  { id: "o-onboarding-queue", label: "Onboarding Queue", group: "Operations", icon: UserPlus, to: "/operations/onboarding" },
  { id: "o-onboarding-wizard", label: "New Client Wizard", group: "Operations", icon: UserPlus, hint: "Driver's license + questionnaire", to: "/onboarding" },
  { id: "o-settings", label: "Settings + Integrations", group: "Operations", icon: SettingsIcon, to: "/settings" },
  // Clients
  { id: "c-tucker", label: "Jeffrey Tucker", group: "Clients", icon: Users, hint: "Diamond · POD Alpha · S-Corp", to: "/clients/60" },
  { id: "c-tucker-dash", label: "Tucker · Tax Dashboard", group: "Clients", icon: TrendingUp, to: "/clients/60/tax-dashboard" },
  { id: "c-tucker-forecast", label: "Tucker · Forecasts", group: "Clients", icon: TrendingUp, to: "/clients/60/forecast" },
  { id: "c-tucker-planning", label: "Tucker · Tax Planning", group: "Clients", icon: Sparkles, to: "/clients/60/tax-planning" },
  { id: "c-tucker-augusta", label: "Tucker · Augusta Rule Playbook", group: "Clients", icon: Workflow, to: "/clients/60/strategies/augusta-rule" },
  { id: "c-tucker-pdf", label: "Tucker · Tax Plan PDF", group: "Clients", icon: FileSignature, to: "/clients/60/tax-plan-pdf" },
  { id: "c-holcomb", label: "Bryan Holcomb (CP2000)", group: "Clients", icon: ShieldAlert, hint: "$4,247 exposure · responding", to: "/irs-notices/n-001" },
  { id: "c-cordova", label: "Manuel Cordova", group: "Clients", icon: Users, to: "/clients/96" },
  { id: "c-westvale", label: "Anika Westvale", group: "Clients", icon: Users, to: "/clients/73" },
  { id: "c-portal", label: "Open Client Portal as Jeffrey", group: "Clients", icon: ArrowRight, to: "/portal" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  const filtered = query
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.hint?.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});
  const flat = Object.values(grouped).flat();

  const onSelect = (cmd: Command) => {
    navigate(cmd.to);
    setOpen(false);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[activeIndex]) onSelect(flat[activeIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 animate-fade-in"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />

      {/* Palette */}
      <div
        className="relative w-full max-w-[640px] bg-paper rounded-2xl shadow-paper-lg border border-ink/8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-ink/8">
          <Search size={16} strokeWidth={1.6} className="text-ink-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search clients, pages, actions…"
            className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-ink-faint border border-ink/10 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {Object.entries(grouped).map(([groupName, items]) => (
            <div key={groupName} className="mb-2">
              <div className="px-5 py-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-ink-faint font-medium">
                {groupName}
              </div>
              {items.map((cmd) => {
                const Icon = cmd.icon;
                const flatIndex = flat.indexOf(cmd);
                const isActive = flatIndex === activeIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => onSelect(cmd)}
                    onMouseEnter={() => setActiveIndex(flatIndex)}
                    className={cn(
                      "w-full text-left px-5 py-2.5 flex items-center gap-3 transition-colors",
                      isActive ? "bg-ochre-50" : ""
                    )}
                  >
                    <div className={cn(
                      "w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors",
                      isActive ? "bg-ochre-100 text-ochre-700" : "bg-paper-deep text-ink-muted"
                    )}>
                      <Icon size={13} strokeWidth={1.7} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] text-ink font-medium truncate">{cmd.label}</div>
                      {cmd.hint && (
                        <div className="text-[11.5px] text-ink-muted truncate">{cmd.hint}</div>
                      )}
                    </div>
                    {isActive && (
                      <ArrowRight size={13} strokeWidth={1.8} className="text-ochre-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
          {flat.length === 0 && (
            <div className="px-5 py-12 text-center text-[13px] text-ink-muted">
              No matches for "{query}"
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="border-t border-ink/8 px-5 py-2.5 flex items-center justify-between text-[10.5px] text-ink-faint font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="border border-ink/10 rounded px-1 py-0.5">↑↓</kbd> navigate</span>
            <span><kbd className="border border-ink/10 rounded px-1 py-0.5">↵</kbd> open</span>
          </div>
          <span>{flat.length} {flat.length === 1 ? "result" : "results"}</span>
        </div>
      </div>
    </div>
  );
}
