import { getIdeasTrpcRoute } from './getIdeas'
import { getIdeaTrpcRoute } from './getIdea'
import { trpc } from '../lib/trpc'

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
