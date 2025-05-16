import { Activity, ActivityType } from '../Activity/Activity'
import { teamsChannelDataZodSchema, TeamsChannelData } from './teamsChannelData'
import { z } from 'zod'

class TeamsActivity extends Activity {
  private _teamsChannelData?: unknown

  constructor(type: ActivityType | string) {
    super(type)
  }

  get teamsChannelData(): TeamsChannelData | undefined {
    if (!this._teamsChannelData) {
      return undefined
    }

    const result = teamsChannelDataZodSchema.safeParse(this._teamsChannelData)
    if (!result.success) {
      throw new Error(`Invalid Teams channel data: ${result.error.message}`)
    }

    return result.data
  }

  set teamsChannelData(value: TeamsChannelData) {
    // Validate the data before setting it
    const result = teamsChannelDataZodSchema.safeParse(value)
    if (!result.success) {
      throw new Error(`Invalid Teams channel data: ${result.error.message}`)
    }
    
    this._teamsChannelData = value
    // Also set the base class channelData for compatibility
    this.channelData = value
  }
}

export { TeamsActivity } 