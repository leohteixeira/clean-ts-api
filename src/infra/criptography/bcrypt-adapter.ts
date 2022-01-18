import { Encrypter } from '../../data/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (params: string): Promise<string> {
    await bcrypt.hash(params, this.salt)
    return null
  }
}
