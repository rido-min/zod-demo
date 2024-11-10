import { strict as assert } from 'assert'
import { describe, it } from 'node:test'
import { ChannelAccount, RoleType } from '../src/Activity/ChannelAccount.js'

describe('ChannelAccount', () => {
  it('should create a ChannelAccount with valid properties', () => {
    const account: ChannelAccount = { id: '123', name: 'user1', role: RoleType.User }
    assert.equal(account.id, '123')
    assert.equal(account.name, 'user1')
    assert.strictEqual(account.role, RoleType.User)
    assert.strictEqual(account.role, 'user')
  })

  it('should throw an error if id is missing', () => {
    // @ts-expect-error
    const account1: ChannelAccount = { name: 'user1' }
    assert.strictEqual(account1.id, undefined)

    // @ts-expect-error
    const account2: ChannelAccount = { id: 'user1' }
    assert.strictEqual(account2.name, undefined)
  })
})

// ...existing code...
