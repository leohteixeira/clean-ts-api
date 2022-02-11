import { HashComparer, Hasher } from '@/data/protocols'

import { compare, hash } from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    return await hash(params, this.salt)
  }

  async compare ({ value, hash }: HashComparer.Params): Promise<HashComparer.Result> {
    return await compare(value, hash)
  }
}
