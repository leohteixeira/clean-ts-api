import { DbAddAccount } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/database/mongodb/repositories'
import { SignUpController } from '@/presentation/controllers'
import { EmailValidatorAdapter } from '@/utils'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
