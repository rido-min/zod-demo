import { ActivityType } from './ActivityType.js'
import { ChannelAccount, RoleType } from './ChannelAccount.js'

interface IActivity {
  type: ActivityType | string
  text?: string | unknown
  channelId?: string | unknown
  from?: ChannelAccount | undefined
  [x: string]: unknown
}

export { IActivity, RoleType, ChannelAccount, ActivityType }
