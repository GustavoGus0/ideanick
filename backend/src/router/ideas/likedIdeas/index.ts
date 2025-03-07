import { trpc } from '../../../lib/trpc'
import { zGetIdeasTrpcInput } from '../getIdeas/input'
import _ from 'lodash'

export const getLikedIdeasTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const rawLikedIdeas = await ctx.prisma.idea.findMany({
    where: {
      ideasLikes: {
        some: {
          userId: ctx.me?.id,
        },
      },
      blockedAt: null,
    },
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
  const nextIdea = rawLikedIdeas.at(input.limit)
  const nextCursor = nextIdea?.serialNumber
  const rawLikedIdeasExceptNext = rawLikedIdeas.slice(0, input.limit)
  const likedIdeasExceptNext = rawLikedIdeasExceptNext.map((idea) => ({
    ..._.omit(idea, ['_count']),
    likesCount: idea._count.ideasLikes,
  }))
  return { likedIdeas: likedIdeasExceptNext, nextCursor }
})
