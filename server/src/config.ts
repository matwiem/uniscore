/* eslint-disable node/no-process-env */
export const EnvVars = {
    NodeEnv: (process.env.NODE_ENV ?? ""),
    Port: (process.env.PORT ?? 0),
    SourceFile: (process.env.SOURCE_FILE ?? ""),
    TargetFile: (process.env.TARGET_FILE ?? "")
}

export const NodeEnvs = {
    Dev: "development",
    Test: "test",
    Prod: "production",
}
