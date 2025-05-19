import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import { Activity, ChannelAccount, RoleType } from '../src/Activity/Activity'

import { activityTypeZodSchema } from '../src/Activity/ActivityType'

const ActivityType = activityTypeZodSchema.enum

describe('Activity with no data', () => {
  it('Default ctor sets timestamps as undefined', () => {
    const a: Activity = new Activity(ActivityType.Message)
    expect(a.type).toBe('message')
    expect(a.type).toBe(ActivityType.Message)
    expect(a.data).toBeUndefined()
  })

  it('data as int', () => {
    const json = '{ "type" : "message", "data": 123}'
    const a: Activity = Activity.fromJson(json)
    expect(a.type).toBe('message')
    expect(a.type).toBe(ActivityType.Message)
    expect(a.data).toBe(123)
  })

  it('data as map', () => {
    const json = '{ "type" : "message", "data": { "a": 123 }}'
    const a: Activity = Activity.fromJson(json)
    expect(a.type).toBe('message')
    expect(a.type).toBe(ActivityType.Message)
    // @ts-ignore
    expect(a.data.a).toBe(123)
  })
})