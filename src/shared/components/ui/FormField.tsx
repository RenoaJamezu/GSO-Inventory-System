type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  value?: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  error?: string;
};

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  textarea,
  error,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700 uppercase">{label}</label>

      {textarea ? (
        <textarea
          name={name}
          value={value ?? ""}
          onChange={onChange}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />
      )}

      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}
