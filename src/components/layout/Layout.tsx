import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { PhaseBadge } from "../ui/PhaseBadge";
import { CommandPalette } from "../ui/CommandPalette";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-paper">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <PhaseBadge />
      <CommandPalette />
    </div>
  );
}
