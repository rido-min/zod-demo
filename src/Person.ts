import { iPersonSchema } from './Person._schema.js'

export interface address  {
  street: string
  number: number
}

export interface IPerson {
  name: string
  age?: number | null
  address?: address
  [x: string] : unknown
}

export class Person implements IPerson {
  name: string
  age?: number | null
  [x: string]: unknown
  constructor(name: string ) {
    this.name = name
  }
  public static fromJson (json: string): IPerson {
    return iPersonSchema.parse(JSON.parse(json))
  }
  public static fromLiteral(lit:object) : IPerson {
    return iPersonSchema.parse(lit)
  }
}

export interface IEmployee extends IPerson {
  salary: number
}

export class Employee extends Person implements IEmployee {
  salary: number
}