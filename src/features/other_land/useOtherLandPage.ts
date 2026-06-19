import { useEffect, useState } from "react";
import type { OtherLandItem } from "./otherLand.types";
import { useOtherLandStore } from "./otherLandStore";
import type { OtherLandFormData } from "./otherLand.schema";

export function useOtherLandPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOtherLand, setSelectedOtherLand] =
    useState<OtherLandItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const otherLandItems = useOtherLandStore((state) => state.otherLandItems);
  const loadOtherLand = useOtherLandStore((state) => state.loadOtherLand);
  const addOtherLand = useOtherLandStore((state) => state.addOtherLand);
  const updateOtherLand = useOtherLandStore((state) => state.updateOtherLand);
  const deleteOtherLand = useOtherLandStore((state) => state.deleteOtherLand);

  useEffect(() => {
    const load = async () => {
      const result = await loadOtherLand();
      if (!result.success) {
        setLoadError(result.error);
      }
    };

    load();
  }, [loadOtherLand]);

  const otherLandCount = otherLandItems.length;
  const totalCarryingAmount = otherLandItems.reduce(
    (sum, item) => sum + Number(item.carrying_amount || 0),
    0,
  );

  const closeDetail = () => {
    setSelectedOtherLand(null);
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

  const handleCreate = async (data: OtherLandFormData): Promise<boolean> => {
    const result = await addOtherLand(data);
    if (!result.success) {
      setCreateError(result.error);
      return false;
    }
    setCreateError(null);
    return true;
  };

  const handleUpdate = async (data: OtherLandFormData): Promise<boolean> => {
    if (!selectedOtherLand) return false;

    setIsBusy(true);
    const result = await updateOtherLand(selectedOtherLand.id, data);
    setIsBusy(false);

    if (!result.success) {
      setEditError(result.error);
      return false;
    }

    closeDetail();
    return true;
  };

  const handleDelete = async () => {
    if (!selectedOtherLand) return;

    const confirmed = window.confirm(
      `Delete land record for ${selectedOtherLand.land_improvements || "this item"}?`,
    );

    if (!confirmed) return;

    setIsBusy(true);
    const result = await deleteOtherLand(selectedOtherLand.id);
    setIsBusy(false);

    if (result.success) {
      closeDetail();
    } else {
      setEditError(result.error);
    }
  };

  return {
    otherLandItems,
    stats: { otherLandCount, totalCarryingAmount },
    loadError,
    modals: {
      isCreateOpen,
      openCreate,
      closeCreate,
      createError,
      selectedOtherLand,
      isEditing,
      isBusy,
      editError,
      setSelectedOtherLand,
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
