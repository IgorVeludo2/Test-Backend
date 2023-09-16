import { Controller, Post, UsePipes, Body, Patch } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const updateTodoBodySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
})

type UpdateTodoSchema = z.infer<typeof updateTodoBodySchema>

const completedTodoBodySchema = z.object({
  id: z.string(),
})

type CompletedTodoSchema = z.infer<typeof completedTodoBodySchema>

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
