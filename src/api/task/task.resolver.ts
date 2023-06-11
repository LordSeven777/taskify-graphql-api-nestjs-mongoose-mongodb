import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { TaskService } from './task.service';
import { TaskPolicy } from './task.policy';
import { AccessTokenGuard } from '../auth/guard';
import { MatchesUserParam } from '../user/decorator';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { ApplyPolicy, AuthUser } from '../auth/decorator';
import { UserDocument } from '../user/user.schema';
import { UserAction } from '../auth/auth.policy';
import { TaskDocument } from './task.schema';
import { BindTaskParamPipe } from './pipe';

@Resolver('Task')
export class TaskResolver {
  constructor(
    private taskService: TaskService,
    private taskPolicy: TaskPolicy,
  ) {}

  @Query('userTasks')
  @MatchesUserParam('userId')
  @UseGuards(AccessTokenGuard)
  getUserLabels(
    @Args('userId') userId: string,
    @Args('date') date?: string,
    @Args('search') search?: string,
  ) {
    return this.taskService.getUserTasks(userId, { date, search });
  }

  @Mutation()
  @ApplyPolicy(TaskPolicy, UserAction.Create)
  @UseGuards(AccessTokenGuard)
  addTask(
    @Args('payload') payload: CreateTaskDTO,
    @AuthUser() authUser: UserDocument,
  ) {
    return this.taskService.create(authUser._id, payload);
  }

  @Mutation()
  @UseGuards(AccessTokenGuard)
  updateTask(
    @Args('id', BindTaskParamPipe) task: TaskDocument,
    @Args('payload') payload: UpdateTaskDTO,
    @AuthUser() authUser: UserDocument,
  ) {
    this.taskPolicy.authorize(authUser, UserAction.Update, task);
    return this.taskService.update(task, payload);
  }

  @Mutation()
  @UseGuards(AccessTokenGuard)
  deleteTask(
    @Args('id', BindTaskParamPipe) task: TaskDocument,
    @AuthUser() authUser: UserDocument,
  ) {
    this.taskPolicy.authorize(authUser, UserAction.Delete, task);
    return this.taskService.delete(task);
  }
}
