import { z } from 'zod';

// 1. Class-like structures using Zod
// Similar to C# class with properties and validation
const PersonSchema = z.object({
    id: z.number(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    age: z.number().min(0).max(120),
    email: z.string().email(),
    isActive: z.boolean().default(true),
});

// Type inference from Zod schema (similar to C# type system)
type Person = z.infer<typeof PersonSchema>;

// 2. Inheritance-like pattern
// Similar to C# class inheritance
const EmployeeSchema = PersonSchema.extend({
    employeeId: z.string(),
    department: z.string(),
    salary: z.number().positive(),
});

type Employee = z.infer<typeof EmployeeSchema>;

// 3. Enums (similar to C# enums)
const UserRole = z.enum(['Admin', 'User', 'Guest']);
type UserRole = z.infer<typeof UserRole>;

// 4. Nullable types (similar to C# nullable types)
const OptionalPersonSchema = PersonSchema.partial();
type OptionalPerson = z.infer<typeof OptionalPersonSchema>;

// 5. Validation and error handling (similar to C# validation attributes)
function validatePerson(data: unknown): Person {
    try {
        return PersonSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            console.error('Validation errors:', error.errors);
        }
        throw error;
    }
}

// Example usage
const personData = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    isActive: true
};

// Validate and create a person
const person = validatePerson(personData);

// Example of using the Employee schema
const employeeData = {
    ...personData,
    employeeId: "EMP001",
    department: "IT",
    salary: 50000
};

const employee = EmployeeSchema.parse(employeeData);

// Example of using enums
const userRole = UserRole.parse("Admin");

// Example of using nullable types
const partialPerson: OptionalPerson = {
    firstName: "John",
    // Other fields are optional
}; 