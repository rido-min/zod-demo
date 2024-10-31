import { iPersonSchema } from './schemas/Person'

/**
 * @schema
 */
export interface IPerson {
  name: string
  age?: number | null
}

export class Person implements IPerson {
  name: string
  age?: number | null
  public static fromJson (json: string): IPerson {
    return iPersonSchema.parse(JSON.parse(json))
  }
}
