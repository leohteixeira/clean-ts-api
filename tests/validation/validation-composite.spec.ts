import { ValidationComposite } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: ValidationComposite
  validationSpys: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpys = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpys)
  return {
    sut,
    validationSpys
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationSpys[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })
})
