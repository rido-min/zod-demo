import { describe, it } from 'node:test'
import { strictEqual } from 'assert'
import { Activity, ActivityType } from '../src/Activity/Activity'

describe('Activity type', () => {
    it('use ctor with type enum', () => {
        const a = new Activity(ActivityType.message)
        strictEqual(a.type, 'message')
    })

    it('use ctor with type string', () => {
        const a = new Activity('mycustomtype')
        strictEqual(a.type, 'mycustomtype')
    })


})