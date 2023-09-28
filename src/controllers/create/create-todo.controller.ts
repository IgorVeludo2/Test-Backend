import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTodoSchema, createTodoBodySchema } from './create-zodschema'

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
