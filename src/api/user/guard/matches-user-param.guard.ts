import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { UserDocument } from '../user.schema';

// Guard that requires the authenticated user to be the specified user id parameter in the request's arguments
@Injectable()
export class MatchesUserParamGuard implements CanActivate {
  /**
   * @param param The user id parameter
   */
  constructor(private param: string) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const userIdParam = this.param ?? 'id';
    const userId = ctx.getArgs()[userIdParam] as string;
    const authUser = ctx.getContext().req.user as UserDocument;
    if (authUser.id !== userId) {
      throw new ForbiddenException(
        'You are not the user specified in the request parameter',
      );
    }
    return true;
  }
}
