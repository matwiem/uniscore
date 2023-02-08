import {
    DiscrepanciesRepositoryMemory,
    Discrepancy,
} from '@src/discrepancies/repository/repository'

export const mockDiscrepancyGame: Discrepancy = {
    id: 'disc1',
    subjectId: 'game1',
    subjectType: 'GAME',
    eventMeta: {
        gameId: 'game1',
        homeTeamId: 'team1',
        awayTeamId: 'team2',
    },
    parentId: null,
    propertyChange: {
        sourceValue: 1,
        change: {
            op: 'replace',
            path: '/path/to/property',
            value: 100
        }
    }
}

export const mockDiscrepancyTeam: Discrepancy = {
    id: 'disc2',
    subjectId: 'team1',
    subjectType: 'TEAM',
    eventMeta: {
        gameId: 'game1',
        homeTeamId: 'team1',
        awayTeamId: 'team2',
    },
    parentId: 'game1',
    propertyChange: {
        sourceValue: 1,
        change: {
            op: 'replace',
            path: '/path/to/property',
            value: 100
        }
    }
}

export const mockDiscrepancyPlayer: Discrepancy = {
    id: 'disc3',
    subjectId: 'player1',
    subjectType: 'PLAYER',
    eventMeta: {
        gameId: 'game1',
        homeTeamId: 'team1',
        awayTeamId: 'team2',
    },
    parentId: 'team1',
    propertyChange: {
        sourceValue: 1,
        change: {
            op: 'replace',
            path: '/path/to/property',
            value: 100
        }
    }
}

export const mockDiscrepancies: Discrepancy[] = [
    mockDiscrepancyGame,
    mockDiscrepancyTeam,
    mockDiscrepancyPlayer
]

export const createMockRepositoryMemory = async () => {
    const repository = new DiscrepanciesRepositoryMemory()
    for (const discrepancy of mockDiscrepancies) {
        await repository.insert(discrepancy)
    }
    return repository
}
