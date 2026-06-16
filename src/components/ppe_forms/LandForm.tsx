import { useState } from "react";
import { landSchema, type LandFormData } from "../../schemas/land.schema";
import { FormField } from "../ui/FormField";
import type { LandItem } from "../../store/storeLand";

type Props = {
  onClose: () => void;
  initialData?: LandItem | null;
  submitLabel?: string;
  onSubmit: (data: LandFormData) => Promise<void> | void;
};

export default function LandForm({
  onClose,
  initialData,
  submitLabel = "Save Land",
  onSubmit,
}: Props) {
  const [form, setForm] = useState<LandFormData>(initialData ?? {});
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
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

    Promise.resolve(onSubmit(result.data)).then(() => {
      setErrors({});
      setForm(initialData ?? {});
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}