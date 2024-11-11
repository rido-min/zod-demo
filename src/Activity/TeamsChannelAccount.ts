import { z } from 'zod'
import { RoleType, roleTypeZodSchema } from './RoleType.js'
import { ChannelAccount } from './ChannelAccount.js'

const teamsChannelAccountZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  aadObjectId: z.string().optional(),
  role: z.union([roleTypeZodSchema, z.string()]).optional(),
  properties: z.unknown().optional()
})

interface TeamsChannelAccount extends ChannelAccount {
  id: string
  name: string
  aadObjectId?: string
  role?: RoleType | string
  // properties? : unknown
}

export { RoleType, TeamsChannelAccount, teamsChannelAccountZodSchema }
