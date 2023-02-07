export class InvalidDTOFormat extends Error {
    constructor (message: string) {
        super(`Invalid DTO Format: ${message}`)
    }
}

export class GameExistsError extends Error {
    constructor (gameId: string) {
        super(`Game Exists Error: entry for game with id=${gameId} already exists`)
    }
}
