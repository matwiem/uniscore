import jsonfile from 'jsonfile'

import { GamesRepository } from '@src/games/repository'
import { Parser } from '@src/games/parser'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GamesService {}

export class GamesServiceDemo implements GamesService {
    private sourceGamesRepository: GamesRepository
    private targetGamesRepository: GamesRepository

    constructor (sourceGamesRepository: GamesRepository, targetGamesRepository: GamesRepository) {
        this.sourceGamesRepository = sourceGamesRepository
        this.targetGamesRepository = targetGamesRepository
    }

    loadSourceFromFile = async (path: string, parser: Parser) => {
        await this.loadGamesFromFile(path, this.sourceGamesRepository, parser)
    }

    loadTargetFromFile = async (path: string, parser: Parser) => {
        await this.loadGamesFromFile(path, this.targetGamesRepository, parser)
    }

    loadSourceFromCode = async (data: unknown, parser: Parser) => {
        await this.loadGamesFromCode(data, this.sourceGamesRepository, parser)
    }

    loadTargetFromCode = async (data: unknown, parser: Parser) => {
        await this.loadGamesFromCode(data, this.targetGamesRepository, parser)
    }

    private loadGamesFromFile = async (path: string, repository: GamesRepository, parser: Parser): Promise<void> => {
        const data: unknown = await jsonfile.readFile(path)
        await this.loadGamesFromCode(data, repository, parser)
    }

    private loadGamesFromCode = async (data: unknown, repository: GamesRepository, parser: Parser): Promise<void> => {
        if (Array.isArray(data)) {
            await repository.insertMany(data.map(parser.parse))
        } else {
            await repository.insert(parser.parse(data))
        }
    }
}
