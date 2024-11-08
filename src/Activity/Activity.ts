import { ActivityType } from './ActivityType.js'
import { ChannelAccount, RoleType } from './ChannelAccount.js'
import { ActivityZodSchema } from './Activity.zod.js'

class Activity {
  type: ActivityType | string
  text?: string | unknown
  channelId?: string | unknown
  from?: ChannelAccount | undefined
  [x: string]: unknown

  constructor (t: ActivityType | string) {
    this.type = t
    this.from = undefined
  }

  static fromJson (json: string): Activity {
    return ActivityZodSchema.parse(JSON.parse(json))
  }

  static fromObject (o: object): Activity {
    return ActivityZodSchema.parse(o)
  }
}

export { ActivityType, Activity, ChannelAccount, RoleType }
