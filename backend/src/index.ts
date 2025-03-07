import { applyTrpcToExpressApp } from './lib/trpc'
import cors from 'cors'
import express from 'express'
import { trpcRouter } from './router'
import { AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { env } from './lib/env'
import { presetDb } from './scripts/presetDb'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.use(cors())
    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    expressApp.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.info(`Listening on http://localhost:${env.PORT}`)
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    await ctx?.stop()
  }
})()
