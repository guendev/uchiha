import { Core, CoreDocument } from '@app/core'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'

export type UserDocument = User & CoreDocument

@ObjectType()
@Schema()
export class User extends Core {
  @Prop({ required: true })
  @Field(() => String)
  name: string

  @Prop({ index: true, unique: true, required: true })
  @Field(() => String)
  email: string

  @Prop({ required: true })
  password: string
}

export const UserEntity = SchemaFactory.createForClass(User)
