import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { PolicyDefinition, UserAction } from '../auth.policy';
import { UserDocument } from 'src/api/user/user.schema';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface PolicyDefinitionConstructor<T extends PolicyDefinition> {
  new (): T;
}

// Reflector metadata key that hold the provided policies at controller or resolver level
export const CHECK_POLICIES_KEY = 'CURRENT_POLICIES';

// Guard that authorizes policies from metadata provided at controller or resolver level
@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const policyConstraints =
      this.reflector.get<
        [PolicyDefinitionConstructor<PolicyDefinition>, UserAction][]
      >(CHECK_POLICIES_KEY, context.getHandler()) ?? [];
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as UserDocument;
    return policyConstraints.every(([Policy, action]) => {
      const policy = new Policy();
      return policy.authorize(user, action);
    });
  }
}
