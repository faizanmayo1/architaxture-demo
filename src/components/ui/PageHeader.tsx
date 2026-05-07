import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumb?: { label: string; to?: string }[];
  action?: React.ReactNode;
}) {
  return (
    <div className="relative mb-8">
      {/* Hero card backdrop — subtle gradient + shadow + Aragon accent strip */}
      <div className="relative overflow-hidden rounded-2xl bg-paper-card shadow-paper-md border border-ink/5">
        {/* Sky-blue accent strip on left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-ochre-500 via-ochre-400 to-ochre-300" />

        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-ochre-50/40 via-transparent to-transparent pointer-events-none" />

        {/* Decorative dot grid in top-right (Aragon mark feel) */}
        <div
          className="absolute top-0 right-0 w-64 h-32 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #2D2E33 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative px-8 py-7">
          {/* Breadcrumb row */}
          {breadcrumb && (
            <div className="flex items-center gap-1.5 text-[12px] text-ink-muted mb-4">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {b.to ? (
                    <Link to={b.to} className="hover:text-ink transition-colors">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && <ChevronRight size={12} strokeWidth={1.5} className="text-ink-faint" />}
                </span>
              ))}
            </div>
          )}

          {/* Main row */}
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="min-w-0 max-w-3xl">
              {eyebrow && (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-ochre-50 border border-ochre-200/40 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ochre-500" />
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-ink-soft font-medium">
                    {eyebrow}
                  </span>
                </div>
              )}
              <h1 className="display text-[40px] leading-[0.96] text-ink text-balance">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[14px] text-ink-muted mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
