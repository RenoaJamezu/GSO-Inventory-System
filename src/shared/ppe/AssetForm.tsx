import { useState } from "react";
import GroupSelector from "@/shared/components/ui/GroupSelector";
import { useAssetGroups } from "@/shared/hooks/useAssetGroups";
import { FormField } from "../components/ui/FormField";
import type { BaseAssetItem } from "./types";
import type { PpeModule } from "./createPpeModule";

type Props<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
> = {
  module: PpeModule<TItem, TFormData>;
  onClose: () => void;

  initialData?: TFormData | null;

  submitLabel?: string;
  serverError?: string | null;

  onSubmit: (data: TFormData[] | TFormData) => Promise<boolean>;
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

  const isEditing = !!initialData;

  const [rows, setRows] = useState<TFormData[]>(() => [
    initialData ?? structuredClone(module.emptyForm),
  ]);

  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    {},
  );

  const [submitting, setSubmitting] = useState(false);

  const updateRow = (
    rowIndex: number,
    field: keyof TFormData,
    value: unknown,
  ) => {
    setRows((prev) =>
      prev.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, structuredClone(module.emptyForm)]);
  };

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };
  const validateRows = () => {
    const nextErrors: Record<number, Record<string, string>> = {};

    let valid = true;

    rows.forEach((row, index) => {
      const result = module.schema.safeParse(row);

      if (!result.success) {
        valid = false;

        nextErrors[index] = {};

        result.error.issues.forEach((error) => {
          const field = error.path[0]?.toString();

          if (field) {
            nextErrors[index][field] = error.message;
          }
        });
      }
    });

    setErrors(nextErrors);

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRows()) {
      return;
    }

    setSubmitting(true);

    const success = await onSubmit(isEditing ? rows[0] : rows);

    setSubmitting(false);

    if (!success) {
      return;
    }

    setRows([structuredClone(module.emptyForm)]);

    setErrors({});

    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">
          {serverError}
        </div>
      )}

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="space-y-6 rounded-xl border border-slate-200 p-4"
        >
          {!isEditing && (
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Asset #{rowIndex + 1}
              </h3>

              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(rowIndex)}
                  className="rounded-lg border border-rose-200 px-3 py-1 text-xs text-rose-600"
                >
                  Remove
                </button>
              )}
            </div>
          )}

          {module.fields.map((field) => (
            <FormField
              key={`${rowIndex}-${String(field.name)}`}
              label={field.label}
              name={String(field.name)}
              type={field.type}
              textarea={field.textarea}
              value={
                row[field.name as keyof TFormData] as
                  | string
                  | number
                  | null
                  | undefined
              }
              onChange={(e) => {
                let value: unknown = e.target.value;

                if (field.type === "number") {
                  value =
                    e.target.value === ""
                      ? null
                      : Number(e.target.value.replace(/,/g, ""));
                }

                updateRow(rowIndex, field.name as keyof TFormData, value);
              }}
              error={errors[rowIndex]?.[String(field.name)]}
            />
          ))}

          <GroupSelector
            value={(row as Record<string, unknown>).group_id as number | null}
            groups={groups}
            onChange={(value) =>
              updateRow(rowIndex, "group_id" as keyof TFormData, value)
            }
            onCreateGroup={async (name) => {
              await addGroup(name);
            }}
            onDeleteGroup={removeGroup}
          />
        </div>
      ))}

      {!isEditing && (
        <button
          type="button"
          onClick={addRow}
          className="w-full rounded-xl border-2 border-dashed border-sky-300 py-3 text-sm font-medium text-sky-600 transition hover:bg-sky-50"
        >
          + Add Another Row
        </button>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-sky-600 px-4 py-2 text-white"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
