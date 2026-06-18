import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "@/shared/components/ui/Modal";
import PageHeader from "@/shared/components/ui/PageHeader";
import StatCard from "@/shared/components/ui/StatCard";
import SearchInput from "@/shared/components/ui/SearchInput";
import LandForm from "@/features/land/components/LandForm";
import type { LandItem } from "@/features/land/types/land.types";
import { useLandPage } from "@/features/land/hooks/useLandPage";
import QrCard from "@/shared/components/ui/QrCard";
import { downloadQrAsPng } from "@/shared/lib/downloadQr";
import { searchItems } from "@/shared/lib/search";
import GroupedTable from "@/shared/components/ui/GroupedTable";

export default function LandPage() {
  const { landItems, stats, modals, handlers } = useLandPage();
  const [search, setSearch] = useState("");

  const filtered = searchItems(landItems, search, [
    "lot_no",
    "land",
    "land_improvements",
    "location",
    "description",
    "land_title",
    "remarks",
  ]);

  const columns = [
    { header: "LOT NO", key: "lot_no" },
    { header: "LAND", key: "land" },
    { header: "LAND IMPROVEMENTS", key: "land_improvements" },
    { header: "LOCATION", key: "location" },
    { header: "DESCRIPTION", key: "description" },
    {
      header: "CARRYING AMOUNT",
      key: "carrying_amount",
      render: (value: number) => value.toLocaleString(),
    },
    { header: "CONDITION / LAND TITLE", key: "land_title" },
    { header: "REMARKS", key: "remarks" },

    {
      header: "QR / ACTIONS",
      key: "id",
      render: (_: unknown, row: LandItem) => {
        const url = `${window.location.origin}/public/land/${row.id}`;

        return (
          <div className="flex items-center gap-4" id={`qr-${row.id}`}>
            {/* QR */}
            <QrCard
              value={url}
              size={80}
              onDownload={() =>
                downloadQrAsPng(String(row.id), String(row.land))
              }
            />

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  modals.setSelectedLand(row);
                  modals.setIsEditing(true);
                }}
                className="rounded-lg bg-sky-600 px-3 py-1 text-xs text-white"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  modals.setSelectedLand(row);
                  handlers.handleDelete();
                }}
                className="rounded-lg bg-rose-600 px-3 py-1 text-xs text-white"
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    },
  ] as const;

  return (
    <div className="flex flex-col gap-6 h-screen overflow-hidden">
      <PageHeader
        eyebrow="PPE Inventory"
        title="Land Records"
        description="Manage land assets and records"
        action={
          <button
            onClick={modals.openCreate}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white"
          >
            <IoIosAddCircleOutline />
            Add Land
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Records" value={stats.landCount} />
        <StatCard
          label="Total Amount"
          value={stats.totalCarryingAmount.toLocaleString()}
        />
      </div>

      <SearchInput value={search} onChange={setSearch} />

      <div className="flex-1 overflow-y-auto simple-scrollbar">
        <GroupedTable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={columns as any}
          data={filtered}
          groupField="group_name"
          getRowKey={(r: LandItem) => r.id}
        />
      </div>

      {/* CREATE MODAL */}
      <Modal
        open={modals.isCreateOpen}
        onClose={modals.closeCreate}
        title="Add Land"
      >
        <LandForm
          onClose={modals.closeCreate}
          onSubmit={handlers.handleCreate}
        />
      </Modal>

      {/* EDIT MODAL ONLY */}
      <Modal
        open={modals.isEditing && !!modals.selectedLand}
        onClose={modals.closeDetail}
        title="Edit Land"
      >
        {modals.selectedLand && (
          <LandForm
            initialData={modals.selectedLand}
            onClose={modals.closeDetail}
            submitLabel="Save Changes"
            onSubmit={handlers.handleUpdate}
          />
        )}
      </Modal>
    </div>
  );
}
