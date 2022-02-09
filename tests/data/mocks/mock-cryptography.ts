import { Hasher, HashComparer, Encrypter } from '@/data/protocols'

export class HasherSpy implements Hasher {
  params: Hasher.Params
  result: Hasher.Result = 'hashed_password'

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
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

export class EncrypterSpy implements Encrypter {
  params: Encrypter.Params
  result: Encrypter.Result = 'any_token'

  async encrypt (value: Encrypter.Params): Promise<Encrypter.Result> {
    this.params = value
    return this.result
  }
}
