import { LogErrorRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/database/mongodb/helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: LogErrorRepository.Params): Promise<LogErrorRepository.Result> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
