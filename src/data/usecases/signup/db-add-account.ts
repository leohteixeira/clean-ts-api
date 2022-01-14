import { AddAccount } from '../../../domain/usecases'
import { Encrypter } from '../../protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.encrypter.encrypt(account.password)
    return null
  }
}
