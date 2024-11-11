import { strict as assert } from 'assert'
import { describe, it } from 'node:test'
import { ChannelAccount, channelAccountZodSchema, RoleType } from '../src/Activity/ChannelAccount.js'

describe('ChannelAccount', () => {
  it('should create a ChannelAccount with valid properties', () => {
    const account: ChannelAccount = { id: '123', name: 'user1', role: RoleType.User }
    assert.equal(account.id, '123')
    assert.equal(account.name, 'user1')
    assert.strictEqual(account.role, RoleType.User)
    assert.strictEqual(account.role, 'user')
  })

  it('should create a ChannelAccount with new properties', () => {
    const account: ChannelAccount = {
      id: '123',
      name: 'user1',
      role: RoleType.User,
      aadObjectId: 'aad123',
      properties: { key: 'value' },
      givenName: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com'
    }
    assert.equal(account.id, '123')
    assert.equal(account.name, 'user1')
    assert.strictEqual(account.role, RoleType.User)
    assert.strictEqual(account.role, 'user')
    assert.equal(account.aadObjectId, 'aad123')
    assert.deepEqual(account.properties, { key: 'value' })
    assert.equal(account.givenName, 'John')
    assert.equal(account.surname, 'Doe')
    assert.equal(account.email, 'john.doe@example.com')
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

describe('Channel Account json deserialization', () => {
  it('Deserialize with known id, name, and role', () => {
    const json = '{ "id" : "123", "name" : "user1", "role" : "user" }'
    const account: ChannelAccount = channelAccountZodSchema.parse(JSON.parse(json))
    assert.equal(account.id, '123')
    assert.equal(account.name, 'user1')
    assert.strictEqual(account.role, RoleType.User)
    assert.strictEqual(account.role, 'user')
  })

  it('Deserialize with known id, name, and bad role', () => {
    const json = '{ "id" : "123", "name" : "user1", "role" : "new_role" }'
    const account: ChannelAccount = channelAccountZodSchema.parse(JSON.parse(json))
    assert.equal(account.id, '123')
    assert.equal(account.name, 'user1')
    assert.notEqual(account.role, RoleType.User)
    assert.strictEqual(account.role, 'new_role')
  })

  it('Deserialize with new properties', () => {
    const json = '{ "id" : "123", "name" : "user1", "role" : "user", "aadObjectId" : "aad123", "properties" : { "key" : "value" }, "givenName" : "John", "surname" : "Doe", "email" : "john.doe@example.com" }'
    const account: ChannelAccount = channelAccountZodSchema.parse(JSON.parse(json))
    assert.equal(account.id, '123')
    assert.equal(account.name, 'user1')
    assert.strictEqual(account.role, RoleType.User)
    assert.strictEqual(account.role, 'user')
    assert.equal(account.aadObjectId, 'aad123')
    assert.deepEqual(account.properties, { key: 'value' })
    assert.equal(account.givenName, 'John')
    assert.equal(account.surname, 'Doe')
    assert.equal(account.email, 'john.doe@example.com')
  })
})
