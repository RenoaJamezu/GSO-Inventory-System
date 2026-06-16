import type { Column } from "@/shared/components/ui/Table";
import type { LandItem } from "@/features/land/types/land.types";

export const landColumns: Column<LandItem>[] = [
  { header: "ID / LOT NO.", key: "lot_no" },
  { header: "LAND", key: "land" },
  { header: "LAND IMPROVEMENTS", key: "land_improvements" },
  { header: "LOCATION", key: "location" },
  { header: "DESCRIPTION", key: "description" },
  { header: "CARRYING AMOUNT", key: "carrying_amount" },
  { header: "CONDITION / TITLE", key: "land_title" },
  { header: "REMARKS", key: "remarks" },
];
