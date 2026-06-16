import { z } from "zod";

export const landSchema = z.object({
  id: z.number().nullable().optional(),
  lot_no: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  carrying_amount: z.number().nullable().optional(),
  land_title: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  land: z.string().nullable().optional(),
  land_improvements: z.string().nullable().optional(),
});

export type LandFormData = z.infer<typeof landSchema>;