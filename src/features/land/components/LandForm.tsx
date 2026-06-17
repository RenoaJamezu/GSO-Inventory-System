import { useEffect } from "react";
import {
  landSchema,
  type LandFormData,
} from "@/features/land/schemas/land.schema";
import { landFields } from "@/features/land/config/landFields";

import FormRenderer from "@/shared/forms/FormRenderer";
import { useZodForm } from "@/shared/forms/useZodForm";

const emptyForm: LandFormData = {
  lot_no: "",
  land: "",
  land_improvements: "",
  location: "",
  description: "",
  carrying_amount: 0,
  land_title: "",
  remarks: "",
};

type Props = {
  onClose: () => void;
  initialData?: LandFormData | null;
  submitLabel?: string;
  serverError?: string | null;
  onSubmit: (data: LandFormData) => Promise<boolean>;
};

export default function LandForm({
  onClose,
  initialData,
  submitLabel = "Save",
  serverError,
  onSubmit,
}: Props) {
  const {
    form,
    errors,
    submitting,
    setSubmitting,
    handleChange,
    validate,
    reset,
  } = useZodForm<LandFormData>(initialData ?? emptyForm, landSchema);

  useEffect(() => {
    reset(initialData ?? emptyForm);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validated = validate();
    if (!validated) return;

    setSubmitting(true);

    const success = await onSubmit(validated);

    setSubmitting(false);

    if (success) {
      reset(initialData ?? emptyForm);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">
          {serverError}
        </div>
      )}

      <FormRenderer
        fields={landFields}
        values={form}
        errors={errors}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border px-4 py-2"
        >
          Cancel
        </button>

        <button
          disabled={submitting}
          type="submit"
          className="rounded-xl bg-sky-600 px-4 py-2 text-white"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
