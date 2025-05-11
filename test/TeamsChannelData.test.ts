import { Activity, ActivityType } from '../src/Activity/Activity'
import { TeamsChannelData, teamsChannelDataZodSchema } from '../src/TeamsActivity/teamsChannelData'
import assert from 'assert'
import { describe, it } from 'node:test'

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
    assert.strictEqual(a.type, 'message')

    const teamsChannelData = teamsChannelDataZodSchema.parse(a.channelData)
    assert.strictEqual(teamsChannelData.channel.id, '123')
    assert.strictEqual(teamsChannelData.channel.name, 'General')
    assert.strictEqual(teamsChannelData.tenant?.id, '456')
  })
})