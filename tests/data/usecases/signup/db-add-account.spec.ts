import { DbAddAccount } from '../../../../src/data/usecases'
import { EncrypterSpy } from '../../mocks'

interface SutTypes {
  sut: DbAddAccount
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const sut = new DbAddAccount(encrypterSpy)
  return {
    sut,
    encrypterSpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterSpy } = makeSut()
    const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
