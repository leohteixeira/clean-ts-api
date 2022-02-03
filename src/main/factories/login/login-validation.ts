import { EmailValidation, RequiredFieldValidation, Validation, ValidationComposite } from '@/presentation/helpers'
import { EmailValidatorAdapter } from '@/utils'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const emailValidator = new EmailValidatorAdapter()

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
