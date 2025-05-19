import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import { Activity, ChannelAccount } from '../src/Activity/Activity.js'

import { roleTypeZodSchema } from '../src/Activity/RoleType.js'
import { activityTypeZodSchema } from '../src/Activity/ActivityType.js'
import { channel } from 'diagnostics_channel'
const RoleType = roleTypeZodSchema.enum
const ActivityType = activityTypeZodSchema.enum

describe('Activity type instances', () => {
  it('use ctor with type enum', () => {
    const a: Activity = new Activity('message')
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.from).toBeUndefined()
    expect(a.id).toBeUndefined()
  })

  it('use ctor with type string', () => {
    const a: Activity = new Activity('mycustomtype')
    expect(a.type).toBe('mycustomtype')
    expect(a.type).not.toBe('message')
    expect(a.from).toBeUndefined()
  })

  it('ctor fails with type string empty', () => {
    expect(() => {
      const a: Activity = new Activity('')
    }).toThrow(Error)
  })

  it('ctor fails with type string null', () => {
    expect(() => {
      // @ts-expect-error
      const a: Activity = new Activity(null)
    }).toThrow(Error)
  })

  it('literal with type message and text and no channelId', () => {
    const a: Partial<Activity> = {
      type: 'message',
      text: 'my text',
      channelId: '123'
    }
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.text).toBe('my text')
    expect(a.channelId).toBe('123')
  })

  it('literal with type message and text and channelId', () => {
    const from: ChannelAccount = {
      id: '234',
      name: 'myName'
    }
    const a: Activity = Activity.fromObject({
      type: ActivityType.Message,
      id: '111',
      text: 'my text',
      channelId: '123',
      channelData: { myData: 'myData' },
      from
    })
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.id).toBe('111')
    expect(a.text).toBe('my text')
    expect(a.channelId).toBe('123')
    expect(a.from?.id).toBe('234')
    expect(a.from?.name).toBe('myName')
    expect(a.channelData).toEqual({ myData: 'myData' })
  })

  it('literal with type message and no text', () => {
    const a: Partial<Activity> = { type: 'message' }
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.text).toBeUndefined()
    expect(a.channelId).toBeUndefined()
  })

  it('literal with type message and no text and extra field', () => {
    const a: Partial<Activity> = { type: 'message', myProp: 3 }
    expect(a.type).toBe('message')
    expect(a.type).toBe('message')
    expect(a.text).toBeUndefined()
    expect(a.myProp).toBe(3)
  })

  it('literal with type as bool fails and no text and extra field', () => {
    // @ts-expect-error - Testing invalid type
    const a: Partial<Activity> = { type: false, myProp: 3 }
    expect(a.type).toBe(false)
    expect(a.myProp).toBe(3)
  })
})

describe('Activity json deserialization', () => {
  it('Deserialize with known type, text, and from', () => {
    const json = '{ "type" : "message", "id" : "1a", "text" : "my Text", "channelId" : "123", "from" : { "id" : "321", "name" : "yo" } }'
    const a1: Activity = Activity.fromJson(json)
    expect(a1.type).toBe('message')
    expect(a1.type).toBe('message')
    expect(a1.id).toBe('1a')
    expect(a1.text).toBe('my Text')
    expect(a1.channelId).toBe('123')
    expect(a1.xx).toBeUndefined()
    expect(a1.from?.id).toBe('321')
    expect(a1.from?.name).toBe('yo')
    expect(a1.from?.role).toBeUndefined()
  })

  it('Deserialize with known type, text, and from with role', () => {
    const json = '{ "type" : "message", "text" : "my Text", "channelId" : "123", "from" : { "id" : "321", "name" : "yo", "role" : "user" } }'
    const a1: Activity = Activity.fromJson(json)
    expect(a1.type).toBe('message')
    expect(a1.type).toBe('message')
    expect(a1.text).toBe('my Text')
    expect(a1.channelId).toBe('123')
    expect(a1.xx).toBeUndefined()
    expect(a1.from?.id).toBe('321')
    expect(a1.from?.name).toBe('yo')
    expect(a1.from?.role).toBe(RoleType.User)
    expect(a1.from?.role).toBe('user')
  })

  it('Deserialize with unknown type and text', () => {
    const json = '{ "type" : "myType", "text" : "my Text", "customField" : 33 }'
    const a1: Activity = Activity.fromJson(json)
    expect(a1.type).toBe('myType')
    expect(a1.text).toBe('my Text')
    expect(a1.xx).toBeUndefined()
    expect(a1.from).toBeUndefined()
    expect(a1.customField).toBe(33)
  })

  it('Deserialize with type bool throws', () => {
    const json = '{ "type" : false, "text" : "my Text" }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json)
    }).toThrow(ZodError)
  })

  it('Deserialize with type null throws', () => {
    const json = '{ "type" : null, "text" : "my Text" }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json)
    }).toThrow(ZodError)
  })

  it('Deserialize without type throws', () => {
    const json = '{ "text" : "my Text" }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json)
    }).toThrow(ZodError)
  })

  it('Deserialize with type empty throws', () => {
    const json = '{ "type" : "", "text" : "my Text" }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json)
    }).toThrow(ZodError)
  })


  it('Deserialize with id as object', () => {
    const json = '{ "type" : "message", "id" : {}, "text" : "my Text" }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json)
    }).toThrow(ZodError)
  })

  it('Deserialize with from.role as bool throws', () => {
    const json = '{ "type" : "message", "text" : "my Text", "from" : { "id" : "321", "name" : "yo", "role" : true } }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json)
    }).toThrow(ZodError)
  })

  it('Deserialize with channelId bool should throw', () => {
    const json1 = '{ "type" : "message", "text" : "my Text", "channelId" : true }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json1)
    }).toThrow(ZodError)
  })

  it('Deserialize with channelId null should throw', () => {
    const json1 = '{ "type" : "message", "text" : "my Text", "channelId" : null }'
    expect(() => {
      const a1: Activity = Activity.fromJson(json1)
    }).toThrow(ZodError)
  })
})

