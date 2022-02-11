import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/database/mongodb/helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(params)
    const account = result.ops[0]
    return account && MongoHelper.map(account)
  }

  async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (params: UpdateAccessTokenRepository.Params): Promise<UpdateAccessTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.updateOne({
      _id: params.id
    }, {
      $set: {
        accessToken: params.token
      }
    })
    return account && MongoHelper.map(account)
  }
}
