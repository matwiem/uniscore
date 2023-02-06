export interface GamesRepository {
    game: (id: string) => Promise<Game | null>
    games: () => Promise<Game[]>
    insert: (game: Game) => Promise<void>
}

export class Game {
    id: string
    statistics: GameStatistics
    home: Team
    away: Team

    constructor(id: string, statistics: GameStatistics, home: Team, away: Team) {
        this.id = id
        this.statistics = statistics
        this.home = home
        this.away = away
    }
}

export interface GameStatistics {
    attendance: number
}

export class Team {
    id: string
    statistics: TeamStatistics
    players: {[key: string]: Player}

    constructor(id: string, statistics: TeamStatistics, players: {[key: string]: Player}) {
        this.id = id
        this.statistics = statistics
        this.players = players
    }
}

export interface TeamStatistics {
    rushAttempts: number
    rushTds: number
    rushYdsGained: number
    rec: number
    recYards: number
}

export class Player {
    id: string
    statistics: PlayerStatistics

    constructor(id: string, statistics: PlayerStatistics) {
        this.id = id
        this.statistics = statistics
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
    gamesStore: {[key: string]: Game} = {}

    game (id: string): Promise<Game | null> {
        return Promise.resolve(this.gamesStore[id] || null)
    }

    games (): Promise<Game[]> {
        return Promise.resolve(Object.values(this.gamesStore))
    }

    insert (game: Game): Promise<void> {
        this.gamesStore[game.id] = game
        return Promise.resolve(undefined)
    }
}
