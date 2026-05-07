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
}

const navSections: { items: NavItem[] }[] = [
  {
    items: [
      { label: "Firm", to: "/", icon: LayoutGrid, matches: (p) => p === "/" },
      { label: "Morning Briefing", to: "/briefing", icon: Sparkles, matches: (p) => p.startsWith("/briefing") },
    ],
  },
  {
    items: [
      { label: "Clients", to: "/clients", icon: Users, matches: (p) => p.startsWith("/clients") },
      { label: "Onboarding Queue", to: "/operations/onboarding", icon: UserPlus, matches: (p) => p.startsWith("/operations/onboarding") || p === "/onboarding" },
      { label: "Documents", to: "/documents", icon: FolderOpen, matches: (p) => p.startsWith("/documents") },
      { label: "Engagements", to: "/engagements", icon: ClipboardList, matches: (p) => p.startsWith("/engagements") },
    ],
  },
  {
    items: [
      { label: "Review Queue", to: "/review-queue", icon: Inbox, matches: (p) => p.startsWith("/review-queue") },
      { label: "IRS Notices", to: "/irs-notices", icon: ShieldAlert, matches: (p) => p.startsWith("/irs-notices") },
      { label: "Form Generation", to: "/forms", icon: FileSignature, matches: (p) => p.startsWith("/forms") },
      { label: "Strategy Engine", to: "/strategies", icon: Workflow, matches: (p) => p.startsWith("/strategies") },
      { label: "Reports", to: "/reports", icon: FileBarChart2, matches: (p) => p.startsWith("/reports") },
    ],
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-[68px] shrink-0 bg-paper border-r border-ink/8 h-screen sticky top-0 z-40 flex flex-col">
      {/* Brand mark */}
      <Link to="/" className="flex items-center justify-center pt-5 pb-5 group">
        <AragonMark size={36} className="transition-transform group-hover:scale-105" />
      </Link>

      <div className="mx-3 h-px bg-ink/8" />

      {/* Nav rail */}
      <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-1">
        {navSections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {sectionIdx > 0 && <div className="mx-3 h-px bg-ink/6 my-2" />}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = item.matches ? item.matches(location) : location === item.to;
              return (
                <RailItem key={item.to} to={item.to} icon={Icon} label={item.label} active={active} />
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mx-3 h-px bg-ink/8" />

      {/* Footer — settings + help + user */}
      <div className="py-3 flex flex-col gap-1">
        <RailItem to="/settings" icon={SettingsIcon} label="Settings" active={location.startsWith("/settings")} />
        <RailItem to="/help" icon={HelpCircle} label="Help" active={false} />
        <Link
          to="/settings"
          className="mt-2 mx-auto w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center text-[11px] font-medium tracking-tight hover:scale-105 transition-transform"
          title="Eric Bramwell · POD Alpha Lead"
        >
          EB
        </Link>
      </div>
    </aside>
  );
}

function RailItem({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
}) {
  return (
    <Link to={to} className="block group relative" title={label}>
      <div
        className={cn(
          "mx-2 h-10 rounded-lg flex items-center justify-center transition-all relative",
          active
            ? "bg-ochre-100 text-ink"
            : "text-ink-muted hover:bg-ochre-50 hover:text-ink"
        )}
      >
        <Icon size={17} strokeWidth={1.7} />
        {active && <span className="absolute -left-2 top-2 bottom-2 w-1 bg-ochre-500 rounded-r-full" />}
      </div>
      {/* Tooltip — appears to the right on hover */}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-ink text-paper text-[12.5px] font-medium rounded-lg whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out z-[60] shadow-paper-lg"
      >
        {label}
        {/* Arrow */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-ink" />
      </span>
    </Link>
  );
}
