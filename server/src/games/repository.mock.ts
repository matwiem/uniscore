import {
    Game,
    GamesRepositoryMemory,
    Player,
    Team,
} from '@src/games/repository'

export const mockGameSr = new Game(
    'game1',
    'sr',
    {attendance: 100},
    new Team(
        'team1',
        {
            rec: 1,
            recYards: 2,
            rushAttempts: 3,
            rushTds: 4,
            rushYdsGained: 5
        },
        {
            'player1': new Player(
                'player1',
                {
                    rec: 10,
                    rushAttempts: 20,
                    rushYdsGained: 30,
                    recYards: 40,
                    rushTds: 50
                })
        }),
    new Team(
        'team2', {
            rec: 12,
            rushYdsGained: 34,
            rushTds: 534,
            rushAttempts: 87,
            recYards: 43,
        },
        {
            'player1': new Player(
                'player1',
                {
                    rec: 432,
                    rushTds: 43,
                    recYards: 2,
                    rushAttempts: 90,
                    rushYdsGained: 8
                }
            )
        })
)
export const mockGameExternal = new Game(
    'game1',
    'external',
    {attendance: 100},
    new Team(
        'team1',
        {
            rec: 1,
            recYards: 2,
            rushAttempts: 3,
            rushTds: 4,
            rushYdsGained: 5
        },
        {
            'player1': new Player(
                'player1',
                {
                    rec: 10,
                    rushAttempts: 20,
                    rushYdsGained: 30,
                    recYards: 40,
                    rushTds: 50
                })
        }),
    new Team(
        'team2', {
            rec: 12,
            rushYdsGained: 34,
            rushTds: 534,
            rushAttempts: 87,
            recYards: 43,
        },
        {
            'player1': new Player(
                'player1',
                {
                    rec: 432,
                    rushTds: 43,
                    recYards: 2,
                    rushAttempts: 90,
                    rushYdsGained: 8
                }
            )
        })
)

export const createMockRepositoryMemorySr = async () => {
    const repository = new GamesRepositoryMemory()
    await repository.insert(mockGameSr)
    return repository
}

export const createMockRepositoryMemoryExternal = async () => {
    const repository = new GamesRepositoryMemory()
    await repository.insert(mockGameExternal)
    return repository
}
