import { DbAddAccount } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository, LogMongoRepository } from '@/infra/database/mongodb/repositories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/utils'
import { LogControllerDecorator } from '@/main/decorators'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
