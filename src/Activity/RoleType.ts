import { z } from 'zod'

export enum RoleType {
  User = 'user',
  Bot = 'bot',
  Skill = 'skill'
}
export const roleTypeZodSchema = z.nativeEnum(RoleType)
