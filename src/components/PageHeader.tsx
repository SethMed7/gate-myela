import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  meta?: ReactNode;
}

export default function PageHeader({ title, subtitle, actions, meta }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base text-slate-500 mt-1 max-w-2xl">{subtitle}</p>
        )}
        {meta && <div className="mt-2 text-xs text-slate-400">{meta}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
