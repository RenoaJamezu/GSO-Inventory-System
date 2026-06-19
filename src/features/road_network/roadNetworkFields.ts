import type { FieldConfig } from "@/shared/forms/types";

export const roadNetworkFields: FieldConfig[] = [
  { label: "ROAD NETWORK ID NO / STATION NO", name: "station_no" },
  { label: "ROAD NAME", name: "road_name" },
  { label: "PARTICULARS", name: "particulars" },
  { label: "DESCRIPTION", name: "description", textarea: true },
  { label: "COST", name: "cost", type: "number" },
  { label: "ACQ DATE", name: "acq_date" },
  { label: "REMARKS", name: "remarks", textarea: true },
];
