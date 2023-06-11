import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { LabelService } from '../label/label.service';
import { Task, TaskDocument } from './task.schema';
import { LabelDocument } from '../label/label.schema';
import { UserDocument } from '../user/user.schema';
import { QueryParams } from 'src/common/types/query';
import { getDateEdgeTimes } from 'src/common/utils/date-time.utils';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private labelService: LabelService,
  ) {}

  async getUserTasks(
    userId: string | Types.ObjectId,
    params: QueryParams & { date?: string },
  ) {
    const sort = params.sort || '-startsAt';
    const date = params.date || new Date().toISOString();
    const [dateStart, dateEnd] = getDateEdgeTimes(date);
    const tasks = await this.taskModel
      .find({
        startsAt: {
          $lte: dateEnd,
        },
        endsAt: {
          $gte: dateStart,
        },
        user: userId,
      })
      .sort(sort)
      .populate<{ user: UserDocument; labels: LabelDocument[] }>([
        'user',
        'labels',
      ]);
    return tasks;
  }

  async getOne(id: string | Types.ObjectId) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Cannot find the task');
    }
    return task.populate<{ user: UserDocument; labels: LabelDocument[] }>([
      'user',
      'labels',
    ]);
  }

  /**
   * Creates a new task for a user
   *
   * @param userId The owner of the task
   * @param payload The task creation payload
   * @returns The created task
   */
  async create(userId: string | Types.ObjectId, payload: CreateTaskDTO) {
    await this.labelService.validateLabelIdsForUser(userId, payload.labels);
    const task = await this.taskModel.create({
      ...payload,
      user: userId,
    });
    return task.populate<{ user: UserDocument; labels: LabelDocument[] }>([
      'labels',
      'user',
    ]);
  }

  async update(task: TaskDocument, payload: UpdateTaskDTO) {
    if (payload.labels) {
      await this.labelService.validateLabelIdsForUser(
        (task.user as UserDocument)._id,
        payload.labels,
      );
    }
    payload.name && (task.name = payload.name);
    payload.description && (task.description = payload.description);
    payload.checkList && (task.checkList = payload.checkList);
    payload.startsAt && (task.startsAt = payload.startsAt);
    payload.endsAt && (task.endsAt = payload.endsAt);
    payload.isCompleted !== undefined &&
      (task.isCompleted = payload.isCompleted);
    payload.labels && (task.labels = payload.labels);
    await task.save();
    return task.populate<{ user: UserDocument; labels: LabelDocument[] }>([
      'user',
      'labels',
    ]);
  }

  async delete(task: TaskDocument) {
    await task.deleteOne();
    return task;
  }
}
