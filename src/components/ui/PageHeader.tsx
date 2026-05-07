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
    <div className="page-title">
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
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="min-w-0">
          {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
          <h1 className="display text-[42px] leading-[0.96] text-ink text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[14px] text-ink-muted mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
