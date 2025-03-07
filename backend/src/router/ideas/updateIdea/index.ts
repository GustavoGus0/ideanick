import { trpc } from '../../../lib/trpc'
import { canEditIdea } from '../../../utils/can'
import { zUpdateIdeaTrpcInput } from './input'

export const updateIdeaTrpcRoute = trpc.procedure.input(zUpdateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  const { ideaId, ...ideaInput } = input
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }
  const idea = await ctx.prisma.idea.findUnique({
    where: { id: ideaId },
  })
  if (!idea) {
    throw new Error('NOT_FOUND')
  }
  if (!canEditIdea(ctx.me, idea)) {
    throw new Error('NOT_YOUR_IDEA')
  }
  if (idea.nick !== input.nick) {
    const existingIdea = await ctx.prisma.idea.findUnique({
      where: { nick: input.nick },
    })
    if (existingIdea) {
      throw new Error('Idea with this nick already exists')
    }
  }
  await ctx.prisma.idea.update({
    where: { id: ideaId },
    data: { ...ideaInput },
  })
  return true
})
