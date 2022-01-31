export interface LogErrorRepository {
  logError: (stack: LogErrorRepository.Params) => Promise<LogErrorRepository.Result>
}

export namespace LogErrorRepository {
  export type Params = string
  export type Result = void
}
