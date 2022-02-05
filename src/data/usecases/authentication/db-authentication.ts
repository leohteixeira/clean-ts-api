import { HashComparer, LoadAccountByEmailRepository, TokenGenerator } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hasheComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hasheComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hasheComparer = hasheComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (params: Authentication.Params): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (account) {
      await this.hasheComparer.compare({ value: params.password, hash: account.password })
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
