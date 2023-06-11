import { UseGuards } from '@nestjs/common';

import { MatchesUserParamGuard } from '../guard';

/**
 * Custom decorator that applies the MatchesUserParamGuard to the @UseGuards decorator
 *
 * IMPORTANT: This decorator must be used along the an access token guard decorator
 * and must be placed before that decorator.
 *
 * @param param The user id parameter name
 * @returns The decorator
 */
export const MatchesUserParam = (param?: string) => {
  return param
    ? UseGuards(new MatchesUserParamGuard(param))
    : UseGuards(MatchesUserParam);
};
