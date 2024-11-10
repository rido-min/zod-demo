import assert from 'assert'
import { describe, it } from 'node:test'
import { ZodError } from 'zod'
import { Activity, ActivityType, ChannelAccount, RoleType } from '../src/Activity/Activity.js'

describe('Activity type instances', () => {
  it('use ctor with type enum', () => {
    const a: Activity = new Activity(ActivityType.Message)
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.from, undefined)
  })

  it('use ctor with type string', () => {
    const a: Activity = new Activity('mycustomtype')
    assert.strictEqual(a.type, 'mycustomtype')
    assert.notStrictEqual(a.type, ActivityType.Message)
  })

  it('ctor fails with type string empty', () => {
    assert.throws(() => {
      const a: Activity = new Activity('')
    }, Error)
  })

  it('ctor fails with type string null', () => {
    assert.throws(() => {
      // @ts-expect-error
      const a: Activity = new Activity(null)
    }, Error)
  })

  it('literal with type message and text and no channelId', () => {
    const a: Activity = {
      type: ActivityType.Message,
      text: 'my text',
      channelId: '123'
    }
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.text, 'my text')
    assert.strictEqual(a.channelId, '123')
  })

  it('literal with type message and text and channelId', () => {
    const from: ChannelAccount = {
      id: '234',
      name: 'myName'
    }
    const a: Activity = {
      type: ActivityType.Message,
      text: 'my text',
      channelId: '123',
      from
    }
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.text, 'my text')
    assert.strictEqual(a.channelId, '123')
    assert.strictEqual(a.from?.id, '234')
    assert.strictEqual(a.from?.name, 'myName')
  })

  it('literal with type message and no text', () => {
    const a: Activity = { type: ActivityType.Message }
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.text, undefined)
    assert.strictEqual(a.channelId, undefined)
  })

  it('literal with type message and no text and extra field', () => {
    const a: Activity = { type: ActivityType.Message, myProp: 3 }
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.text, undefined)
    assert.strictEqual(a.myProp, 3)
  })

  it('literal with type as bool fails and no text and extra field', () => {
    // @ts-expect-error
    const a: Activity = { type: false, myProp: 3 }
    assert.strictEqual(a.type, false)
    assert.strictEqual(a.myProp, 3)
  })
})

describe('Activity json deserialization', () => {
  it('Deserialize with known type, text, and from', () => {
    const json = '{ "type" : "message", "text" : "my Text", "channelId" : "123", "from" : { "id" : "321", "name" : "yo" } }'
    const a1: Activity = Activity.fromJson(json)
    assert.strictEqual(a1.type, 'message')
    assert.strictEqual(a1.type, ActivityType.Message)
    assert.strictEqual(a1.text, 'my Text')
    assert.strictEqual(a1.channelId, '123')
    assert.strictEqual(a1.xx, undefined)
    assert.strictEqual(a1.from?.id, '321')
    assert.strictEqual(a1.from?.name, 'yo')
    assert.strictEqual(a1.from.role, undefined)
  })

  it('Deserialize with known type, text, and from with role', () => {
    const json = '{ "type" : "message", "text" : "my Text", "channelId" : "123", "from" : { "id" : "321", "name" : "yo", "role" : "user" } }'
    const a1: Activity = Activity.fromJson(json)
    assert.strictEqual(a1.type, 'message')
    assert.strictEqual(a1.type, ActivityType.Message)
    assert.strictEqual(a1.text, 'my Text')
    assert.strictEqual(a1.channelId, '123')
    assert.strictEqual(a1.xx, undefined)
    assert.strictEqual(a1.from?.id, '321')
    assert.strictEqual(a1.from?.name, 'yo')
    assert.strictEqual(a1.from.role, RoleType.User)
    assert.strictEqual(a1.from.role, 'user')
  })

  it('Deserialize with unknown type and text', () => {
    const json = '{ "type" : "myType", "text" : "my Text", "customField" : 33 }'
    const a1: Activity = Activity.fromJson(json)
    assert.strictEqual(a1.type, 'myType')
    assert.strictEqual(a1.text, 'my Text')
    assert.strictEqual(a1.xx, undefined)
    assert.strictEqual(a1.from, undefined)
    assert.strictEqual(a1.customField, 33)
  })

  it('Deserialize with type bool throws', () => {
    const json = '{ "type" : false, "text" : "my Text" }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json)
    }, ZodError)
  })

  it('Deserialize with type null throws', () => {
    const json = '{ "type" : null, "text" : "my Text" }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json)
    }, ZodError)
  })

  it('Deserialize without type throws', () => {
    const json = '{ "text" : "my Text" }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json)
    }, ZodError)
  })

  it('Deserialize with type empty throws', () => {
    const json = '{ "type" : "", "text" : "my Text" }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json)
    }, ZodError)
  })

  it('Deserialize with from.role as bool throws', () => {
    const json = '{ "type" : "message", "text" : "my Text", "from" : { "id" : "321", "name" : "yo", "role" : true } }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json)
    }, ZodError)
  })

  it('Deserialize with channelId bool should throw', () => {
    const json1 = '{ "type" : "message", "text" : "my Text", "channelId" : true }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json1)
    }, ZodError)
  })

  it('Deserialize with channelId null should throw', () => {
    const json1 = '{ "type" : "message", "text" : "my Text", "channelId" : null }'
    assert.throws(() => {
      const a1: Activity = Activity.fromJson(json1)
    }, ZodError)
  })
})

