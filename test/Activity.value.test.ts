import assert from 'assert'
import { describe, it } from 'node:test'
import { Activity } from '../src/Activity/Activity'
import z from 'zod'
import { activityTypeZodSchema } from '../src/Activity/ActivityType'

const ActivityType = activityTypeZodSchema.enum



describe('Activity with no data', () => {
  it('Value as object', () => {
    const a: Activity = new Activity(ActivityType.Message)
    a.value = { name: 'test' }
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.data, undefined)
    assert.deepEqual(a.value, { name: 'test' })
  })

  it('Value as object validate', () => {
    const a: Activity = new Activity(ActivityType.Message)
    a.value = { name: 'test' }
    assert.strictEqual(a.type, 'message')
    assert.strictEqual(a.type, ActivityType.Message)
    assert.strictEqual(a.data, undefined)
    assert.deepEqual(a.value, { name: 'test' })

    const valueZodSchema = z.object({
      name: z.string()
    })

    const parsed = valueZodSchema.parse(a.value)
    assert.strictEqual(parsed.name, 'test')

  })

})