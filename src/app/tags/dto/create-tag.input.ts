import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string

  @Field(() => String, { nullable: true, defaultValue: '' })
  description: string
}
