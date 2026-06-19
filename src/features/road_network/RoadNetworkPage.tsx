import { useState } from "react";
import { useRoadNetworkPage } from "./useRoadNetworkPage";
import { searchItems } from "@/shared/lib/search";
import QrCard from "@/shared/components/ui/QrCard";
import type { RoadNetworkItem } from "./roadNetwork.type";
import { downloadQrAsPng } from "@/shared/lib/downloadQr";
import PageHeader from "@/shared/components/ui/PageHeader";
import { IoIosAddCircleOutline } from "react-icons/io";
import StatCard from "@/shared/components/ui/StatCard";
import SearchInput from "@/shared/components/ui/SearchInput";
import GroupedTable from "@/shared/components/ui/GroupedTable";
import Modal from "@/shared/components/ui/Modal";
import RoadNetworkForm from "./RoadNetworkForm";

export default function RoadNetworkPage() {
  const { roadNetworkItems, stats, modals, handlers } = useRoadNetworkPage();
  const [search, setSearch] = useState("");

  const filtered = searchItems(roadNetworkItems, search, [
    "station_no",
    "road_name",
    "particulars",
    "description",
    "cost",
    "acq_date",
    "remarks",
  ]);

  const columns = [
    { header: "ROAD NETWORK ID NO / STATION NO", key: "station_no" },
    { header: "ROAD NAME", key: "road_name" },
    { header: "PARTICULARS", key: "particulars" },
    { header: "DESCRIPTION", key: "description" },
    {
      header: "COST",
      key: "cost",
      render: (value: number) => value.toLocaleString(),
    },
    { header: "ACQ DATE", key: "acq_date" },
    { header: "REMARKS", key: "remarks" },

    {
      header: "QR / ACTIONS",
      key: "id",
      render: (_: unknown, row: RoadNetworkItem) => {
        const url = `${window.location.origin}/public/land/${row.id}`;

        return (
          <div className="flex items-center gap-4" id={`qr-${row.id}`}>
            {/* QR */}
            <QrCard
              value={url}
              size={80}
              onDownload={() =>
                downloadQrAsPng(String(row.id), String(row.road_name))
              }
            />

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  modals.setSelectedRoadNetwork(row);
                  modals.setIsEditing(true);
                }}
                className="rounded-lg bg-sky-600 px-3 py-1 text-xs text-white"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  modals.setSelectedRoadNetwork(row);
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
        title="Road Network Records"
        description="Manage road network assets and records"
        action={
          <button
            onClick={modals.openCreate}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white"
          >
            <IoIosAddCircleOutline />
            Add Road Network
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Records" value={stats.roadNetworkCount} />
        <StatCard
          label="Total Amount"
          value={stats.totalCost.toLocaleString()}
        />
      </div>

      <SearchInput value={search} onChange={setSearch} />

      <div className="flex-1 overflow-y-auto simple-scrollbar">
        <GroupedTable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={columns as any}
          data={filtered}
          groupField="group_name"
          getRowKey={(r: RoadNetworkItem) => r.id}
        />
      </div>

      {/* CREATE MODAL */}
      <Modal
        open={modals.isCreateOpen}
        onClose={modals.closeCreate}
        title="Add Land"
      >
        <RoadNetworkForm
          onClose={modals.closeCreate}
          onSubmit={handlers.handleCreate}
        />
      </Modal>

      {/* EDIT MODAL ONLY */}
      <Modal
        open={modals.isEditing && !!modals.selectedRoadNetwork}
        onClose={modals.closeDetail}
        title="Edit Land"
      >
        {modals.selectedRoadNetwork && (
          <RoadNetworkForm
            initialData={modals.selectedRoadNetwork}
            onClose={modals.closeDetail}
            submitLabel="Save Changes"
            onSubmit={handlers.handleUpdate}
          />
        )}
      </Modal>
    </div>
  );
}
