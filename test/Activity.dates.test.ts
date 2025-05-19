import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import { Activity, ActivityType, ChannelAccount, RoleType } from '../src/Activity/Activity.js'

describe('Activity with timestamp', () => {
  it('Default ctor sets timestamps as undefined', () => {
    const a: Activity = new Activity('message')
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.timestamp).toBeUndefined()
    expect(a.id).toBeUndefined()
  })

  it('get/set from date', () => {
    const d = new Date()
    const a: Activity = new Activity('message') 
    a.timestamp = d
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.timestamp).not.toBeUndefined()
    expect(a.timestamp).toBe(d)
  })

  it('deserialize from json', () => {
    const json = '{ "type" : "message", "timestamp" : "2024-11-11T06:06:49.004Z", "text" : "my Text" }'
    const a: Activity = Activity.fromJson(json)
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    const expectedDate = '2024-11-11T06:06:49.004Z'
    expect(a.timestamp).toBe(expectedDate)
  })
})