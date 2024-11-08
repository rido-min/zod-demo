import { ActivityType } from './ActivityType.js'
import { ChannelAccount, RoleType } from './ChannelAccount.js'
import { iActivitySchema } from './IActivity._schema.js'

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
    return iActivitySchema.parse(JSON.parse(json))
  }

  static fromObject (o: object): Activity {
    return iActivitySchema.parse(o)
  }
}

export { ActivityType, Activity, ChannelAccount, RoleType }
