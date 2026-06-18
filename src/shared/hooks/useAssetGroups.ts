import { useEffect, useState } from "react";
import { fetchGroups, createGroup, deleteGroup } from "../api/assetGroup.api";
import type { AssetGroup } from "../types/assetGroup.types";

export function useAssetGroups(moduleKey: string) {
  const [groups, setGroups] = useState<AssetGroup[]>([]);

  async function load() {
    const data = await fetchGroups(moduleKey);

    setGroups(data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [moduleKey]);

  async function addGroup(name: string) {
    const group = await createGroup({
      name,
      module_key: moduleKey,
    });

    setGroups((prev) => [...prev, group]);
  }

  async function removeGroup(id: number) {
    await deleteGroup(id);

    setGroups((prev) => prev.filter((group) => group.id !== id));
  }

  return {
    groups,
    addGroup,
    removeGroup,
  };
}
