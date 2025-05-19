import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import { Activity, ActivityType, ChannelAccount, RoleType } from '../src/Activity/Activity'


describe('ActivityType enum validation', () => {
  Object.values(ActivityType).forEach( type  => {
    it(`should create an Activity with type ${type}`, () => {
      const a: Activity = new Activity(type)
      expect(a.type).toBe(type)
    })
  })

  it('should fail to create an Activity with type null', () => {
    expect(() => {
      const a: Activity = Activity.fromObject({ type:null})
    }).toThrow(ZodError)
  })

  it('should fail to create an Activity with type empty', () => {
    expect(() => {
      const a: Activity = Activity.fromObject({ type:''})
    }).toThrow(ZodError)
  })

  it('should fail to create an Activity with type undefined', () => {
    expect(() => {
      const a: Activity = Activity.fromObject({ })
    }).toThrow(ZodError)
  })
})

