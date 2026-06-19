import { useAssetGroups } from "@/shared/hooks/useAssetGroups";
import {
  roadNetworkSchema,
  type RoadNetworkFormData,
} from "./roadNetwork.schema";
import { useEffect } from "react";
import FormRenderer from "@/shared/forms/FormRenderer";
import GroupSelector from "@/shared/components/ui/GroupSelector";
import { roadNetworkFields } from "./roadNetworkFields";
import { useZodForm } from "@/shared/forms/useZodForm";

const emptyForm: RoadNetworkFormData = {
  group_id: null,

  station_no: "",
  road_name: "",
  particulars: "",
  description: "",
  cost: 0,
  acq_date: "",
  remarks: "",
};

type Props = {
  onClose: () => void;
  initialData?: RoadNetworkFormData | null;
  submitLabel?: string;
  serverError?: string | null;
  onSubmit: (data: RoadNetworkFormData) => Promise<boolean>;
};

export default function RoadNetworkForm({
  onClose,
  initialData,
  submitLabel = "Save",
  serverError,
  onSubmit,
}: Props) {
  const { groups, addGroup, removeGroup } = useAssetGroups("road_network");

  const {
    form,
    setForm,
    errors,
    submitting,
    setSubmitting,
    handleChange,
    validate,
    reset,
  } = useZodForm<RoadNetworkFormData>(
    initialData ?? emptyForm,
    roadNetworkSchema,
  );

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
        fields={roadNetworkFields}
        values={form}
        errors={errors}
        onChange={handleChange}
      />

      <GroupSelector
        value={form.group_id}
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
