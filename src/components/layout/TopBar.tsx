import { Search, Bell, HelpCircle, Calendar } from "lucide-react";
import { fmtDate } from "../../lib/format";

export function TopBar() {
  const today = new Date("2026-05-07T07:00:00");

  return (
    <header className="sticky top-0 z-30 bg-paper/85 backdrop-blur-sm border-b border-ink/8">
      <div className="flex items-center h-[56px] px-8 gap-5">
        {/* Date — anchors the demo */}
        <div className="flex items-center gap-2 text-[12px] text-ink-muted">
          <Calendar size={13} strokeWidth={1.6} />
          <span className="tabular tracking-tight">{fmtDate(today, "long")}</span>
        </div>

        <div className="w-px h-4 bg-ink/10" />

        <div className="text-[12px] text-ink-muted tracking-tight">
          Aragon Accounting Corporation · Tax Year 2025
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <Search size={13} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Search clients, returns, documents…"
            className="pl-9 pr-3 py-1.5 w-72 text-[13px] bg-paper-deep border border-transparent rounded-sm focus:outline-none focus:border-ink/15 focus:bg-paper-card placeholder:text-ink-faint transition-colors"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-faint border border-ink/10 rounded px-1 py-0.5">⌘K</span>
        </div>

        <button className="p-1.5 text-ink-muted hover:text-ink transition-colors relative">
          <Bell size={15} strokeWidth={1.6} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ochre-500" />
        </button>

        <button className="p-1.5 text-ink-muted hover:text-ink transition-colors">
          <HelpCircle size={15} strokeWidth={1.6} />
        </button>
      </div>
    </header>
  );
}
