import { CreateAuthorInput } from './create-author.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { IsMongoId } from '~/shared/validator/objectid.validator'

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
