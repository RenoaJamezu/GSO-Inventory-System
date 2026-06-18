import Modal from "@/shared/components/ui/Modal";
import PageHeader from "@/shared/components/ui/PageHeader";
import SearchInput from "@/shared/components/ui/SearchInput";
import StatCard from "@/shared/components/ui/StatCard";
import Table from "@/shared/components/ui/Table";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useOtherLandPage } from "../hooks/useOtherLandPage";
import type { OtherLandItem } from "../types/otherLand.types";
import OtherLandForm from "../components/OtherLandForm";
import QrCard from "@/shared/components/ui/QrCard";
import { downloadQrAsPng } from "@/shared/lib/downloadQr";
import { searchItems } from "@/shared/lib/search";

export default function OtherLandPage() {
  const { otherLandItems, stats, modals, handlers } = useOtherLandPage();
  const [search, setSearch] = useState("");

  const filtered = searchItems(otherLandItems, search, [
    "id",
    "land",
    "land_improvements",
    "location",
    "description",
    "carrying_amount",
    "date_acq",
    "remarks",
  ])

  const columns = [
    { header: "No", key: "" },
    { header: "LAND", key: "land" },
    { header: "LAND IMPROVEMENTS", key: "land_improvements" },
    { header: "LOCATION", key: "location" },
    { header: "DESCRIPTION", key: "description" },
    { header: "CARRYING AMOUNT", key: "carrying_amount" },
    { header: "DATE ACQ", key: "date_acq" },
    { header: "REMARKS", key: "remarks" },

    {
      header: "QR / ACTIONS",
      key: "id",
      render: (_: unknown, row: OtherLandItem) => {
        const url = `${window.location.origin}/public/other-land-improvement/${row.id}`;

        return (
          <div className="flex items-center gap-4" id={`qr-${row.id}`}>
            {/* QR */}
            <QrCard
              value={url}
              size={80}
              onDownload={() =>
                downloadQrAsPng(String(row.id), String(row.land_improvements))
              }
            />

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  modals.setSelectedOtherLand(row);
                  modals.setIsEditing(true);
                }}
                className="rounded-lg bg-sky-600 px-3 py-1 text-xs text-white"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  modals.setSelectedOtherLand(row);
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
  ];

  return (
    <div className="flex flex-col gap-6 h-screen overflow-hidden">
      <PageHeader
        eyebrow="PPE Inventory"
        title="Other Land Improvement Records"
        description="Manage other land improvement assets and records"
        action={
          <button
            onClick={modals.openCreate}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white"
          >
            <IoIosAddCircleOutline />
            Add Other Land Improvement
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Records" value={stats.otherLandCount} />
        <StatCard
          label="Total Amount"
          value={stats.totalCarryingAmount.toLocaleString()}
        />
      </div>

      <SearchInput value={search} onChange={setSearch} />

      <div className="flex-1 overflow-y-auto simple-scrollbar">
        <Table
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={columns as any}
          data={filtered}
          getRowKey={(r: OtherLandItem) => r.id}
        />
      </div>

      {/* CREATE MODAL */}
      <Modal
        open={modals.isCreateOpen}
        onClose={modals.closeCreate}
        title="Add Land"
      >
        <OtherLandForm
          onClose={modals.closeCreate}
          onSubmit={handlers.handleCreate}
        />
      </Modal>

      {/* EDIT MODAL ONLY */}
      <Modal
        open={modals.isEditing && !!modals.selectedOtherLand}
        onClose={modals.closeDetail}
        title="Edit Land"
      >
        {modals.selectedOtherLand && (
          <OtherLandForm
            initialData={modals.selectedOtherLand}
            onClose={modals.closeDetail}
            submitLabel="Save Changes"
            onSubmit={handlers.handleUpdate}
          />
        )}
      </Modal>
    </div>
  );
}
