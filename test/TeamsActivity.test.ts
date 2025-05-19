import { describe, it, expect } from 'vitest'
import { TeamsActivity } from '../src/TeamsActivity/TeamsActivity'
import { Activity, ActivityType } from '../src/Activity/Activity'

describe('TeamsActivity', () => {
    it('should create a TeamsActivity with valid data', () => {
        const activity = Activity.fromObject({
            type: ActivityType.Message,
            channelData: {
                channel: {
                    id: 'channel123',
                    name: 'General'
                },
                team: {
                    id: 'team123',
                    name: 'My Team'
                }
            }
        })
        expect(activity.channelData).toBeDefined()
        const ta = TeamsActivity.fromActivity(activity)
        expect(ta.channelData?.channel.id, 'channel123')
    })
}) 