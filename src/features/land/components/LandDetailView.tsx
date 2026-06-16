import DetailCard from "@/shared/components/ui/DetailCard";
import type { LandItem } from "@/features/land/types/land.types";

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

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onDelete}
          disabled={isBusy}
          className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
