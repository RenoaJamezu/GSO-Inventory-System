import { supabase } from "@/shared/lib/supabase";
import type { LandInput, LandItem } from "@/features/land/types/land.types";
import { normalizeLandItem } from "@/features/land/utils/normalizeLand";

export async function fetchLand(): Promise<LandItem[]> {
  const { data, error } = await supabase.from("land").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => normalizeLandItem(item as LandInput));
}

export async function createLand(item: LandInput): Promise<LandItem> {
  const payload = normalizeLandItem(item);
  const { id: ignoredId, ...insertPayload } = payload;
  void ignoredId;

  const { data, error } = await supabase
    .from("land")
    .insert(insertPayload)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeLandItem(data as LandInput);
}

export async function updateLand(id: number, item: LandInput): Promise<LandItem> {
  const payload = normalizeLandItem({ ...item, id });
  const { id: ignoredId, ...updatePayload } = payload;
  void ignoredId;

  const { data, error } = await supabase
    .from("land")
    .update(updatePayload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeLandItem(data as LandInput);
}

export async function deleteLand(id: number): Promise<void> {
  const { error } = await supabase.from("land").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
