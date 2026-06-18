import { supabase } from "@/shared/lib/supabase";
import type { AssetGroup, AssetGroupInput } from "../types/assetGroup.types";
import { GROUP_MODULE_MAP } from "../config/groupModuleMap";

export async function fetchGroups(moduleKey: string): Promise<AssetGroup[]> {
  const { data, error } = await supabase
    .from("asset_groups")
    .select("*")
    .eq("module_key", moduleKey)
    .is("deleted_at", null)
    .order("name");

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function createGroup(
  payload: AssetGroupInput,
): Promise<AssetGroup> {
  const { data, error } = await supabase
    .from("asset_groups")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteGroup(groupId: number): Promise<void> {
  const { data: group } = await supabase
    .from("asset_groups")
    .select("module_key")
    .eq("id", groupId)
    .single();

  if (!group) {
    throw new Error("Group not found");
  }

  const tableName =
    GROUP_MODULE_MAP[group.module_key as keyof typeof GROUP_MODULE_MAP];

  const { error: updateError } = await supabase
    .from(tableName)
    .update({
      group_id: null,
    })
    .eq("group_id", groupId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { error } = await supabase
    .from("asset_groups")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", groupId);

  if (error) {
    throw new Error(error.message);
  }
}
