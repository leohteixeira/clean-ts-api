import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, EncrypterSpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

interface SutTypes {
  sut: DbAddAccount
  encrypterSpy: EncrypterSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(encrypterSpy, addAccountRepositorySpy)
  return {
    sut,
    encrypterSpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterSpy } = makeSut()
    const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(encrypterSpy.params)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositorySpy, 'add')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith(addAccountRepositorySpy.params)
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = mockAddAccountParams()
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
})
