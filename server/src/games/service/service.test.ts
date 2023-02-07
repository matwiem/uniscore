import { GamesRepositoryMemory } from '../repository/repository'
import { GamesServiceDemo } from './service'
import { ParserSR } from '../parser/parser.sr'
import { ParserExternal } from '../parser/parser.external'
import { gameDtoSr } from '../parser/parser.sr.mock'
import { gameDtoExternal } from '../parser/parser.external.mock'

describe(`GamesServiceDemo`, () => {
    it(`should parse game DTOs and store them in a repository`, async () => {
        const repositorySr = new GamesRepositoryMemory()
        const repositoryExternal = new GamesRepositoryMemory()
        const gamesService = new GamesServiceDemo(repositorySr, repositoryExternal)
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
})
