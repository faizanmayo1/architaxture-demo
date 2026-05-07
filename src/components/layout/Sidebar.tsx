import { Link, useLocation } from "wouter";
import {
  LayoutGrid,
  Sparkles,
  Users,
  FolderOpen,
  ClipboardList,
  FileBarChart2,
  Workflow,
  Inbox,
  ShieldAlert,
  UserPlus,
  FileSignature,
  Settings as SettingsIcon,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/format";
import { AragonMark } from "../ui/AragonMark";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  matches?: (path: string) => boolean;
  hint?: string;
}

const navSections: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [
      { label: "Firm", to: "/", icon: LayoutGrid, matches: (p) => p === "/" },
      { label: "Morning Briefing", to: "/briefing", icon: Sparkles, matches: (p) => p.startsWith("/briefing"), hint: "6" },
    ],
  },
  {
    heading: "Practice",
    items: [
      { label: "Clients", to: "/clients", icon: Users, matches: (p) => p.startsWith("/clients") },
      { label: "Onboarding Queue", to: "/operations/onboarding", icon: UserPlus, matches: (p) => p.startsWith("/operations/onboarding") || p === "/onboarding" },
      { label: "Documents", to: "/documents", icon: FolderOpen, matches: (p) => p.startsWith("/documents") },
      { label: "Engagements", to: "/engagements", icon: ClipboardList, matches: (p) => p.startsWith("/engagements") },
    ],
  },
  {
    heading: "Operations",
    items: [
      { label: "Review Queue", to: "/review-queue", icon: Inbox, matches: (p) => p.startsWith("/review-queue") },
      { label: "IRS Notices", to: "/irs-notices", icon: ShieldAlert, matches: (p) => p.startsWith("/irs-notices"), hint: "5" },
      { label: "Form Generation", to: "/forms", icon: FileSignature, matches: (p) => p.startsWith("/forms") },
      { label: "Strategy Engine", to: "/strategies", icon: Workflow, matches: (p) => p.startsWith("/strategies") },
      { label: "Reports", to: "/reports", icon: FileBarChart2, matches: (p) => p.startsWith("/reports") },
    ],
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-[244px] shrink-0 bg-paper border-r border-ink/8 h-screen sticky top-0 z-40 flex flex-col">
      {/* Brand block */}
      <Link to="/" className="block px-5 pt-5 pb-4 group">
        <div className="flex items-center gap-2.5">
          <AragonMark size={32} className="shrink-0 transition-transform group-hover:scale-105" />
          <div className="leading-none min-w-0">
            <div className="text-[14px] font-bold tracking-[0.16em] text-ink">ARAGON</div>
            <div className="text-[7.5px] font-medium tracking-[0.18em] text-ink-muted mt-1">
              ACCOUNTING CORP.
            </div>
          </div>
        </div>

        <div className="mt-3 px-3 py-2 rounded-lg bg-ochre-50 ring-1 ring-inset ring-ochre-200/50 flex items-center justify-between">
          <div className="leading-tight">
            <div className="text-[11.5px] font-bold tracking-tight text-ink">ArchiTAXture</div>
            <div className="text-[9.5px] text-ink-muted mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ochre-600" />
              Stage 1 of 4
            </div>
          </div>
          <span className="text-[9px] font-mono text-ink-muted tracking-tight">v2.0</span>
        </div>
      </Link>

      <div className="mx-4 h-px bg-ink/8 mt-1" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {navSections.map((section, sectionIdx) => (
          <div key={section.heading} className={sectionIdx > 0 ? "mt-5" : ""}>
            <div className="px-5 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink-faint font-medium">
                {section.heading}
              </span>
            </div>
            <ul className="space-y-px">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = item.matches ? item.matches(location) : location === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      title={item.label}
                      className={cn(
                        "mx-2 flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all duration-150 relative group/nav",
                        active
                          ? "bg-ochre-100 text-ink font-medium"
                          : "text-ink-muted hover:bg-ochre-50 hover:text-ink"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-aragon-navy rounded-r-full" />
                      )}
                      <Icon
                        size={15}
                        strokeWidth={1.7}
                        className={cn("shrink-0 transition-colors", active ? "text-aragon-navy" : "text-ink-muted group-hover/nav:text-ink")}
                      />
                      <span className="flex-1 truncate tracking-tight">{item.label}</span>
                      {item.hint && (
                        <span className={cn(
                          "text-[10px] font-mono tabular px-1.5 py-0.5 rounded shrink-0",
                          active ? "bg-ink/8 text-ink" : "bg-ink/5 text-ink-muted"
                        )}>
                          {item.hint}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mx-4 h-px bg-ink/8" />

      {/* Footer — settings + user */}
      <div className="p-3 space-y-px">
        <Link
          to="/settings"
          title="Settings"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all duration-150",
            location.startsWith("/settings")
              ? "bg-ochre-100 text-ink font-medium"
              : "text-ink-muted hover:bg-ochre-50 hover:text-ink"
          )}
        >
          <SettingsIcon size={15} strokeWidth={1.7} className="shrink-0" />
          <span className="flex-1 tracking-tight">Settings</span>
          <kbd className="text-[9px] font-mono text-ink-faint tabular">⌘K</kbd>
        </Link>

        <Link
          to="/help"
          title="Help"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-ink-muted hover:bg-ochre-50 hover:text-ink transition-all duration-150"
        >
          <HelpCircle size={15} strokeWidth={1.7} className="shrink-0" />
          <span className="flex-1 tracking-tight">Help & Docs</span>
        </Link>

        <div className="mt-2 pt-2 border-t border-ink/6">
          <Link
            to="/settings"
            title="Eric Bramwell · POD Alpha Lead"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-paper-deep transition-colors group/user"
          >
            <div className="w-8 h-8 rounded-full bg-aragon-navy text-paper flex items-center justify-center text-[10.5px] font-mono font-medium tracking-tight shrink-0">
              EB
            </div>
            <div className="flex-1 min-w-0 leading-tight">
              <div className="text-[12.5px] font-medium text-ink truncate">Eric Bramwell</div>
              <div className="text-[10.5px] text-ink-muted truncate">POD Alpha · Lead</div>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
