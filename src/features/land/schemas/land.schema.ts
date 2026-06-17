import { z } from "zod";

export const landSchema = z.object({
  id: z.number().nullable().optional(),
  lot_no: z.string().trim().min(1, "Lot number is required"),
  land: z.string().nullable().optional(),
  land_improvements: z.string().nullable().optional(),
  location: z.string().trim().min(1, "Location is required"),
  description: z.string().nullable().optional(),
  carrying_amount: z.number().min(0, "Carrying amount must be 0 or greater"),
  land_title: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
});

export type LandFormData = z.infer<typeof landSchema>;
