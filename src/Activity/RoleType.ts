import { z } from 'zod'

export const roleTypeZodSchema = z.enum(['user', 'bot', 'skill'])

export type RoleType = z.infer<typeof roleTypeZodSchema>
