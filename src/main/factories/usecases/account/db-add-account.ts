import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/database/mongodb/repositories'
import { BcryptAdapter } from '@/infra/criptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
