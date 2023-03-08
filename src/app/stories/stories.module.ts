import { Module } from '@nestjs/common'
import { StoriesService } from './stories.service'
import { StoriesController } from './stories.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserEntity } from '../users/entities/user.entity'
import { Story } from './entities/story.entity'

@Module({
  imports: [
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Story.name,
    //     useFactory: () => {
    //       const schema = StoryEntity
    //       // schema.plugin(require('mongoose-slug-generator'))
    //       return schema
    //     }
    //   }
    // ])
  ],
  controllers: [StoriesController],
  providers: [StoriesService]
})
export class StoriesModule {}
