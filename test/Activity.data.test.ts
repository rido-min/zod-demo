import assert from 'assert'
import { describe, it } from 'node:test'
import { ZodError } from 'zod'
import { Activity, ActivityType, ChannelAccount, RoleType } from '../src/Activity/Activity.js'

describe('Activity with no data', () => {
  it('Default ctor sets timestamps as undefined', () => {
    const a: Activity = new Activity(ActivityType.Message)
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.data, undefined)
  })

  it('data as int', () => {
    const json = '{ "type" : "message", "data": 123}'
    const a: Activity = Activity.fromJson(json)
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.data, 123)
  })

  it('data as map', () => {
    const json = '{ "type" : "message", "data": { "a": 123 }}'
    const a: Activity = Activity.fromJson(json)
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    // @ts-ignore
    assert.strictEqual(a.data.a, 123)
  })
})