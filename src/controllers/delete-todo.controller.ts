import { Controller, UsePipes, Body, Post } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const deleteTodoBodySchema = z.object({
  id: z.string(),
})

type DeleteBodySchema = z.infer<typeof deleteTodoBodySchema>

@Controller('/todos')
export class DeleteTodoController {
  constructor(private prisma: PrismaService) {}

  @Post('/delete-todo')
  @UsePipes(new ZodValidationPipe(deleteTodoBodySchema))
  async deleteTodo(@Body() body: DeleteBodySchema) {
    const { id } = body

    await this.prisma.todoTask.update({
      where: {
        id,
      },
      data: {
        deleteToDo: true,
      },
    })
  }
}
