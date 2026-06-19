import { useEffect } from "react";
import { useZodForm } from "@/shared/forms/useZodForm";
import GroupSelector from "@/shared/components/ui/GroupSelector";
import { useAssetGroups } from "@/shared/hooks/useAssetGroups";
import type { BaseAssetItem } from "./types";
import type { PpeModule } from "./createPpeModule";
import { FormField } from "../components/ui/FormField";

type Props<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
> = {
  module: PpeModule<TItem, TFormData>;
  onClose: () => void;
  initialData?: TFormData | null;
  submitLabel?: string;
  serverError?: string | null;
  onSubmit: (data: TFormData) => Promise<boolean>;
};

export default function AssetForm<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
>({
  module,
  onClose,
  initialData,
  submitLabel = "Save",
  serverError,
  onSubmit,
}: Props<TItem, TFormData>) {
  const { groups, addGroup, removeGroup } = useAssetGroups(module.moduleKey);

  const {
    form,
    setForm,
    errors,
    submitting,
    setSubmitting,
    handleChange,
    validate,
    reset,
  } = useZodForm<TFormData>(initialData ?? module.emptyForm, module.schema);

  useEffect(() => {
    reset(initialData ?? module.emptyForm);
  }, [initialData, module.emptyForm, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validated = validate();
    if (!validated) return;

    setSubmitting(true);
    const success = await onSubmit(validated);
    setSubmitting(false);

    if (success) {
      reset(initialData ?? module.emptyForm);
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

      {module.fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          textarea={field.textarea}
          value={form[field.name] as string | number | null | undefined}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}

      <GroupSelector
        value={form.group_id as number | null}
        groups={groups}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            group_id: value,
          }))
        }
        onCreateGroup={async (name) => {
          await addGroup(name);
        }}
        onDeleteGroup={removeGroup}
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
