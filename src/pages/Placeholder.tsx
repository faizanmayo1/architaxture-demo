import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";

export function Placeholder({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-10 py-10 max-w-7xl">
      <PageHeader eyebrow="Coming next" title={title} subtitle={subtitle} />
      <Card className="bg-paper-deep border-dashed">
        <div className="py-16 text-center">
          <div className="display text-[28px] text-ink-muted">
            On the roadmap
          </div>
          <div className="text-[13px] text-ink-faint mt-2 max-w-md mx-auto">
            This module is part of the phased build program. The demo focuses on Forecasting,
            Tax Planning, the Augusta Rule playbook, and the Morning Briefing.
          </div>
        </div>
      </Card>
    </div>
  );
}
