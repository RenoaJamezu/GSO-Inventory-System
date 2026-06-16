import Modal from "@/shared/components/ui/Modal";
import LandForm from "@/features/land/components/LandForm";
import type { LandFormData } from "@/features/land/schemas/land.schema";

type LandCreateModalProps = {
  open: boolean;
  serverError: string | null;
  onClose: () => void;
  onSubmit: (data: LandFormData) => Promise<boolean>;
};

export default function LandCreateModal({
  open,
  serverError,
  onClose,
  onSubmit,
}: LandCreateModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Add Land">
      <LandForm
        onClose={onClose}
        submitLabel="Save Land"
        serverError={serverError}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
