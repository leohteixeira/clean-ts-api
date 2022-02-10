import { HashComparer, Hasher } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    const hash = await bcrypt.hash(params, this.salt)
    return hash
  }

  async compare ({ value, hash }: HashComparer.Params): Promise<HashComparer.Result> {
    await bcrypt.compare(value, hash)
    return true
  }
}
