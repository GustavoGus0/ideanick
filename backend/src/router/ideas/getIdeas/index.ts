import { trpc } from '../../../lib/trpc'

export const getIdeasTrpcRoute = trpc.procedure.query(async ({ ctx }) => ({
  ideas: await ctx.prisma.idea.findMany({
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
}))
