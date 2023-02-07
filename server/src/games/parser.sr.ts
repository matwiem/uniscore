import { Parser } from '@src/games/parser'
import { Game, Player, Team } from '@src/games/repository'
import { InvalidDTOFormat } from '@src/games/errors'

interface RushingPlayerSR {
    id: string
    attempts: number
    touchdowns: number
    yards: number
}

type RushingTotalsSR = Omit<RushingPlayerSR, 'id'>

interface ReceivingPlayerSR {
    id: string
    receptions: number
    yards: number
}

type ReceivingTotalsSR = Omit<ReceivingPlayerSR, 'id'>

interface TeamSR {
    id: string
    rushing: {
        totals: RushingTotalsSR
        players: RushingPlayerSR[]
    }
    receiving: {
        totals: ReceivingTotalsSR
        players: ReceivingPlayerSR[]
    }
}

interface GameSrDto {
    sourceId: "sr"
    game: {
        id: string
        attendance: number
    }
    statistics: {
        home: TeamSR
        away: TeamSR
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const isGameSrDto = (gameDto: any): gameDto is GameSrDto => (gameDto && gameDto.sourceId && gameDto.sourceId === "sr")

export class ParserSR implements Parser {
    parse (data: unknown): Game {
        if (isGameSrDto(data)) {
            return this.parseGameSrDto(data)
        }
        throw new InvalidDTOFormat(`expected 'sr' data format`)
    }

    private parseGameSrDto = (gameDto: GameSrDto): Game => {
        const home = this.parseTeamSr(gameDto.statistics.home)
        const away = this.parseTeamSr(gameDto.statistics.away)
        return new Game(
            gameDto.game.id,
            gameDto.sourceId,
            {
                attendance: gameDto.game.attendance,
            },
            home,
            away,
        )
    }

    private parseTeamSr = (team: TeamSR): Team => {
        const { attempts, touchdowns, yards } = team.rushing.totals
        const { receptions, yards: yardsRec} = team.receiving.totals
        return new Team(
            team.id,
            {
                rushAttempts: attempts,
                rushTds: touchdowns,
                rushYdsGained: yards,
                recYards: receptions,
                rec: yardsRec,
            },
            this.parsePlayersSr(team),
        )
    }

    private parsePlayersSr = (team: TeamSR): {[key: string]: Player} => {
        const playersMap: {[key: string]: Player} = {}
        team.rushing.players.forEach(p => {
            if (playersMap[p.id]) {
                playersMap[p.id].statistics.rushAttempts = p.attempts
                playersMap[p.id].statistics.rushTds = p.touchdowns
                playersMap[p.id].statistics.rushYdsGained = p.yards
            } else {
                playersMap[p.id] = new Player(
                    p.id,
                    {
                        rushAttempts: p.attempts,
                        rushTds: p.touchdowns,
                        rushYdsGained: p.yards,
                        recYards: null,
                        rec: null,
                    })
            }
        })
        team.receiving.players.forEach(p => {
            if (playersMap[p.id]) {
                playersMap[p.id].statistics.rec = p.receptions
                playersMap[p.id].statistics.recYards = p.yards
            } else {
                playersMap[p.id] = new Player(
                    p.id,
                    {
                        rec: p.receptions,
                        recYards: p.yards,
                        rushYdsGained: null,
                        rushTds: null,
                        rushAttempts: null,
                    })
            }
        })
        return playersMap
    }
}
