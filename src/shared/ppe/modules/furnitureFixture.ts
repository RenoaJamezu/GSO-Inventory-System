import { z } from "zod";
import type { BaseAssetItem } from "../types";
import { createPpeModule } from "../createPpeModule";

export const furnitureFixtureSchema = z.object({
  id: z.number().nullable().optional(),
  article: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  property_no: z.string().nullable().optional(),
  cost: z.number().nullable().optional(),
  location: z.string().nullable().optional(),
  condition: z.string().nullable().optional(),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type FurnitureFixtureFormData = z.infer<typeof furnitureFixtureSchema>;

export interface FurnitureFixtureItem extends BaseAssetItem {
  article: string;
  description: string;
  property_no: string;
  cost: number;
  location: string;
  condition: string;
  date_acq: string;
  remarks: string;
}

function mapFurnitureFixtureRow(
  row: Record<string, unknown>,
): FurnitureFixtureItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    article: String(row.article ?? ""),
    description: String(row.description ?? ""),
    property_no: String(row.property_no ?? ""),
    cost: Number(row.cost ?? 0),
    location: String(row.location ?? ""),
    condition: String(row.condition ?? ""),
    date_acq: String(row.date_acq ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const furnitureFixtureModule = createPpeModule<
  FurnitureFixtureItem,
  FurnitureFixtureFormData
>({
  moduleKey: "furniture_and_fixture",
  table: "furniture_and_fixture",
  route: "/ppe/furniture-and-fixture",
  publicSlug: "furniture-and-fixture",
  labels: {
    singular: "furniture and fixture",
    plural: "schedule of furniture and fixture",
    summaryTitle: "furniture and fixture",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description:
      "report on the physical count of equipment, furnitures and fixtures, and other PPE's",
    publicTitle: "furniture and fixture information",
  },
  amountField: "cost",
  deleteConfirmField: "description",
  qrLabelField: "description",
  searchFields: [
    "article",
    "description",
    "property_no",
    "cost",
    "location",
    "condition",
    "date_acq",
    "remarks",
  ],
  fields: [
    { label: "article", name: "article" },
    { label: "description", name: "description" },
    { label: "property no", name: "property_no" },
    { label: "cost", name: "cost", type: "number" },
    { label: "location", name: "location" },
    { label: "condition", name: "condition" },
    { label: "date", name: "date_acq" },
    { label: "remarks", name: "remarks" },
  ],
  schema: furnitureFixtureSchema,
  emptyForm: {
    group_id: null,
    article: "",
    description: "",
    property_no: "",
    cost: 0,
    location: "",
    condition: "",
    date_acq: "",
    remarks: "",
  },
  tableColumns: [
    { header: "article", key: "article" },
    { header: "description", key: "description" },
    { header: "tag no", key: "property_no" },
    { header: "cost", key: "cost", format: "currency" },
    { header: "location", key: "location" },
    { header: "condition", key: "condition" },
    { header: "date", key: "date_acq" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "article", key: "article" },
    { label: "description", key: "description" },
    { label: "property no", key: "property_no" },
    {
      label: "cost",
      key: "cost",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "location", key: "location" },
    { label: "condition", key: "condition" },
    { label: "date", key: "date_acq" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapFurnitureFixtureRow,
});
