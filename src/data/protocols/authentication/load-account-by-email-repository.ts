import { Account } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  load: (email: LoadAccountByEmailRepository.Params) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Params = string
  export type Result = Account.Model
}
