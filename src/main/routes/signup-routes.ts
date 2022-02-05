/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applySignUpRoutes = (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
