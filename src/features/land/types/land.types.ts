export interface LandItem {
  id: number;
  lot_no: string;
  land: string;
  land_improvements: string;
  location: string;
  description: string;
  carrying_amount: number;
  land_title: string;
  remarks: string;

  group_id: number;
  group_name: string;
}

export type LandInput = {
  id?: number | null;
  lot_no?: string | null;
  land?: string | null;
  land_improvements?: string | null;
  location?: string | null;
  description?: string | null;
  carrying_amount?: number | null;
  land_title?: string | null;
  remarks?: string | null;

  group_id?: number | null;
};

export type LandActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };
