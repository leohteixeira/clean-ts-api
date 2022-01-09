import { EmailValidator } from '../../../src/presentation/protocols/email-validator'

export class EmailValidatorSpy implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}
