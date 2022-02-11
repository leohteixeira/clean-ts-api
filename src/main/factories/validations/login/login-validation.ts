import { EmailValidatorAdapter } from '@/main/adapters'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const emailValidator = new EmailValidatorAdapter()

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
