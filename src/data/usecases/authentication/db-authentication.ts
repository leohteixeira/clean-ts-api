import { HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hasheComparer: HashComparer

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hasheComparer: HashComparer) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hasheComparer = hasheComparer
  }

  async auth (params: Authentication.Params): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (account) {
      await this.hasheComparer.compare({ value: params.password, hash: account.password })
    }
    return null
  }
}
