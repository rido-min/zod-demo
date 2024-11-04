import {  IPerson, Person } from './Person.js'

const age = 23
const streetNumber = 18

const addr  = {
    street: 'teseo', number: streetNumber
}

const rido : Person = {
    name : 'rido',
    age : 24,
    addr
}

const p = new Person('yo')

console.log(p)
console.log(Person.fromLiteral(rido))
console.log(JSON.stringify(rido))

const pjson: Person = Person.fromJson('{ "name": "pp", "age" : null, "notdeclared" : "aa" }')
console.log(pjson)
