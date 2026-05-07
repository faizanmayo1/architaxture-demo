import { cn } from "../../lib/format";

export function Card({
  children,
  className = "",
  padded = true,
  raised = false,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  raised?: boolean;
}) {
  return (
    <div
      className={cn(
        "card",
        padded && "p-7",
        raised && "shadow-paper-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-2.5">{eyebrow}</div>}
        <h3 className="display text-[20px] text-ink leading-tight tracking-crisp">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-ink-muted mt-2 max-w-prose leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
