import { Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result: Authentication.Result = 'any_token'

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
