import type { LandInput, LandItem } from "@/features/land/types/land.types";

export function normalizeLandItem(item: LandInput): LandItem {
  return {
    id: Number(item.id ?? Date.now()),
    lot_no: item.lot_no ?? "",
    location: item.location ?? "",
    description: item.description ?? "",
    carrying_amount: Number(item.carrying_amount ?? 0),
    land_title: item.land_title ?? "",
    remarks: item.remarks ?? "",
    land: item.land ?? "",
    land_improvements: item.land_improvements ?? "",
  };
}
