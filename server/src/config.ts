/* eslint-disable node/no-process-env */
export const EnvVars = {
    NodeEnv: (process.env.NODE_ENV ?? ""),
    Port: (process.env.PORT ?? 0),
}

export const NodeEnvs = {
    Dev: "development",
    Test: "test",
    Prod: "production",
}
