import { z } from 'zod'

const MESSAGE = 'Empty strings is not allowed!'

export const updateTodoBodySchema = z.object({
  id: z.string().min(1, { message: MESSAGE }),
  title: z.string().min(1, { message: MESSAGE }),
  description: z.string().min(1, { message: MESSAGE }),
})

export type UpdateTodoSchema = z.infer<typeof updateTodoBodySchema>

export const completedTodoBodySchema = z.object({
  id: z.string().min(1, { message: MESSAGE }),
})

export type CompletedTodoSchema = z.infer<typeof completedTodoBodySchema>
