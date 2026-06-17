import { IoIosAddCircleOutline } from "react-icons/io";
import Table from "@/shared/components/ui/Table";
import PageHeader from "@/shared/components/ui/PageHeader";
import { landColumns } from "@/features/land/components/landColumns";
import LandCreateModal from "@/features/land/components/LandCreateModal";
import LandDetailModal from "@/features/land/components/LandDetailModal";
import { useLandPage } from "@/features/land/hooks/useLandPage";
import SearchInput from "@/shared/components/ui/SearchInput";
import { useState } from "react";
import SummaryCardProps from "@/shared/components/ui/SummaryCard";

export default function LandPage() {
  const { landItems, stats, loadError, modals, handlers } = useLandPage();
  const [search, setSearch] = useState("");

  const filteredLandItems = landItems.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <section className="flex min-h-0 flex-1 flex-col rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <PageHeader
          eyebrow="PPE inventory"
          title="Report on the Physical Count of Land"
          description="Track land assets, titles, and carrying amounts in a cleaner view. Add entries from the form and review them in the table below."
          action={
            <button
              onClick={modals.openCreate}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
            >
              <IoIosAddCircleOutline size={22} />
              Add Land
            </button>
          }
        />

        {loadError ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {loadError}
          </div>
        ) : null}

        <SummaryCardProps
          totalDataLabel="total land records"
          totalData={stats.landCount}
          totalAmountLabel="carrying amount"
          totalAmount={stats.totalCarryingAmount}
        />

        <div className="mt-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by location..."
          />
        </div>

        <div className="mt-8 min-h-0 flex-1 overflow-y-auto simple-scrollbar pr-1">
          <Table
            columns={landColumns}
            data={filteredLandItems}
            getRowKey={(row) => row.id}
            emptyMessage="No land records yet. Add the first entry using the button above."
            onRowClick={modals.setSelectedLand}
          />
        </div>
      </section>

      <LandCreateModal
        open={modals.isCreateOpen}
        serverError={modals.createError}
        onClose={modals.closeCreate}
        onSubmit={handlers.handleCreate}
      />

      <LandDetailModal
        land={modals.selectedLand}
        isEditing={modals.isEditing}
        isBusy={modals.isBusy}
        serverError={modals.editError}
        onClose={modals.closeDetail}
        onEdit={() => modals.setIsEditing(true)}
        onDelete={handlers.handleDelete}
        onSubmit={handlers.handleUpdate}
      />
    </div>
  );
}
