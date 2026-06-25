import { z } from "zod";
import type { BaseAssetItem } from "../types";
import { createPpeModule } from "../createPpeModule";

export const officeEquipmentSchema = z.object({
  id: z.number().nullable().optional(),
  article: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tag_no: z.string().nullable().optional(),
  unit_measure: z.string().nullable().optional(),
  unit_value: z.number().nullable().optional(),
  balance: z.number().nullable().optional(),
  on_hand: z.number().nullable().optional(),
  shortage: z.number().nullable().optional(),
  overage: z.number().nullable().optional(),
  condition: z.string().nullable().optional(),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type OfficeEquipmentFormData = z.infer<typeof officeEquipmentSchema>;

export interface OfficeEquipmentItem extends BaseAssetItem {
  article: string;
  description: string;
  tag_no: string;
  unit_measure: string;
  unit_value: number;
  balance: number;
  on_hand: number;
  shortage: number;
  overage: number;
  condition: string;
  date_acq: string;
  remarks: string;
}

function mapOfficeEquipmentRow(
  row: Record<string, unknown>,
): OfficeEquipmentItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    article: String(row.article ?? ""),
    description: String(row.description ?? ""),
    tag_no: String(row.tag_no ?? ""),
    unit_measure: String(row.unit_measure ?? ""),
    unit_value: Number(row.unit_value ?? 0),
    balance: Number(row.balance ?? 0),
    on_hand: Number(row.on_hand ?? 0),
    shortage: Number(row.shortage ?? 0),
    overage: Number(row.overage ?? 0),
    condition: String(row.condition ?? ""),
    date_acq: String(row.date_acq ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const officeEquipmentModule = createPpeModule<
  OfficeEquipmentItem,
  OfficeEquipmentFormData
>({
  moduleKey: "office_equipment",
  table: "office_equipment",
  route: "/ppe/office-equipment",
  publicSlug: "office-equipment",
  labels: {
    singular: "office equipment",
    plural: "schedule of office equipment",
    summaryTitle: "office equipment",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description:
      "report on the physical count of property, plant and equipment",
    publicTitle: "office equipment information",
  },
  amountField: "unit_value",
  deleteConfirmField: "description",
  qrLabelField: "description",
  searchFields: [
    "article",
    "description",
    "tag_no",
    "unit_measure",
    "unit_value",
    "balance",
    "on_hand",
    "shortage",
    "overage",
    "condition",
    "date_acq",
    "remarks",
  ],
  fields: [
    { label: "article", name: "article" },
    { label: "description", name: "description" },
    { label: "tag no", name: "tag_no" },
    { label: "unit of measurement", name: "unit_measure" },
    { label: "unit value", name: "unit_value", type: "number" },
    { label: "balance per card (qty)", name: "balance", type: "number" },
    { label: "on hand per count (qty)", name: "on_hand", type: "number" },
    { label: "shortage (qty)", name: "shortage", type: "number" },
    { label: "overage (value)", name: "overage", type: "number" },
    { label: "condition", name: "condition" },
    { label: "date", name: "date_acq" },
    { label: "remarks", name: "remarks" },
  ],
  schema: officeEquipmentSchema,
  emptyForm: {
    group_id: null,
    article: "",
    description: "",
    tag_no: "",
    unit_measure: "",
    unit_value: 0,
    balance: 0,
    on_hand: 0,
    shortage: 0,
    overage: 0,
    condition: "",
    date_acq: "",
    remarks: "",
  },
  tableColumns: [
    { header: "article", key: "article" },
    { header: "description", key: "description" },
    { header: "tag no", key: "tag_no" },
    { header: "unit of measurement", key: "unit_measure" },
    { header: "unit value", key: "unit_value", format: "currency" },
    { header: "quantity", key: "balance", group: "balance per card" },
    { header: "quantity", key: "on_hand", group: "on hand per count" },
    { header: "quantity", key: "shortage", group: "shortage/overage" },
    { header: "value", key: "overage", group: "shortage/overage" },
    { header: "condition", key: "condition" },
    { header: "date", key: "date_acq" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "article", key: "article" },
    { label: "description", key: "description" },
    { label: "tag no", key: "tag_no" },
    { label: "unit of measurement", key: "unit_measure" },
    {
      label: "unit value",
      key: "unit_value",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "balance per card (qty)", key: "balance" },
    { label: "on hand per count (qty)", key: "on_hand" },
    { label: "shortage (qty)", key: "shortage" },
    { label: "overage (value)", key: "overage" },
    { label: "condition", key: "condition" },
    { label: "date", key: "date_acq" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapOfficeEquipmentRow,
});
