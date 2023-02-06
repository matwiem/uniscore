export class InvalidDTOFormat extends Error {
    constructor (message: string) {
        super(`Invalid DTO Format: ${message}`)
    }
}
