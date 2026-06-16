type DetailCardProps = {
  label: string;
  value: string | number | null | undefined;
  fullWidth?: boolean;
};

export default function DetailCard({ label, value, fullWidth }: DetailCardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-slate-50 p-4 ${fullWidth ? "md:col-span-2" : ""}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-800">
        {value === null || value === undefined || value === "" ? "-" : value}
      </p>
    </div>
  );
}
