import { useEffect, useState } from "react";
import { useLandStore } from "@/features/land/store/landStore";
import type { LandItem } from "@/features/land/types/land.types";
import type { LandFormData } from "@/features/land/schemas/land.schema";

export function useLandPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState<LandItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const landItems = useLandStore((state) => state.landItems);
  const loadLand = useLandStore((state) => state.loadLand);
  const addLand = useLandStore((state) => state.addLand);
  const updateLand = useLandStore((state) => state.updateLand);
  const deleteLand = useLandStore((state) => state.deleteLand);

  useEffect(() => {
    const load = async () => {
      const result = await loadLand();
      if (!result.success) {
        setLoadError(result.error);
      }
    };

    load();
  }, [loadLand]);

  const landCount = landItems.length;
  const totalCarryingAmount = landItems.reduce(
    (sum, item) => sum + Number(item.carrying_amount || 0),
    0
  );

  const closeDetail = () => {
    setSelectedLand(null);
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

  const handleCreate = async (data: LandFormData): Promise<boolean> => {
    const result = await addLand(data);
    if (!result.success) {
      setCreateError(result.error);
      return false;
    }
    setCreateError(null);
    return true;
  };

  const handleUpdate = async (data: LandFormData): Promise<boolean> => {
    if (!selectedLand) return false;

    setIsBusy(true);
    const result = await updateLand(selectedLand.id, data);
    setIsBusy(false);

    if (!result.success) {
      setEditError(result.error);
      return false;
    }

    closeDetail();
    return true;
  };

  const handleDelete = async () => {
    if (!selectedLand) return;

    const confirmed = window.confirm(
      `Delete land record for ${selectedLand.lot_no || "this item"}?`
    );

    if (!confirmed) return;

    setIsBusy(true);
    const result = await deleteLand(selectedLand.id);
    setIsBusy(false);

    if (result.success) {
      closeDetail();
    } else {
      setEditError(result.error);
    }
  };

  return {
    landItems,
    stats: { landCount, totalCarryingAmount },
    loadError,
    modals: {
      isCreateOpen,
      openCreate,
      closeCreate,
      createError,
      selectedLand,
      isEditing,
      isBusy,
      editError,
      setSelectedLand,
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
