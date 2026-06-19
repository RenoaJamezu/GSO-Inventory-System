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
    singular: "Road Network",
    plural: "Road Network Records",
    summaryTitle: "Road Networks",
    addButton: "Add Road Network",
    addModal: "Add Road Network",
    editModal: "Edit Road Network",
    description: "Manage road network assets and records", 
    publicTitle: "Road Network Information",
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
    { label: "ROAD NETWORK ID NO / STATION NO", name: "station_no" },
    { label: "ROAD NAME", name: "road_name" },
    { label: "PARTICULARS", name: "particulars" },
    { label: "DESCRIPTION", name: "description", textarea: true },
    { label: "COST", name: "cost", type: "number" },
    { label: "ACQ DATE", name: "acq_date" },
    { label: "REMARKS", name: "remarks", textarea: true },
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
    { header: "ROAD NETWORK ID NO / STATION NO", key: "station_no" },
    { header: "ROAD NAME", key: "road_name" },
    { header: "PARTICULARS", key: "particulars" },
    { header: "DESCRIPTION", key: "description" },
    { header: "COST", key: "cost", format: "currency" },
    { header: "ACQ DATE", key: "acq_date" },
    { header: "REMARKS", key: "remarks" },
  ],
  publicFields: [
    { label: "Station No", key: "station_no" },
    { label: "Road Name", key: "road_name" },
    { label: "Particulars", key: "particulars" },
    { label: "Description", key: "description" },
    {
      label: "Cost",
      key: "cost",
      format: (value) => Number(value ?? 0).toLocaleString(),
    },
    { label: "Acquired Date", key: "acq_date" },
    { label: "Remarks", key: "remarks" },
  ],
  mapRow: mapRoadNetworkRow,
});
