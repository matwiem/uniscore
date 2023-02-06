export class InvalidFilterError extends Error {
    constructor (parameter: string, receivedValue: string, expected: string) {
        super(`Invalid Filter Error: invalid value for parameter '${parameter} - received ${receivedValue}, expected ${expected}'`)
    }
}
