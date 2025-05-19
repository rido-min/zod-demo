import { describe, it, expect } from 'vitest'
import { Activity } from '../src/Activity/Activity'
import z from 'zod'
import { activityTypeZodSchema } from '../src/Activity/ActivityType'

const ActivityType = activityTypeZodSchema.enum

describe('Activity with no data', () => {
  it('Value as object', () => {
    const a: Activity = new Activity(ActivityType.Message)
    a.value = { name: 'test' }
    expect(a.type).toBe('message')
    expect(a.type).toBe(ActivityType.Message)
    expect(a.data).toBeUndefined()
    expect(a.value).toEqual({ name: 'test' })
  })

  it('Value as object validate', () => {
    const a: Activity = new Activity(ActivityType.Message)
    a.value = { name: 'test' }
    expect(a.type).toBe('message')
    expect(a.type).toBe(ActivityType.Message)
    expect(a.data).toBeUndefined()
    expect(a.value).toEqual({ name: 'test' })

    const valueZodSchema = z.object({
      name: z.string()
    })

    const parsed = valueZodSchema.parse(a.value)
    expect(parsed.name).toBe('test')
  })
})