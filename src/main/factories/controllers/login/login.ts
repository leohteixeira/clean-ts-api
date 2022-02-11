import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { env } from '@/main/config'
import { LogControllerDecorator } from '@/main/decorators'
import { makeLoginValidation } from '@/main/factories/validations'
import { DbAuthentication } from '@/data/usecases'
import { AccountMongoRepository, LogMongoRepository } from '@/infra/database/mongodb/repositories'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginValidation = makeLoginValidation()
  const loginController = new LoginController(dbAuthentication, loginValidation)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
