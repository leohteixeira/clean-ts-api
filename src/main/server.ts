import 'module-alias/register'
import { MongoHelper } from '@/infra/database/mongodb/helper'
import { buildApp, env } from '@/main/config'

MongoHelper.connect(env.mongoUrl)
  .then(buildApp)
  .then((app) => {
    app.listen(5050, () => console.log(`Server runing at http://localhost:${env.port}`))
  })
  .catch(console.error)
