import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from '../schemas/task-schema';
import { DatabaseModule } from 'src/database/database.module';
import { taskProviders } from './providers/tasks-provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders,TasksService]
})
export class TasksModule {}
