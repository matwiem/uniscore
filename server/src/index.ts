import "./pre-start" // Must be the first import
import logger from "jet-logger"

import {makeApp} from "./app"
import {EnvVars} from "@src/config"
import { GamesServiceDemo } from '@src/games/service/service'
import { GamesRepositoryMemory } from '@src/games/repository/repository'
import {
    DiscrepanciesRepositoryMemory
} from '@src/discrepancies/repository/repository'
import { DiscrepanciesServiceDemo } from '@src/discrepancies/service/service'
import { ParserSR } from '@src/games/parser/parser.sr'
import { ParserExternal } from '@src/games/parser/parser.external'
import { ComparerDemo } from '@src/games/comparer/comparer'
import { makeHandler } from '@src/discrepancies/handler'
import { makeMux } from '@src/discrepancies/mux'

const startDemoServer = async () => {
    if (EnvVars.SourceFile === "") {
        throw new Error(`SOURCE_FILE cannot be empty.`)
    }

    if (EnvVars.TargetFile === "") {
        throw new Error(`TARGET_FILE cannot be empty.`)
    }

    const SERVER_START_MSG = ("Express server started on port: " +
        EnvVars.Port.toString())

    const repositorySr = new GamesRepositoryMemory()
    const repositoryExternal = new GamesRepositoryMemory()
    const discrepanciesRepository = new DiscrepanciesRepositoryMemory()

    const gamesService = new GamesServiceDemo(repositorySr, repositoryExternal, discrepanciesRepository)
    const discrepanciesService = new DiscrepanciesServiceDemo(discrepanciesRepository)

    const parserSr = new ParserSR()
    const parserExternal = new ParserExternal()

    await gamesService.loadSourceFromFile(EnvVars.SourceFile, parserSr)
    await gamesService.loadTargetFromFile(EnvVars.TargetFile, parserExternal)

    const comparer = new ComparerDemo()
    await gamesService.compareGames(comparer)

    const discrepanciesHandler = makeHandler(discrepanciesService)
    const discrepancyMux = makeMux(discrepanciesHandler)
    const app = makeApp(discrepancyMux)

    app.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG))
}

void startDemoServer()
