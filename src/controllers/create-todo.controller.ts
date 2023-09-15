import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/todos')
export class CreateTodoContoller {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { title, description } = body

    if (
      [title, description].includes(undefined) ||
      [title, description].includes(null)
    ) {
      throw new BadRequestException('Cannot proceed with request.', {
        cause: new Error(),
        description: 'One or more parameters is missing.',
      })
    }

    await this.prisma.todoTask.create({
      data: {
        title,
        description,
      },
    })
  }
}
