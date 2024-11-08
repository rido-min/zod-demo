import { z } from 'zod'
import { RoleType, roleTypesSchema } from './RoleType.js'

const channelAccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  aadObjectId: z.string().optional(),
  role: z.union([roleTypesSchema, z.string()]).optional(),
  properties: z.unknown().optional()
})

interface ChannelAccount {
  id: string
  name: string
  aadObjectId?: string
  role?: RoleType | string
  // properties? : unknown
}

export { RoleType, ChannelAccount, channelAccountSchema }
