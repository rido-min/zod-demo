import { z } from 'zod'
import { ActivityType, activityTypeZodSchema } from './ActivityType'
import { ChannelAccount, channelAccountZodSchema } from './ChannelAccount'
import { RoleType } from './RoleType'

class Activity {
  
  type: ActivityType | string
  text?: string
  id?: string
  channelId?: string
  readonly from?: ChannelAccount
  timestamp?: string | Date
  data?: Record<string, any>
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
    const activityZodSchema = z.object({
      type: z.union([activityTypeZodSchema, z.string().min(1)]),
      text: z.optional(z.string()),
      id: z.optional(z.string().min(1)),
      channelId: z.optional(z.string()),
      from: z.optional(channelAccountZodSchema),
      timestamp: z.optional(z.string().datetime())
    })
    const parsed =  activityZodSchema.passthrough().parse(o)
    const activity = new Activity(parsed.type)
    Object.assign(activity, parsed)
    return activity
  }

  getReferenceConversation() {
    return this.from?.id
  }
}

export { ActivityType, Activity, ChannelAccount, RoleType }
