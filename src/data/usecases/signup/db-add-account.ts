import { AddAccount } from '../../../domain/usecases'
import { AddAccountRepository, Encrypter } from '../../protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.encrypter.encrypt(params.password)
    const account = await this.addAccountRepository.add(Object.assign({}, params, { password: hashedPassword }))
    return account
  }
}
