import { Encrypter } from '../../../src/data/protocols'

export class EncrypterSpy implements Encrypter {
  params: Encrypter.Params
  result: Encrypter.Result = 'hashed_password'

  async encrypt (params: Encrypter.Params): Promise<Encrypter.Result> {
    this.params = params
    return this.result
  }
}
