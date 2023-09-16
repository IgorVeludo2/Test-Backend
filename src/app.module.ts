import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateTodoContoller } from './controllers/create-todo.controller'
import { GetTodoContoller } from './controllers/get-todo.controller'
import { UpdateTodoController } from './controllers/update-todo.controller'
import { DeleteTodoController } from './controllers/delete-todo.controller'

@Module({
  imports: [],
  controllers: [
    CreateTodoContoller,
    GetTodoContoller,
    UpdateTodoController,
    DeleteTodoController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
