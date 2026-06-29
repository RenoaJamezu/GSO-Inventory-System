import { useMemo, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "@/shared/components/ui/Modal";
import PageHeader from "@/shared/components/ui/PageHeader";
import StatCard from "@/shared/components/ui/StatCard";
import SearchInput from "@/shared/components/ui/SearchInput";
import QrCard from "@/shared/components/ui/QrCard";
import { downloadQrAsPng } from "@/shared/lib/downloadQr";
import { searchItems } from "@/shared/lib/search";
import GroupedTable, {
  type GroupedColumn,
} from "@/shared/components/ui/GroupedTable";
import AssetForm from "./AssetForm";
import { useAssetPage } from "./useAssetPage";
import type { BaseAssetItem } from "./types";
import type { PpeModule } from "./createPpeModule";

type Props<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
> = {
  module: PpeModule<TItem, TFormData>;
};

export default function AssetPage<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
>({ module }: Props<TItem, TFormData>) {
  const { items, stats, loadError, modals, handlers } = useAssetPage(module);
  const [search, setSearch] = useState("");

  const filtered = searchItems(items, search, module.searchFields);

  const columns = useMemo((): GroupedColumn<TItem>[] => {
    const dataColumns: GroupedColumn<TItem>[] = module.tableColumns.map(
      (column) => ({
        header: column.header,
        key: column.key,
        group: column.group,
        render:
          column.format === "currency"
            ? (value: TItem[keyof TItem]) => Number(value ?? 0).toLocaleString()
            : undefined,
      }),
    );

    const actionColumn: GroupedColumn<TItem> = {
      header: "QR / ACTIONS",
      key: "id",
      render: (_: TItem[keyof TItem], row: TItem) => {
        const url = `${window.location.origin}/public/${module.publicSlug}/${row.id}`;
        const qrLabel = String(row[module.qrLabelField] ?? row.id);

        return (
          <div className="flex items-center gap-4" id={`qr-${row.id}`}>
            <QrCard
              value={url}
              size={80}
              onDownload={() => downloadQrAsPng(String(row.id), qrLabel)}
            />

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  modals.setSelectedItem(row);
                  modals.setIsEditing(true);
                }}
                className="rounded-lg bg-sky-600 px-3 py-1 text-xs text-white"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  modals.setSelectedItem(row);
                  void handlers.handleDelete();
                }}
                className="rounded-lg bg-rose-600 px-3 py-1 text-xs text-white"
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    };

    return [...dataColumns, actionColumn];
  }, [module, modals, handlers]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden sm:gap-6">
      <PageHeader
        eyebrow="ppe inventory"
        title={module.labels.plural}
        description={module.labels.description}
        action={
          <button
            onClick={modals.openCreate}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white capitalize"
          >
            <IoIosAddCircleOutline />
            {module.labels.addButton}
          </button>
        }
      />

      {loadError && (
        <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">
          {loadError}
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 capitalize">
        <StatCard label="total records" value={stats.itemCount} />
        <StatCard
          label="total amount"
          value={stats.totalAmount.toLocaleString()}
        />
      </div>

      <SearchInput value={search} onChange={setSearch} />

      <div className="min-h-72 flex-1 sm:min-h-0">
        <GroupedTable<TItem>
          columns={columns}
          data={filtered}
          groupField="group_name"
          getRowKey={(row) => row.id}
          emptyMessage={`No ${module.labels.singular.toLowerCase()} records yet.`}
        />
      </div>

      <Modal
        open={modals.isCreateOpen}
        onClose={modals.closeCreate}
        title={module.labels.addModal}
      >
        <AssetForm
          module={module}
          onClose={modals.closeCreate}
          serverError={modals.createError}
          onSubmit={async (rows) => handlers.handleCreate(rows as TFormData[])}
        />
      </Modal>

      <Modal
        open={modals.isEditing && !!modals.selectedItem}
        onClose={modals.closeDetail}
        title={module.labels.editModal}
      >
        {modals.selectedItem && (
          <AssetForm
            module={module}
            initialData={modals.selectedItem as unknown as TFormData}
            onClose={modals.closeDetail}
            submitLabel="Save Changes"
            serverError={modals.editError}
            onSubmit={async (row) => handlers.handleUpdate(row as TFormData)}
          />
        )}
      </Modal>
    </div>
  );
}
