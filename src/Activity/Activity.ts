import { iActivitySchema } from './IActivity._schema.js'
import { IActivity, ActivityType, ChannelAccount, RoleType } from './IActivity.js'

class Activity implements IActivity {
  type: ActivityType | string
  text?: string | unknown
  channelId?: string | unknown
  from: ChannelAccount | undefined
  [x: string]: unknown

  constructor (t: ActivityType | string) {
    this.type = t
    this.from = undefined
  }

  static fromJson (json: string): IActivity {
    return iActivitySchema.parse(JSON.parse(json))
  }

  static fromObject (o: object): IActivity {
    return iActivitySchema.parse(o)
  }
}

export { IActivity, ActivityType, Activity, ChannelAccount, RoleType }
