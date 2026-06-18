import { z } from "zod";

export const otherLandSchema = z.object({
  id: z.number().nullable().optional(),
  // id_no: number; // ID NO
  land: z.string().nullable().optional(),
  land_improvements: z.string().nullable().optional(),
  location: z.string().trim().min(1, "Location is required"),
  description: z.string().nullable().optional(),
  carrying_amount: z.number().min(0, "Carrying amount must be 0 or greater"),
  date_acq: z.string().nullable().optional(),
  remarks: z.string().nullable().optional(),
});

export type OtherLandFormData = z.infer<typeof otherLandSchema>;
