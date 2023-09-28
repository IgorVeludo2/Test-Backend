import { z } from 'zod'

const MESSAGE = 'Empty strings is not allowed!'

export const deleteTodoBodySchema = z.object({
  id: z.string().min(1, { message: MESSAGE }),
})

export type DeleteTodoBodySchema = z.infer<typeof deleteTodoBodySchema>
