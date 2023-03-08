import { Core, CoreDocument } from '@app/core'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { Category } from '../../categories/entities/category.entity'
import { Types } from 'mongoose'

export type StoryDocument = Story & CoreDocument

@ObjectType()
@Schema({
  toJSON: {
    virtuals: true,
    getters: true
  },
  toObject: {
    virtuals: true,
    getters: true
  }
})
export class Story extends Core {
  @Field(() => String)
  @Prop({ required: true })
  name: string

  @Field(() => String)
  @Prop({ type: String })
  description: string

  @Field()
  @Prop({ type: String, slug: ['name'], unique: true })
  slug: string

  @Field(() => String)
  @Prop({ type: String, index: true })
  author: string

  @Field(() => String)
  @Prop({ type: String, index: true })
  authorId: string

  @Field(() => Category)
  @Prop({ type: Types.ObjectId, ref: Category.name, index: true })
  category: Category
}

export const StoryEntity = SchemaFactory.createForClass(Story)
