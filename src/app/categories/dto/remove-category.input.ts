import { InputType, Field, ID } from '@nestjs/graphql'
import { IsMongoId } from '~/shared/validator/objectid.validator'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class RemoveCategoryInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
