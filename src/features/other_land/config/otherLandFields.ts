import type { FieldConfig } from "@/shared/forms/types";

export const otherLandFields: FieldConfig[] = [
  { label: "LAND", name: "land" },
  { label: "LAND IMPROVEMENTS", name: "land_improvements" },
  { label: "LOCATION", name: "location" },
  { label: "DESCRIPTION", name: "description", textarea: true },
  { label: "CARRYING AMOUNT", name: "carrying_amount", type: "number" },
  { label: "DATE ACQ", name: "date_acq" },
  { label: "REMARKS", name: "remarks", textarea: true },
];
