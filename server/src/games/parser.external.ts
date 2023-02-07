import { Parser } from '@src/games/parser'
import { Game, Team, Player, PlayerStatistics } from '@src/games/repository'
import { InvalidDTOFormat } from '@src/games/errors'

interface RushingPlayerExternal {
    id: string
    rushAttempts: number
    rushTds: number
    rushYdsGained: number
}

interface ReceivingPlayerExternal {
    id: string
    rec: number
    receivingYards: number
}

type RushingReceivingPlayerExternal = RushingPlayerExternal & ReceivingPlayerExternal

type PlayerExternal =
    | RushingPlayerExternal
    | ReceivingPlayerExternal
    | RushingReceivingPlayerExternal

const isRushingPlayerExternal = (playerExternal: PlayerExternal): playerExternal is RushingPlayerExternal => {
    if ((playerExternal as RushingPlayerExternal).rushAttempts === undefined) {
        return false
    }
    if ((playerExternal as RushingPlayerExternal).rushTds === undefined) {
        return false
    }
    if ((playerExternal as RushingPlayerExternal).rushYdsGained === undefined) {
        return false
    }
    return true
}

const isReceivingPlayerExternal = (playerExternal: PlayerExternal): playerExternal is ReceivingPlayerExternal => {
    if((playerExternal as ReceivingPlayerExternal).rec === undefined) {
        return false
    }
    if((playerExternal as ReceivingPlayerExternal).receivingYards === undefined) {
        return false
    }
    return true
}

const isRushingReceivingPlayerExternal = (playerExternal: PlayerExternal): playerExternal is RushingReceivingPlayerExternal => {
    return !!(isRushingPlayerExternal(playerExternal) && isReceivingPlayerExternal(playerExternal))

}

type TeamTotalsExternal = Omit<RushingReceivingPlayerExternal, 'id'>

type TeamExternal = {
    id: string
    players: PlayerExternal[]
} & TeamTotalsExternal

interface GameExternalDto {
    sourceId: "external"
    game: {
        id: string
        attendance: number
        home: TeamExternal
        away: TeamExternal
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const isGameExternalDto = (gameDto: any): gameDto is GameExternalDto => (gameDto && gameDto.sourceId && gameDto.sourceId === "external")

export class ParserExternal implements Parser {
    parse (data: unknown): Game {
        if (isGameExternalDto(data)) {
            return this.parseGameExternalDto(data)
        }
        throw new InvalidDTOFormat(`expected 'external' data format`)
    }

    private parseGameExternalDto = (gameDto: GameExternalDto): Game => {
        const {id, home, away, attendance} = gameDto.game
        return new Game(
            id,
            gameDto.sourceId,
            {
                attendance,
            },
            this.parseTeamExternal(home),
            this.parseTeamExternal(away),
        )
    }

    private parseTeamExternal = (team: TeamExternal): Team => {
        const {id, rec, rushTds, rushAttempts, rushYdsGained, receivingYards, players} = team
        return new Team(
            id,
            {
                rec: rec,
                recYards: receivingYards,
                rushYdsGained: rushYdsGained,
                rushTds: rushTds,
                rushAttempts: rushAttempts,
            },
            this.parsePlayersExternal(players),
        )
    }

    private parsePlayersExternal = (players: PlayerExternal[]): {[key: string]: Player} => {
        const playersMap: {[key: string]: Player} = {}
        players.forEach(p => {
            let statistics: PlayerStatistics
            if (isRushingReceivingPlayerExternal(p)) {
                statistics = {
                    rec: p.rec,
                    recYards: p.receivingYards,
                    rushAttempts: p.rushAttempts,
                    rushTds: p.rushTds,
                    rushYdsGained: p.rushYdsGained,
                }
            } else if (isRushingPlayerExternal(p)) {
                statistics = {
                    rec: null,
                    recYards: null,
                    rushYdsGained: p.rushYdsGained,
                    rushTds: p.rushTds,
                    rushAttempts: p.rushAttempts,
                }
            } else if (isReceivingPlayerExternal(p)) {
                statistics = {
                    rec: p.rec,
                    recYards: p.receivingYards,
                    rushAttempts: null,
                    rushTds: null,
                    rushYdsGained: null,
                }
            } else {
                throw new InvalidDTOFormat(`unexpected data format for player`)
            }
            playersMap[p.id] = new Player(p.id, statistics)
        })
        return playersMap
    }
}
