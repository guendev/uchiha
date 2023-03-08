import { Module } from '@nestjs/common'
import { TagsService } from './tags.service'
import { TagsResolver } from './tags.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Tag, TagEntity } from '~/app/tags/entities/tag.entity'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tag.name,
        useFactory: () => {
          const schema = TagEntity
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ])
  ],
  providers: [TagsResolver, TagsService]
})
export class TagsModule {}
