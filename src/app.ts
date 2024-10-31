import { Person } from './Person'

const pjson: Person = Person.fromJson('{ "name": "pp", "age" : null }')

console.log(pjson)
