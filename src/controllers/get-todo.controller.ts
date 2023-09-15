import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/todos')
export class GetTodoContoller {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    return await this.prisma.todoTask.findMany()
  }
}
