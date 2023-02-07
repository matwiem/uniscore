import { GameExistsError } from '@src/games/errors'
import { Comparable, Comparer } from '@src/games/comparer/comparer'

export interface GamesRepository {
    game: (id: string) => Promise<Game | null>
    games: () => Promise<Game[]>
    insert: (game: Game) => Promise<void>
    insertMany: (games: Game[]) => Promise<void>
}

export class Game implements Comparable{
    id: string
    sourceId: string
    statistics: GameStatistics
    home: Team
    away: Team

    constructor(id: string, sourceId: string, statistics: GameStatistics, home: Team, away: Team) {
        this.id = id
        this.sourceId = sourceId
        this.statistics = statistics
        this.home = home
        this.away = away
    }

    accept (comparer: Comparer): void {
        comparer.compareGame(this)
    }
}

export interface GameStatistics {
    attendance: number
}

export class Team implements Comparable {
    id: string
    statistics: TeamStatistics
    players: {[key: string]: Player}

    constructor(id: string, statistics: TeamStatistics, players: {[key: string]: Player}) {
        this.id = id
        this.statistics = statistics
        this.players = players
    }

    accept (comparer: Comparer): void {
        comparer.compareTeam(this)
    }
}

export interface TeamStatistics {
    rushAttempts: number
    rushTds: number
    rushYdsGained: number
    rec: number
    recYards: number
}

export class Player implements Comparable {
    id: string
    statistics: PlayerStatistics

    constructor(id: string, statistics: PlayerStatistics) {
        this.id = id
        this.statistics = statistics
    }

    accept (comparer: Comparer): void {
        comparer.comparePlayer(this)
    }
}

export interface PlayerStatistics {
    rushAttempts: number | null
    rushTds: number | null
    rushYdsGained: number | null
    rec: number | null
    recYards: number | null
}

export class GamesRepositoryMemory implements GamesRepository {
    private gamesStore: {[key: string]: Game} = {}

    game (id: string): Promise<Game | null> {
        return Promise.resolve(this.gamesStore[id] || null)
    }

    games (): Promise<Game[]> {
        return Promise.resolve(Object.values(this.gamesStore))
    }

    insert (game: Game): Promise<void> {
        if (this.gamesStore[game.id]) {
            throw new GameExistsError(game.id)
        }
        this.gamesStore[game.id] = game
        return Promise.resolve(undefined)
    }

    async insertMany (games: Game[]): Promise<void> {
        for (const game of games) {
            await this.insert(game)
        }
        return Promise.resolve(undefined)
    }
}
