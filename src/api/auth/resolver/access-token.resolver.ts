import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';

import { AccessToken } from 'src/graphql/schema';
import { RefreshTokenGuard } from '../guard';
import { AuthUser } from '../decorator';
import { UserDocument } from 'src/api/user/user.schema';
import { AuthService } from '../auth.service';

@Resolver('AccessToken')
export class AccessTokenResolver {
  constructor(private authService: AuthService) {}

  @Mutation('refreshToken')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@AuthUser() user: UserDocument): Promise<AccessToken> {
    const accessToken = await this.authService.generateToken('ACCESS', {
      sub: user._id.toString(),
      username: user.username,
    });
    return {
      accessToken,
    };
  }
}
