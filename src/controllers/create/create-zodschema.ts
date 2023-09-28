import { z } from 'zod'

const MESSAGE = 'Empty strings is not allowed!'

export const createTodoBodySchema = z.object({
  title: z.string().min(1, { message: MESSAGE }),
  description: z.string().min(1, { message: MESSAGE }),
})

export type CreateTodoSchema = z.infer<typeof createTodoBodySchema>
