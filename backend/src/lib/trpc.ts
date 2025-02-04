import * as trpcExpress from '@trpc/server/adapters/express'
import superjson from 'superjson'
import { type Express } from 'express'
import { initTRPC } from '@trpc/server'
import { type TrpcRouter } from '../router'
import { AppContext } from './ctx'

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
})

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}
