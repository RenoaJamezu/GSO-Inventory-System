import { z } from "zod";
import type { BaseAssetItem } from "../types";
import { createPpeModule } from "../createPpeModule";

export const otherInfrastructureAssetSchema = z.object({
  id: z.number().nullable().optional(),
  structure_id: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  building_no: z.string().nullable().optional(),
  property_no: z.string().nullable().optional(),
  carrying_amount: z.number().nullable().optional(),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type OtherInfrastructureAssetFormData = z.infer<typeof otherInfrastructureAssetSchema>;

export interface OtherInfrastructureAssetItem extends BaseAssetItem {
  structure_id: string;
  location: string;
  building_no: string;
  property_no: string;
  carrying_amount: number;
  date_acq: string;
  remarks: string;
}

function mapOtherInfrastructureAssetRow(row: Record<string, unknown>): OtherInfrastructureAssetItem {
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
    date_acq: String(row.date_acq ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const otherInfrastructureAssetModule = createPpeModule<OtherInfrastructureAssetItem, OtherInfrastructureAssetFormData>({
  moduleKey: "other_infrastructure_asset",
  table: "other_infrastructure_asset",
  route: "/ppe/other-infrastructure-asset",
  publicSlug: "other-infrastructure-asset",
  labels: {
    singular: "other infrastructure asset",
    plural: "schedule of other infrastructure assets",
    summaryTitle: "other infrastructure asset",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description: "report on the physical count of other infrastructure assets",
    publicTitle: "other infrastructure asset information",
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
    "date_acq",
    "remarks",
  ],
  fields: [
    { label: "building / structure id no", name: "structure_id" },
    { label: "location", name: "location" },
    { label: "building no", name: "building_no" },
    { label: "component property no", name: "property_no" },
    { label: "carrying amount", name: "carrying_amount", type: "number" },
    { label: "date", name: "date_acq" },
    { label: "remarks", name: "remarks" },
  ],
  schema: otherInfrastructureAssetSchema,
  emptyForm: {
    group_id: null,
    structure_id: "",
    location: "",
    building_no: "",
    property_no: "",
    carrying_amount: 0,
    date_acq: "",
    remarks: "",
  },
  tableColumns: [
    { header: "building / structure id no", key: "structure_id" },
    { header: "location", key: "location" },
    { header: "building no", key: "building_no" },
    { header: "component property no", key: "property_no" },
    { header: "carrying amount", key: "carrying_amount", format: "currency" },
    { header: "date", key: "date_acq" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "building / structure id no", key: "structure_id" },
    { label: "location", key: "location" },
    { label: "building no", key: "building_no" },
    { label: "component property no", key: "property_no" },
    {
      label: "carrying amount",
      key: "carrying_amount",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "date", key: "date_acq" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapOtherInfrastructureAssetRow,
});
