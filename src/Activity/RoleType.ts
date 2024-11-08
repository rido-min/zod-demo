import { z } from 'zod'

export const roleTypeZodSchema = z.enum(['user', 'bot', 'skill'])

export enum RoleType {
  User = 'user',
  Bot = 'bot',
  Skill = 'skill'
}
