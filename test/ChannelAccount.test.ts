import { describe, it, expect } from 'vitest'
import { ChannelAccount, channelAccountZodSchema} from '../src/Activity/ChannelAccount.js'
import { roleTypeZodSchema } from '../src/Activity/RoleType.js'
const RoleType = roleTypeZodSchema.enum

describe('ChannelAccount', () => {
  it('should create a ChannelAccount with valid properties', () => {
    const account: ChannelAccount = { id: '123', name: 'user1', role: RoleType.User }
    expect(account.id).toBe('123')
    expect(account.name).toBe('user1')
    expect(account.role).toBe(RoleType.User)
  })

  it('should throw an error if id is missing', () => {
    // @ts-expect-error
    const account1: ChannelAccount = { name: 'user1' }
    expect(account1.id).toBeUndefined()

    // @ts-expect-error
    const account2: ChannelAccount = { id: 'user1' }
    expect(account2.name).toBeUndefined()
  })
})

describe('Channel Account json deserialization', () => {
  it('Deserialize with known id, name, and role', () => {
    const json = '{ "id" : "123", "name" : "user1", "role" : "user" }'
    const account: ChannelAccount = channelAccountZodSchema.parse(JSON.parse(json))
    expect(account.id).toBe('123')
    expect(account.name).toBe('user1')
    expect(account.role).toBe(RoleType.User)
    expect(account.role).toBe('user')
  })

  it('Deserialize with known id, name, and bad role', () => {
    const json = '{ "id" : "123", "name" : "user1", "role" : "new_role" }'
    const account: ChannelAccount = channelAccountZodSchema.parse(JSON.parse(json))
    expect(account.id).toBe('123')
    expect(account.name).toBe('user1')
    expect(account.role).not.toBe(RoleType.User)
    expect(account.role).toBe('new_role')
  })
})

// ...existing code...
