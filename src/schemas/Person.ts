// Generated by ts-to-zod
import { z } from "zod";

export const iPersonSchema = z.record(z.unknown()).and(
  z.object({
    name: z.string(),
    age: z.number().optional().nullable(),
  }),
);
