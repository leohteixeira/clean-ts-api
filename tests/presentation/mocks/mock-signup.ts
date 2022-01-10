import { AddAccount } from '../../../src/domain/usecases'
import { EmailValidator } from '../../../src/presentation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

export class AddAccountSpy implements AddAccount {
  add (account: AddAccount.Params): AddAccount.Result {
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    return fakeAccount
  }
}
