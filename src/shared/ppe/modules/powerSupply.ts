import { z } from "zod";
import type { BaseAssetItem } from "../types";
import { createPpeModule } from "../createPpeModule";

export const powerSupplySchema = z.object({
  id: z.number().nullable().optional(),
  infrastructure_no: z.string().nullable().optional(),
  infrastructure_type: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  component: z.string().nullable().optional(),
  property_no: z.string().nullable().optional(),
  carrying_amount: z.number().nullable().optional(),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type PowerSupplyFormData = z.infer<typeof powerSupplySchema>;

export interface PowerSupplyItem extends BaseAssetItem {
  infrastructure_no: string;
  infrastructure_type: string;
  location: string;
  component: string;
  property_no: string;
  carrying_amount: number;
  date_acq: string;
  remarks: string;
}

function mapPowerSupplyRow(row: Record<string, unknown>): PowerSupplyItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    infrastructure_no: String(row.infrastructure_no ?? ""),
    infrastructure_type: String(row.infrastructure_type ?? ""),
    location: String(row.location ?? ""),
    component: String(row.component ?? ""),
    property_no: String(row.property_no ?? ""),
    carrying_amount: Number(row.carrying_amount ?? 0),
    date_acq: String(row.date_acq ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const powerSupplyModule = createPpeModule<
  PowerSupplyItem,
  PowerSupplyFormData
>({
  moduleKey: "power_supply",
  table: "power_supply",
  route: "/ppe/power-supply",
  publicSlug: "power-supply",
  labels: {
    singular: "power supply system",
    plural: "schedule of power supply system",
    summaryTitle: "power supply systems",
    addButton: "add power supply system",
    addModal: "add power supply system",
    editModal: "edit power supply system",
    description: "report on the physical count of power supply system",
    publicTitle: "power supply system information",
  },
  amountField: "carrying_amount",
  deleteConfirmField: "infrastructure_type",
  qrLabelField: "infrastructure_type",
  searchFields: [
    "infrastructure_no",
    "infrastructure_type",
    "location",
    "component",
    "property_no",
    "carrying_amount",
    "date_acq",
    "remarks",
  ],
  fields: [
    { label: "public infrastructure id no", name: "infrastructure_no" },
    { label: "type of public infrastructure", name: "infrastructure_type" },
    { label: "location", name: "location" },
    { label: "component", name: "component" },
    { label: "component property no", name: "property_no" },
    { label: "carrying amount", name: "carrying_amount", type: "number" },
    { label: "date acq", name: "date_acq" },
    { label: "remarks", name: "remarks" },
  ],
  schema: powerSupplySchema,
  emptyForm: {
    group_id: null,
    infrastructure_no: "",
    infrastructure_type: "",
    location: "",
    component: "",
    property_no: "",
    carrying_amount: 0,
    date_acq: "",
    remarks: "",
  },
  tableColumns: [
    { header: "public infrastructure id no", key: "infrastructure_no" },
    { header: "type of public infrastructure", key: "infrastructure_type" },
    { header: "location", key: "location" },
    { header: "component", key: "component" },
    { header: "component property no", key: "property_no" },
    { header: "carrying amount", key: "carrying_amount", format: "currency"  },
    { header: "date acq", key: "date_acq" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "public infrastructure id no", key: "infrastructure_no" },
    { label: "type of public infrastructure", key: "infrastructure_type" },
    { label: "location", key: "location" },
    { label: "component", key: "component" },
    { label: "component property no", key: "property_no" },
    {
      label: "carrying amount",
      key: "carrying_amount",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "date acq", key: "date_acq" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapPowerSupplyRow,
});
