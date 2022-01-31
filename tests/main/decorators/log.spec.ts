import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { ok, serverError } from '@/presentation/helpers'
import { mockAccountModel, mockAddAccountParams } from '@/tests/domain/mocks'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

const mockRequest = (): HttpRequest => ({
  body: { ...mockAddAccountParams(), passwordConfirmation: mockAddAccountParams().password }
})

const makeController = (): Controller => {
  class ControllerSpy implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => resolve(ok(mockAccountModel())))
    }
  }
  return new ControllerSpy()
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerSpy: Controller
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const controllerSpy = makeController()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const handleSpy = jest.spyOn(controllerSpy, 'handle')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositorySpy, 'log')
    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(makeFakeServerError()))
    )
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
