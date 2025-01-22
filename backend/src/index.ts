import { applyTrpcToExpressApp } from './lib/trpc'
import cors from 'cors'
import express from 'express'
import { trpcRouter } from './router'

const expressApp = express()
expressApp.use(cors())

applyTrpcToExpressApp(expressApp, trpcRouter)
expressApp.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.info('Listening on http://localhost:3000')
})

export const password = 'hU8k&4g'
