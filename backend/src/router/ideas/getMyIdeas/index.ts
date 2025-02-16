import { trpc } from '../../../lib/trpc'

export const getMyIdeasTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  if (!ctx.me) {
    throw new Error('You need to be authorized to create and keep your own ideas')
  }
  return {
    myIdeas: await ctx.prisma.idea.findMany({
      where: { authorId: ctx.me.id },
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        authorId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  }
})
