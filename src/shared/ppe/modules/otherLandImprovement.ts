import { z } from "zod";
import { createPpeModule } from "../createPpeModule";
import type { BaseAssetItem } from "../types";

export const otherLandSchema = z.object({
  id: z.number().nullable().optional(),
  land: z.string().nullable().optional(),
  land_improvements: z.string().nullable().optional(),
  location: z.string().trim().min(1, "Location is required"),
  description: z.string().nullable().optional(),
  carrying_amount: z.number().min(0, "Carrying amount must be 0 or greater"),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type OtherLandFormData = z.infer<typeof otherLandSchema>;

export interface OtherLandItem extends BaseAssetItem {
  land: string;
  land_improvements: string;
  location: string;
  description: string;
  carrying_amount: number;
  date_acq: string;
  remarks: string;
}

function mapOtherLandRow(row: Record<string, unknown>): OtherLandItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    land: String(row.land ?? ""),
    land_improvements: String(row.land_improvements ?? ""),
    location: String(row.location ?? ""),
    description: String(row.description ?? ""),
    carrying_amount: Number(row.carrying_amount ?? 0),
    date_acq: String(row.date_acq ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const otherLandModule = createPpeModule<OtherLandItem, OtherLandFormData>({
  moduleKey: "other_land_improvement",
  table: "other_land_improvement",
  route: "/ppe/other-land-improvement",
  publicSlug: "other-land-improvement",
  labels: {
    singular: "other land improvement",
    plural: "schedule of other land improvements",
    summaryTitle: "other land improvements",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description: "report on the physical count of other land improvements", 
    publicTitle: "other land improvement information",
  },
  amountField: "carrying_amount",
  deleteConfirmField: "land_improvements",
  qrLabelField: "land_improvements",
  searchFields: [
    "land",
    "land_improvements",
    "location",
    "description",
    "carrying_amount",
    "date_acq",
    "remarks",
  ],
  fields: [
    { label: "land", name: "land" },
    { label: "land improvements", name: "land_improvements" },
    { label: "location", name: "location" },
    { label: "description", name: "description", textarea: true },
    { label: "carrying amount", name: "carrying_amount", type: "number" },
    { label: "date acq", name: "date_acq" },
    { label: "remarks", name: "remarks", textarea: true },
  ],
  schema: otherLandSchema,
  emptyForm: {
    group_id: null,
    land: "",
    land_improvements: "",
    location: "",
    description: "",
    carrying_amount: 0,
    date_acq: "",
    remarks: "",
  },
  tableColumns: [
    { header: "land", key: "land", group: "classification" },
    { header: "land improvements", key: "land_improvements", group: "classification" },
    { header: "location", key: "location" },
    { header: "description", key: "description" },
    { header: "carrying amount", key: "carrying_amount", format: "currency" },
    { header: "date acq", key: "date_acq" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "land", key: "land" },
    { label: "land improvements", key: "land_improvements" },
    { label: "location", key: "location" },
    { label: "description", key: "description" },
    {
      label: "carrying Amount",
      key: "carrying_amount",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "date acq", key: "date_acq" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapOtherLandRow,
});
