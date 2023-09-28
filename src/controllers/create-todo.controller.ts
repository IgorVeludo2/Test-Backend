import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createTodoBodySchema = z.object({
  title: z.string().min(1, { message: 'Empty strings is not allowed!' }),
  description: z.string().min(1, { message: 'Empty strings is not allowed!' }),
})

type CreateTodoSchema = z.infer<typeof createTodoBodySchema>

@Controller('/todos')
export class CreateTodoContoller {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createTodoBodySchema))
  async handle(@Body() body: CreateTodoSchema) {
    const { title, description } = body

    await this.prisma.todoTask.create({
      data: {
        title,
        description,
      },
    })
  }
}
