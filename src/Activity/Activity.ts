import { z } from 'zod'
import { ActivityType, activityTypeZodSchema } from './ActivityType.js'
import { ChannelAccount, RoleType, channelAccountZodSchema } from './ChannelAccount.js'

const activityZodSchema = z.object({
  type: z.union([activityTypeZodSchema, z.string()]),
  text: z.optional(z.string()),
  channelId: z.optional(z.string()),
  from: z.optional(channelAccountZodSchema)
})

class Activity {
  type: ActivityType | string
  text?: string
  channelId?: string
  from?: ChannelAccount
  [x: string]: unknown

  constructor (t: ActivityType | string) {
    this.type = t
  }

  static fromJson (json: string): Activity {
    return this.fromObject(JSON.parse(json))
  }

  static fromObject (o: object): Activity {
    return activityZodSchema.parse(o)
  }
}

export { ActivityType, Activity, ChannelAccount, RoleType }
