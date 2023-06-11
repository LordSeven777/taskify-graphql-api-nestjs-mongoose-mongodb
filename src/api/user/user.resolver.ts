import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AccessTokenGuard } from '../auth/guard';
import { UserDocument } from './user.schema';
import { AuthUser } from '../auth/decorator';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('me')
  @UseGuards(AccessTokenGuard)
  getMe(@AuthUser() authUser: UserDocument) {
    return authUser;
  }
}
