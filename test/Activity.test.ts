import assert from 'assert'
import { describe, it } from 'node:test'
import { ZodError } from 'zod'
import { Activity, ActivityType, IActivity } from '../src/Activity/Activity'

describe('Activity type instances', () => {
    it('use ctor with type enum', () => {
        const a: IActivity = new Activity(ActivityType.message)
        assert.strictEqual(a.type, 'message')
        assert.strictEqual(a.type, ActivityType.message)
    })

    it('use ctor with type string', () => {
        const a: IActivity = new Activity('mycustomtype')
        assert.strictEqual(a.type, 'mycustomtype')
        assert.notStrictEqual(a.type, ActivityType.message)
    })

    it('literal with type message and text', () => {
        const a: IActivity = { type: ActivityType.message, text : 'my text' }
        assert.strictEqual(a.type, 'message')
        assert.strictEqual(a.type, ActivityType.message)
        assert.strictEqual(a.text, 'my text')
    })


    it('literal with type message and no text', () => {
        const a: IActivity = { type: ActivityType.message }
        assert.strictEqual(a.type, 'message')
        assert.strictEqual(a.type, ActivityType.message)
        assert.strictEqual(a.text, undefined)
    })

    it('literal with type message and no text and extra field', () => {
        const a: IActivity = { type: ActivityType.message, myProp: 3 }
        assert.strictEqual(a.type, 'message')
        assert.strictEqual(a.type, ActivityType.message)
        assert.strictEqual(a.text, undefined)
        assert.strictEqual(a.myProp, 3)
    })

    it('literal with type as bool fails and no text and extra field', () => {
        // @ts-ignore
        const a: IActivity = { type: false, myProp: 3 }
        assert.strictEqual(a.type, false)
        assert.strictEqual(a.myProp, 3)
    })

})

describe('Activity json deserialization', () => {
    it('Deserialize with known type and text', () => {
        const json = '{ "type" : "message", "text" : "my Text" }'
        const a1 : IActivity = Activity.fromJson(json)
        assert.strictEqual(a1.type, 'message')
        assert.strictEqual(a1.type, ActivityType.message)
        assert.strictEqual(a1.text, 'my Text')
        assert.strictEqual(a1.xx, undefined)
    })

    it('Deserialize with unknown type and text', () => {
        const json = '{ "type" : "myType", "text" : "my Text" }'
        const a1 : IActivity = Activity.fromJson(json)
        assert.strictEqual(a1.type, 'myType')
        assert.strictEqual(a1.text, 'my Text')
        assert.strictEqual(a1.xx, undefined)
    })

    it('Deserialize with type bool throws', () => {
        const json = '{ "type" : false, "text" : "my Text" }'
        assert.throws(() => {
            const a1 : IActivity = Activity.fromJson(json)
        }, ZodError)
    })
})


describe('Activity object deserialization', () => {
    it('Deserialize with known type and text', () => {
        const obj = { type : "message", text : "my Text" }
        const a1 : IActivity = Activity.fromObject(obj)
        assert.strictEqual(a1.type, 'message')
        assert.strictEqual(a1.type, ActivityType.message)
        assert.strictEqual(a1.text, 'my Text')
        assert.strictEqual(a1.xx, undefined)
    })

    it('Deserialize with unknown type and text', () => {
        const obj = { type : "myType", text : "my Text" }
        const a1 : IActivity = Activity.fromObject(obj)
        assert.strictEqual(a1.type, 'myType')
        assert.strictEqual(a1.text, 'my Text')
        assert.strictEqual(a1.xx, undefined)
    })

    it('Deserialize with type bool throws', () => {
        const obj = { type : false, "text" : "my Text" }
        assert.throws(() => {
            const a1 : IActivity = Activity.fromObject(obj)
        }, ZodError)
    })
})