describe('Activity object deserialization', () => {
  it('Deserialize with known type and text', () => {
    const from: ChannelAccount = {
      id: '123',
      name: 'myChannel',
      role: RoleType.Bot
    }
    const obj: Partial<Activity> = {
      type: 'message',
      text: 'my Text',
      myField: 3,
      from
    }
    const a1: Activity = Activity.fromObject(obj)
    expect(a1.type).toBe('message')
    expect(a1.type).toBe('message')
    expect(a1.text).toBe('my Text')
    expect(a1.xx).toBeUndefined()
    expect(a1.myField).toBe(3)
    expect(a1.from?.id).toBe('123')
    expect(a1.from?.name).toBe('myChannel')
    expect(a1.from?.role).toBe('bot')
    expect(a1.from?.role).toBe(RoleType.Bot)
  })

  it('Deserialize with unknown type and text', () => {
    const obj = { type: 'myType', text: 'my Text' }
    const a1: Activity = Activity.fromObject(obj)
    expect(a1.type).toBe('myType')
    expect(a1.text).toBe('my Text')
    expect(a1.xx).toBeUndefined()
    expect(a1.from).toBeUndefined()
    expect(a1.from?.id).toBeUndefined()
  })

  it('Deserialize with known type 2 and text', () => {
    const obj = { type: ActivityType.CommandResult, text: 'my Text' }
    const a1: Activity = Activity.fromObject(obj)
    expect(a1.type).toBe('commandResult')
    expect(a1.type).toBe(ActivityType.CommandResult)
    expect(a1.text).toBe('my Text')
    expect(a1.xx).toBeUndefined()
    expect(a1.from).toBeUndefined()
    expect(a1.from?.id).toBeUndefined()
  })

  it('Deserialize without type  throws', () => {
    const obj = { text: 'my Text' }
    expect(() => {
      const a1: Activity = Activity.fromObject(obj)
    }).toThrow(ZodError)
  })

  it('Deserialize without type and text  throws', () => {
    const obj = { text: 'my Text' }
    expect(() => {
      const a1: Activity = Activity.fromObject(obj)
    }).toThrow(ZodError)
  })

  it('Deserialize with empty type and text throws', () => {
    const obj: Partial<Activity> = { type: '', text: 'my Text' }
    expect(() => {
      const a1: Activity = Activity.fromObject(obj)
    }).toThrow(ZodError)
  })

  it('Deserialize with number bool throws', () => {
    const obj = { type: 2, text: 'my Text' }
    expect(() => {
      const a1: Activity = Activity.fromObject(obj)
    }).toThrow(ZodError)
  })

  it('Deserialize with id bool throws', () => {
    const obj = { type: ActivityType.Command, id: true, text: 'my Text' }
    expect(() => {
      const a1: Activity = Activity.fromObject(obj)
    }).toThrow(ZodError)
  })
})
