import { Module } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { AuthorsResolver } from './authors.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Author, AuthorEntity } from './entities/author.entity'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Author.name,
        useFactory: () => {
          const schema = AuthorEntity
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ])
  ],
  providers: [AuthorsResolver, AuthorsService]
})
export class AuthorsModule {}
