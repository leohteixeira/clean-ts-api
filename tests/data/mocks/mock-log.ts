import { LogErrorRepository } from '../protocols'

export class LogErrorRepositorySpy implements LogErrorRepository {
  params: LogErrorRepository.Params
  result: LogErrorRepository.Result

  async logError (stack: string): Promise<void> {
    this.params = stack
    return this.result
  }
}
