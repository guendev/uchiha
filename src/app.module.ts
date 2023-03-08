import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './app/users/users.module'
import { AuthModule } from './app/auth/auth.module'
import { ApolloModule } from './apollo/apollo.module'
import { StoriesModule } from './app/stories/stories.module'
import { CategoriesModule } from './app/categories/categories.module'
import { AuthorsModule } from './app/authors/authors.module'
import { TagsModule } from './app/tags/tags.module'
import { AppResolver } from '~/app.resolver'
import { NotifyModule } from './app/notify/notify.module'
import { PubSubModule } from '~/apollo/pubsub.module'
import { DevtoolsModule } from '@nestjs/devtools-integration'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApolloModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    StoriesModule,
    CategoriesModule,
    AuthorsModule,
    TagsModule,
    NotifyModule,
    PubSubModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production'
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver]
})
export class AppModule {}
