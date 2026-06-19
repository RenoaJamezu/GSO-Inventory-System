import { supabase } from "@/shared/lib/supabase";
import type { OtherLandInput, OtherLandItem } from "../otherLand.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toOtherLandItem(item: any): OtherLandItem {
  return {
    id: Number(item.id),

    group_id: item.group_id,
    group_name: item.asset_groups?.name ?? null,

    land: item.land ?? "",
    land_improvements: item.land_improvements ?? "",
    location: item.location ?? "",
    description: item.description ?? "",
    carrying_amount: Number(item.carrying_amount ?? 0),
    date_acq: item.date_acq ?? "",
    remarks: item.remarks ?? "",
  };
}

export async function fetchOtherLand(): Promise<OtherLandItem[]> {
  const { data, error } = await supabase
    .from("other_land_improvement")
    .select(`*, asset_groups ( id, name )`)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);

  return (data ?? []).map(toOtherLandItem);
}

export async function createOtherLand(
  item: OtherLandInput,
): Promise<OtherLandItem> {
  const { data, error } = await supabase
    .from("other_land_improvement")
    .insert(item)
    .select(`*, asset_groups ( id, name )`)
    .single();

  if (error) throw new Error(error.message);

  return toOtherLandItem(data);
}

export async function updateOtherLand(
  id: number,
  item: OtherLandInput,
): Promise<OtherLandItem> {
  const { data, error } = await supabase
    .from("other_land_improvement")
    .update(item)
    .eq("id", id)
    .select(`*, asset_groups ( id, name )`)
    .single();

  if (error) throw new Error(error.message);

  return toOtherLandItem(data);
}

export async function deleteOtherLand(id: number): Promise<void> {
  const { error } = await supabase
    .from("other_land_improvement")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
