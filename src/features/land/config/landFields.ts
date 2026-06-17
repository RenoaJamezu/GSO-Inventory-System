import type { FieldConfig } from "@/shared/forms/types";

export const landFields: FieldConfig[] = [
  { label: "ID NO / LOT NO", name: "lot_no" },
  { label: "LAND", name: "land" },
  { label: "LAND IMPROVEMENTS", name: "land_improvements" },
  { label: "LOCATION", name: "location" },
  { label: "DESCRIPTION", name: "description", textarea: true },
  { label: "CARRYING AMOUNT", name: "carrying_amount", type: "number" },
  { label: "CONDITION / LAND TITLE", name: "land_title" },
  { label: "REMARKS", name: "remarks", textarea: true },
];
