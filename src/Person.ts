import { iPersonSchema } from './Person._schema'

export interface IPerson {
  name: string
  age?: number | null
  [x: string] : unknown
}

export class Person implements IPerson {
  name: string
  age?: number | null
  [x: string]: unknown
  public static fromJson (json: string): IPerson {
    return iPersonSchema.parse(JSON.parse(json))
  }
}
