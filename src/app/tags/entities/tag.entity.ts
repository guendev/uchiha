import { Core, CoreDocument } from '@app/core'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'

export type TagDocument = Tag & CoreDocument

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
export class Tag extends Core {
  @Field(() => String)
  @Prop({ required: true })
  name: string

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description: string

  @Field()
  @Prop({ type: String, slug: ['name'], unique: true })
  slug: string
}

export const TagEntity = SchemaFactory.createForClass(Tag)
