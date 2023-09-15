import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateTodoContoller } from './controllers/create-todo.controller'
import { GetTodoContoller } from './controllers/get-todo.controller'

@Module({
  imports: [],
  controllers: [CreateTodoContoller, GetTodoContoller],
  providers: [PrismaService],
})
export class AppModule {}
