import { IoIosAddCircleOutline } from "react-icons/io";
import Table from "../../components/ui/Table";
import { useLandStore } from "../../store/storeLand";
import type { LandItem } from "../../store/storeLand";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import LandForm from "../../components/ppe_forms/LandForm";
import type { Column } from "../../components/ui/Table";

const columns: Column<LandItem>[] = [
  { header: "ID / LOT NO.", key: "lot_no" },
  { header: "LAND", key: "land" },
  { header: "LAND IMPROVEMENTS", key: "land_improvements" },
  { header: "LOCATION", key: "location" },
  { header: "DESCRIPTION", key: "description" },
  { header: "CARRYING AMOUNT", key: "carrying_amount" },
  { header: "CONDITION / TITLE", key: "land_title" },
  { header: "REMARKS", key: "remarks" },
];

export default function Land() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState<LandItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const land = useLandStore((state) => state.landItems);
  const addLand = useLandStore((state) => state.addLand);
  const updateLand = useLandStore((state) => state.updateLand);
  const deleteLand = useLandStore((state) => state.deleteLand);
  const landCount = land.length;
  const totalCarryingAmount = land.reduce(
    (sum, item) => sum + Number(item.carrying_amount || 0),
    0
  );

  const closeDetail = () => {
    setSelectedLand(null);
    setIsEditing(false);
    setIsBusy(false);
  };

  const handleDelete = async () => {
    if (!selectedLand) return;

    const confirmed = window.confirm(
      `Delete land record for ${selectedLand.lot_no || "this item"}?`
    );

    if (!confirmed) return;

    setIsBusy(true);
    const success = await deleteLand(selectedLand.id);
    setIsBusy(false);

    if (success) {
      closeDetail();
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              PPE inventory
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Report on the Physical Count of Land
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Track land assets, titles, and carrying amounts in a cleaner view.
              Add entries from the form and review them in the table below.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
          >
            <IoIosAddCircleOutline size={22} />
            Add Land
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Total records</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{landCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Total carrying amount
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalCarryingAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Table columns={columns} data={land} onRowClick={(row) => setSelectedLand(row)} />
        </div>
      </section>

      <Modal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add Land">
        <LandForm
          onClose={() => setIsCreateOpen(false)}
          submitLabel="Save Land"
          onSubmit={async (data) => {
            await addLand(data);
          }}
        />
      </Modal>

      <Modal
        open={Boolean(selectedLand)}
        onClose={closeDetail}
        title={isEditing ? "Edit Land" : "Land Details"}
      >
        {selectedLand ? (
          isEditing ? (
            <LandForm
              onClose={closeDetail}
              initialData={selectedLand}
              submitLabel={isBusy ? "Saving..." : "Save Changes"}
              onSubmit={async (data) => {
                setIsBusy(true);
                await updateLand(selectedLand.id, data);
                setIsBusy(false);
                closeDetail();
              }}
            />
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <DetailCard label="Lot No" value={selectedLand.lot_no} />
                <DetailCard label="Location" value={selectedLand.location} />
                <DetailCard label="Land" value={selectedLand.land} />
                <DetailCard
                  label="Land Improvements"
                  value={selectedLand.land_improvements}
                />
                <DetailCard
                  label="Carrying Amount"
                  value={selectedLand.carrying_amount}
                />
                <DetailCard label="Land Title" value={selectedLand.land_title} />
              </div>

              <DetailCard label="Description" value={selectedLand.description} fullWidth />
              <DetailCard label="Remarks" value={selectedLand.remarks} fullWidth />

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isBusy}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={closeDetail}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          )
        ) : null}
      </Modal>
    </div>
  );
}

function DetailCard({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string | number | null | undefined;
  fullWidth?: boolean;
}) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-slate-50 p-4 ${fullWidth ? "md:col-span-2" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-800">
        {value === null || value === undefined || value === "" ? "-" : value}
      </p>
    </div>
  );
}
