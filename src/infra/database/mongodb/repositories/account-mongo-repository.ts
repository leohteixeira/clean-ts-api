import { AddAccountRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/database/mongodb/helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(params)
    const account = result.ops[0]
    return account && MongoHelper.map(account)
  }
}
