import assert from 'assert'
import { describe, it } from 'node:test'
import { ZodError } from 'zod'
import { Activity, ActivityType, ChannelAccount, RoleType } from '../src/Activity/Activity.js'

describe('Activity with timestamp', () => {
  it('Default ctor sets timestamps as undefined', () => {
    const a: Activity = new Activity(ActivityType.Message)
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.timestamp, undefined)
    assert.strictEqual(a.id, undefined)
  })

  it('get/set from date', () => {
    const d = new Date()
    const a: Activity = new Activity(ActivityType.Message) 
    a.timestamp = d
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.notStrictEqual(a.timestamp, undefined)
    assert.strictEqual(a.timestamp, d)
  })

  it('deserialize from json', () => {
    const json = '{ "type" : "message", "timestamp" : "2024-11-11T06:06:49.004Z", "text" : "my Text" }'
    const a: Activity = Activity.fromJson(json)
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    const expectedDate = '2024-11-11T06:06:49.004Z'
    assert.strictEqual(a.timestamp, expectedDate)
  })


})