import { AddAccount, Authentication } from '@/domain/usecases'
import { Account } from '@/domain/models'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): Account.Model => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

export const mockLoginParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
