import { Encrypter, HashComparer } from '@/data/protocols'

export class EncrypterSpy implements Encrypter {
  params: Encrypter.Params
  result: Encrypter.Result = 'hashed_password'

  async encrypt (params: Encrypter.Params): Promise<Encrypter.Result> {
    this.params = params
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  params: HashComparer.Params
  result: HashComparer.Result = true

  async compare (params: HashComparer.Params): Promise<HashComparer.Result> {
    this.params = params
    return this.result
  }
}
