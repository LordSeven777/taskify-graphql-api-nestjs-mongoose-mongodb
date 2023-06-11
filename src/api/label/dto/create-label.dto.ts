import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsHexColor,
  IsOptional,
} from 'class-validator';

import { CreateLabelInput } from 'src/graphql/schema';

export class CreateLabelDTO implements CreateLabelInput {
  @MaxLength(50, {
    message: 'The label name must must exceed 50 characters',
  })
  @MinLength(2, {
    message: 'The label name must contain at least 2 characters',
  })
  @IsNotEmpty({ message: 'The label name must not be empty' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsHexColor()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  color: string;
}
