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
  ExternalLink,
  UserPlus,
  FileSignature,
  Settings as SettingsIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/format";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  matches?: (path: string) => boolean;
}

const navSections: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [
      {
        label: "Firm",
        to: "/",
        icon: LayoutGrid,
        matches: (p) => p === "/",
      },
      {
        label: "Morning Briefing",
        to: "/briefing",
        icon: Sparkles,
        matches: (p) => p.startsWith("/briefing"),
      },
    ],
  },
  {
    heading: "Practice",
    items: [
      {
        label: "Clients",
        to: "/clients",
        icon: Users,
        matches: (p) => p.startsWith("/clients"),
      },
      {
        label: "Onboarding",
        to: "/onboarding",
        icon: UserPlus,
        matches: (p) => p.startsWith("/onboarding"),
      },
      {
        label: "Documents",
        to: "/documents",
        icon: FolderOpen,
        matches: (p) => p.startsWith("/documents"),
      },
      {
        label: "Engagements",
        to: "/engagements",
        icon: ClipboardList,
        matches: (p) => p.startsWith("/engagements"),
      },
    ],
  },
  {
    heading: "Operations",
    items: [
      {
        label: "Review Queue",
        to: "/review-queue",
        icon: Inbox,
        matches: (p) => p.startsWith("/review-queue"),
      },
      {
        label: "IRS Notices",
        to: "/irs-notices",
        icon: ShieldAlert,
        matches: (p) => p.startsWith("/irs-notices"),
      },
      {
        label: "Form Generation",
        to: "/forms",
        icon: FileSignature,
        matches: (p) => p.startsWith("/forms"),
      },
      {
        label: "Strategy Engine",
        to: "/strategies",
        icon: Workflow,
        matches: (p) => p.startsWith("/strategies"),
      },
      {
        label: "Reports",
        to: "/reports",
        icon: FileBarChart2,
        matches: (p) => p.startsWith("/reports"),
      },
    ],
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-[228px] shrink-0 bg-paper border-r border-ink/8 h-screen sticky top-0 flex flex-col">
      {/* Brand */}
      <div className="px-6 pt-7 pb-6">
        <Link to="/" className="block group">
          <div className="flex items-baseline gap-2">
            <div className="display text-[26px] leading-none text-ink">
              Archi<span className="italic">TAX</span>ture
            </div>
          </div>
          <div className="eyebrow mt-1.5">
            <span className="text-ochre-600">●</span> Stage 1 of 4 · AI-Assisted
          </div>
        </Link>
      </div>

      <hr className="hairline mx-6" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section, i) => (
          <div key={section.heading} className={i > 0 ? "mt-5" : ""}>
            <div className="px-6 mb-1.5">
              <span className="eyebrow">{section.heading}</span>
            </div>
            <ul>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = item.matches ? item.matches(location) : location === item.to;
                return (
                  <li key={item.to}>
                    <Link to={item.to} className={cn("nav-item", active && "active")}>
                      <Icon size={15} strokeWidth={1.6} className="shrink-0" />
                      <span className="font-medium tracking-tight">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <hr className="hairline mx-6" />

      {/* Firm footer */}
      <div className="p-6">
        <Link to="/settings" className="block group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-[11px] font-mono font-medium tracking-tight">
              EB
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-ink truncate">Eric Bramwell</div>
              <div className="text-[11px] text-ink-muted truncate">POD Alpha · Lead</div>
            </div>
            <SettingsIcon size={14} strokeWidth={1.6} className="text-ink-faint group-hover:text-ink ml-auto transition-colors" />
          </div>
        </Link>
      </div>
    </aside>
  );
}
