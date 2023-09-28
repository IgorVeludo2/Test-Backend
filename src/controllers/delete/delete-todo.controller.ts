import { Controller, UsePipes, Body, Post } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteTodoBodySchema, deleteTodoBodySchema } from './delete-zodschema'

@Controller('/todos')
export class DeleteTodoController {
  constructor(private prisma: PrismaService) {}

  @Post('/delete-todo')
  @UsePipes(new ZodValidationPipe(deleteTodoBodySchema))
  async deleteTodo(@Body() body: DeleteTodoBodySchema) {
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
