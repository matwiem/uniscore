import {
    createMockRepositoryMemorySr,
    mockGameSr,
    mockGameSr2,
} from './repository.mock'
import { GamesRepositoryMemory } from './repository'
import { GameExistsError } from './errors'

describe(`GameRepositoryMemory`, () => {
    it(`should insert a game`, async () => {
        const repository = await createMockRepositoryMemorySr()
        const games = await repository.games()
        expect(games)
            .toHaveLength(1)
    })

    it(`should throw GameExistsError when inserting same game 2 times`, async () => {
        try {
            const repository = new GamesRepositoryMemory()
            await repository.insert(mockGameSr)
            await repository.insert(mockGameSr)
            fail(`should throw an error`)
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(GameExistsError)
        }
    })

    it(`should insertMany games`, async () => {
        const gamesToInsert = [mockGameSr, mockGameSr2]
        const repository = new GamesRepositoryMemory()
        await repository.insertMany(gamesToInsert)
        const games = await repository.games()
        expect(games)
            .toHaveLength(gamesToInsert.length)
        expect(games)
            .toEqual(gamesToInsert)
    })

    it(`should get a game by id`, async () => {
        const repository = await createMockRepositoryMemorySr()
        const game = await repository.game(mockGameSr.id)
        expect(game).toEqual(mockGameSr)
    })
})
