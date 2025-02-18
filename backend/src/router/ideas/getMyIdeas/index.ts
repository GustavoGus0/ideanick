import { trpc } from '../../../lib/trpc'
import { zGetIdeasTrpcInput } from '../getIdeas/input'

export const getMyIdeasTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('You need to be authorized to create and keep your own ideas')
  }
  const myIdeas = await ctx.prisma.idea.findMany({
    where: { authorId: ctx.me.id },
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      authorId: true,
      serialNumber: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })
  const nextIdea = myIdeas.at(input.limit)
  const nextCursor = nextIdea?.serialNumber
  const ideasExceptNext = myIdeas.slice(0, input.limit)

  return { ideas: ideasExceptNext, nextCursor }
})
