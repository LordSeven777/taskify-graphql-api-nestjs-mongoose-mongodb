import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as DataLoader from 'dataloader';

import { Label, LabelDocument } from './label.schema';
import { BatchManyFn, HasLoaders } from 'src/dataloader/dataloader';

@Injectable()
export class LabelDataloader implements HasLoaders {
  constructor(@InjectModel(Label.name) private labelModel: Model<Label>) {}

  getLoaders() {
    return {
      labelsHavingUserId: new DataLoader(this.getBatchLabelsHavingUserId),
    };
  }

  private getBatchLabelsHavingUserId: BatchManyFn<string, LabelDocument> =
    async (userIds) => {
      const labels = await this.labelModel
        .find({ user: { $in: userIds } })
        .sort('-updatedAt');
      const userIdLabelsMap = new Map<string, LabelDocument[]>();
      for (const label of labels) {
        const userId = label.user.toString();
        const userIdLabels = userIdLabelsMap.get(userId);
        if (!userIdLabels) {
          userIdLabelsMap.set(userId, [label]);
        } else {
          userIdLabels.push(label);
        }
      }
      return userIds.map<LabelDocument[]>(
        (id) => userIdLabelsMap.get(id) ?? [],
      );
    };
}
