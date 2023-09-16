import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { string } from 'zod'

interface RequestById {
  id: string
}

@Controller('/todos')
export class GetTodoContoller {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll() {
    return await this.prisma.todoTask.findMany()
  }

  @Get('/:id')
  async getById(@Param() paramsId: RequestById) {
    try {
      return await this.prisma.todoTask.findMany({
        where: { id: { in: [paramsId.id] } },
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot proceed with request. Please try again',
      )
    }
  }
}
