import { HashComparer, LoadAccountByEmailRepository, Encrypter, UpdateAccessTokenRepository } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasheComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (params: Authentication.Params): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)
    if (account) {
      const isValid = await this.hasheComparer.compare({ value: params.password, hash: account.password })
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken({ id: account.id, token: accessToken })
        return accessToken
      }
    }
    return null
  }
}
