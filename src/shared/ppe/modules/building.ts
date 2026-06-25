import { z } from "zod";
import type { BaseAssetItem } from "../types";
import { createPpeModule } from "../createPpeModule";

export const buildingSchema = z.object({
  id: z.number().nullable().optional(),
  structure_id: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  building_no: z.string().nullable().optional(),
  property_no: z.string().nullable().optional(),
  carrying_amount: z.number().nullable().optional(),
  condition: z.string().nullable().optional(),
  date_acq: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type BuildingFormData = z.infer<typeof buildingSchema>;

export interface BuildingItem extends BaseAssetItem {
  structure_id: string;
  location: string;
  building_no: string;
  property_no: string;
  carrying_amount: number;
  condition: string;
  date_acq: string;
}

function mapBuildingRow(row: Record<string, unknown>): BuildingItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    structure_id: String(row.structure_id ?? ""),
    location: String(row.location ?? ""),
    building_no: String(row.building_no ?? ""),
    property_no: String(row.property_no ?? ""),
    carrying_amount: Number(row.carrying_amount ?? 0),
    condition: String(row.condition ?? ""),
    date_acq: String(row.date_acq ?? ""),
  };
}

export const buildingModule = createPpeModule<BuildingItem, BuildingFormData>({
  moduleKey: "building",
  table: "building",
  route: "/ppe/building",
  publicSlug: "building",
  labels: {
    singular: "building",
    plural: "building records",
    summaryTitle: "building",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description: "report on the physical count of building and structures",
    publicTitle: "building information",
  },
  amountField: "carrying_amount",
  deleteConfirmField: "structure_id",
  qrLabelField: "structure_id",
  searchFields: [
    "structure_id",
    "location",
    "building_no",
    "property_no",
    "carrying_amount",
    "condition" ,
    "date_acq",
  ],
  fields: [
    { label: "building / structure id no", name: "structure_id" },
    { label: "location", name: "location" },
    { label: "building no", name: "building_no" },
    { label: "component property no", name: "property_no" },
    { label: "carrying amount", name: "carrying_amount", type: "number" },
    { label: "condition", name: "condition" },
    { label: "date", name: "date_acq" },
  ],
  schema: buildingSchema,
  emptyForm: {
    group_id: null,
    structure_id: "",
    location: "",
    property_no: "",
    carrying_amount: 0,
    condition: "",
    date_acq: "",
  },
  tableColumns: [
    { header: "building / structure id no", key: "structure_id" },
    { header: "location", key: "location" },
    { header: "component property no", key: "property_no" },
    { header: "carrying amount", key: "carrying_amount", format: "currency" },
    { header: "condition", key: "condition" },
    { header: "date", key: "date_acq" },
  ],
  publicFields: [
    { label: "building / structure id no", key: "structure_id" },
    { label: "location", key: "location" },
    { label: "component property no", key: "property_no" },
    {
      label: "carrying amount",
      key: "carrying_amount",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "condition", key: "condition" },
    { label: "date", key: "date_acq" },
  ],
  mapRow: mapBuildingRow,
});
