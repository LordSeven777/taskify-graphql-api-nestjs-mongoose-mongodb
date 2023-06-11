import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LabelService } from './label.service';
import { AccessTokenGuard } from '../auth/guard';
import { MatchesUserParam } from '../user/decorator';
import { ApplyPolicy, AuthUser } from '../auth/decorator';
import { UserDocument } from '../user/user.schema';
import { CreateLabelDTO, UpdateLabelDTO } from './dto';
import { LabelPolicy } from './label.policy';
import { UserAction } from '../auth/auth.policy';
import { BindLabelParamPipe } from './pipe';
import { LabelDocument } from './label.schema';

@Resolver(`Label`)
export class LabelResolver {
  constructor(
    private labelService: LabelService,
    private labelPolicy: LabelPolicy,
  ) {}

  @Query('userLabels')
  @MatchesUserParam('userId')
  @UseGuards(AccessTokenGuard)
  getUserLabels(@Args('userId') userId: string) {
    return this.labelService.getUserLabels(userId);
  }

  @Mutation()
  @ApplyPolicy(LabelPolicy, UserAction.Create)
  @UseGuards(AccessTokenGuard)
  addLabel(
    @AuthUser() authUser: UserDocument,
    @Args('payload') payload: CreateLabelDTO,
  ) {
    return this.labelService.create(authUser._id, payload);
  }

  @Mutation()
  @UseGuards(AccessTokenGuard)
  updateLabel(
    @Args('id', BindLabelParamPipe) label: LabelDocument,
    @Args('payload') payload: UpdateLabelDTO,
    @AuthUser() authUser: UserDocument,
  ) {
    this.labelPolicy.authorize(authUser, UserAction.Update, label);
    return this.labelService.update(label, payload);
  }

  @Mutation()
  @UseGuards(AccessTokenGuard)
  deleteLabel(
    @Args('id', BindLabelParamPipe) label: LabelDocument,
    @AuthUser() authUser: UserDocument,
  ) {
    this.labelPolicy.authorize(authUser, UserAction.Delete, label);
    return this.labelService.delete(label);
  }
}
