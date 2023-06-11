import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Task, TaskSchema } from './task.schema';
import { TaskService } from './task.service';
import { LabelsExist } from './validator';
import { LabelModule } from '../label/label.module';
import { TaskPolicy } from './task.policy';
import { TaskResolver } from './task.resolver';

const taskMongooseModule = MongooseModule.forFeature([
  { name: Task.name, schema: TaskSchema },
]);

@Module({
  imports: [taskMongooseModule, LabelModule],
  providers: [TaskService, LabelsExist, TaskPolicy, TaskResolver],
  exports: [taskMongooseModule, TaskService],
})
export class TaskModule {}
