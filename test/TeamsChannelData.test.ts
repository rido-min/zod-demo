import { describe, it, expect } from 'vitest'
import { Activity, ActivityType } from '../src/Activity/Activity'
import { TeamsChannelData, teamsChannelDataZodSchema } from '../src/TeamsActivity/teamsChannelData'

describe('TeamsChannelData', () => {
  it('should create a TeamsChannelData with valid properties', () => {
    const channelData = {
      channel: {
        id: '123',
        name: 'General'
      },
      tenant: {
        id: '456'
      },
      team: {
        id: '789',
        name: 'My Team'
      },
    }
    const a = Activity.fromObject({
      type: ActivityType.Message,
      channelData: channelData
    })
    expect(a.type).toBe('message')

    const teamsChannelData = teamsChannelDataZodSchema.parse(a.channelData)
    expect(teamsChannelData.channel.id).toBe('123')
    expect(teamsChannelData.channel.name).toBe('General')
    expect(teamsChannelData.tenant?.id).toBe('456')
  })
})