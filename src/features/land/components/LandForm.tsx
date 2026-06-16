import { useState } from "react";
import { landSchema, type LandFormData } from "@/features/land/schemas/land.schema";
import { FormField } from "@/shared/components/ui/FormField";
import type { LandItem } from "@/features/land/types/land.types";

const emptyForm: LandFormData = {
  lot_no: "",
  location: "",
  carrying_amount: 0,
};

type Props = {
  onClose: () => void;
  initialData?: LandItem | null;
  submitLabel?: string;
  serverError?: string | null;
  onSubmit: (data: LandFormData) => Promise<boolean>;
};

export default function LandForm({
  onClose,
  initialData,
  submitLabel = "Save Land",
  serverError,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<LandFormData>(initialData ?? emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        value === ""
          ? null
          : name === "id" || name === "carrying_amount"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = landSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const key = err.path[0];
        if (typeof key === "string" || typeof key === "number") {
          fieldErrors[String(key)] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const success = await onSubmit(result.data);
    setSubmitting(false);

    if (success) {
      setErrors({});
      setForm(initialData ?? emptyForm);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {serverError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Lot No"
          name="lot_no"
          value={form.lot_no}
          onChange={handleChange}
          error={errors.lot_no}
        />

        <FormField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          error={errors.location}
        />

        <FormField
          label="Land"
          name="land"
          value={form.land}
          onChange={handleChange}
          error={errors.land}
        />

        <FormField
          label="Land Improvements"
          name="land_improvements"
          value={form.land_improvements}
          onChange={handleChange}
          error={errors.land_improvements}
        />

        <FormField
          label="Carrying Amount"
          name="carrying_amount"
          type="number"
          value={form.carrying_amount}
          onChange={handleChange}
          error={errors.carrying_amount}
        />

        <FormField
          label="Land Title"
          name="land_title"
          value={form.land_title}
          onChange={handleChange}
          error={errors.land_title}
        />
      </div>

      <FormField
        label="Description"
        name="description"
        textarea
        value={form.description}
        onChange={handleChange}
        error={errors.description}
      />

      <FormField
        label="Remarks"
        name="remarks"
        textarea
        value={form.remarks}
        onChange={handleChange}
        error={errors.remarks}
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
