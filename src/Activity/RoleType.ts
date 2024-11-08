import { z } from 'zod'

export const roleTypesSchema = z.enum(['user', 'bot', 'skill'])

export enum RoleType {
  User = 'user',
  Bot = 'bot',
  Skill = 'skill'
}
