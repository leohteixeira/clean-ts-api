import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/main/adapters'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const emailValidator = new EmailValidatorAdapter()

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
