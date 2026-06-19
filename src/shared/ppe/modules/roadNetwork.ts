import { z } from "zod";
import { createPpeModule } from "../createPpeModule";
import type { BaseAssetItem } from "../types";

export const roadNetworkSchema = z.object({
  id: z.number().nullable().optional(),
  station_no: z.string().trim().optional(),
  road_name: z.string().trim().optional(),
  particulars: z.string().trim().optional(),
  description: z.string().trim().optional(),
  cost: z.number().min(0, "Cost amount must be 0 or greater"),
  acq_date: z.string().trim().optional(),
  remarks: z.string().trim().optional(),
  group_id: z.number().nullable().optional(),
});

export type RoadNetworkFormData = z.infer<typeof roadNetworkSchema>;

export interface RoadNetworkItem extends BaseAssetItem {
  station_no: string;
  road_name: string;
  particulars: string;
  description: string;
  cost: number;
  acq_date: string;
  remarks: string;
}

function mapRoadNetworkRow(row: Record<string, unknown>): RoadNetworkItem {
  const groups = row.asset_groups as { name?: string } | null;

  return {
    id: Number(row.id),
    group_id: (row.group_id as number | null) ?? null,
    group_name: groups?.name ?? null,
    station_no: String(row.station_no ?? ""),
    road_name: String(row.road_name ?? ""),
    particulars: String(row.particulars ?? ""),
    description: String(row.description ?? ""),
    cost: Number(row.cost ?? 0),
    acq_date: String(row.acq_date ?? ""),
    remarks: String(row.remarks ?? ""),
  };
}

export const roadNetworkModule = createPpeModule<
  RoadNetworkItem,
  RoadNetworkFormData
>({
  moduleKey: "road_network",
  table: "road_network",
  route: "/ppe/road-network",
  publicSlug: "road-network",
  labels: {
    singular: "road network",
    plural: "road network Records",
    summaryTitle: "road networks",
    addButton: "Add road network",
    addModal: "Add road network",
    editModal: "Edit road network",
    description: "Manage road network assets and records", 
    publicTitle: "road network Information",
  },
  amountField: "cost",
  deleteConfirmField: "road_name",
  qrLabelField: "road_name",
  searchFields: [
    "station_no",
    "road_name",
    "particulars",
    "description",
    "cost",
    "acq_date",
    "remarks",
  ],
  fields: [
    { label: "road network id no / station no", name: "station_no" },
    { label: "road name", name: "road_name" },
    { label: "particulars", name: "particulars" },
    { label: "description", name: "description", textarea: true },
    { label: "cost", name: "cost", type: "number" },
    { label: "acq date", name: "acq_date" },
    { label: "remarks", name: "remarks", textarea: true },
  ],
  schema: roadNetworkSchema,
  emptyForm: {
    group_id: null,
    station_no: "",
    road_name: "",
    particulars: "",
    description: "",
    cost: 0,
    acq_date: "",
    remarks: "",
  },
  tableColumns: [
    { header: "road network id no / station no", key: "station_no" },
    { header: "road name", key: "road_name" },
    { header: "particulars", key: "particulars" },
    { header: "description", key: "description" },
    { header: "cost", key: "cost", format: "currency" },
    { header: "acq date", key: "acq_date" },
    { header: "remarks", key: "remarks" },
  ],
  publicFields: [
    { label: "station no", key: "station_no" },
    { label: "road name", key: "road_name" },
    { label: "particulars", key: "particulars" },
    { label: "description", key: "description" },
    {
      label: "cost",
      key: "cost",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "acq date", key: "acq_date" },
    { label: "remarks", key: "remarks" },
  ],
  mapRow: mapRoadNetworkRow,
});
