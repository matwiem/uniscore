import { compare, getValueByPointer } from 'fast-json-patch'

import { Game, Player, Team } from '@src/games/repository'
import {
    Discrepancy,
    DiscrepancySubject, EventMeta,
    NodeID,
} from '@src/discrepancies/repository'
import { InvalidStateError } from '@src/games/errors'

export interface Comparer {
    compareGame: (game: Game) => void
    compareTeam: (team: Team) => void
    comparePlayer: (player: Player) => void
}

export interface Comparable {
    accept: (comparer: Comparer) => void
}

export class ComparerDemo implements Comparer {
    private sourceGame: Game | null = null
    private sourceTeam: Team | null = null
    private sourcePlayer: Player | null = null
    private discrepancies: Discrepancy[] = []

    getDiscrepancies(): Discrepancy[] {
        return this.discrepancies
    }

    setSourceGame(game: Game) {
        this.reset()
        this.sourceGame = game
    }

    compareGame(target: Game) {
        if (this.sourceGame === null) {
            throw new InvalidStateError("Cannot compare entities, sourceGame is null")
        }

        this.discrepancies = [...this.discrepancies, ...this.compare(
            this.sourceGame.id,
            "GAME",
            null,
            this.eventMeta(),
            {statistics: this.sourceGame.statistics},
            {statistics: target.statistics},
        )]

        this.sourceTeam = this.sourceGame.home
        target.home.accept(this)
        this.sourceTeam = this.sourceGame.away
        target.away.accept(this)
    }

    compareTeam(target: Team) {
        if (this.sourceGame === null) {
            throw new InvalidStateError("Cannot compare entities, sourceGame is null")
        }

        if (this.sourceTeam === null) {
            throw new InvalidStateError("Cannot compare entities, sourceTeam is null")
        }

        this.discrepancies = [...this.discrepancies, ...this.compare(
            this.sourceTeam.id,
            "TEAM",
            this.sourceGame.id,
            this.eventMeta(),
            {statistics: this.sourceTeam.statistics},
            {statistics: target.statistics},
        )]

        for (const player of Object.values(this.sourceTeam.players)) {
            this.sourcePlayer = player
            if (target.players[this.sourcePlayer.id]) {
                target.players[this.sourcePlayer.id].accept(this)
            }
        }
    }

    comparePlayer(target: Player) {
        if (this.sourceGame === null) {
            throw new InvalidStateError("Cannot compare entities, sourceGame is null")
        }

        if (this.sourceTeam === null) {
            throw new InvalidStateError("Cannot compare entities, sourceTeam is null")
        }

        if (this.sourcePlayer === null) {
            throw new InvalidStateError("Cannot compare entities, sourcePlayer is null")
        }

        this.discrepancies = [...this.discrepancies, ...this.compare(
            this.sourcePlayer.id,
            "PLAYER",
            this.sourceTeam.id,
            this.eventMeta(),
            {statistics: this.sourcePlayer.statistics},
            {statistics: target.statistics}
        )]
    }

    private compare(subjectId: NodeID, subjectType: DiscrepancySubject, parentId: NodeID | null, eventMeta: EventMeta, c1: ComparableProperties, c2: ComparableProperties): Discrepancy[] {
        const operations = compare(c1, c2)
        return operations.map(op => ({
            subjectId,
            subjectType,
            parentId,
            eventMeta,
            propertyChange: {
                sourceValue: getValueByPointer(c1, op.path) as unknown,
                change: op,
            },
        }))
    }

    private eventMeta(): EventMeta {
        if (this.sourceGame === null) {
            throw new InvalidStateError("Cannot compare entities, sourceGame is null")
        }
        return {
            gameId: this.sourceGame.id,
            homeTeamId: this.sourceGame.home.id,
            awayTeamId: this.sourceGame.away.id,
        }
    }

    private reset(): void {
        this.sourceGame = null
        this.sourceTeam = null
        this.sourceGame = null
        this.discrepancies = []
    }
}

type ComparableProperties =
    | Omit<Game, "id" | "sourceId" | "home" | "away" | "accept">
    | Omit<Team, "id" | "players" | "accept">
    | Omit<Player, "id" | "accept">
