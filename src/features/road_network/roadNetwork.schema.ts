import { z } from "zod";

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

export type RoadNetworkFormData = z.infer<typeof roadNetworkSchema>
