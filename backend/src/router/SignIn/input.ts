import { z } from 'zod'

export const zSingInTrpcInput = z.object({
  nick: z.string().min(1),
  password: z.string().min(4),
})
