import { Activity, ActivityType } from '../Activity/Activity'
import { teamsChannelDataZodSchema, TeamsChannelData } from './teamsChannelData'

class TeamsActivity extends Activity {
  constructor(type: ActivityType | string) {
    super(type)
  }

  get channelData(): TeamsChannelData | undefined {
    return this._teamsChannelData as TeamsChannelData | undefined
  }

  set channelData(value: TeamsChannelData) {
    this._teamsChannelData = value
  }

  static fromActivity(activity: Activity): TeamsActivity {
    const teamsActivity = new TeamsActivity(activity.type)
    Object.assign(teamsActivity, activity)
    if (activity.channelData) {
      teamsActivity.channelData = teamsChannelDataZodSchema.parse(activity.channelData)
    }
    return teamsActivity
  }
}

export { TeamsActivity } 