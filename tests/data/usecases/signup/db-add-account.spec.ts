import { DbAddAccount } from '../../../../src/data/usecases'
import { EncrypterSpy } from '../../mocks'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const encrypterSpy = new EncrypterSpy()
    const sut = new DbAddAccount(encrypterSpy)
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
