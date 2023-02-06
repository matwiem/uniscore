import { Game } from '@src/games/repository'

export interface Parser {
    parse: (data: unknown) => Game
}
