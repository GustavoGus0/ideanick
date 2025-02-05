import { applyTrpcToExpressApp } from './lib/trpc'
import cors from 'cors'
import express from 'express'
import { trpcRouter } from './router'
import { AppContext, createAppContext } from './lib/ctx'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    expressApp.listen(3000, () => {
      // eslint-disable-next-line no-console
      console.info('Listening on http://localhost:3000')
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
