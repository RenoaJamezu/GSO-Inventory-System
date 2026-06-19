import { supabase } from "@/shared/lib/supabase";
import type { RoadNetworkInput, RoadNetworkItem } from "./roadNetwork.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRoadNetworkItem(item: any): RoadNetworkItem {
  return {
    id: Number(item.id),

    group_id: item.group_id,
    group_name: item.asset_groups?.name ?? null,

    station_no: item.station_no ?? "",
    road_name: item.road_name ?? "",
    particulars: item.particulars ?? "",
    description: item.description ?? "",
    cost: Number(item.cost ?? 0),
    acq_date: item.acq_date ?? "",
    remarks: item.remarks ?? "",
  };
}

export async function fetchRoadNetwork(): Promise<RoadNetworkItem[]> {
  const { data, error } = await supabase
    .from("road_network")
    .select(`*, asset_groups ( id, name )`)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);

  return (data ?? []).map(toRoadNetworkItem);
}

export async function createRoadNetwork(item: RoadNetworkInput): Promise<RoadNetworkItem> {
  const { data, error } = await supabase
    .from("road_network")
    .insert(item)
    .select(`*, asset_groups ( id, name )`)
    .single();

  if (error) throw new Error(error.message);

  return toRoadNetworkItem(data);
}

export async function updateRoadNetwork(
  id: number,
  item: RoadNetworkInput,
): Promise<RoadNetworkItem> {
  const { data, error } = await supabase
    .from("road_network")
    .update(item)
    .eq("id", id)
    .select(`*, asset_groups ( id, name )`)
    .single();

  if (error) throw new Error(error.message);

  return toRoadNetworkItem(data);
}

export async function deleteRoadNetwork(id: number): Promise<void> {
  const { error } = await supabase
    .from("road_network")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
