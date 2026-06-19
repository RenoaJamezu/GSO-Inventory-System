export interface OtherLandItem {
  id: number;
  land: string;
  land_improvements: string;
  location: string;
  description: string;
  carrying_amount: number;
  date_acq: string;
  remarks: string;

  group_id: number;
  group_name: string;
}

export type OtherLandInput = {
  id?: number | null;
  land?: string | null;
  land_improvements?: string | null;
  location?: string | null;
  description?: string | null;
  carrying_amount?: number | null;
  date_acq?: string | null;
  remarks?: string | null;

  group_id?: number | null;
};

export type OtherLandActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };
