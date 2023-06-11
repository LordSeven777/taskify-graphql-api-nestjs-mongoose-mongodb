import { Validate } from 'class-validator';

import { User } from '../user.schema';
import { UniqueUserFieldValidator } from '../validator';

/**
 * Decorator that checks if a property is unique for a field across the users collection
 *
 * @param field The field the value must be unique to
 */
export const IsUniqueUserField = (field: keyof User) =>
  Validate(UniqueUserFieldValidator, [field]);
