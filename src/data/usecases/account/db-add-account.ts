import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email)
    const hashedPassword = await this.hasher.hash(params.password)
    const account = await this.addAccountRepository.add(Object.assign({}, params, { password: hashedPassword }))
    return account
  }
}
