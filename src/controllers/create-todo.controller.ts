import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/todos')
export class CreateTodoContoller {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { title, description } = body

    await this.prisma.todoTask.create({
      data: {
        title,
        description,
      },
    })
  }
}
