import { describe, it } from 'node:test'
import { strictEqual } from 'assert'
import { Activity, ActivityType, IActivity } from '../src/Activity/Activity'

describe('Activity type instances', () => {
    it('use ctor with type enum', () => {
        const a: IActivity = new Activity(ActivityType.message)
        strictEqual(a.type, 'message')
    })

    it('use ctor with type string', () => {
        const a: IActivity = new Activity('mycustomtype')
        strictEqual(a.type, 'mycustomtype')
    })

    it('literal with type message and text', () => {
        const a: IActivity = { type: ActivityType.message, text : 'my text' }
        strictEqual(a.type, 'message')
        strictEqual(a.type, ActivityType.message)
        strictEqual(a.text, 'my text')
    })


    it('literal with type message and no text', () => {
        const a: IActivity = { type: ActivityType.message }
        strictEqual(a.type, 'message')
        strictEqual(a.type, ActivityType.message)
        strictEqual(a.text, undefined)
    })

    it('literal with type message and no text and extra field', () => {
        const a: IActivity = { type: ActivityType.message, myProp: 3 }
        strictEqual(a.type, 'message')
        strictEqual(a.type, ActivityType.message)
        strictEqual(a.text, undefined)
        strictEqual(a.myProp, 3)
    })

})

describe('Activity deserialization', () => {
    it('Deserialize with known type and text', () => {
        const json = '{ "type" : "message", "text" : "my Text" }'
        const a1 : IActivity = Activity.fromJson(json)
        strictEqual(a1.type, 'message')
        strictEqual(a1.type, ActivityType.message)
        strictEqual(a1.text, 'my Text')
        strictEqual(a1.xx, undefined)
    })
    it('Deserialize with unknown type and text', () => {
        const json = '{ "type" : "myType", "text" : "my Text" }'
        const a1 : IActivity = Activity.fromJson(json)
        strictEqual(a1.type, 'myType')
        strictEqual(a1.text, 'my Text')
        strictEqual(a1.xx, undefined)
    })
})

describe('Activity deserialization with schemas', () => {
    it('Deserialize with known type and text', () => {
        const json = '{ "type" : "message", "text" : "my Text" }'
        const a1 : IActivity = Activity.fromJson(json)
        strictEqual(a1.type, 'message')
        strictEqual(a1.type, ActivityType.message)
        strictEqual(a1.text, 'my Text')
        strictEqual(a1.xx, undefined)
    })
    it('Deserialize with unknown type and text', () => {
        const json = '{ "type" : "myType", "text" : "my Text" }'
        const a1 : IActivity = Activity.fromJson(json)
        strictEqual(a1.type, 'myType')
        strictEqual(a1.text, 'my Text')
        strictEqual(a1.xx, undefined)
    })
})