import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Label, LabelSchema } from './label.schema';
import { LabelService } from './label.service';
import { LabelPolicy } from './label.policy';
import { LabelResolver } from './label.resolver';
import { LabelDataloader } from './label.loader';

const labelMongooseModule = MongooseModule.forFeature([
  { name: Label.name, schema: LabelSchema },
]);

@Module({
  imports: [labelMongooseModule],
  exports: [labelMongooseModule, LabelService, LabelDataloader],
  providers: [LabelService, LabelPolicy, LabelResolver, LabelDataloader],
})
export class LabelModule {}
