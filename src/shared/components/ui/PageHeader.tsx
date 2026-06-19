import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 capitalize">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base first-letter:capitalize">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
