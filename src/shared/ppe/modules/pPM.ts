// park, plazas and monument

import { z } from "zod";
import type { BaseAssetItem } from "../types";
import { createPpeModule } from "../createPpeModule";

export const pPMSchema = z.object({
  id: z.number().nullable().optional(),
  structure_id: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  component: z.string().nullable().optional(),
  property_no: z.string().nullable().optional(),
  carrying_amount: z.number().nullable().optional(),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  group_id: z.number().nullable().optional(),
});

export type PPMFormData = z.infer<typeof pPMSchema>;

export interface PPMItem extends BaseAssetItem {
  structure_id: string;
  location: string;
  component: string;
  property_no: string;
  carrying_amount: number;
  date_acq: string;
  remarks: string;
}

function mapPPMRow(row: Record<string, unknown>): PPMItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    structure_id: String(row.structure_id ?? ""),
    location: String(row.location ?? ""),
    component: String(row.component ?? ""),
    property_no: String(row.property_no ?? ""),
    carrying_amount: Number(row.carrying_amount ?? 0),
    date_acq: String(row.date_acq ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const pPMModule = createPpeModule<PPMItem, PPMFormData>({
  moduleKey: "park_plaza_and_monument",
  table: "park_plaza_and_monument",
  route: "/ppe/park-plazas-and-monument",
  publicSlug: "park-plazas-and-monument",
  labels: {
    singular: "park, plaza, and monument",
    plural: "park, plaza, and monument records",
    summaryTitle: "park, plaza, and monument",
    addButton: "add data",
    addModal: "add data",
    editModal: "edit data",
    description: "report on the physical count of park, plaza, and monument",
    publicTitle: "park, plaza, and monument information",
  },
  amountField: "carrying_amount",
  deleteConfirmField: "structure_id",
  qrLabelField: "structure_id",
  searchFields: [],
  fields: [
    { label: "building / structure id no", name: "structure_id" },
    { label: "location", name: "location" },
    { label: "component", name: "component" },
    { label: "component property no", name: "property_no" },
    { label: "carrying amount", name: "carrying_amount", type: "number" },
    { label: "date acq", name: "date_acq" },
    { label: "remarks", name: "remarks" },
  ],
  schema: pPMSchema,
  emptyForm: {
    group_id: null,
    structure_id: "",
    location: "",
    component: "",
    property_no: "",
    carrying_amount: 0,
    date_acq: "",
    remarks: "",
  },
  tableColumns: [
    { header: "building / structure id no", key: "structure_id" },
    { header: "location", key: "location" },
    { header: "component", key: "component" },
    { header: "component property no", key: "property_no" },
    { header: "carrying amount", key: "carrying_amount", format: "currency" },
    { header: "date acq", key: "date_acq" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "building / structure id no", key: "structure_id" },
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
  mapRow: mapPPMRow,
});
