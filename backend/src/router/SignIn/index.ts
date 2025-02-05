import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { zSingInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure.input(zSingInTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: { nick: input.nick, password: getPasswordHash(input.password) },
  })
  if (!user) {
    throw new Error('Wrong nick or password')
  }
  return true
})
