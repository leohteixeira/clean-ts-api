import { Hasher, HashComparer, TokenGenerator } from '@/data/protocols'

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

export class TokenGeneratorSpy implements TokenGenerator {
  params: TokenGenerator.Params
  result: TokenGenerator.Result = 'any_token'

  async generate (id: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    this.params = id
    return this.result
  }
}
