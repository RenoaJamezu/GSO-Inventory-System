import { useEffect, useState } from "react";
import type { RoadNetworkItem } from "./roadNetwork.type";
import { useRoadNetworkStore } from "./roadNetworkStore";
import type { RoadNetworkFormData } from "./roadNetwork.schema";

export function useRoadNetworkPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedRoadNetwork, setSelectedRoadNetwork] =
    useState<RoadNetworkItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const roadNetworkItems = useRoadNetworkStore(
    (state) => state.roadNetworkItems,
  );
  const loadRoadNetwork = useRoadNetworkStore((state) => state.loadRoadNetwork);
  const addRoadNetwork = useRoadNetworkStore((state) => state.addRoadNetwork);
  const updateRoadNetwork = useRoadNetworkStore(
    (state) => state.updateRoadNetwork,
  );
  const deleteRoadNetwork = useRoadNetworkStore(
    (state) => state.deleteRoadNetwork,
  );

  useEffect(() => {
    const load = async () => {
      const result = await loadRoadNetwork();
      if (!result.success) {
        setLoadError(result.error);
      }
    };

    load();
  }, [loadRoadNetwork]);

  const roadNetworkCount = roadNetworkItems.length;
  const totalCost = roadNetworkItems.reduce(
    (sum, item) => sum + Number(item.cost || 0),
    0,
  );

  const closeDetail = () => {
    setSelectedRoadNetwork(null);
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

  const handleCreate = async (data: RoadNetworkFormData): Promise<boolean> => {
    const result = await addRoadNetwork(data);
    if (!result.success) {
      setCreateError(result.error);
      return false;
    }
    setCreateError(null);
    return true;
  };

  const handleUpdate = async (data: RoadNetworkFormData): Promise<boolean> => {
    if (!selectedRoadNetwork) return false;

    setIsBusy(true);
    const result = await updateRoadNetwork(selectedRoadNetwork.id, data);
    setIsBusy(false);

    if (!result.success) {
      setEditError(result.error);
      return false;
    }

    closeDetail();
    return true;
  };

  const handleDelete = async () => {
    if (!selectedRoadNetwork) return;

    const confirmed = window.confirm(
      `Delete road name record for ${selectedRoadNetwork.road_name || "this item"}?`,
    );

    if (!confirmed) return;

    setIsBusy(true);
    const result = await deleteRoadNetwork(selectedRoadNetwork.id);
    setIsBusy(false);

    if (result.success) {
      closeDetail();
    } else {
      setEditError(result.error);
    }
  };

  return {
    roadNetworkItems,
    stats: { roadNetworkCount, totalCost },
    loadError,
    modals: {
      isCreateOpen,
      openCreate,
      closeCreate,
      createError,
      selectedRoadNetwork,
      isEditing,
      isBusy,
      editError,
      setSelectedRoadNetwork,
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
