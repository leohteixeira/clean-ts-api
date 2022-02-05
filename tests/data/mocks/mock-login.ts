import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { mockAccountModel } from '@/tests/domain/mocks'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  params: LoadAccountByEmailRepository.Params
  result: LoadAccountByEmailRepository.Result = mockAccountModel()

  async load (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    this.params = email
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  params: UpdateAccessTokenRepository.Params

  async update (params: UpdateAccessTokenRepository.Params): Promise<UpdateAccessTokenRepository.Result> {
    this.params = params
  }
}
