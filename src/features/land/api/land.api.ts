import { supabase } from "@/shared/lib/supabase";
import type { LandInput, LandItem } from "@/features/land/types/land.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toLandItem(item: any): LandItem {
  return {
    id: Number(item.id),
    lot_no: item.lot_no ?? "",
    land: item.land ?? "",
    land_improvements: item.land_improvements ?? "",
    location: item.location ?? "",
    description: item.description ?? "",
    carrying_amount: Number(item.carrying_amount ?? 0),
    land_title: item.land_title ?? "",
    remarks: item.remarks ?? "",
  };
}

export async function fetchLand(): Promise<LandItem[]> {
  const { data, error } = await supabase
    .from("land")
    .select("*")
    .is("deleted_at", null);

  if (error) throw new Error(error.message);

  return (data ?? []).map(toLandItem);
}

export async function createLand(item: LandInput): Promise<LandItem> {
  const { data, error } = await supabase
    .from("land")
    .insert(item)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return toLandItem(data);
}

export async function updateLand(
  id: number,
  item: LandInput,
): Promise<LandItem> {
  const { data, error } = await supabase
    .from("land")
    .update(item)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return toLandItem(data);
}

export async function deleteLand(id: number): Promise<void> {
  const { error } = await supabase
    .from("land")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
