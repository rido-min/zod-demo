import { z } from "zod";

const activityTypeSchema = z.enum(['message']);

export const iActivitySchema = z.object({
    type: z.union([activityTypeSchema, z.string()]),
    text: z.optional(z.union([z.string(), z.unknown()]))
})
