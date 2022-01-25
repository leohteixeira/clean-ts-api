import { Encrypter } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (params: string): Promise<string> {
    const hash = await bcrypt.hash(params, this.salt)
    return hash
  }
}
