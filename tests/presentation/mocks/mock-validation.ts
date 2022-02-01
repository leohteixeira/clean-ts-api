import { Validation } from '@/presentation/helpers'

export class ValidationSpy implements Validation {
  params: Validation.Params
  result: Validation.Result = null

  validate (input: Validation.Params): Validation.Result {
    this.params = input
    return this.result
  }
}
