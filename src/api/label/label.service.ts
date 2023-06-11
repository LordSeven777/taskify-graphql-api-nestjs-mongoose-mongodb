import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { CreateLabelDTO, UpdateLabelDTO } from './dto';
import { Label, LabelDocument } from './label.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LabelService {
  constructor(@InjectModel('Label') private labelModel: Model<Label>) {}

  /**
   * Gets labels of a user
   *
   * @param userId The id of a the user
   * @returns The labels
   */
  getUserLabels(userId: Types.ObjectId | string) {
    return this.labelModel
      .find({
        user: userId,
      })
      .sort('-updatedAt');
  }

  async getOne(id: Types.ObjectId | string) {
    const label = await this.labelModel.findById(id);
    if (!label) {
      throw new NotFoundException('Label not found', {
        description:
          'The label specified in the request id parameter is not found',
      });
    }
    return label;
  }

  async create(userId: Types.ObjectId | string, payload: CreateLabelDTO) {
    if (await this.existsForUser(userId, payload.name)) {
      throw new BadRequestException('Label name already exists', {
        description: 'The label name already exists for the authenticated user',
      });
    }
    const label = await this.labelModel.create({
      name: payload.name,
      color: payload.color,
      user: userId,
    });
    return label;
  }

  async update(label: LabelDocument, payload: UpdateLabelDTO) {
    if (payload?.name) label.name = payload.name;
    if (payload?.color) label.color = payload.color;
    await label.save();
    return label;
  }

  async delete(label: LabelDocument) {
    await label.deleteOne();
    return label;
  }

  /**
   * Checks a label with a given name already exists amongst a user's labels
   *
   * @param userId The user to check the label against to
   * @param name The name of the label to check
   * @returns Whether it exists or not
   */
  async existsForUser(
    userId: Types.ObjectId | string,
    name: string,
  ): Promise<boolean> {
    const label = await this.labelModel.findOne({ name, user: userId });
    return label !== null;
  }

  /**
   * Checks if a list of label ids already exist
   *
   * @param ids The label ids whose existence are to be checked
   * @returns Whether all of the ids exist or not
   */
  async idsExist(ids: (Types.ObjectId | string)[]): Promise<boolean> {
    const _ids = [...new Set(ids)];
    const count = await this.labelModel.countDocuments({
      _id: {
        $in: _ids,
      },
    });
    return count === _ids.length;
  }

  /**
   * Checks if a list of label ids already exist for a user
   *
   * @param userId The id of the user
   * @param ids The label ids whose existence are to be checked
   * @returns Whether all of the ids exist or not
   */
  async idsExistForUser(
    userId: Types.ObjectId | string,
    ids: (Types.ObjectId | string)[],
  ): Promise<boolean> {
    const _ids = [...new Set(ids)];
    const count = await this.labelModel.countDocuments({
      _id: {
        $in: _ids,
      },
      user: userId,
    });
    return count === _ids.length;
  }

  /**
   * Validates label ids as belonging to a user
   *
   * @param task The task whose label ids are to be checked
   * @param ids The label ids
   * @return The check result
   */
  async validateLabelIdsForUser(
    userId: string | Types.ObjectId,
    ids: (string | Types.ObjectId)[],
  ): Promise<void> {
    const labelsBelongsToUser = await this.idsExistForUser(userId, ids);
    if (!labelsBelongsToUser) {
      throw new ForbiddenException(
        'Some of the task labels do not belong to the owner of the task',
      );
    }
  }
}
