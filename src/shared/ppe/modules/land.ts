import { z } from "zod";
import { createPpeModule } from "../createPpeModule";
import type { BaseAssetItem } from "../types";

export const landSchema = z.object({
  id: z.number().nullable().optional(),
  lot_no: z.string().nullable().optional(),
  land: z.string().nullable().optional(),
  land_improvements: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  carrying_amount: z.number().nullable().optional(),
  land_title: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type LandFormData = z.infer<typeof landSchema>;

export interface LandItem extends BaseAssetItem {
  lot_no: string;
  land: string;
  land_improvements: string;
  location: string;
  description: string;
  carrying_amount: number;
  land_title: string;
  remarks: string;
}

function mapLandRow(row: Record<string, unknown>): LandItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    lot_no: String(row.lot_no ?? ""),
    land: String(row.land ?? ""),
    land_improvements: String(row.land_improvements ?? ""),
    location: String(row.location ?? ""),
    description: String(row.description ?? ""),
    carrying_amount: Number(row.carrying_amount ?? 0),
    land_title: String(row.land_title ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const landModule = createPpeModule<LandItem, LandFormData>({
  moduleKey: "land",
  table: "land",
  route: "/ppe/land",
  publicSlug: "land",
  labels: {
    singular: "land",
    plural: "schedule of Land",
    summaryTitle: "land",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description: "report on the physical count of land", 
    publicTitle: "land information",
  },
  amountField: "carrying_amount",
  deleteConfirmField: "lot_no",
  qrLabelField: "land",
  searchFields: [
    "lot_no",
    "land",
    "land_improvements",
    "location",
    "description",
    "land_title",
    "remarks",
  ],
  fields: [
    { label: "id no / lot no", name: "lot_no" },
    { label: "land", name: "land" },
    { label: "land improvements", name: "land_improvements" },
    { label: "location", name: "location" },
    { label: "description", name: "description", textarea: true },
    { label: "carrying amount", name: "carrying_amount", type: "number" },
    { label: "condition / title name", name: "land_title" },
    { label: "remarks", name: "remarks", textarea: true },
  ],
  schema: landSchema,
  emptyForm: {
    group_id: null,
    lot_no: "",
    land: "",
    land_improvements: "",
    location: "",
    description: "",
    carrying_amount: 0,
    land_title: "",
    remarks: "",
  },
  tableColumns: [
    { header: "id no / lot no", key: "lot_no" },
    { header: "land", key: "land", group: "classification" },
    { header: "land improvements", key: "land_improvements", group: "classification" },
    { header: "location", key: "location" },
    { header: "description", key: "description" },
    { header: "carrying amount", key: "carrying_amount", format: "currency" },
    { header: "condition / title name", key: "land_title" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "id no / lot no", key: "lot_no" },
    { label: "land", key: "land" },
    { label: "land improvements", key: "land_improvements" },
    { label: "location", key: "location" },
    { label: "description", key: "description" },
    {
      label: "carrying amount",
      key: "carrying_amount",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "condition / land title", key: "land_title" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapLandRow,
});
