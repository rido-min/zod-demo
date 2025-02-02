import { z } from 'zod'
import { RoleType, roleTypeZodSchema } from './RoleType.js'

export const channelAccountZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  aadObjectId: z.string().optional(),
  role: z.union([roleTypeZodSchema, z.string()]).optional(),
  properties: z.unknown().optional()
})

export interface ChannelAccount {
  id: string
  name: string
  aadObjectId?: string
  role?: RoleType | string
  // properties? : unknown
}