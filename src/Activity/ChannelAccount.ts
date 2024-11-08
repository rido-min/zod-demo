import { z } from 'zod'
import { RoleType, roleTypeZodSchema } from './RoleType.js'

const channelAccountZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  aadObjectId: z.string().optional(),
  role: z.union([roleTypeZodSchema, z.string()]).optional(),
  properties: z.unknown().optional()
})

interface ChannelAccount {
  id: string
  name: string
  aadObjectId?: string
  role?: RoleType | string
  // properties? : unknown
}

export { RoleType, ChannelAccount, channelAccountZodSchema }
