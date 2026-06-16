import Modal from "@/shared/components/ui/Modal";
import LandForm from "@/features/land/components/LandForm";
import LandDetailView from "@/features/land/components/LandDetailView";
import type { LandFormData } from "@/features/land/schemas/land.schema";
import type { LandItem } from "@/features/land/types/land.types";

type LandDetailModalProps = {
  land: LandItem | null;
  isEditing: boolean;
  isBusy: boolean;
  serverError: string | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSubmit: (data: LandFormData) => Promise<boolean>;
};

export default function LandDetailModal({
  land,
  isEditing,
  isBusy,
  serverError,
  onClose,
  onEdit,
  onDelete,
  onSubmit,
}: LandDetailModalProps) {
  return (
    <Modal
      open={Boolean(land)}
      onClose={onClose}
      title={isEditing ? "Edit Land" : "Land Details"}
    >
      {land ? (
        isEditing ? (
          <LandForm
            onClose={onClose}
            initialData={land}
            submitLabel={isBusy ? "Saving..." : "Save Changes"}
            serverError={serverError}
            onSubmit={onSubmit}
          />
        ) : (
          <LandDetailView
            land={land}
            isBusy={isBusy}
            onDelete={onDelete}
            onEdit={onEdit}
            onClose={onClose}
          />
        )
      ) : null}
    </Modal>
  );
}
