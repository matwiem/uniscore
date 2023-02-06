import morgan from "morgan"
import express from "express"

import "express-async-errors"

import {EnvVars, NodeEnvs} from "@src/config"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
    app.use(morgan("dev"))
}

app.get("/hello", (_req, res) => {
    res.json({greeting: "welcome"})
})