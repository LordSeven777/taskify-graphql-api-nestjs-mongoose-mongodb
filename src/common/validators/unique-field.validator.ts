import {
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';

// Validator as an abstract class that checks if a value is unique based on a given model
export abstract class UniqueFieldValidator<Entity>
  implements ValidatorConstraintInterface
{
  // The entity's model
  protected model: Model<Entity>;

  // The default error message
  protected message: string;

  async validate(value: any, args: ValidationArguments) {
    const [field] = args.constraints as [string];
    const document = await this.model.findOne({
      $where: `this.${field} === "${value}"`,
    });
    return !document;
  }

  defaultMessage(args: ValidationArguments): string {
    const [field] = args.constraints as [string];
    return this.message ?? `The ${field} is already taken`;
  }
}
