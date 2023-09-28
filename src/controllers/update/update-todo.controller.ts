import { Controller, Post, UsePipes, Body, Patch } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  UpdateTodoSchema,
  updateTodoBodySchema,
  CompletedTodoSchema,
  completedTodoBodySchema,
} from './update-zodschema'

@Controller('/todos')
export class UpdateTodoController {
  constructor(private prisma: PrismaService) {}

  @Post('/update-todo')
  @UsePipes(new ZodValidationPipe(updateTodoBodySchema))
  async updateTodo(@Body() body: UpdateTodoSchema) {
    const { title, description, id } = body

    await this.prisma.todoTask.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    })
  }

  @Patch('/completed')
  @UsePipes(new ZodValidationPipe(completedTodoBodySchema))
  async completedTask(@Body() body: CompletedTodoSchema) {
    const { id } = body

    await this.prisma.todoTask.update({
      where: {
        id,
      },
      data: {
        isDone: true,
      },
    })
  }
}
