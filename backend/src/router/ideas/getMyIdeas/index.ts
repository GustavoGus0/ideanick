import { trpc } from '../../../lib/trpc'
import { zGetIdeasTrpcInput } from '../getIdeas/input'
import _ from 'lodash'

export const getMyIdeasTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('You need to be authorized to create and keep your own ideas')
  }
  const rawMyIdeas = await ctx.prisma.idea.findMany({
    where: { authorId: ctx.me.id },
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      authorId: true,
      serialNumber: true,

      _count: {
        select: {
          ideasLikes: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })
  const nextIdea = rawMyIdeas.at(input.limit)
  const nextCursor = nextIdea?.serialNumber
  const rawMyIdeasExceptNext = rawMyIdeas.slice(0, input.limit)
  const myIdeasExceptNext = rawMyIdeasExceptNext.map((idea) => ({
    ..._.omit(idea, ['_count']),
    likesCount: idea._count.ideasLikes,
  }))

  return { ideas: myIdeasExceptNext, nextCursor }
})
