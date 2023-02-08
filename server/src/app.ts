import morgan from "morgan"
import express, { Router } from 'express'
import cors from 'cors'

import "express-async-errors"

import {EnvVars, NodeEnvs} from "@src/config"

export const makeApp = (discrepanciesMux: Router) => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    // Show routes called in console during development
    if (EnvVars.NodeEnv === NodeEnvs.Dev) {
        app.use(morgan("dev"))
    }

    app.use('/discrepancies', discrepanciesMux)

    return app
}
