import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import { initTRPC } from '@trpc/server'
import { type TrpcRouter } from '../router'

export const trpc = initTRPC.create()

export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  )
}
