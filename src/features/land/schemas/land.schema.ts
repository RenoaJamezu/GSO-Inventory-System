import { z } from "zod";

export const landSchema = z.object({
  id: z.number().nullable().optional(),
  lot_no: z
    .string({ error: "Lot number is required" })
    .trim()
    .min(1, "Lot number is required"),
  location: z
    .string({ error: "Location is required" })
    .trim()
    .min(1, "Location is required"),
  description: z.string().nullable().optional(),
  carrying_amount: z
    .number({ error: "Carrying amount is required" })
    .min(0, "Carrying amount must be 0 or greater"),
  land_title: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
  land: z.string().nullable().optional(),
  land_improvements: z.string().nullable().optional(),
});

export type LandFormData = z.infer<typeof landSchema>;
