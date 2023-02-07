import { Game } from '@src/games/repository/repository'

export interface Parser {
    parse: (data: unknown) => Game
}
