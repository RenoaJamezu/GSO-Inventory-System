export interface RoadNetworkItem {
  id: number;
  station_no: string;
  road_name: string;
  particulars: string;
  description: string;
  cost: number;
  acq_date: string;
  remarks: string;

  group_id: number;
  group_name: string;
}

export type RoadNetworkInput = {
  id?: number | null;
  station_no?: string | null;
  road_name?: string | null;
  particulars?: string | null;
  description?: string | null;
  cost?: number | null;
  acq_date?: string | null;
  remarks?: string | null;

  group_id?: number | null;
};

export type RoadNetworkActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };
