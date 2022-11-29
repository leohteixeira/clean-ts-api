import { HttpRequest } from '@/presentation/protocols'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddSurveyController } from '@/presentation/controllers'

const mockRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{ image: 'any_image', answer: 'any_answer' }]
  }
})

interface SutTypes {
  sut: AddSurveyController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddSurveyController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
