import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy, HashComparerSpy, TokenGeneratorSpy, UpdateAccessTokenRepositorySpy } from '@/tests/data/mocks'
import { mockLoginParams } from '@/tests/domain/mocks'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  tokenGeneratorSpy: TokenGeneratorSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, tokenGeneratorSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorySpy, 'load')
    await sut.auth(mockLoginParams())
    expect(loadSpy).toHaveBeenCalledWith(loadAccountByEmailRepositorySpy.params)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'load').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockLoginParams())
    expect(accessToken).toBeNull()
  })

  test('Should call HasherComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    const compareSpy = jest.spyOn(hashComparerSpy, 'compare')
    await sut.auth(mockLoginParams())
    expect(compareSpy).toHaveBeenCalledWith(hashComparerSpy.params)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(
      new Promise(resolve => resolve(false))
    )
    const accessToken = await sut.auth(mockLoginParams())
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorSpy, 'generate')
    await sut.auth(mockLoginParams())
    expect(generateSpy).toHaveBeenCalledWith(tokenGeneratorSpy.params)
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    jest.spyOn(tokenGeneratorSpy, 'generate').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockLoginParams())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositorySpy, 'update')
    await sut.auth(mockLoginParams())
    expect(updateSpy).toHaveBeenCalledWith(updateAccessTokenRepositorySpy.params)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'update').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })
})
