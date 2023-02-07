import { GamesRepositoryMemory } from '../repository/repository'
import { GamesServiceDemo } from './service'
import { ParserSR } from '../parser/parser.sr'
import { ParserExternal } from '../parser/parser.external'
import { gameDtoSr } from '../parser/parser.sr.mock'
import { gameDtoExternal } from '../parser/parser.external.mock'
import { ComparerDemo } from '../comparer/comparer'
import {
    DiscrepanciesRepositoryMemory
} from '../../discrepancies/repository/repository'

describe(`GamesServiceDemo`, () => {
    it(`should parse game DTOs and store them in a repository`, async () => {
        const repositorySr = new GamesRepositoryMemory()
        const repositoryExternal = new GamesRepositoryMemory()
        const discrepancyRepository = new DiscrepanciesRepositoryMemory()
        const gamesService = new GamesServiceDemo(repositorySr, repositoryExternal, discrepancyRepository)
        const parserSr = new ParserSR()
        const parserExternal = new ParserExternal()
        await gamesService.loadSourceFromCode(gameDtoSr, parserSr)
        await gamesService.loadTargetFromCode(gameDtoExternal, parserExternal)

        const gamesSr = await repositorySr.games()
        expect(gamesSr)
            .toHaveLength(1)
        expect(gamesSr)
            .toEqual(expect.arrayContaining([expect.objectContaining({id: gameDtoSr.game.id})]))

        const gamesExternal = await repositoryExternal.games()
        expect(gamesExternal)
            .toHaveLength(1)
        expect(gamesExternal)
            .toEqual(expect.arrayContaining([expect.objectContaining({id: gameDtoExternal.game.id})]))
    })

    it(`should find discrepancies between source and target games repositories and insert them into discrepancies repository`, async () => {
        const repositorySr = new GamesRepositoryMemory()
        const repositoryExternal = new GamesRepositoryMemory()
        const discrepanciesRepository = new DiscrepanciesRepositoryMemory()
        const gamesService = new GamesServiceDemo(repositorySr, repositoryExternal, discrepanciesRepository)
        const parserSr = new ParserSR()
        const parserExternal = new ParserExternal()
        await gamesService.loadSourceFromCode(gameDtoSr, parserSr)
        await gamesService.loadTargetFromCode(gameDtoExternal, parserExternal)
        const comparer = new ComparerDemo()
        await gamesService.compareGames(comparer)
        const discrepancies = await discrepanciesRepository.discrepancies()
        expect(discrepancies)
            .toHaveLength(15)
        expect(discrepancies)
            .toMatchSnapshot()
    })
})
