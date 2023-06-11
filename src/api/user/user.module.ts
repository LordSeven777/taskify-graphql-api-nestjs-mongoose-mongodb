import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UniqueUserFieldValidator } from './validator';

const userMongooseModule = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);

@Module({
  imports: [userMongooseModule],
  providers: [UserService, UserResolver, UniqueUserFieldValidator],
  exports: [userMongooseModule, UserService, UniqueUserFieldValidator],
})
export class UserModule {}
