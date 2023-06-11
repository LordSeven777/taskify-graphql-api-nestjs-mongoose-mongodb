import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidatorConstraint } from 'class-validator';
import { Model } from 'mongoose';

import { UniqueFieldValidator } from 'src/common/validators';
import { User } from '../user.schema';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueUserFieldValidator extends UniqueFieldValidator<User> {
  constructor(@InjectModel(User.name) protected model: Model<User>) {
    super();
  }
}
