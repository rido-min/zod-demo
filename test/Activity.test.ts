import { describe, it } from 'node:test'
import { strictEqual } from 'assert'
import { Activity } from '../src/Activity'

describe('Activity type', () => {
    it('use ctor assigns type', () => {
        const a = new Activity()
        strictEqual(a.type, null)
    } )
})