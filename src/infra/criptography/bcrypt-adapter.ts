import { Hasher } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (params: string): Promise<string> {
    const hash = await bcrypt.hash(params, this.salt)
    return hash
  }
}
