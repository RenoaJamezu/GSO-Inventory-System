import DetailCard from "@/shared/components/ui/DetailCard";
import type { LandItem } from "@/features/land/types/land.types";
import QRCode from "react-qr-code";

type LandDetailViewProps = {
  land: LandItem;
  isBusy: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onClose: () => void;
};

export default function LandDetailView({
  land,
  isBusy,
  onDelete,
  onEdit,
  onClose,
}: LandDetailViewProps) {
  const baseUrl = window.location.origin;

  // THIS is what QR will open
  const qrUrl = `${baseUrl}/land/${land.id}`;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <DetailCard label="Lot No" value={land.lot_no} />
        <DetailCard label="Location" value={land.location} />
        <DetailCard label="Land" value={land.land} />
        <DetailCard label="Land Improvements" value={land.land_improvements} />
        <DetailCard label="Carrying Amount" value={land.carrying_amount} />
        <DetailCard label="Land Title" value={land.land_title} />
      </div>

      <DetailCard label="Description" value={land.description} fullWidth />
      <DetailCard label="Remarks" value={land.remarks} fullWidth />

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
        {/* QR SECTION */}
        <div className="flex flex-col gap-2">
          <QRCode value={qrUrl} className="h-auto max-w-32" />

          {/* PRINT BUTTON */}
          <button
            type="button"
            onClick={() => window.open(`/land/${land.id}?print=true`, "_blank")}
            className="rounded-xl bg-slate-900 px-3 py-2 text-xs text-white"
          >
            Print QR
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col items-baseline-last gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onDelete}
            disabled={isBusy}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}