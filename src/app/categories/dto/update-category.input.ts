import { CreateCategoryInput } from './create-category.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsMongoId } from '~/shared/validator/objectid.validator'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
