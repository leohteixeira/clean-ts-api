import { AddAccount } from '@/domain/usecases'
import { EmailValidator } from '@/validation/protocols'
import { mockAccountModel } from '@/tests/domain/mocks'
export class EmailValidatorSpy implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: AddAccount.Result = mockAccountModel()

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}
