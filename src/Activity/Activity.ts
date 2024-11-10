import { z } from 'zod'
import { ActivityType, activityTypeZodSchema } from './ActivityType.js'
import { ChannelAccount, RoleType, channelAccountZodSchema } from './ChannelAccount.js'

const activityZodSchema = z.object({
  type: z.union([activityTypeZodSchema, z.string().min(1)]),
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
    if (t === undefined) {
      throw new Error('Invalid ActivityType: undefined')
    }
    if (t === null) {
      throw new Error('Invalid ActivityType: null')
    }
    if ((typeof t === 'string') && (t.length === 0)) {
      throw new Error('Invalid ActivityType: empty string')
    }
    this.type = t
  }

  static fromJson (json: string): Activity {
    return this.fromObject(JSON.parse(json))
  }

  static fromObject (o: object): Activity {
    return activityZodSchema.passthrough().parse(o)
  }
}

export { ActivityType, Activity, ChannelAccount, RoleType }
