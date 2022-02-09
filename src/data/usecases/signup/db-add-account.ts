import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, Hasher } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  private readonly Hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository

  constructor (Hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.Hasher = Hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.Hasher.hash(params.password)
    const account = await this.addAccountRepository.add(Object.assign({}, params, { password: hashedPassword }))
    return account
  }
}
