import { Response } from 'supertest'
import { createMockApp } from './app.mock'
import {
  mockDiscrepancies,
  mockDiscrepancyGame, mockDiscrepancyPlayer, mockDiscrepancyTeam,
} from './discrepancies/repository/repository.mock'
import { GamesRepositoryMemory } from './games/repository/repository'
import {
    DiscrepanciesRepositoryMemory
} from './discrepancies/repository/repository'
import { GamesServiceDemo } from './games/service/service'
import { ParserSR } from './games/parser/parser.sr'
import { ParserExternal } from './games/parser/parser.external'
import { gameDtoSr } from './games/parser/parser.sr.mock'
import { gameDtoExternal } from './games/parser/parser.external.mock'
import { ComparerDemo } from './games/comparer/comparer'
import { DiscrepanciesServiceDemo } from './discrepancies/service/service'
import { makeHandler } from './discrepancies/handler'
import { makeMux } from './discrepancies/mux'
import { makeApp } from './app'

const request = require("supertest")

describe('GET /discrepancies', () => {
  it('GET /discrepancies should respond with status 200 OK', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies')
      .expect(200)
  })

  it('GET /discrepancies should respond with an array of all discrepancies', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies')
      .then((res: Response) => {
        expect(res.body)
          .toHaveLength(mockDiscrepancies.length)
        expect(res.body)
          .toEqual(mockDiscrepancies)
      })
  })

  it('GET /discrepancies?subjectType=GAME should respond with an array of all discrepancies of type GAME', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectType=GAME')
      .then((res: Response) => {
        expect(res.body)
          .toHaveLength(1)
        expect(res.body)
          .toEqual([mockDiscrepancyGame])
      })
  })

  it('GET /discrepancies?subjectType=TEAM should respond with an array of all discrepancies of type TEAM', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectType=TEAM')
      .then((res: Response) => {
        expect(res.body)
          .toHaveLength(1)
        expect(res.body)
          .toEqual([mockDiscrepancyTeam])
      })
  })

  it('GET /discrepancies?subjectType=PLAYER should respond with an array of all discrepancies of type PLAYER', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectType=PLAYER')
      .then((res: Response) => {
        expect(res.body)
          .toHaveLength(1)
        expect(res.body)
          .toEqual([mockDiscrepancyPlayer])
      })
  })

  it('GET /discrepancies?subjectType=INVALID should respond with 400 BAD_REQUEST', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectType=INVALID')
      .expect(400)
  })

  it('GET /discrepancies?subjectType=INVALID should respond with an error object', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectType=INVALID')
      .expect('Content-Type', /json/)
      .then((res: Response) => {
        expect(res.body)
          .toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
              expect.objectContaining({
                param: 'subjectType',
                value: 'INVALID'
              })
            ])
          }))
      })
  })

  it('GET /discrepancies?subjectId=game1 should respond with an array of all discrepancies for subject with id=game1', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectId=game1')
      .then((res: Response) => {
        expect(res.body)
          .toHaveLength(1)
        expect(res.body)
          .toEqual([mockDiscrepancyGame])
      })
  })

  it('GET /discrepancies?subjectId=nosuchsubject should respond with an empty array', async () => {
    const app = await createMockApp()
    return request(app)
      .get('/discrepancies?subjectId=nosuchsubject')
      .expect('Content-Type', /json/)
      .then((res: Response) => {
        expect(res.body)
          .toEqual([])
      })
  })
})

describe(`Server`, () => {
    it(`should work e2e`, async () => {
        const repositorySr = new GamesRepositoryMemory()
        const repositoryExternal = new GamesRepositoryMemory()
        const discrepanciesRepository = new DiscrepanciesRepositoryMemory()

        const gamesService = new GamesServiceDemo(repositorySr, repositoryExternal, discrepanciesRepository)
        const discrepanciesService = new DiscrepanciesServiceDemo(discrepanciesRepository)

        const parserSr = new ParserSR()
        const parserExternal = new ParserExternal()

        await gamesService.loadSourceFromCode(gameDtoSr, parserSr)
        await gamesService.loadTargetFromCode(gameDtoExternal, parserExternal)

        const comparer = new ComparerDemo()
        await gamesService.compareGames(comparer)

        const discrepanciesHandler = makeHandler(discrepanciesService)
        const discrepancyMux = makeMux(discrepanciesHandler)
        const app = makeApp(discrepancyMux)

        return request(app)
            .get('/discrepancies')
            .expect('Content-Type', /json/)
            .then((res: Response) => {
                expect(res.body)
                    .toHaveLength(15)
            })
    })
})
