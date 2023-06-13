import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AccessTokenGuard } from '../auth/guard';
import { UserDocument } from './user.schema';
import { AuthUser } from '../auth/decorator';
import { AppGqlContext } from 'src/graphql/context';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('me')
  @UseGuards(AccessTokenGuard)
  getMe(@AuthUser() authUser: UserDocument) {
    return authUser;
  }

  @ResolveField()
  async labels(
    @Parent() user: UserDocument,
    @Context() { loaders }: AppGqlContext,
  ) {
    return loaders.label.labelsHavingUserId.load(user.id);
  }
}
