import { useEffect, useState } from "react";
import type { BaseAssetItem } from "./types";
import type { PpeModule } from "./createPpeModule";

export function useAssetPage<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
>(module: PpeModule<TItem, TFormData>) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const items = module.useStore((state) => state.items);
  const load = module.useStore((state) => state.load);
  const addMany = module.useStore((state) => state.addMany);
  const update = module.useStore((state) => state.update);
  const remove = module.useStore((state) => state.remove);

  useEffect(() => {
    const runLoad = async () => {
      const result = await load();

      if (!result.success) {
        setLoadError(result.error);
      }
    };

    void runLoad();
  }, [load]);

  const itemCount = items.length;

  const totalAmount = items.reduce(
    (sum: number, item: TItem) => sum + Number(item[module.amountField] ?? 0),
    0,
  );

  const closeDetail = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setIsBusy(false);
    setEditError(null);
  };

  const openCreate = () => {
    setCreateError(null);
    setIsCreateOpen(true);
  };

  const closeCreate = () => {
    setIsCreateOpen(false);
    setCreateError(null);
  };

  const handleCreate = async (rows: TFormData[]): Promise<boolean> => {
    if (rows.length === 0) {
      return false;
    }

    setIsBusy(true);

    const result = await addMany(rows);

    setIsBusy(false);

    if (!result.success) {
      setCreateError(result.error);
      return false;
    }

    setCreateError(null);

    return true;
  };

  const handleUpdate = async (data: TFormData): Promise<boolean> => {
    if (!selectedItem) {
      return false;
    }

    setIsBusy(true);

    const result = await update(selectedItem.id, data);

    setIsBusy(false);

    if (!result.success) {
      setEditError(result.error);
      return false;
    }

    closeDetail();

    return true;
  };

  const handleDelete = async () => {
    if (!selectedItem) {
      return;
    }

    const label = String(
      selectedItem[module.deleteConfirmField] || "this item",
    );

    const confirmed = window.confirm(
      `Delete ${module.labels.singular.toLowerCase()} record for ${label}?`,
    );

    if (!confirmed) {
      return;
    }

    setIsBusy(true);

    const result = await remove(selectedItem.id);

    setIsBusy(false);

    if (result.success) {
      closeDetail();
    } else {
      setEditError(result.error);
    }
  };

  return {
    items,

    stats: {
      itemCount,
      totalAmount,
    },

    loadError,

    modals: {
      isCreateOpen,
      openCreate,
      closeCreate,
      createError,

      selectedItem,
      isEditing,
      isBusy,
      editError,

      setSelectedItem,
      setIsEditing,
      closeDetail,
    },

    handlers: {
      handleCreate,
      handleUpdate,
      handleDelete,
    },
  };
}
