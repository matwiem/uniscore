import { createMockRepositoryMemorySr, mockGameSr } from './repository.mock'

describe(`GameRepositoryMemory`, () => {
    it(`should insert a game`, async () => {
        const repository = await createMockRepositoryMemorySr()
        const games = await repository.games()
        expect(games)
            .toHaveLength(1)
    })

    it(`should get a game by id`, async () => {
        const repository = await createMockRepositoryMemorySr()
        const game = await repository.game(mockGameSr.id)
        expect(game).toEqual(mockGameSr)
    })
})
