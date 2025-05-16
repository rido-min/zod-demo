import { describe, it } from 'node:test'
import assert from 'node:assert'
import { TeamsActivity } from '../src/TeamsActivity/TeamsActivity'
import { TeamsChannelData } from '../src/TeamsActivity/teamsChannelData'

describe('TeamsActivity', () => {
  it('should create a TeamsActivity with valid data', () => {
    const activity = new TeamsActivity('message')
    const teamsData: TeamsChannelData = {
      channel: {
        id: 'channel123',
        name: 'General'
      },
      team: {
        id: 'team123',
        name: 'My Team'
      }
    }

    activity.teamsChannelData = teamsData
    assert.deepStrictEqual(activity.teamsChannelData, teamsData)
    assert.deepStrictEqual(activity.channelData, teamsData)
  })

  it('should throw error when accessing invalid teamsChannelData', () => {
    const activity = new TeamsActivity('message')
    activity.teamsChannelData = {
      channel: {
        id: 'channel123'
        // Missing required name
      }
    } as TeamsChannelData

    assert.throws(
      () => activity.teamsChannelData,
      /Invalid Teams channel data/
    )
  })

  it('should handle undefined teamsChannelData', () => {
    const activity = new TeamsActivity('message')
    assert.strictEqual(activity.teamsChannelData, undefined)
  })

  it('should validate channel data structure', () => {
    const activity = new TeamsActivity('message')
    const invalidData = {
      channel: {
        // Missing required id
        name: 'General'
      }
    } as TeamsChannelData

    activity.teamsChannelData = invalidData
    assert.throws(
      () => activity.teamsChannelData,
      /Invalid Teams channel data/
    )
  })

  it('should handle optional fields in teamsChannelData', () => {
    const activity = new TeamsActivity('message')
    const minimalData: TeamsChannelData = {
      channel: {
        id: 'channel123',
        name: 'General'
      }
      // team is optional
    }

    activity.teamsChannelData = minimalData
    assert.deepStrictEqual(activity.teamsChannelData, minimalData)
  })

  it('should maintain base Activity properties', () => {
    const activity = new TeamsActivity('message')
    activity.text = 'Hello Teams!'
    activity.id = 'msg123'

    const teamsData: TeamsChannelData = {
      channel: {
        id: 'channel123',
        name: 'General'
      }
    }

    activity.teamsChannelData = teamsData

    assert.strictEqual(activity.type, 'message')
    assert.strictEqual(activity.text, 'Hello Teams!')
    assert.strictEqual(activity.id, 'msg123')
    assert.deepStrictEqual(activity.teamsChannelData, teamsData)
  })
}) 