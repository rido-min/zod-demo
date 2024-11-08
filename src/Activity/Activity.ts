import { z } from 'zod'
import { ActivityType, activityTypeSchema } from './ActivityType.js'
import { ChannelAccount, RoleType, channelAccountSchema } from './ChannelAccount.js'

const ActivityZodSchema = z.object({
  type: z.union([activityTypeSchema, z.string()]),
  text: z.optional(z.union([z.string(), z.unknown()])),
  channelId: z.optional(z.union([z.string(), z.unknown()])),
  from: z.optional(channelAccountSchema)
})

class Activity {
  type: ActivityType | string
  text?: string | unknown
  channelId?: string | unknown
  from?: ChannelAccount
  [x: string]: unknown

  constructor (t: ActivityType | string) {
    this.type = t
    this.from = undefined
  }

  static fromJson (json: string): Activity {
    return this.fromObject(JSON.parse(json))
  }

  static fromObject (o: object): Activity {
    return ActivityZodSchema.parse(o)
  }
}

export { ActivityType, Activity, ChannelAccount, RoleType }
