import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: Validation.Params): Validation.Result {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