describe('Activity object deserialization', () => {
  it('Deserialize with known type and text', () => {
    const from: ChannelAccount = {
      id: '123',
      name: 'myChannel',
      role: RoleType.Bot
    }
    const obj: Activity = {
      type: ActivityType.Message,
      text: 'my Text',
      myField: 3,
      from
    }
    const a1: Activity = Activity.fromObject(obj)
    assert.strictEqual(a1.type, 'message')
    assert.strictEqual(a1.type, ActivityType.Message)
    assert.strictEqual(a1.text, 'my Text')
    assert.strictEqual(a1.xx, undefined)
    assert.strictEqual(a1.myField, 3)
    assert.strictEqual(a1.from?.id, '123')
    assert.strictEqual(a1.from?.name, 'myChannel')
    assert.strictEqual(a1.from?.role, 'bot')
    assert.strictEqual(a1.from?.role, RoleType.Bot)
  })

  it('Deserialize with unknown type and text', () => {
    const obj = { type: 'myType', text: 'my Text' }
    const a1: Activity = Activity.fromObject(obj)
    assert.strictEqual(a1.type, 'myType')
    assert.strictEqual(a1.text, 'my Text')
    assert.strictEqual(a1.xx, undefined)
    assert.strictEqual(a1.from, undefined)
    // @ts-expect-error
    assert.strictEqual(a1.from?.id, undefined)
  })

  it('Deserialize with known type 2 and text', () => {
    const obj = { type: ActivityType.CommandResult, text: 'my Text' }
    const a1: Activity = Activity.fromObject(obj)
    assert.strictEqual(a1.type, 'commandResult')
    assert.strictEqual(a1.type, ActivityType.CommandResult)
    assert.strictEqual(a1.text, 'my Text')
    assert.strictEqual(a1.xx, undefined)
    assert.strictEqual(a1.from, undefined)
    // @ts-expect-error
    assert.strictEqual(a1.from?.id, undefined)
  })

  it('Deserialize without type  throws', () => {
    // @ts-expect-error
    const obj: Activity = { text: 'my Text' }
    assert.throws(() => {
      const a1: Activity = Activity.fromObject(obj)
    }, ZodError)
  })

  it('Deserialize without type  throws', () => {
    // @ts-expect-error
    const obj: Activity = { text: 'my Text' }
    assert.throws(() => {
      const a1: Activity = Activity.fromObject(obj)
    }, ZodError)
  })

  it('Deserialize with empty type  throws', () => {
    const obj: Activity = { type: '', text: 'my Text' }
    assert.throws(() => {
      const a1: Activity = Activity.fromObject(obj)
    }, ZodError)
  })

  it('Deserialize with number bool throws', () => {
    // @ts-expect-error
    const obj: Activity = { type: 2, text: 'my Text' }
    assert.throws(() => {
      const a1: Activity = Activity.fromObject(obj)
    }, ZodError)
  })
})
