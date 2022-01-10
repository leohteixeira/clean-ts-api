import { Account } from '../models'

export interface AddAccount {
  add: (account: AddAccount.Params) => AddAccount.Result
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }
  export type Result = Account.Model
}
