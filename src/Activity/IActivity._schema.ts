import { z } from "zod";

const activityTypeSchema = z.enum(['message']);
const roleTypesSchema = z.enum(['user', 'bot', 'skill'])

export const channelAccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  aadObjectId: z.string().optional(),
  role: z.union([roleTypesSchema, z.string()]).optional(),
  properties: z.unknown().optional(),
});

export const iActivitySchema = z.object({
    type: z.union([activityTypeSchema, z.string()]),
    text: z.optional(z.union([z.string(), z.unknown()])),
    channelId: z.optional(z.union([z.string(), z.unknown()])),
    from: channelAccountSchema
})
