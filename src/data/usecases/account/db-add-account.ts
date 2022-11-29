import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(params.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, params, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
