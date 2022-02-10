import { HashComparer, Hasher } from '@/data/protocols'

import { compare, hash } from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    return await hash(params, this.salt)
  }

  async compare ({ value, hash }: HashComparer.Params): Promise<HashComparer.Result> {
    return await compare(value, hash)
  }
}
